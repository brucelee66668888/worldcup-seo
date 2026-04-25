import { posts } from "../src/data/posts";

function main(): void {
  const payload = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt
  }));

  console.log(JSON.stringify(payload, null, 2));
}

main();
