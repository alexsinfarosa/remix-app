import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

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

  if (!res.ok) {
    return json({ error: true }, { status: 500 });
  }

  return res.json();
}

export default function Subscribe() {
  return (
    <main className="flex h-full items-center justify-center text-blue-900">
      <section className="rounded-lg bg-blue-100 p-8">
        <h1 className="mb-1 text-3xl font-bold">Subscribe</h1>
        <p className="mb-4 font-semibold text-blue-500">
          Don't miss any action!
        </p>
        <Form method="post">
          <fieldset className="space-x-2">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="alex@gmail.com"
              className="form-input rounded-md border-blue-600 text-blue-900 placeholder:text-blue-600"
            />
            <button
              type="submit"
              className="rounded-md border border-blue-600 px-3 py-2 hover:bg-blue-600 hover:text-white"
            >
              Subscribe
            </button>
          </fieldset>
        </Form>
      </section>
    </main>
  );
}
