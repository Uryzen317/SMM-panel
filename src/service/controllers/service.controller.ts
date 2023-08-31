import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { UserGuard } from "src/user/guards/user.guard";
import { OrderDTO } from "../dtos/service.dto";
import { ServiceService } from "../services/service.service";

@Controller("service")
export class ServiceController {
  constructor(public serviceService: ServiceService) {}

  @Get("services")
  async services() {
    return await this.serviceService.services();
  }

  @UseGuards(UserGuard)
  @Post("order")
  async order(@Req() request, @Body() orderDto: OrderDTO) {
    return await this.serviceService.order(request.user, orderDto);
  }

  @UseGuards(UserGuard)
  @Get("myOrders")
  async myOrders(@Req() request) {
    return await this.serviceService.myOrders(request.user);
  }
}
