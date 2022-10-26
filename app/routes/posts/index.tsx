import { json } from "@remix-run/node"; // or cloudflare/deno
import { Link, useLoaderData } from "@remix-run/react";

// ALL POSTS
import * as post01 from "./first-post.mdx";
import * as post02 from "./second-post.mdx";

type postFrontMatterType = {
  title: string;
  slug: string;
  author: string;
  date: string;
  meta: { title: string; description: string };
  headers?: { "cache-control": string };
};

function postFromModule(mod: any) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ""),
    ...mod.attributes,
  };
}

export async function loader() {
  return json([postFromModule(post01), postFromModule(post02)]);
}

export default function IndexPostsRoute() {
  const posts = useLoaderData<postFrontMatterType[]>();

  return (
    <main>
      <h1 className="text-3xl font-semibold">Posts:</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
