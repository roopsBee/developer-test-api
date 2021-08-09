import { Application, Request, Response } from "express";
import axios from "axios";
import parseAddress from "../utils/parseAddress";
import calcCredit from "../utils/calcCredit";

type ReqData = {
  surname: string;
  address: string;
  postcode: string;
};

type AddressData = {
  id: string;
  address1: string;
  address2: string;
  postcode: string;
};

export type CreditorData = {
  id: string;
  surname: string;
  addressId: string;
  name: string;
  value: number;
  secured: boolean;
};

export default (app: Application): void => {
  app.post("/credit-search", async (req: Request, res: Response) => {
    const data: ReqData = req.body;

    const { address, postcode, surname } = data;
    const { address1, address2 } = parseAddress(address);

    const addressRes = await axios.post(
      "https://developer-test-service-2vfxwolfiq-nw.a.run.app/addresses",
      {
        address1,
        address2,
        postcode,
      }
    );

    const addressData: AddressData = addressRes.data;
    const { id } = addressData[0];

    const creditorRes = await axios.post(
      "https://developer-test-service-2vfxwolfiq-nw.a.run.app/creditors",
      {
        surname,
        addressId: id,
      }
    );

    const creditorData: CreditorData[] = creditorRes.data;
    const credit = calcCredit(creditorData);
    res.statusCode = 200;
    res.json({ ...credit });
  });
};
