import { ClientToServerEventsEnum } from '../common/socket-io';
import { storage } from '../storage';
import { AbstractListener, ListenerFactory } from './listener';

export interface NewConnectionDataCS {
  username: string;
}

export const newConnectionListenerFactory: ListenerFactory = (io, socket) =>
  new NewConnectionListener(io, socket);

export class NewConnectionListener extends AbstractListener<NewConnectionDataCS> {
  public eventName = ClientToServerEventsEnum.NewConnection;

  public async handleEvent(data: NewConnectionDataCS): Promise<void> {
    storage.users[this.socket.id] = {
      name: data.username,
    };
  }
}
