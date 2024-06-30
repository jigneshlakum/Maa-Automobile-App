// src/app/crypto.service.ts
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private key = 'cmFqYS1yYW5jaGhvZA==';

  constructor() { }

  encryptData(data: any): string {
    const keyUtf8 = CryptoJS.enc.Utf8.parse(this.key.padEnd(32));
    const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), keyUtf8, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  decryptData(encryptedText: string): any {
    const keyUtf8 = CryptoJS.enc.Utf8.parse(this.key.padEnd(32));
    const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
    const decrypted = CryptoJS.AES.decrypt(encryptedText, keyUtf8, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }
}
