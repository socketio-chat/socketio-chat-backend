import {
  JoinRoomDataCS,
  JoinRoomDataSC,
  MessageDataCS,
  MessageDataSC,
} from '../../listeners';
import {
  LeaveRoomDataCS,
  LeaveRoomDataSC,
} from '../../listeners/leave-room.listener';
import { NewConnectionDataCS } from '../../listeners/new-connection.listener';

export enum ServerToClientEventsEnum {
  JoinRoom = 'joinRoom',
  LeaveRoom = 'leaveRoom',
  Message = 'message',
}

export enum ClientToServerEventsEnum {
  NewConnection = 'newConnection',
  JoinRoom = 'joinRoom',
  LeaveRoom = 'leaveRoom',
  Message = 'message',
}

export interface ServerToClientEvents {
  [ServerToClientEventsEnum.JoinRoom](data: JoinRoomDataSC): void;

  [ServerToClientEventsEnum.LeaveRoom](data: LeaveRoomDataSC): void;

  [ServerToClientEventsEnum.Message](data: MessageDataSC): void;
}

export interface ClientToServerEvents {
  [ClientToServerEventsEnum.NewConnection](data: NewConnectionDataCS): void;

  [ClientToServerEventsEnum.JoinRoom](data: JoinRoomDataCS): void;

  [ClientToServerEventsEnum.LeaveRoom](data: LeaveRoomDataCS): void;

  [ClientToServerEventsEnum.Message](data: MessageDataCS): void;
}

export interface InterServerEvents {}

export interface SocketData {}
