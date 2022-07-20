export interface User {
  name: string;
  room?: string;
}

export interface Storage {
  users: Record<string, User>;
}

export const storage: Storage = {
  users: {},
};
