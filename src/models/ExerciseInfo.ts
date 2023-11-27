import mongoose, { Document, Schema } from 'mongoose';

export interface IExerciseInfo {
    name: string;
    description: string;
}

export interface IExerciseInfoModel extends IExerciseInfo, Document {}

const ExerciseInfoSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: '' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IExerciseInfoModel>('ExerciseInfo', ExerciseInfoSchema);
