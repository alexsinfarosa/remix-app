import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getToolListItems } from "~/models/tool.server";
import { groupBy, useUser } from "~/utils";

export async function loader() {
  const toolListItems = await getToolListItems();
  return json({ toolListItems });
}

export default function ToolPage() {
  const data = useLoaderData<typeof loader>();

  let tools = [];
  for (const [key, val] of groupBy(data.toolListItems, (t) => t.tool)) {
    tools.push(
      <div key={key} className="p-4">
        <h3 className="py-2 px-4 font-extrabold text-gray-600">{key}</h3>
        <ul>
          {val.map((tool) => (
            <li key={tool.slug}>
              <NavLink
                className={({ isActive }) =>
                  `block px-5 py-2  ${
                    isActive ? "text-blue-500" : "text-gray-700"
                  }`
                }
                to={tool.slug}
              >
                {tool.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }

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
        <aside className="h-full w-96">
          <>{tools}</>
        </aside>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
