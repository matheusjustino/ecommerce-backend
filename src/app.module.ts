import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './app-config/app-config.module';

@Module({
  imports: [DatabaseModule, AppConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
