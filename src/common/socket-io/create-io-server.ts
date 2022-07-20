import * as http from 'http';
import { Server } from 'socket.io';
import {
  joinRoomListenerFactory,
  ListenerManager,
  messageListenerFactory,
} from '../../listeners';
import { disconnectListenerFactory } from '../../listeners/disconnect.listener';
import { leaveRoomListenerFactory } from '../../listeners/leave-room.listener';
import { newConnectionListenerFactory } from '../../listeners/new-connection.listener';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './types';

export function createIoServer(server: http.Server): void {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', socket => {
    const listenerManager = new ListenerManager(io, socket);

    listenerManager
      .addListener(newConnectionListenerFactory)
      .addListener(joinRoomListenerFactory)
      .addListener(leaveRoomListenerFactory)
      .addListener(messageListenerFactory)
      .addListener(disconnectListenerFactory);
  });
}
