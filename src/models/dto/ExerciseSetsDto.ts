import mongoose, { Document, Schema } from 'mongoose';
import { IExerciseInfoDto } from './ExerciseInfoDto';
import { ISetDto } from './SetDto';

export interface IExerciseSetsDto {
    exerciseStatisticsId: string;
    setList: Array<ISetDto>;
}
