import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getToolListItems } from "~/models/tool.server";
import { useUser } from "~/utils";

export async function loader() {
  const toolListItems = await getToolListItems();
  return json({ toolListItems });
}

export default function ToolPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Tools</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-96">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Tool
          </Link>

          <hr />

          {data.toolListItems.length === 0 ? (
            <p className="p-4">No tools yet</p>
          ) : (
            <ol>
              {data.toolListItems.map((tool) => (
                <li key={tool.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block px-4 py-2  ${
                        isActive ? "text-blue-500" : "text-gray-700"
                      }`
                    }
                    to={tool.slug}
                  >
                    {tool.name}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
