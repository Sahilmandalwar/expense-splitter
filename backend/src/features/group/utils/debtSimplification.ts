import { roundToTwo } from "../../expense/utils/roundToTwo.js";
import { balanceType } from "../group.service.js";

export type simplifiedBalance = {
    sender : {
        id: string,
        name: string,
        email: string
    },

    receiver : {
        id: string,
        name: string,
        email: string
    },

    amount : number
};

export const debtSimplificationUtility = (balances: balanceType[]) => {
    const positiveBalance = [];
    const negativeBalance = [];

    for(const userBalance of balances) {
        if(userBalance.balance > 0) {
            positiveBalance.push({...userBalance});
        }else if(userBalance.balance < 0){
            negativeBalance.push({...userBalance});;
        }
    }

    let positivePtr = 0;
    let negativePtr = 0;

    const n = positiveBalance.length;
    const m = negativeBalance.length;

    const simplifiedDebt : simplifiedBalance[] = [];

    while(positivePtr < n && negativePtr < m) {
        if(positiveBalance[positivePtr].balance > Math.abs(negativeBalance[negativePtr].balance)) {
            
            simplifiedDebt.push({
                sender: negativeBalance[negativePtr].user,
                receiver: positiveBalance[positivePtr].user,
                amount: roundToTwo(Math.abs(negativeBalance[negativePtr].balance))
            })

            positiveBalance[positivePtr].balance += negativeBalance[negativePtr].balance;
            negativeBalance[negativePtr].balance = 0;
            negativePtr += 1;
            
        }else if(positiveBalance[positivePtr].balance < Math.abs(negativeBalance[negativePtr].balance)) {
            simplifiedDebt.push({
                sender: negativeBalance[negativePtr].user ,
                receiver: positiveBalance[positivePtr].user,
                amount: roundToTwo(positiveBalance[positivePtr].balance)
            })

            negativeBalance[negativePtr].balance += positiveBalance[positivePtr].balance;
            positiveBalance[positivePtr].balance  = 0;
            positivePtr += 1;
        }else {
            simplifiedDebt.push({
                sender: negativeBalance[negativePtr].user,
                receiver: positiveBalance[positivePtr].user,
                amount: roundToTwo(Math.abs(negativeBalance[negativePtr].balance))
            })

            positiveBalance[positivePtr].balance = 0;
            negativeBalance[negativePtr].balance = 0;
            positivePtr += 1;
            negativePtr += 1;
        }
    }

    return simplifiedDebt;
}