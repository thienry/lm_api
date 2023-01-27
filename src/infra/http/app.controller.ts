import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Header } from '@nestjs/common'

import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @ApiTags('Health Check')
  @Header('Cache-Control', 'none')
  getHealth(): string {
    return this.appService.getHealth()
  }
}
