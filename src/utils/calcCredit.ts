import { CreditorData } from "../routes/credit-search";

type CalcCredit = (data: CreditorData[]) => {
  totalCreditorValue: number;
  securedCreditorValue: number;
  unsecuredCreditorValue: number;
  qualifies: boolean;
};

const calcCredit: CalcCredit = (data) => {
  let totalCreditorValue = 0;
  let securedCreditorValue = 0;
  let unsecuredCreditorValue = 0;
  let unsecuredCreditors = 0;
  let qualifies = false;
  data.forEach((creditor) => {
    totalCreditorValue += creditor.value;
    if (creditor.secured) {
      securedCreditorValue += creditor.value;
    } else {
      unsecuredCreditorValue += creditor.value;
      unsecuredCreditors += 1;
    }
    if (unsecuredCreditors >= 2 && unsecuredCreditorValue / 100 >= 5000) {
      qualifies = true;
    }
  });
  return { totalCreditorValue, securedCreditorValue, unsecuredCreditorValue, qualifies };
};

export default calcCredit;
