import { Context } from 'aws-lambda';

export type Handler<TEvent = any, TResult = any> = (
  event: TEvent,
  context: Context,
  callback: any
) => Promise<TResult>;
