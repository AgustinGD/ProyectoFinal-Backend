import { NextFunction, Request, Response } from 'express';
import RoutineDetails, { IRoutineDetails } from '../models/RoutineDetails';
import ExerciseStatistics from '../models/ExerciseStatistics';
import Day from '../models/Day';
import { IDayDto } from '../models/dto/DayDto';
import { IExerciseStatisticsDto } from '../models/dto/ExerciseStatisticsDto';
import ExerciseInfo from '../models/ExerciseInfo';
import { IExerciseInfoDto } from '../models/dto/ExerciseInfoDto';
import { IRoutineDetailsDto } from '../models/dto/RoutineDetailsDto';
import SetUtils from '../controllers/Set';
import { Error as MongooseError } from 'mongoose';
import Logging from '../library/Logging';

const createRoutineDetails = (req: Request, res: Response, next: NextFunction) => {
    const { routineDetailsDto } = req.body as { routineDetailsDto: IRoutineDetailsDto };

    const dayListIds = createDays(routineDetailsDto.dayList);

    const routineDetails = new RoutineDetails({
        name: routineDetailsDto.name,
        isFavourite: routineDetailsDto.isFavourite,
        dayList: dayListIds
    });

    return routineDetails
        .save()
        .then(() => res.status(201).json({ id: routineDetails._id }))
        .catch((error) => res.status(500).json({ error }));
};

const getAllRoutinesSimplified = (req: Request, res: Response, next: NextFunction) => {
    const fields = '_id name isFavourite createdAt';

    return RoutineDetails.find()
        .select(fields)
        .then((routineDetailList) => (routineDetailList ? res.status(200).json(routineDetailList) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const getRoutineDetails = (req: Request, res: Response, next: NextFunction) => {
    const routineDetailsId = req.params.routineDetailsId;

    return RoutineDetails.findById(routineDetailsId)
        .populate({
            path: 'dayList',
            model: 'Day',
            populate: {
                path: 'exerciseList',
                model: 'ExerciseStatistics',
                populate: [
                    {
                        path: 'setList',
                        model: 'Set'
                    },
                    {
                        path: 'exerciseInfo',
                        model: 'ExerciseInfo'
                    }
                ]
            }
        })
        .then((routineDetails) => (routineDetails ? res.status(200).json(routineDetails) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const updateRoutineDetails = (req: Request, res: Response, next: NextFunction) => {
    const routineDetailsId = req.params.routineDetailsId;
    const routineDetails = req.body as IRoutineDetails;

    return RoutineDetails.findById(routineDetailsId)
        .then((routineDetail) => {
            if (routineDetail) {
                routineDetail.set(routineDetails);

                return routineDetail
                    .save()
                    .then(() => res.status(201).json({ id: routineDetail._id }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

export default { createRoutineDetails, getAllRoutinesSimplified, getRoutineDetails, updateRoutineDetails };

const createDays = (dayList: IDayDto[]): string[] => {
    let dayListIds: string[] = [];

    dayList.forEach((day) => {
        const exerciseStatisticsIds = createExerciseStatistics(day.exerciseList);

        const newDay = new Day({
            description: day.description,
            dayPosition: day.dayPosition,
            exerciseList: exerciseStatisticsIds
        });

        newDay.save();

        dayListIds.push(newDay._id);
    });

    return dayListIds;
};

const createExerciseStatistics = (exerciseStatisticsList: IExerciseStatisticsDto[]): string[] => {
    let exerciseStatisticsIds: string[] = [];

    exerciseStatisticsList.forEach((exerciseStatistic) => {
        const exerciseInfoId = createExerciseInfo(exerciseStatistic.exerciseInfo);
        const setIds = SetUtils.createSet(exerciseStatistic.setList);

        const newExerciseStatistics = new ExerciseStatistics({
            exerciseInfo: exerciseInfoId,
            maxSets: exerciseStatistic.maxSets,
            position: exerciseStatistic.position,
            setList: setIds
        });

        newExerciseStatistics.save();

        exerciseStatisticsIds.push(newExerciseStatistics._id);
    });

    return exerciseStatisticsIds;
};

const createExerciseInfo = (exerciseInfo: IExerciseInfoDto): string => {
    let exerciseInfoId = '';

    const newExerciseInfo = new ExerciseInfo({
        name: exerciseInfo.name,
        description: exerciseInfo.description
    });

    newExerciseInfo.save();

    exerciseInfoId = newExerciseInfo._id;

    return exerciseInfoId;
};

// const createExerciseInfo = (exerciseInfo: IExerciseInfoDto): string => {
//     let exerciseInfoID = '';

//     ExerciseInfo.findOneAndUpdate(
//         { name: exerciseInfo.name },
//         { $setOnInsert: { name: exerciseInfo.name, description: exerciseInfo.description } },
//         { upsert: true, new: true, setDefaultsOnInsert: true }
//     )
//         .then((exercise) => {
//             Logging.error(`I CAME FIRST`);
//             exerciseInfoID = exercise._id;
//         })
//         .catch((err) => {
//             throw new Error(err.message);
//         });
//     Logging.error(`I LEFT FIRST`);
//     return exerciseInfoID;
// };
