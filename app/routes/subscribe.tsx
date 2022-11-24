import type { ActionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");

  const API_KEY = process.env.CONVERTKIT_KEY;
  const FORM_ID = "3808853";
  const api = "https://api.convertkit.com/v3/forms";

  const res = await fetch(`${api}/${FORM_ID}/subscribe`, {
    method: "POST",
    body: JSON.stringify({ email, api_key: API_KEY }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  return res.json();
}

export default function Subscribe() {
  const actionData = useActionData();
  const transition = useTransition();

  const state: "idle" | "success" | "error" | "submitting" =
    transition.submission
      ? "submitting"
      : actionData?.subscription
      ? "success"
      : actionData?.error
      ? "error"
      : "idle";

  let inputRef = useRef<HTMLInputElement | null>(null);
  let successRef = useRef<HTMLHeadingElement | null>(null);
  let mounted = useRef<boolean>(false);

  useEffect(() => {
    if (state === "error") {
      inputRef.current?.focus();
    }

    if (state === "idle" && mounted.current) {
      inputRef.current?.select();
    }

    if (state === "success") {
      successRef.current?.focus();
    }

    mounted.current = true;
  }, [state]);

  return (
    <main className="flex h-full items-center justify-center  text-blue-900">
      <section className="rounded-lg bg-blue-100 p-8">
        <h1
          className="mb-1 text-3xl font-bold aria-hidden:hidden"
          aria-hidden={state === "success"}
        >
          Subscribe
        </h1>
        <p
          className="mb-6 font-semibold text-blue-500 aria-hidden:hidden"
          aria-hidden={state === "success"}
        >
          Don't miss any action!
        </p>
        <Form
          replace
          method="post"
          aria-hidden={state === "success"}
          className="aria-hidden:hidden"
        >
          <fieldset className="space-x-2" disabled={state === "submitting"}>
            <input
              aria-label="Email address"
              aria-describedby="email-helper-text"
              ref={inputRef}
              type="email"
              name="email"
              id="email"
              placeholder="hello@example.com"
              className="form-input rounded-md border-blue-600 text-blue-900 placeholder:text-blue-300"
            />
            <button
              type="submit"
              className="w-32 rounded-md border border-blue-600 px-3 py-2 hover:bg-blue-600 hover:text-white"
            >
              {state === "submitting" ? "Submitting..." : "Subscribe"}
            </button>
          </fieldset>

          <p className="mt-4 text-center" id="email-helper-text">
            {state === "error" ? actionData.message : <>&nbsp;</>}
          </p>
        </Form>

        <div
          className="text-center aria-hidden:hidden"
          aria-hidden={state !== "success"}
        >
          <h2
            className="mb-1 text-3xl font-bold"
            ref={successRef}
            tabIndex={-1}
          >
            You are subscribed!
          </h2>
          <p>Please check your email to confirm subscription.</p>
          <Link to="." className="mt-1 underline">
            ← Go Back
          </Link>
        </div>
      </section>
    </main>
  );
}
