import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { contactSubmissionSchema } from "@/lib/contact-schema";

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSubmissionSchema.parse(input))
  .handler(async ({ data }) => {
    const origin = getRequestHeader("origin");
    if (origin) {
      try {
        const parsedOrigin = new URL(origin);
        const host = getRequestHeader("host");
        if (host && parsedOrigin.host !== host) throw new Error("Invalid request origin");
      } catch {
        throw new Error("Invalid request origin");
      }
    }

    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("Contact form storage is not configured");

    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { error } = await client.from("contact_submissions").insert(data);
    if (error) throw new Error("Unable to save contact message");

    return { success: true };
  });