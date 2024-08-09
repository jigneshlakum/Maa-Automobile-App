import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateInvoiceNumberService {

  private lastInvoiceNumber: number = 0;

  constructor() { }

  generateInvoiceNumber(): string {
    this.lastInvoiceNumber++;
    const formattedNumber = this.lastInvoiceNumber.toString().padStart(3, '0');
    return `#INV${formattedNumber}`;
  }
  
}
