import mongoose from 'mongoose';
import { number } from 'prop-types';

const Schema = mongoose.Schema();

const NotificationSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'items'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    previousPrice: {
        type: Number
    },
    newPrice: {
        type: Number
    }
})