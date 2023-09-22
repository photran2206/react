// import mongoose from 'mongoose';

// const Schema = mongoose.Schema;

// mongoose.connect(process.env.MONGODB_URI!);
// mongoose.Promise = global.Promise;

import productuserModel from './database/product.model';
import userModel from './database/user.model'

export const db = {
    User: userModel(),
    Product: productuserModel()
};

// mongoose models with schema definitions
// function userModel() {
//     const schema = new Schema({
//         username: { type: String, unique: true, required: true },
//         password: { type: String, required: true },
//         firstName: { type: String, required: true },
//         lastName: { type: String, required: true }
//     }, {
//         // add createdAt and updatedAt timestamps
//         timestamps: true
//     });
//     schema.set('toJSON', {
//         virtuals: true,
//         versionKey: false,
//         transform: function (doc, ret) {
//             delete ret._id;
//             delete ret.password;
//         }
//     });
//     return mongoose.models.User || mongoose.model('User', schema);
// }