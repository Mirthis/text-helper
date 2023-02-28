import { z } from "zod";

export const generateReqSchema = z.object({
  action: z.enum(["rewrite", "summarize", "correct"]),
  language: z.string(),
  text: z.string().min(10),
});

export type FormInputs = z.infer<typeof generateReqSchema>;
