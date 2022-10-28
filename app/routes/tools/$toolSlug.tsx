import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useOutletContext } from "@remix-run/react";
import invariant from "tiny-invariant";
import DateOfInterest from "~/components/dateOfInterest";
import StationListCombobox from "~/components/stationListCombobox";
import type { Station } from "~/models/station.server";
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
  const stationlist = useOutletContext<Station[]>();
  const { tool, name } = data.tool;

  return (
    <div>
      <p className="font-display text-sm font-medium text-sky-500">{tool}</p>
      <div className="mt-2 flex items-center">
        <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
          {name}
        </h1>
      </div>

      <div className="flex py-4">
        <div className="flex-1">
          <StationListCombobox options={stationlist}></StationListCombobox>
        </div>
        <div className="flex-1">
          <DateOfInterest></DateOfInterest>
        </div>
      </div>
    </div>
  );
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
