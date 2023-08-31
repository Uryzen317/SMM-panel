import { BadRequestException, ConsoleLogger, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/models/user.model";
import { RequestUser } from "src/user/types/user.type";
import { OrderDTO } from "../dtos/service.dto";
import { Order } from "../models/order.model";
const axios = require("axios");

@Injectable()
export class ServiceService {
  constructor(
    public configService: ConfigService,
    @InjectModel(User.name) public user: Model<User>,
    @InjectModel(Order.name) public orders: Model<Order>
  ) {}

  async services() {
    this.ordersList();

    const apiAddress = this.configService.get("SMM_API_ADDRESS");
    const apiKey = this.configService.get("SMM_API_KEY");
    let services: any;

    try {
      services = await axios.post(apiAddress, {
        key: apiKey,
        action: "services",
      });

      console.log(services.data);
    } catch (error: any) {
      console.log("error in fetch service request: ", error);
      services = null;
    }

    if (!services) {
      throw new BadRequestException();
    }

    // get the additional fee
    services = services.data.map((s) => {
      s.rate = parseFloat(s.rate);
      s.rate += this.calculateAdditionalFee(s.rate) * s.rate;
      return s;
    });

    return services;
  }

  async order(requestUser: RequestUser, orderDto: OrderDTO) {
    // get services
    let services;
    try {
      services = await this.services();
    } catch {
      services = null;
    }

    if (!services) {
      throw new BadRequestException({
        status: "failed",
        error: "something went wrong. please try again later.",
      });
    }

    // check if service id is valid
    let selectedService = services.find((s) => s.service == orderDto.id);

    if (!selectedService) {
      throw new BadRequestException({
        status: "failed",
        error: "selected service is not availablr.",
      });
    }

    // check if quantity is in range
    if (
      orderDto.quantity < parseInt(selectedService.min) ||
      orderDto.quantity > parseInt(selectedService.max)
    ) {
      throw new BadRequestException({
        status: "failed",
        error: "quantity must be in range of min and max.",
      });
    }

    // take out the one with requested id
    let user: User = await this.user.findOne({ _id: requestUser.id });

    // calculate the final fee
    let finalFee =
      (parseFloat(selectedService.rate) / 1000) * orderDto.quantity;

    // check if user has needed money
    if (user.money < finalFee) {
      throw new BadRequestException({
        status: "failed",
        error: "your balance is not enough, please charge your account.",
      });
    }

    // submit order with api
    let apiKey = this.configService.get("SMM_API_KEY");
    let apiAddress = this.configService.get("SMM_API_ADDRESS");
    let order: any;

    try {
      order = await axios.post(apiAddress, {
        key: apiKey,
        action: "add",
        service: selectedService.service,
        link: orderDto.link,
        quantity: orderDto.quantity,
      });

      if (order.data.error) {
        throw Error(order.data.error);
      }
    } catch (error: any) {
      console.log("api order error: ", error);

      order = false;
    }

    // if failed
    if (!order) {
      throw new BadRequestException({
        status: "failed",
        error: "something went wrong,please try again later.",
      });
    }

    // if succeed
    // console.log(order.data);

    // register order in db
    await this.orders.insertMany([
      {
        ownerId: user.id,
        orderId: order.data.order,
        cost: finalFee,
      },
    ]);

    // register the order in db
    // answer with success
    await this.user.updateOne(
      { _id: requestUser.id },
      {
        $set: { money: user.money - finalFee },
      }
    );

    return {
      status: "success",
    };
  }

  calculateAdditionalFee(initialPrice: number): number {
    let additionalFee: number = 0;
    if (initialPrice < 10) {
      additionalFee = 73 / 100;
    } else if (initialPrice >= 10 && initialPrice < 25) {
      additionalFee = 63 / 100;
    } else if (initialPrice >= 25 && initialPrice < 35) {
      additionalFee = 53 / 100;
    } else if (initialPrice >= 35 && initialPrice < 45) {
      additionalFee = 43 / 100;
    } else if (initialPrice >= 45 && initialPrice < 55) {
      additionalFee = 33 / 100;
    } else if (initialPrice > 55) {
      additionalFee = 33 / 100;
    }
    return additionalFee;
  }

  async ordersList() {
    // let test = await this.orders.find();
    // console.log(test);
    // return;
    // 654705
    // / 654707
    // Processing
    // pending

    let apiKey = this.configService.get("SMM_API_KEY");
    let apiAddress = this.configService.get("SMM_API_ADDRESS");

    let orders = await axios.post(apiAddress, {
      key: apiKey,
      action: "status",
      order: 654705,
    });

    console.log(orders.data);

    return {};
  }

  async myOrders(user: RequestUser) {
    let orders: any = await this.orders.find({ ownerId: user.id });

    let apiKey = this.configService.get("SMM_API_KEY");
    let apiAddress = this.configService.get("SMM_API_ADDRESS");

    let order: any;
    let getOrdersPromise = [];
    for (let i = 0; i < orders.length; i++) {
      getOrdersPromise.push(
        await axios.post(apiAddress, {
          key: apiKey,
          action: "status",
          order: orders[i].orderId,
        })
      );
    }

    let results: any = [];

    await Promise.all(getOrdersPromise)
      .then(([...data]) => {
        results = data.map((d) => {
          let charge = parseFloat(d.data.charge);
          charge += this.calculateAdditionalFee(charge) * charge;
          d.data.charge = charge;
          return d.data;
        });
        console.log(data.length);
      })
      .catch(([...error]) => {
        results = null;
        console.log("error: ", error);
      });

    if (!results) {
      throw new BadRequestException({
        status: "failed",
        message: "something went wrong, please try again later.",
      });
    }

    console.log("results:", results);

    // return null;
    return results;
  }
}
