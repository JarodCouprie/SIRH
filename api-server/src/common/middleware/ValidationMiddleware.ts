import { NextFunction, Request, Response } from "express";
import {
  baseObjectInputType,
  baseObjectOutputType,
  objectUtil,
  ZodDate,
  ZodEffects,
  ZodError,
  ZodNumber,
  ZodObject,
  ZodString,
  ZodTypeAny,
} from "zod";

export function validateData(
  schema: ZodEffects<
    ZodObject<
      {
        endDate: ZodString;
        type: ZodString;
        startDate: ZodString;
      },
      "strip",
      ZodTypeAny,
      {
        [k in keyof objectUtil.addQuestionMarks<
          baseObjectOutputType<{
            endDate: ZodString;
            type: ZodString;
            startDate: ZodString;
          }>,
          any
        >]: objectUtil.addQuestionMarks<
          baseObjectOutputType<{
            endDate: ZodString;
            type: ZodString;
            startDate: ZodString;
          }>,
          any
        >[k];
      },
      {
        [k_1 in keyof baseObjectInputType<{
          endDate: ZodString;
          type: ZodString;
          startDate: ZodString;
        }>]: baseObjectInputType<{
          endDate: ZodString;
          type: ZodString;
          startDate: ZodString;
        }>[k_1];
      }
    >,
    {
      [k in keyof objectUtil.addQuestionMarks<
        baseObjectOutputType<{
          endDate: ZodString;
          type: ZodString;
          startDate: ZodString;
        }>,
        any
      >]: objectUtil.addQuestionMarks<
        baseObjectOutputType<{
          endDate: ZodString;
          type: ZodString;
          startDate: ZodString;
        }>,
        any
      >[k];
    },
    {
      [k_1 in keyof baseObjectInputType<{
        endDate: ZodString;
        type: ZodString;
        startDate: ZodString;
      }>]: baseObjectInputType<{
        endDate: ZodString;
        type: ZodString;
        startDate: ZodString;
      }>[k_1];
    }
  >,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} ${issue.message}`,
        }));
        res.status(400).json({ error: "Invalid data", details: errorMessages });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}

export function validateExpenseData(
  schema: ZodEffects<
    ZodObject<
      {
        facturation_date: ZodDate;
        amount: ZodNumber;
        motivation: ZodString;
        type: ZodString;
      },
      "strip",
      ZodTypeAny,
      {
        [k in keyof objectUtil.addQuestionMarks<
          baseObjectOutputType<{
            facturation_date: ZodDate;
            amount: ZodNumber;
            motivation: ZodString;
            type: ZodString;
          }>,
          any
        >]: objectUtil.addQuestionMarks<
          baseObjectOutputType<{
            facturation_date: ZodDate;
            amount: ZodNumber;
            motivation: ZodString;
            type: ZodString;
          }>,
          any
        >[k];
      },
      {
        [k_1 in keyof baseObjectInputType<{
          facturation_date: ZodDate;
          amount: ZodNumber;
          motivation: ZodString;
          type: ZodString;
        }>]: baseObjectInputType<{
          facturation_date: ZodDate;
          amount: ZodNumber;
          motivation: ZodString;
          type: ZodString;
        }>[k_1];
      }
    >,
    {
      [k in keyof objectUtil.addQuestionMarks<
        baseObjectOutputType<{
          facturation_date: ZodDate;
          amount: ZodNumber;
          motivation: ZodString;
          type: ZodString;
        }>,
        any
      >]: objectUtil.addQuestionMarks<
        baseObjectOutputType<{
          facturation_date: ZodDate;
          amount: ZodNumber;
          motivation: ZodString;
          type: ZodString;
        }>,
        any
      >[k];
    },
    {
      [k_1 in keyof baseObjectInputType<{
        facturation_date: ZodDate;
        amount: ZodNumber;
        motivation: ZodString;
        type: ZodString;
      }>]: baseObjectInputType<{
        facturation_date: ZodDate;
        amount: ZodNumber;
        motivation: ZodString;
        type: ZodString;
      }>[k_1];
    }
  >,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} ${issue.message}`,
        }));
        res.status(400).json({ error: "Invalid data", details: errorMessages });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
