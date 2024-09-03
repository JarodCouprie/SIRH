import { Request, Response, Router } from "express";
import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { NotificationService } from "./NotificationService.js";
import { initSocket } from "../../common/helper/Socket";
import { NotificationSender } from "../../common/helper/NotificationSender";
import { CustomRequest } from "../../common/helper/CustomRequest";

const router = Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } =
    await NotificationService.getNotificationsByUserId(req);
  res.status(code).json({ message, data });
});

router.get("/touch/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message } = await NotificationService.markNotificationAsTouched(
    +req.params.id,
  );
  res.status(code).json({ message });
});

export default router;
