import { Injectable } from "@nestjs/common";
import { StoreProductData } from "./interfaces/store.interface";

@Injectable()
export class StoreService {
  private readonly products: StoreProductData[] = [];

  create(product: StoreProductData) {
    this.products.push(product);
  }

  findAll(): StoreProductData[] {
    return this.products;
  }
}
