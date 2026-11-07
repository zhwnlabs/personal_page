import { describe, expect, it } from "vitest";
import { contactSubmissionSchema } from "@/lib/contact-schema";

describe("contact submission validation", () => {
  it("accepts a valid email and non-empty message", () => {
    expect(contactSubmissionSchema.safeParse({ email: "visitor@example.com", message: "Hello" }).success).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    expect(contactSubmissionSchema.safeParse({ email: "not-an-email", message: "Hello" }).success).toBe(false);
  });

  it("rejects messages longer than 4000 characters", () => {
    expect(contactSubmissionSchema.safeParse({ email: "visitor@example.com", message: "x".repeat(4001) }).success).toBe(false);
  });
});