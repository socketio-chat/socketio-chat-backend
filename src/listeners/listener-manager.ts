import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '../common/socket-io';
import { ListenerFactory } from './listener';

export class ListenerManager {
  private readonly io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;
  private readonly socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;

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
  }

  public addListener(listenerFactory: ListenerFactory): ListenerManager {
    const listener = listenerFactory(this.io, this.socket);

    listener.bindListener();

    return this;
  }
}
