import { z } from "zod";
import { compare } from "bcrypt";

export const demandCreateSchema = z.object({
  type: z.string(),
  startDate: z.string().date(),
  endDate: z.string().date(),
});
