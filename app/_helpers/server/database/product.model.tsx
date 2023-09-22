
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;


function productuserModel() {
    const schema = new Schema({
        name: { type: String, required: true },
        price: { type: Number, required: true },
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        // transform: function (doc, ret) {
        //     delete ret._id;
        //     delete ret.password;
        // }
    });

    return mongoose.models.Product || mongoose.model('Product', schema);
}

export default productuserModel;