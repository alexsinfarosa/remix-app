import { LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  useCatch,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import DateOfInterest from "~/components/dateOfInterest";
import StationListCombobox from "~/components/stationListCombobox";
import type { Station } from "~/models/station.server";
import { getTool } from "~/models/tool.server";
import type { ActionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderArgs) {
  invariant(params.toolSlug, "toolSlug not found");

  const tool = await getTool({ slug: params.toolSlug });
  if (!tool) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ tool });
}

export async function action({ request }: ActionArgs) {
  console.log(request);
  const formData = await request.formData();
  const { doi, station } = Object.fromEntries(formData);
  console.log({ doi, station });

  const url = new URL(request.url).pathname;
  const ciccio = new URLSearchParams(url);
  console.log(ciccio);
  return redirect(url);
}

export default function ToolDetailPage() {
  const data = useLoaderData<typeof loader>();
  const stationlist = useOutletContext<Station[]>();
  const { tool, name } = data.tool;

  return (
    <div>
      <p className="text-sm font-medium text-sky-500">{tool}</p>
      <div className="mt-2 flex items-center">
        <h1 className="text-3xl tracking-tight text-slate-900">{name}</h1>
      </div>

      <Form method="get" className="mt-8 flex items-end space-x-4">
        <div className="flex-1">
          <DateOfInterest></DateOfInterest>
        </div>
        <div className="flex-2">
          <StationListCombobox options={stationlist}></StationListCombobox>
        </div>

        <div className="flex-1">
          <button
            type="submit"
            className="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            run
          </button>
        </div>
      </Form>
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
