import { Document } from 'mongoose';

export interface User extends Document {
  readonly loginname: string;
  readonly dispname: string;
  readonly pw: string;
}