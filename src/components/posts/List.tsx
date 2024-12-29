import { createSignal, onMount, Show } from "solid-js";
import { decodeTitle } from "./Read";

interface Post {
  title: string;
  ID: number;
}

export async function getPosts(): Promise<Post[] | null> {
  try {
    const dat = await fetch(
      "https://public-api.wordpress.com/rest/v1.1/sites/clubadapt.wordpress.com/posts"
    );
    const json = await dat.json();
    return json.posts as Post[];
  } catch {
    return null;
  }
}

const Post = (post: Post) => (
  <a href={`/news/read?id=${post.ID}`} class="underline decoration-dashed">
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
      {posts()!.map(Post)}
    </Show>
  );
};
