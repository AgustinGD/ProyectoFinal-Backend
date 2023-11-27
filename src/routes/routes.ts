import express from 'express';
import routineDetailsRoutes from './routine_details/RoutineDetails';
import exerciseStatisticsRoutes from './exercise_statistics/ExerciseStatistics';

const router = express.Router();

router.use('/routine-details', routineDetailsRoutes);
router.use('/exercise-statistics', exerciseStatisticsRoutes);

export = router;
