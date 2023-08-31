import { Injectable } from "@nestjs/common";
import { RequestUser } from "src/user/types/user.type";
import { Client, resources as CoinBase } from "coinbase-commerce-node";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CryptoService {
  constructor(public configService: ConfigService) {}

  async create(requestUser: RequestUser) {
    let clientObj: any = Client.init(
      this.configService.get("COINBASE_API_KEY")
    );
    // clientObj.timeout = 1000000;
    clientObj.setRequestTimeout(300000);
    // console.log(clientObj);

    var checkoutData: any = {
      name: "The Sovereign Individual",
      description: "Mastering the Transition to the Information Age",
      pricing_type: "fixed_price",
      local_price: {
        amount: "100.00",
        currency: "USD",
      },
      requested_info: ["name", "email"],
    };

    CoinBase.Charge.create(checkoutData, function (error, response) {
      console.log(error);
      console.log(response);
    });

    return await {};
  }
}
