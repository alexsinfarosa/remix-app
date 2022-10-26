import { Outlet } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";
import styles from "highlight.js/styles/github-dark-dimmed.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Posts() {
  return (
    <div className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article className="prose dark:prose-invert">
            <Outlet></Outlet>
          </article>
        </div>
      </div>
    </div>
  );
}
