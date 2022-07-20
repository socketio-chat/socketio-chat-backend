import {
  ClientToServerEventsEnum,
  ServerToClientEventsEnum,
} from '../common/socket-io';
import { storage } from '../storage';
import { AbstractListener, ListenerFactory } from './listener';

export interface MessageDataCS {
  message: string;
}

export interface MessageDataSC {
  username: string;
  message: string;
}

export const messageListenerFactory: ListenerFactory = (io, socket) =>
  new MessageListener(io, socket);

export class MessageListener extends AbstractListener<MessageDataCS> {
  public eventName = ClientToServerEventsEnum.Message;

  public async handleEvent(data: MessageDataCS): Promise<void> {
    if (!data.message) {
      return;
    }

    const user = storage.users[this.socketId];

    this.socket.to(user.room).emit(ServerToClientEventsEnum.Message, {
      username: user.name,
      message: data.message,
    });
  }
}
