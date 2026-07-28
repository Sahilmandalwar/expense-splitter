import { ParticipantInput } from "../expense.validation.js";
import { roundToTwo } from "./roundToTwo.js";
import type { SplitResult } from "./calculateSplit.js";
import { assignRemain } from "./assginedRemainToLast.js";


export const calculateEqual = (amount : number, participants: ParticipantInput[]) => {

    const n = participants.length;
    const amountSplitted = roundToTwo(amount / n);
    

    const result : SplitResult[] = participants.map((participant, index)=>{
       
        return {
            userId : participant.userId,
            amountOwed : amountSplitted
        }
    })

    assignRemain(result, amount);


        
    return result;


}