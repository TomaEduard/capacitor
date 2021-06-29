import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  startScan = async () => {
    BarcodeScanner.hideBackground(); // make background of WebView transparent
  
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
  
    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }
  };
  
}
