import {
  ClientToServerEventsEnum,
  ServerToClientEventsEnum,
} from '../common/socket-io';
import { storage } from '../storage';
import { AbstractListener, ListenerFactory } from './listener';

export interface NewConnectionData {
  nickname: string;
}

export const newConnectionListenerFactory: ListenerFactory = (io, socket) =>
  new NewConnectionListener(io, socket);

export class NewConnectionListener extends AbstractListener<NewConnectionData> {
  public eventName = ClientToServerEventsEnum.NewConnection;

  public async handleEvent(data: NewConnectionData): Promise<void> {
    storage.users[this.socket.id] = data.nickname;
  }
}
