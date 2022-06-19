import {
  ClientToServerEventsEnum,
  ServerToClientEventsEnum,
} from '../common/socket-io';
import { storage } from '../storage';
import { AbstractListener, ListenerFactory } from './listener';

export interface JoinRoomData {}

export const joinRoomListenerFactory: ListenerFactory = (io, socket) =>
  new JoinRoomListener(io, socket);

export class JoinRoomListener extends AbstractListener<JoinRoomData> {
  public eventName = ClientToServerEventsEnum.JoinRoom;

  public async handleEvent(data: JoinRoomData): Promise<void> {
    const nickname = storage.users[this.socket.id];

    this.socket.broadcast.emit(ServerToClientEventsEnum.JoinRoom, {
      nickname: nickname,
      usersConnected: this.io.engine.clientsCount,
    });
  }
}
