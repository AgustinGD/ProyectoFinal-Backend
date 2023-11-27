import { ISetDto } from '../models/dto/SetDto';
import Set from '../models/Set';

class SetUtils {
    createSet = (setList: ISetDto[]): string[] => {
        let setIds: string[] = [];

        setList.forEach((set) => {
            const newSet = new Set({
                setNumber: set.setNumber,
                repetitions: set.repetitions,
                weightInGrams: set.weightInGrams,
                heartRate: set.heartRate,
                durationTimeInMillis: set.durationTimeInMillis,
                restTimeInMillis: set.restTimeInMillis
            });

            newSet.save();

            setIds.push(newSet._id);
        });

        return setIds;
    };
}

export = new SetUtils();
