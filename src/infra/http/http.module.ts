import { Module } from '@nestjs/common'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { AliasModule } from './modules/alias/alias.module'
import { LocaleModule } from './modules/locale/locale.module'
import { MappingModule } from './modules/mapping/mapping.module'

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [AliasModule, LocaleModule, MappingModule],
})
export class HttpModule {}
