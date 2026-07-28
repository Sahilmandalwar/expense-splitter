
import { SplitType } from "../../../../generated/prisma/enums.js";
import AppError from "../../../utils/AppErrors.js";
import {  ParticipantInput } from "../expense.validation.js";
import { calculateEqual } from "./calculateEqual.js";
import { calculateExact } from "./calculateExact.js";
import { calculatePercentage } from "./calculatePercentage.js";

export type SplitResult = {
    userId: string;
    amountOwed: number;
}

export const calculateSplit =(
    splitType: SplitType,
    amount : number,
    participants: ParticipantInput[]
) : SplitResult[]=>{

    const ids = participants.map((p) => p.userId);

    if (new Set(ids).size !== ids.length) {
        throw new AppError("Duplicate participants are not allowed", 400);
    }

    switch(splitType) {
        case "EQUAL":
            return calculateEqual(amount, participants);
        case "EXACT":
            return calculateExact(amount, participants);
        case "PERCENTAGE":
            return calculatePercentage(amount, participants);
        default: 
            throw new AppError("Invalid split type", 400)
    }

}