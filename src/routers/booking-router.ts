import { createBookingController, getBookingController } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBookingController)
  .post("/", createBookingController)
  .put("/:bookingId");

export { bookingRouter };

