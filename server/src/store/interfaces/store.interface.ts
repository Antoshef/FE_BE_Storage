export interface StoreProductData {
  code: string;
  category: string;
  name: string;
  quantity: number;
  package: number;
  unit: StoreUnits;
  total: number;
}

export enum StoreUnits {
  kg = "кг.",
  l = "л.",
  pcs = "бр.",
}
