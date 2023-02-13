import { prisma } from "@/config";

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: {
      Room: true,
    }
  });
}

async function postRoomId(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId: userId, roomId: roomId
    }
  });
}
async function getbookingByRoom(roomId: number) {
  return prisma.booking.findMany({
    where: { roomId }
  });
}

async function getOneRoom(roomId: number) {
  return prisma.room.findFirst({
    where: { id: roomId }, include: { Booking: true }
  });
}

async function changeRoom(roomId: number, bookingId: number) {
  return prisma.booking.update({
    where: { id: bookingId }, data: {
      roomId
    }
  });
}

const bookingRepository = {
  findBooking, postRoomId, getbookingByRoom, getOneRoom, changeRoom,
};

export default bookingRepository;
