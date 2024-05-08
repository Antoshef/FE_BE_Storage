import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { InvoiceData, ProductData } from "./interfaces/create.interface";
import {
  CreateService,
  GenerateInvoiceService,
  SentInvoiceService,
} from "./create.service";
import { Response } from "express";

@Controller("/api/get-prices")
export class CreateController {
  constructor(private createService: CreateService) {}

  @Get()
  async findAll(): Promise<{ data: ProductData[] }> {
    console.log("GET request received");
    return this.createService.findAll().then((res) => res);
  }
}

@Controller("/api/sent-invoice")
export class SentInvoiceController {
  constructor(private sentInvoiceService: SentInvoiceService) {}

  @Get()
  async findAll(): Promise<{ data: InvoiceData[] }> {
    return this.sentInvoiceService.findAll().then((res) => res);
  }

  @Post()
  async sentInvoice(
    @Body() invoiceData: InvoiceData,
    @Res() res: Response
  ): Promise<void> {
    try {
      const result = await this.sentInvoiceService.create(invoiceData);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (
        (error as Error).message === "Missing required fields" ||
        (error as Error).message === "Invoice number must be 10 characters long"
      ) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: (error as Error).message,
          status: HttpStatus.BAD_REQUEST,
        });
      } else if ((error as Error).message === "Invoice not sent") {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: (error as Error).message,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: "Unexpected error",
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }
}

@Controller("/api/generate-invoice")
export class GenerateInvoiceController {
  constructor(private generateInvoiceService: GenerateInvoiceService) {}

  @Post()
  async generateInvoice(
    @Body()
    data: {
      email: string;
      bcc: string;
      invoiceNumber: string;
      html: string;
      css: string;
    },
    @Res() res: Response
  ): Promise<void> {
    try {
      this.generateInvoiceService.create(data);
      res.status(HttpStatus.OK).json({
        message: "Invoice generated and sent!",
        status: HttpStatus.OK,
      });
    } catch (error) {
      console.error("Error in invoice generation or sending email:", error);
      throw new Error("Error generating or sending invoice.");
    }
  }
}
