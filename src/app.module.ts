import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './app-config/app-config.module';

@Module({
  imports: [DatabaseModule, AppConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
