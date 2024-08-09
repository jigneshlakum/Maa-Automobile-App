export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceModel {
  customerId: string;
  invoiceNumber: string;
  date: string;
  finalAmount: number;
  InvoiceItems: InvoiceItem[];
}
