import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components/Card";
import { formatDate } from "~/utils";

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
      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <Card key={post.slug} as="article" className={"py-12 first:pt-0"}>
            <Card.Title to={post.slug}>{post.title}</Card.Title>
            <Card.Eyebrow as="time" dateTime={post.date} decorate className="">
              {formatDate(post.date)}
            </Card.Eyebrow>
            <Card.Description>
              {post.meta.description ? post.meta.description : null}
            </Card.Description>
            <Card.Cta>Read post</Card.Cta>
          </Card>
        ))}
      </ul>
    </main>
  );
}
