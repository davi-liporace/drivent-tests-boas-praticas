import { createBookingController, getBookingController, updateRoomController } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBookingController)
  .post("/", createBookingController)
  .put("/:bookingId", updateRoomController);

export { bookingRouter };

