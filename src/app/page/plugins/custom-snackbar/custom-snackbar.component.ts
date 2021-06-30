import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.css']
})
export class CustomSnackbarComponent implements OnInit {

  scanResult: string = 'http://www.google.com';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string,
    private snackBarRef?: MatSnackBarRef<CustomSnackbarComponent>
  ) { 
    // console.log('data', data)
    this.scanResult = data
  }
  // constructor(
  //   private snackBarRef?: MatSnackBarRef<CustomSnackbarComponent>,
  // ){
  //   this.scanResult = scanResult;
  // }

  close(){
    this.snackBarRef.dismiss();
  }

  ngOnInit(): void {
  }

  open() {
    window.open(this.scanResult, '_system', 'location=yes');
  }
}
