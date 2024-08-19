import { Request, Response, Router } from "express";
import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { AgencyService } from "../agency/AgencyService.js";
import { DepartmentService } from "./DepartmentService.js";

const router = Router();

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DepartmentService.getDepartmentByAgency(
    +req.params.id,
  );
  res.status(code).json({
    message,
    data,
  });
});

router.get(
  "/department/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await DepartmentService.getDepartmentById(
      +req.params.id,
    );
    res.status(code).json({
      message,
      data,
    });
  },
);

router.get("list/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } =
    await DepartmentService.getDepartmentByAgencyWithoutPagination(
      +req.params.id,
    );
  res.status(code).json({
    message,
    data,
  });
});

router.post("/create/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DepartmentService.createDepartment(
    +req.params.id,
    req,
  );
  res.status(code).json({
    message,
    data,
  });
});

router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DepartmentService.deleteDepartment(
    +req.params.id,
  );
  res.status(code).json({
    message,
    data,
  });
});

export default router;
