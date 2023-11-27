import mongoose, { Document, Schema } from 'mongoose';
import { IExerciseInfoDto } from './ExerciseInfoDto';
import { ISetDto } from './SetDto';

export interface IExerciseStatisticsDto {
    exerciseInfo: IExerciseInfoDto;
    maxSets: number;
    position: number;
    setList: Array<ISetDto>;
}
