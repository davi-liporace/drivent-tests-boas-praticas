import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBookingController(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try{
    const getBookingWithId = await bookingService.getBookingService(userId);
    return res.status(httpStatus.OK).send(getBookingWithId);
  }
  catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function updateRoomController(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;

  if(!roomId) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
  try{
    const updateRoom = await bookingService.updateRoomService(roomId, Number(bookingId), userId);
    return res.status(httpStatus.OK).send({ bookingId: updateRoom.id });
  }
  catch (error) {
    if(error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createBookingController(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  
  try{
    if(!roomId) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    const bookingCreate = await bookingService.createBookingService(userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: bookingCreate.id });
  }
  catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }if (error.name ==="UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if(error.name==="ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

