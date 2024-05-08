import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MyConfigService {
  constructor(private configService: ConfigService) {}

  get databaseHost(): string | undefined {
    return this.configService.get<string>("HOST", { infer: true });
  }

  get databaseUser(): string | undefined {
    return this.configService.get<string>("DATABASE_USER", { infer: true });
  }

  get databasePassword(): string | undefined {
    return this.configService.get<string>("DATABASE_PASS", { infer: true });
  }

  get databaseName(): string | undefined {
    return this.configService.get<string>("DATABASE", { infer: true });
  }
}
