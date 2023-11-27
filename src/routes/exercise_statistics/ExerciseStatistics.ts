import express from 'express';
import exerciseStatisticsController from '../../controllers/ExerciseStatistics';

const router = express.Router();

router.patch('/sets', exerciseStatisticsController.addSetsToExerciseStatistics);
router.get('/time-spent-exercising/weekly/in-hours', exerciseStatisticsController.timeSpentExercisingInHours);

export = router;
