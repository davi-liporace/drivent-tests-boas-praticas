import { forbiddenError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getBookingService(userId: number) {
  const bookingfromId = await bookingRepository.findBooking(userId);
  if(!bookingfromId) throw notFoundError();
  return { id: bookingfromId.id, Room: bookingfromId.Room  };
}

async function createBookingService(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }
  const getRoom = await bookingRepository.getOneRoom(roomId);
  if(!getRoom) {
    throw notFoundError();
  }
  const capacity = getRoom.capacity === getRoom.Booking.length;
  if (capacity) {
    throw forbiddenError();
  }

  const createBooking = await bookingRepository.postRoomId(userId, roomId);
  if(!createBooking) {
    throw notFoundError();
  }
   
  return createBooking;
}

async function updateRoomService(roomId: number, bookingId: number, userId: number) {
  const bookingfromId = await bookingRepository.findBooking(userId);
  if(!bookingfromId) throw forbiddenError();
  const getRoom = await bookingRepository.getOneRoom(roomId);
  if(!getRoom) {
    throw notFoundError();
  }
  const capacity = getRoom.capacity === getRoom.Booking.length;
  if (capacity) {
    throw forbiddenError();
  }
  const updateRoom = bookingRepository.changeRoom(roomId, bookingId);
  if (!updateRoom) {
    throw notFoundError();
  }
  return updateRoom;
}

const bookingService ={
  getBookingService, createBookingService, updateRoomService,
};

export default bookingService;
