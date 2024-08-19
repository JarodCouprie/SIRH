import { Router, Response, Request } from "express";
import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { NotificationService } from "./NotificationService.js";
import { CustomRequest } from "../../common/helper/CustomRequest.js";

const router = Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const userId = (req as CustomRequest).token.userId;
  const { code, message, data } =
    await NotificationService.getNotificationsByUserId(userId);
  res.status(code).json({ message, data });
});

export default router;
