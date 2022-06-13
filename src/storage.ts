import { ListenerManager } from './listeners';

interface Storage {
  users: Record<string, string>;
  rooms: Record<string, string>;
}

export const storage: Storage = {
  users: {},
  rooms: {},
};
