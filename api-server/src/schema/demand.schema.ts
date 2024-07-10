import { z } from "zod";
import { ControllerResponse } from "../helper/ControllerResponse";

export const demandCreateSchema = z
  .object({
    type: z.string(),
    startDate: z.string().date(),
    endDate: z.string().date(),
  })
  .refine(
    (date) => {
      return date.endDate >= date.startDate;
    },
    { message: "La date de fin doit se situer après la date de début" },
  );
