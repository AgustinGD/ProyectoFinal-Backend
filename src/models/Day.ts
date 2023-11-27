import mongoose, { Document, Schema } from 'mongoose';

export interface IDay {
    description: string;
    dayPosition: number;
    exerciseList: Array<string>;
}

export interface IDayModel extends IDay, Document {}

const DaySchema: Schema = new Schema(
    {
        description: { type: String, default: '' },
        dayPosition: { type: Number, required: true },
        exerciseList: { type: Array<Schema.Types.ObjectId>, required: true, ref: 'ExerciseStatistics' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IDayModel>('Day', DaySchema);
