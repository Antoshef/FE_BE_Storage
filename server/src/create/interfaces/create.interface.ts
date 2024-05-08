import { StoreUnits } from "store/interfaces/store.interface";

export interface ProductData {
  code: string;
  name: string;
  packing: string;
  unit: StoreUnits;
  color: string;
  percentage_increase: number;
  price: number;
  category: string | null;
}

export interface InvoiceData {
  client: string;
  eik: number;
  vat_number: string;
  date: string;
  invoice_id: string;
  amount: number;
  vat: number;
  total: number;
}

export interface Item
  extends Pick<ProductData, "name" | "code" | "price" | "unit" | "packing"> {
  quantity: number;
  currentPackage: string;
  totalPrice: string;
  VAT: string;
  discount: string;
}
