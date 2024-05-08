import { Injectable } from "@nestjs/common";
import { StoreProductData } from "./interfaces/store.interface";
import { DatabaseService } from "database/database.service";

@Injectable()
export class StoreService {
  private products: StoreProductData[] = [];
  constructor(private databaseService: DatabaseService) {}

  async update(product: StoreProductData) {
    if (!product.name || !product.code || !product.unit) {
      throw new Error("Missing required product fields");
    }
    const query = `UPDATE products_storage SET name = ?, unit = ?, quantity = ? WHERE code = ? AND package = ?`;
    const values = [
      product.name,
      product.unit,
      product.quantity,
      product.code,
      product.package,
    ];
    await this.databaseService.queryAsync<StoreProductData>(query, values);
  }

  create(product: StoreProductData) {
    this.products.push(product);
  }

  async findAll(): Promise<{ data: StoreProductData[] }> {
    try {
      const results = await this.databaseService.queryAsync<StoreProductData[]>(
        "SELECT * FROM products_storage"
      );
      if (!results || results.length === 0) {
        // return res.status(404).json({ message: "Not found" });
        throw new Error("Not found");
      }
      this.products = results;
      return { data: this.products };
    } catch (error) {
      console.error("GET error:", error);
      throw error;
      // return res.status(500).json({
      //   message: "Internal server error",
      //   error: (error as any).message,
      // });
    }
  }
}
