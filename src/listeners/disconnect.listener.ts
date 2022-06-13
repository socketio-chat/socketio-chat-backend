import { storage } from '../storage';
import { AbstractListener, ListenerFactory } from './listener';

export const disconnectListenerFactory: ListenerFactory = (io, socket) =>
  new DisconnectListener(io, socket);

export class DisconnectListener extends AbstractListener {
  public eventName = null;

  public bindListener(): void {
    this.socket.on('disconnect', this.handleEvent);
  }

  public async handleEvent(): Promise<void> {
    console.log(
      'Socket disconnected',
      this.socketId,
      storage.users[this.socketId],
    );

    delete storage.users[this.socketId];

    // console.log(storage);
  }
}
