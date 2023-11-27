import mongoose, { Document, Schema } from 'mongoose';
import { IDayDto } from './DayDto';

export interface IRoutineDetailsDto {
    name: string;
    isFavourite: boolean;
    dayList: Array<IDayDto>;
}
