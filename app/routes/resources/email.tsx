import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export async function action({ request }: ActionArgs) {
  return json({ ciccio: "ciccio" });
}
