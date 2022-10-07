import type { LoaderArgs } from "@remix-run/node";

export async function loader(request: LoaderArgs) {
  return {};
}

export default function AdminRoute() {
  return <div>This is the admin route</div>;
}
