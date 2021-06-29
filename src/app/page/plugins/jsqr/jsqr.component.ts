import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-jsqr',
  templateUrl: './jsqr.component.html',
  styleUrls: ['./jsqr.component.css']
})
export class JsqrComponent implements OnInit {

  scanActive = true;
  scanResult = null;
  @ViewChild('video', {static: false}) video: ElementRef;

  videoElement: any;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.videoElement = this.video.nativeElement;
  }

  constructor(private _snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
  }
 
  async startScan() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    })
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true); // for android
    this.videoElement.play();
  }

  stopScan() {
    this.scanActive = false;
  }

  reset() {
    this.scanResult = null;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
 
}
