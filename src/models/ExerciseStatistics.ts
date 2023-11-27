import mongoose, { Document, Schema } from 'mongoose';

export interface IExerciseStatistics {
    exerciseInfo: string;
    maxSets: number;
    position: number;
    setList: Array<string>;
}

export interface IExerciseStatisticsModel extends IExerciseStatistics, Document {}

const ExerciseStatisticsSchema: Schema = new Schema(
    {
        exerciseInfo: { type: Schema.Types.ObjectId, required: true, ref: 'ExerciseInfo' },
        maxSets: { type: Number, required: true },
        position: { type: Number, required: true },
        setList: { type: Array<Schema.Types.ObjectId>, required: true, ref: 'Set' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IExerciseStatisticsModel>('ExerciseStatistics', ExerciseStatisticsSchema);
