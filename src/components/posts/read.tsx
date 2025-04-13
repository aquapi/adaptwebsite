import { createSignal, onMount, Show } from "solid-js";
import { decodeTitle } from "./list";

interface Post {
  title: string;
  author: {
    name: string;
  };
  content: string;
}

export async function getPost(id: string): Promise<Post | null> {
  try {
    const dat = await fetch(
      "https://adapt-wordpress-cache.aquapi.workers.dev/posts/" + id
    );
    return dat.json() as Promise<Post>;
  } catch {
    return null;
  }
}

export const decodeContent = (str: string) => {
  const el = new DOMParser().parseFromString(str, "text/html").body;

  if (el.children.length > 1) {
    const last = el.children.item(el.children.length - 1);
    // Remove the Let's Connect
    if (last !== null) el.removeChild(last);
  }

  return el.innerHTML;
};

const Post = (props: Post) => (
  <div class="sm:p-24 p-16 max-w-4xl">
    <h1 class="sm:text-4xl text-2xl text-[#F8F8F8] font-base font-extrabold">
      {decodeTitle(props.title)}
    </h1>
    <p class="text-[#e5e5e5]">{props.author.name}</p>
    <main
      class="mt-10 text-lg text-justify text-[#F8F8F8] max-w-3xl"
      innerHTML={decodeContent(props.content)}
    />
  </div>
);

export default () => {
  const [post, setPost] = createSignal<Post | null>(null);

  onMount(() => {
    getPost(new URLSearchParams(location.search).get("id") ?? "-1").then(
      setPost
    );
  });

  return (
    <Show
      when={post() !== null}
      fallback={<div class="mt-16 text-[#F8F8F8]">Loading post...</div>}
    >
      {Post(post()!)}
    </Show>
  );
};
