export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceModel {
  id: any;
  customerId: {
    _id: string;
    customerName: string;
    vehicleNumber: string;
  };
  invoiceNumber: string;
  date: string;
  finalAmount: number;
  InvoiceItems: InvoiceItem[];
}
