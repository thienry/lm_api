import { Module } from '@nestjs/common'

import { AppModule } from '@app/app.module'
import { HttpModule } from '@infra/http/http.module'
import { DatabaseModule } from '@infra/database/database.module'

@Module({ imports: [DatabaseModule, HttpModule, AppModule] })
export class MainModule {}
