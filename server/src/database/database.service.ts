import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { MyConfigService } from "../config.service";
import mysql from "mysql";

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool!: mysql.Pool;
  constructor(private configService: MyConfigService) {}

  private initializePool(): mysql.Pool {
    return mysql.createPool({
      host: this.configService.databaseHost,
      user: this.configService.databaseUser,
      password: this.configService.databasePassword,
      database: this.configService.databaseName,
    });
  }

  onModuleInit() {
    this.pool = this.initializePool();
  }

  onModuleDestroy() {
    this.pool.end((err) => {
      if (err) console.error("Error closing the database pool", err);
    });
  }

  async queryAsync<T>(query: string, params: any[] = []) {
    return await new Promise<T>((resolve, reject) => {
      this.pool.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
