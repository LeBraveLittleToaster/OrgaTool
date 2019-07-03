import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    loginname: String,
    dispname: String,
    pw: String
})