import mongoose, { Document, Schema } from 'mongoose';

export interface IRoutineDetails {
    name: string;
    isFavourite: boolean;
    dayList: Array<string>;
}

export interface IRoutineDetailsModel extends IRoutineDetails, Document {}

const RoutineDetailsSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        isFavourite: { type: Boolean, default: false },
        dayList: { type: Array<Schema.Types.ObjectId>, required: true, ref: 'Day' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IRoutineDetailsModel>('RoutineDetails', RoutineDetailsSchema);
