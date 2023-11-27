import mongoose, { Document, Schema } from 'mongoose';

export interface ISet {
    setNumber: number;
    repetitions: number;
    weightInGrams: number;
    heartRate: number;
    durationTimeInMillis: number;
    restTimeInMillis: number;
    createdAt: Date;
}

export interface ISetModel extends ISet, Document {}

const SetSchema: Schema = new Schema(
    {
        setNumber: { type: Number, required: true },
        repetitions: { type: Number, required: true },
        weightInGrams: { type: Number, required: true },
        heartRate: { type: Number, required: true },
        durationTimeInMillis: { type: Number, required: true },
        restTimeInMillis: { type: Number, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<ISetModel>('Set', SetSchema);
