import mongoose, { Document, Schema } from 'mongoose';

export interface ISetDto {
    setNumber: number;
    repetitions: number;
    weightInGrams: number;
    heartRate: number;
    durationTimeInMillis: number;
    restTimeInMillis: number;
}
