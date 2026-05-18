import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { CrudController } from './books/crud/crud.controller';
//import { CrudService } from './books/crud/crud.service';
import { CrudModule } from './books/crud/crud.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LibuserModule } from './libuser/libuser.module';
import { BorrowbookModule } from './borrowbook/borrowbook.module';
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
    CrudModule,
    LibuserModule,
    BorrowbookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
