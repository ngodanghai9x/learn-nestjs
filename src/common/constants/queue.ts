export enum EQueue {
  User = 'user-queue',
  Auth = 'auth-queue',
}

export type UserMessage = {
  name: string;
  age: number;
};
