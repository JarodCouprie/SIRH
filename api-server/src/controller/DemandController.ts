import { Request, Response, Router } from "express";
import { verifyToken } from "../middleware/AuthMiddleware";
import { DemandService } from "../service/DemandService";
import { z, ZodError } from "zod";

const router = Router();

const demandSchema = z.object({
  type: z.string(),
  motivation: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});
const validate = (schema: z.ZodSchema) => (req: Request, res: Response) => {
  try {
    console.log(schema.parse(req.body));
    schema.parse(req.body);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        errors: err.errors.map((e) => ({ path: e.path, message: e.message })),
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DemandService.getDemand(req);
  res.status(code).json({ message, data });
});

router.get("/:id_demand", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DemandService.getDemandById(
    req.params.id_demand,
  );
  res.status(code).json({ message, data });
});

router.put("/:id_demand", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DemandService.editDemand(
    req.params.id_demand,
    req.body,
  );
  res.status(code).json({ message, data });
});

router.delete(
  "/:id_demand",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await DemandService.deleteDemand(
      req.params.id_demand,
    );
    res.status(code).json({ message, data });
  },
);

router.post("/", verifyToken, async (req: Request, res: Response) => {
  let userId = req.token.userId;
  const { code, message, data } = await DemandService.createDemand(
    req.body,
    userId,
  );
  res.status(code).json({
    message,
    data,
  });
  //const { type, description, startDate, endDate } = req.body;
  // console.log(req.body);
  // res.status(200).json("gg");
});
export default router;
