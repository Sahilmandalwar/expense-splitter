import AppError from "../../../utils/AppErrors.js";
import { ParticipantInput } from "../expense.validation.js";
import { roundToTwo } from "./roundToTwo.js";
import { SplitResult } from "./calculateSplit.js";



export const calculateExact = (amount : number, participants: ParticipantInput[]) => {
    let amountSum = 0;
    participants.forEach((participant)=>{
        if(participant.amount === undefined) {
            throw new AppError("Each Participant must be given amount", 400);
        }
        amountSum += participant.amount!;
    })

    if (roundToTwo(amountSum) !== roundToTwo(amount)) {
        throw new AppError(
            "Participant amounts must equal total expense amount",
            400
        );
    }

    const result : SplitResult[] = participants.map((participant)=>{
        
        return {
            userId : participant.userId,
            amountOwed : participant.amount!
        }
    })

    return result;


}