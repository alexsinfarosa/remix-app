import { useCatch, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";

import { getTool } from "~/models/tool.server";

export async function loader({ params }: LoaderArgs) {
  invariant(params.toolSlug, "toolSlug not found");

  const tool = await getTool({ slug: params.toolSlug });
  if (!tool) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ tool });
}

export default function ToolDetailPage() {
  const data = useLoaderData<typeof loader>();
  return <pre>{JSON.stringify(data.tool, null, 4)}</pre>;
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div className="text-xl">Tool not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
