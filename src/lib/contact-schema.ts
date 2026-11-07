import { z } from "zod";

export const contactSubmissionSchema = z.object({
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(4000),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;