import {
  ClientToServerEventsEnum,
  ServerToClientEventsEnum,
} from '../common/socket-io';
import { storage } from '../storage';
import { AbstractListener, ListenerFactory } from './listener';

export interface JoinRoomDataCS {
  name: string;
}

export interface JoinRoomDataSC {
  username: string;
  roomUsers: string[];
}

export const joinRoomListenerFactory: ListenerFactory = (io, socket) =>
  new JoinRoomListener(io, socket);

export class JoinRoomListener extends AbstractListener<JoinRoomDataCS> {
  public eventName = ClientToServerEventsEnum.JoinRoom;

  public async handleEvent(data: JoinRoomDataCS): Promise<void> {
    this.socket.join(data.name);

    const user = storage.users[this.socketId];
    user.room = data.name;

    const room = [...this.io.of('/').adapter.rooms.get(data.name)];

    this.io.to(data.name).emit(ServerToClientEventsEnum.JoinRoom, {
      username: user.name,
      roomUsers: room.map(socketId => storage.users[socketId].name),
    });
  }
}
