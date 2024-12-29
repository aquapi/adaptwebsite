import { createSignal, onMount, Show } from "solid-js";

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
      "https://public-api.wordpress.com/rest/v1.1/sites/clubadapt.wordpress.com/posts/" +
        id
    );
    return dat.json() as Promise<Post>;
  } catch {
    return null;
  }
}

export const decodeContent = (str: string) =>
  new DOMParser().parseFromString(str, "text/html").documentElement.innerHTML;

export const decodeTitle = (str: string) =>
  str.replace(/&#(\d+);/g, (_, e) => String.fromCharCode(e));

const Post = (props: Post) => (
  <div class="sm:p-24 p-16 bg-[#F8F8F8] max-w-4xl">
    <h1 class="sm:text-4xl text-2xl text-[#303030] font-base font-extrabold">
      {decodeTitle(props.title)}
    </h1>
    <p class="text-[#777b84]">{props.author.name}</p>
    <main
      class="mt-10 text-lg text-justify text-[#454545] max-w-3xl"
      innerHTML={decodeContent(props.content)}
    ></main>
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
