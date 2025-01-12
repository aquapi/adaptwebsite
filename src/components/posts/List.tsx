import { createSignal, onMount, Show } from "solid-js";

interface Post {
  title: string;
  id: number;
}

export async function getPosts(): Promise<Post[] | null> {
  try {
    const dat = await fetch(
      "https://adapt-wordpress-cache.aquapi.workers.dev/listing"
    );
    return dat.json() as Promise<Post[]>;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Can people write better titles?
const normalizePostTitle = (str: string) =>
  str
    .split(" ")
    .map((word) =>
      (word === word.toUpperCase() && word !== "PTC"
        ? word[0].toUpperCase() + word.slice(1).toLowerCase()
        : word
      )
        .replace(/A[dD][aA][pP][tT]/g, "ADaPT")
        .replace(/(.)-(.)/g, (_, a, b) => a + " - " + b.toUpperCase())
    )
    .join(" ");

export const decodeTitle = (str: string) =>
  normalizePostTitle(
    str.replace(/&#(\d+);/g, (_, e) => String.fromCharCode(e))
  );

const Post = (post: Post) => (
  <a href={`/news/read?id=${post.id}`} class="underline decoration-dashed">
    {decodeTitle(post.title)}
  </a>
);

export default () => {
  const [posts, setPosts] = createSignal<Post[] | null>(null);

  onMount(() => {
    getPosts().then(setPosts);
  });

  return (
    <Show when={posts() !== null} fallback={<div>Loading...</div>}>
      {posts()?.map(Post)}
    </Show>
  );
};
