import { z } from "zod";

export const demandCreateSchema = z
  .object({
    type: z.string(),
    startDate: z.string().date(),
    endDate: z.string().date(),
  })
  .refine((date) => {
    return date.endDate >= date.startDate;
  }, "La date de fin doit se situer après la date de début");
