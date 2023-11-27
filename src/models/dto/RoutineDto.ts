import mongoose, { Document, Schema } from 'mongoose';

export interface IRoutineDto {
    name: string;
    isFavourite: boolean;
}

export interface IRoutineDtoModel extends IRoutineDto, Document {}

const RoutineDtoSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        isFavourite: { type: Boolean, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IRoutineDtoModel>('RoutineDto', RoutineDtoSchema);
