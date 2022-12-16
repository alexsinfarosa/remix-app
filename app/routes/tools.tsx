import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getToolListItems } from "~/models/tool.server";
import { groupBy, useUser } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Tools Page",
    description: "Tools Page",
  };
};

export async function loader() {
  const toolListItems = await getToolListItems();
  return json({ toolListItems });
}

export default function ToolPage() {
  const data = useLoaderData<typeof loader>();
  const { toolListItems } = data;
  const ipmToolsList = groupBy(toolListItems, ["tool"]);
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
        <nav className="p-4w-96 relative h-full lg:text-sm lg:leading-6">
          {Object.entries(ipmToolsList).map(([toolType, tool]) => {
            return (
              <div key={toolType} className="mt-12 lg:mt-8">
                <h5 className="mb-8 font-semibold text-slate-900 lg:mb-3">
                  {toolType}
                </h5>
                <ul className="space-y-4 border-l border-slate-100 dark:border-slate-800 lg:space-y-2">
                  {tool.map((t) => (
                    <li key={t.slug}>
                      <NavLink
                        className={({ isActive }) =>
                          `-ml-px block border-l border-transparent pl-4  ${
                            isActive
                              ? "-ml-px block border-l border-current pl-4 font-semibold text-blue-500"
                              : "text-slate-700 hover:border-slate-400 hover:text-slate-900"
                          }`
                        }
                        to={t.slug}
                      >
                        {t.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
