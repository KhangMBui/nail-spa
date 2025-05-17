import { IncomeSplit } from "../types/index";

let incomeSplits: IncomeSplit[] = [];

export const IncomeModel = {
  getAll: (): IncomeSplit[] => incomeSplits,
  add: (income: IncomeSplit): IncomeSplit => {
    incomeSplits.push(income);
    return income;
  },
};
