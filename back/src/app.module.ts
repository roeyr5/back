import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UsersSchema } from './users/schemas/users.schema';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/Simulator'),
    PassportModule.register({defaultStrategy:'jwt'}),
    
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
