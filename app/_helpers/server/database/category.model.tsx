
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;


function categoryModel() {
    const schema = new Schema({
        name: { type: String, unique: true, required: true },
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.password;
        }
    });

    return mongoose.models.Category || mongoose.model('Category', schema);
}

export default categoryModel;