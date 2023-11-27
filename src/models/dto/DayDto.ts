import mongoose, { Document, Schema } from 'mongoose';
import { IExerciseStatisticsDto } from './ExerciseStatisticsDto';

export interface IDayDto {
    description: string;
    dayPosition: number;
    exerciseList: IExerciseStatisticsDto[];
}
