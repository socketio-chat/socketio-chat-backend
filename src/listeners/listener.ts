import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ClientToServerEventsEnum,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '../common/socket-io';

export interface ListenerFactory {
  (
    io: Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >,
    socket: Socket<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >
  ): AbstractListener;
}

export abstract class AbstractListener<T = any> {
  protected readonly io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;
  protected readonly socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;
  protected readonly socketId: string;
  public abstract eventName: ClientToServerEventsEnum;

  constructor(
    io: Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >,
    socket: Socket<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >
  ) {
    this.io = io;
    this.socket = socket;
    this.socketId = `${this.socket.id}`;

    this.handleEvent = this.handleEvent.bind(this);
  }

  public bindListener(): void {
    this.socket.on(this.eventName, async (data: T) => {
      console.log(
        `Got event "${this.eventName}" from socket "${this.socketId}", data: `,
        data
      );

      try {
        await this.handleEvent(data);
      } catch (error) {
        console.error(error.message);
      }
    });
  }

  public abstract handleEvent(data: T): Promise<void>;
}
