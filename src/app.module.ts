import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AddinventoryModule } from './addinventory/addinventory.module';
import { SlaesModule } from './slaes/slaes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Removed UsersController from here (it's not a module)
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),

      inject: [ConfigService],
    }),
    SlaesModule,
    AddinventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
