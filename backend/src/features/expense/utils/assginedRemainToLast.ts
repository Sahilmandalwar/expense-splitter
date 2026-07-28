import { SplitResult } from "./calculateSplit.js";
import { roundToTwo } from "./roundToTwo.js";

export const assignRemain = (result: SplitResult[], amount: number) => {
    const totalAssigned = result.reduce(
        (sum, p) => sum + p.amountOwed,
        0
    );

    const difference = roundToTwo(amount - totalAssigned);

    result[result.length - 1].amountOwed = roundToTwo(
        result[result.length - 1].amountOwed + difference
    );


}