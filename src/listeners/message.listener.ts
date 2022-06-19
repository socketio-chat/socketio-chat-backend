import {
  ClientToServerEventsEnum,
  ServerToClientEventsEnum,
} from '../common/socket-io';
import { storage } from '../storage';
import { AbstractListener, ListenerFactory } from './listener';

export interface MessageData {
  message: string;
}

export const messageListenerFactory: ListenerFactory = (io, socket) =>
  new MessageListener(io, socket);

export class MessageListener extends AbstractListener<MessageData> {
  public eventName = ClientToServerEventsEnum.Message;

  public async handleEvent(data: MessageData): Promise<void> {
    this.socket.broadcast.emit(ServerToClientEventsEnum.Message, {
      message: data.message,
      nickname: storage.users[this.socket.id],
    });
  }
}
