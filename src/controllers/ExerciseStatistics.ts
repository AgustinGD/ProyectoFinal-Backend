import { NextFunction, Request, Response } from 'express';
import Logging from '../library/Logging';
import { IExerciseSetsDto } from '../models/dto/ExerciseSetsDto';
import ExerciseStatistics from '../models/ExerciseStatistics';
import Set from '../models/Set';

const addSetsToExerciseStatistics = async (req: Request, res: Response, next: NextFunction) => {
    const exerciseSetsDto = req.body as IExerciseSetsDto[];

    try {
        const promises = exerciseSetsDto.map(async (currentExerciseSets) => {
            // Retrieve the existing ExerciseStatistics document
            const exerciseStatistics = await ExerciseStatistics.findById(currentExerciseSets.exerciseStatisticsId);
            if (exerciseStatistics) {
                // Create new Set documents and add their Ids to the setList of the ExerciseStatistics document
                const setList = await Set.create(currentExerciseSets.setList);
                const setListIds = setList.map((set) => set._id);
                await ExerciseStatistics.updateOne({ _id: currentExerciseSets.exerciseStatisticsId }, { $addToSet: { setList: { $each: setListIds } } });
            } else {
                throw new Error('ExerciseStatistics not found');
            }
        });

        await Promise.all(promises);

        res.status(200).json({ message: 'Sets added to ExerciseStatistics successfully' });
    } catch (error) {
        Logging.error(error);
        res.status(500).json({ message: 'An error occurred while processing your request, please try again later.' });
    }
};

const timeSpentExercisingInHours = async (req: Request, res: Response, next: NextFunction) => {
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
    const currentWeekEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 6);
    try {
        const sets = await Set.find({
            createdAt: {
                $gte: currentWeekStart,
                $lt: currentWeekEnd
            }
        });

        const dailyTotals: { [key: string]: number } = {
            Sunday: 0,
            Monday: 0,
            Tuesday: 0,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0,
            Saturday: 0
        };

        sets.forEach((set) => {
            const day = new Date(set.createdAt).toLocaleDateString('en-US', { weekday: 'long' });
            const durationTimeInHours = set.durationTimeInMillis / 3600000;
            const restTimeInHours = set.restTimeInMillis / 3600000;

            dailyTotals[day] += durationTimeInHours + restTimeInHours;
        });

        res.status(200).json(dailyTotals);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { addSetsToExerciseStatistics, timeSpentExercisingInHours };
