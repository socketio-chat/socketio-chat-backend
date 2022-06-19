import * as http from 'http';
import { Server } from 'socket.io';
import {
  JoinRoomData,
  joinRoomListenerFactory,
  ListenerManager,
  MessageData,
  messageListenerFactory,
} from '../../listeners';
import { disconnectListenerFactory } from '../../listeners/disconnect.listener';
import {
  NewConnectionData,
  newConnectionListenerFactory,
} from '../../listeners/new-connection.listener';

export enum ServerToClientEventsEnum {
  JoinRoom = 'joinRoom',
  Message = 'message',
}

export enum ClientToServerEventsEnum {
  NewConnection = 'newConnection',
  JoinRoom = 'joinRoom',
  Message = 'message',
}

export interface ServerToClientEvents {
  [ServerToClientEventsEnum.JoinRoom](data: any): void;

  [ServerToClientEventsEnum.Message](data: any): void;
}

export interface ClientToServerEvents {
  [ClientToServerEventsEnum.NewConnection](data: NewConnectionData): void;

  [ClientToServerEventsEnum.JoinRoom](data: JoinRoomData): void;

  [ClientToServerEventsEnum.Message](data: MessageData): void;
}

export interface InterServerEvents {}

export interface SocketData {}

export function createIoServer(server: http.Server): void {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', socket => {
    const listenerManager = new ListenerManager(io, socket);

    listenerManager
      .addListener(newConnectionListenerFactory)
      .addListener(joinRoomListenerFactory)
      .addListener(messageListenerFactory)
      .addListener(disconnectListenerFactory);
  });
}
