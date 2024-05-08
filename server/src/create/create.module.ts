import { Module } from "@nestjs/common";
import { DatabaseModule } from "database/database.module";
import {
  CreateController,
  GenerateInvoiceController,
  SentInvoiceController,
} from "./create.controller";
import {
  CreateService,
  GenerateInvoiceService,
  SentInvoiceService,
} from "./create.service";

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateController,
    SentInvoiceController,
    GenerateInvoiceController,
  ],
  providers: [CreateService, SentInvoiceService, GenerateInvoiceService],
})
export class CreateModule {}
