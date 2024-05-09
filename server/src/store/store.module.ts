import { Module } from "@nestjs/common";
import { StoreController, StoreSingleController } from "./store.controller";
import { StoreService } from "./store.service";
import { DatabaseModule } from "database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [StoreController, StoreSingleController],
  providers: [StoreService],
})
export class StoreModule {}
