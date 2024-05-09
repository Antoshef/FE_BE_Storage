import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { StoreModule } from "./store/store.module";
import { LoggerMiddleware } from "./logger.middleware";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "database/database.module";
import { CreateModule } from "create/create.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    StoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    DatabaseModule,
    CreateModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "store"),
      exclude: ["/api*"],
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
