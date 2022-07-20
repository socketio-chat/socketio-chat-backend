import { ServerToClientEventsEnum } from '../common/socket-io';
import { storage } from '../storage';
import { AbstractListener, ListenerFactory } from './listener';

export const disconnectListenerFactory: ListenerFactory = (io, socket) =>
  new DisconnectListener(io, socket);

export class DisconnectListener extends AbstractListener {
  public eventName = null;

  public bindListener(): void {
    this.socket.on('disconnect', async () => {
      console.log(
        `Got event "disconnect" from socket "${this.socketId}"`,
        'Storage: ',
        storage
      );

      try {
        await this.handleEvent();
      } catch (error) {
        console.error(error.message);
      }
    });
  }

  public async handleEvent(): Promise<void> {
    console.log(
      'Socket disconnected',
      this.socketId,
      storage,
      storage.users[this.socketId]
    );

    const user = storage.users[this.socketId];
    const room = [...this.io.of('/').adapter.rooms.get(user.room)];

    this.io.to(user.room).emit(ServerToClientEventsEnum.LeaveRoom, {
      username: user.name,
      roomUsers: room.map(socketId => storage.users[socketId].name),
    });

    delete storage.users[this.socketId];

    // console.log(storage);
  }
}
