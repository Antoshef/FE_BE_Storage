// database.module.ts
import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { MyConfigService } from "config.service";

@Module({
  providers: [DatabaseService, MyConfigService],
  exports: [DatabaseService], // Export DatabaseService for use in other modules
})
export class DatabaseModule {}
