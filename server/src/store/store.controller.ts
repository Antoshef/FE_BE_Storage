import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { StoreService } from "./store.service";
import { StoreProductData } from "./interfaces/store.interface";

@Controller("store")
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post()
  async create(@Body() request: Request): Promise<string> {
    return "This action adds a new store";
  }

  @Get()
  async findAll(): Promise<StoreProductData[]> {
    return this.storeService.findAll();
  }
}
