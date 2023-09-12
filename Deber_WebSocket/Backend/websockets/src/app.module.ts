import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EventosModulo} from "./eventos/eventos.modulo";

@Module({
  imports: [EventosModulo],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
