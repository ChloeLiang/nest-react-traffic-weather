import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('traffic-weather')
  getTrafficAndWeather(@Query('dateTime') dateTime) {
    return this.appService.getTrafficAndWeather(dateTime);
  }
}
