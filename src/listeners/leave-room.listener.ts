import {
  ClientToServerEventsEnum,
  ServerToClientEventsEnum,
} from '../common/socket-io';
import { storage } from '../storage';
import { AbstractListener, ListenerFactory } from './listener';

export type LeaveRoomDataCS = never;

export interface LeaveRoomDataSC {
  username: string;
  roomUsers: string[];
}

export const leaveRoomListenerFactory: ListenerFactory = (io, socket) =>
  new LeaveRoomListener(io, socket);

export class LeaveRoomListener extends AbstractListener<LeaveRoomDataCS> {
  public eventName = ClientToServerEventsEnum.LeaveRoom;

  public async handleEvent(): Promise<void> {
    const user = storage.users[this.socketId];
    const room = [...this.io.of('/').adapter.rooms.get(user.room)];

    this.io.to(user.room).emit(ServerToClientEventsEnum.LeaveRoom, {
      username: user.name,
      roomUsers: room.map(socketId => storage.users[socketId].name),
    });

    user.room = undefined;
  }
}
