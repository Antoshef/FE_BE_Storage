import { Injectable } from "@nestjs/common";
import { InvoiceData, ProductData } from "./interfaces/create.interface";
import { DatabaseService } from "database/database.service";
import path from "path";
import { addTextToPDF, convertHTMLToPDF } from "utils/createPdfFromHtml";
import nodemailer from "nodemailer";
import fs from "fs";
import { createDir } from "utils/utils";

@Injectable()
export class CreateService {
  private productsData: ProductData[] = [];
  constructor(private databaseService: DatabaseService) {}

  async findAll(): Promise<{ data: ProductData[] }> {
    const results = await this.databaseService.queryAsync<ProductData[]>(
      "SELECT * FROM product_prices"
    );
    this.productsData = results;
    return { data: results };
  }
}

@Injectable()
export class SentInvoiceService {
  private invoiceData: InvoiceData[] = [];
  constructor(private databaseService: DatabaseService) {}

  async findAll(): Promise<{ data: InvoiceData[] }> {
    const results = await this.databaseService.queryAsync<InvoiceData[]>(
      `SELECT * FROM eko_invoices_sent`
    );
    this.invoiceData = results;
    return { data: results };
  }

  async create(invoice: InvoiceData) {
    const { client, eik, vat_number, date, invoice_id, amount, vat, total } =
      invoice;
    if (
      !client ||
      !eik ||
      !vat_number ||
      !date ||
      !invoice_id ||
      !amount ||
      !vat ||
      !total
    ) {
      throw new Error("Missing required fields");
    } else if (invoice_id.length !== 10) {
      throw new Error("Invoice number must be 10 characters long");
    }
    const results = await this.databaseService.queryAsync(
      `
        INSERT INTO eko_invoices_sent (client, eik, vat_number, date, invoice_id, amount, vat, total)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [client, eik, vat_number, date, invoice_id, amount, vat, total]
    );
    if (!results) {
      throw new Error("Invoice not sent");
    }
    return { message: "Invoice sent", status: 200 };
  }
}

Injectable();
export class GenerateInvoiceService {
  async create(invoice: {
    email: string;
    bcc: string;
    invoiceNumber: string;
    html: string;
    css: string;
  }) {
    const { email, bcc, invoiceNumber, html, css } = invoice;
    const fileName = `invoice-${invoiceNumber}.pdf`;
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });

    createDir("sent");
    createDir("sent/invoices");
    createDir(`sent/invoices/${currentMonth}`);
    const filePath = path.join("/", `sent/invoices/${currentMonth}`, fileName);
    const pdfBuffer = await convertHTMLToPDF(html, css);
    const modifiedPdfBuffer = pdfBuffer && (await addTextToPDF(pdfBuffer));

    modifiedPdfBuffer &&
      (await fs.promises.writeFile(filePath, modifiedPdfBuffer));

    let transporter = nodemailer.createTransport({
      host: process.env.IMAP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SALES_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const result = await transporter.sendMail({
      from: process.env.SALES_EMAIL,
      to: email,
      bcc: bcc,
      subject: "Your Invoice",
      text: "Please find attached your invoice.",
      attachments: [
        {
          filename: fileName,
          path: filePath,
          contentType: "application/pdf",
        },
      ],
    });

    if (result) {
      return { message: "Invoice generated and sent!" };
    } else {
      throw new Error("Error generating or sending invoice.");
    }
  }
}
