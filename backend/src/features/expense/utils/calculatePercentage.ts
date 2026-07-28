import AppError from "../../../utils/AppErrors.js";
import { ParticipantInput } from "../expense.validation.js";
import { assignRemain } from "./assginedRemainToLast.js";
import type { SplitResult } from "./calculateSplit.js";
import { roundToTwo } from "./roundToTwo.js";

export const calculatePercentage = (amount: number, participants: ParticipantInput[]) => {
    let percentage = 0;
    participants.forEach((participant)=>{
        if(participant.percentage === undefined || participant.percentage < 0 || participant.percentage > 100) {
            throw new AppError("Each Participant must be given valid percentage share", 400);
        }
        percentage += participant.percentage;
    })

    if( roundToTwo(percentage) !== 100) {
        throw new AppError("Participant percentages must total 100%", 400);
    }

    const result: SplitResult[]= participants.map((participant)=>{
        let amountToDistribute = roundToTwo((participant.percentage! * amount) / 100) 
        return {
            userId : participant.userId,
            amountOwed: amountToDistribute,
        }
    })

    assignRemain(result, amount);

    return result;
}