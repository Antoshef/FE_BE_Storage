import { Body, Controller, Get, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { StoreService } from "./store.service";
import { StoreProductData } from "./interfaces/store.interface";
import { Item } from "create/interfaces/create.interface";

@Controller("/api/store")
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Put()
  async update(
    @Body() body: { product: StoreProductData },
    @Res() res: Response
  ): Promise<void> {
    try {
      if (!body.product) {
        throw new Error("No items provided");
      }
      this.storeService
        .update(body.product)
        .then(() =>
          res.status(200).json({ message: "Store items updated", status: 200 })
        );
    } catch (error) {
      console.error("PUT error:", error);
      throw error;
    }
  }

  @Post()
  async create(@Body() request: Request): Promise<string> {
    console.log("POST request received");
    return "This action adds a new store";
  }

  @Get()
  async findAll(): Promise<{ data: StoreProductData[] }> {
    console.log("GET request received");
    return this.storeService.findAll().then((res) => res);
  }
}
