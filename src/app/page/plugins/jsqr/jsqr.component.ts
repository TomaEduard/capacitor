import { CustomSnackbarComponent } from './../custom-snackbar/custom-snackbar.component';
import { DialogAddImageComponent } from './components/dialog-add-image/dialog-add-image.component';
import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceDetectorService } from 'ngx-device-detector';
import jsQR from 'jsqr';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-jsqr',
  templateUrl: './jsqr.component.html',
  styleUrls: ['./jsqr.component.css']
})
export class JsqrComponent implements OnInit {

  snackBarShown = false;

  scanActive = false;
  scanResult = null;
  @ViewChild('video', {static: false}) video: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  @ViewChild('fileinput', {static: false}) fileinput: ElementRef;

  videoElement: any;
  canvasElement: any;
  canvasContext: any;

  deviceIsDesktop: boolean;
  loadingCtrl: boolean = false;

  // scanFromImage
  imagineConvert = null;
  imagineNoua: string = null;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  constructor(private _snackBar: MatSnackBar,
    private deviceService: DeviceDetectorService,
    public dialog: MatDialog,
    public plt: Platform,
    private renderer: Renderer2,
  ) { 
    const isInStandaloneMode = () => 
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.IOS && isInStandaloneMode()) {
      console.log('I am a an IOS PWA!');
      // can disabled scan button here and allow only scan QR Code from image not from video streaming
    }
  }

  ngOnInit(): void {
    this.deviceIsDesktop = this.deviceService.isDesktop();
    // const latimeMinima = Math.floor(Math.min(window.screen.width,  window.innerWidth) * 0.7);
    // this.dimensiuneThumbs = Math.min(317, latimeMinima);
  }

  async scanFromImage() {
    console.log('😢', )
    this.loadingCtrl = true;

    // not allow for IOS PWA
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { 
        facingMode: 'environment',
        // deviceId: {},

        // width: { ideal: 1680 },
        // height: { ideal: 1050 },
        // deviceId: { exact: '' }
      }
    })
    
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true); // for android
    this.videoElement.play();

    requestAnimationFrame(this.openVideo.bind(this));
  }

  openVideo() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loadingCtrl) {
        this.loadingCtrl = false;
        this.scanActive = true;
      }

      this.canvasElement.height  = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height,
      );

      // pass the data to the jsQR library
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        // this.canvasContext.width,
        // this.canvasContext.height
        1680,
        1050
      );


      if (!!this.imagineNoua) {
        console.log('😁 from video streaming', )
        // this.scanActive = false;
        // this.scanResult = code.data;

        this.openSnackBar();
      } else {
        console.log('😢', )

        if (this.scanActive) {
          requestAnimationFrame(this.openVideo.bind(this));
        }
      }

    } else {
      requestAnimationFrame(this.openVideo.bind(this));
    }
  }

  async startScan() {
    this.loadingCtrl = true;

    // not allow for IOS PWA
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { 
        facingMode: 'environment',
        // deviceId: {},

        // width: { ideal: 1680 },
        // height: { ideal: 1050 },
        // deviceId: { exact: '' }
      }
    })
    
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true); // for android
    this.videoElement.play();

    requestAnimationFrame(this.scan.bind(this));
  }

  scan() {
    console.log('SCAN', )

    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loadingCtrl) {
        this.loadingCtrl = false;
        this.scanActive = true;
      }
      console.log('🎄🎄', this.videoElement)
      console.log('🎄🎄', this.videoElement.HAVE_ENOUGH_DATA)

      this.canvasElement.height  = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height,
      );

      // pass the data to the jsQR library
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        // this.canvasContext.width,
        // this.canvasContext.height
        1680,
        1050
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      console.log('code:', code)

      if (code) {
        console.log('😁 from video streaming', )
        this.scanActive = false;
        this.scanResult = code.data;
        this.openSnackBar();
      } else {
        console.log('😢', )

        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }

    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  stopScan() {
    this.scanActive = false;
  }

  stopScanAndCapture() {

    this.canvasElement.height  = this.videoElement.videoHeight;
    this.canvasElement.width = this.videoElement.videoWidth;

    this.canvasContext.drawImage(
      this.videoElement,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height,
    );

    this.scanActive = false;
    
    const imageData = this.canvasContext.getImageData(
      0,
      0,
      // this.canvasContext.width,
      // this.canvasContext.height
      1680,
      1050
    );

    console.log('imageData', imageData);
    console.log('imageData.data', imageData.data); // imagine

    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    });

    console.log('code:', code)

    if (code) {
      console.log('😁 from video streaming', )
      this.scanActive = false;
      this.scanResult = code.data;
      this.openSnackBar();
    } else {
      console.log('😢 QR Code not found from image', )
    }

    
    // this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    // this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    // console.log('capture this.videoHeight', this.videoHeight);
    // console.log('capture this.videoWidth', this.videoWidth);

    // this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    // this.imagineConvert = this.canvas.nativeElement as HTMLCanvasElement;

    // this.imagineNoua = this.imagineConvert.toDataURL('image/jpeg', 1.0);
    // this.imagineLocala = true;

  }

  reset() {
    this.scanResult = null;
  }

  // async showQrToastIonic() {
  //   const toast = await this.toastCtrl.create({
  //     message: `Open ${this.scanResult}?`,
  //     position: 'top',
  //     button: [
  //       {
  //         text: 'Open',
  //         handler: () => {
  //           window.open(this.scanResult, '_system', 'location=yes');
  //         }
  //       }
  //     ]
  //   })
  // }

  showSnackbarTopPosition(content, action, duration) {
    this._snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

  openSnackBar() {
    this.snackBarShown = true;
    const duration = 0;

    // const customSnackbarComponent = new CustomSnackbarComponent(this.scanResult);
    this._snackBar.openFromComponent(CustomSnackbarComponent, { 
      data: this.scanResult,
      duration: duration, 
      horizontalPosition: "start", 
      panelClass: ['mat-elevation-z1', 'white_snackBar']
    });
    setTimeout(() => {
      this.snackBarShown =  false;
    }, duration);
  }

  closeSnackBar() {
    this.snackBarShown = false;
    this._snackBar.dismiss();
  }


  // dialog full screen
  dialogAddImage() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    
    // this.startScan().then((res: boolean) => {
    //   if (res) {


    //     console.log('### sunt true', )
    //   }

    // })
    
    // if (!this.deviceIsDesktop) {
      this.dialog.open(DialogAddImageComponent, {
        minWidth: '100vw',
        height: '100vh',
        panelClass: 'dialog-class-adaugaImaginePrinCamera',
        data: false
      }).afterClosed().subscribe(
        (e) => {
          if (!!e) {
            console.log('e', e);
          }
        }
        // (imagineCategoriePrezentaEducator: ImagineCategoriePrezentaEducator) => {
        //   if (imagineCategoriePrezentaEducator.imagine) {
        //     console.log('am primit : ', imagineCategoriePrezentaEducator);
        //     const params: UploadImagineDocumnetPanouRequest = {
        //       continutImagine: imagineCategoriePrezentaEducator.imagine,
        //       idPanouInformatii: idPanouInformatii
        //     }
        //     this.working.emit(true);
        //     // nota: aveam timeout=50000 explicit
        //     this.panouriService.UploadImagine(params, null).subscribe(
        //       _ => {
        //         this.working.emit(false);
        //         this.amIncarcatImagineNoua.emit();
        //       },
        //       _ => this.working.emit(false));
        //   }
        // }
      );
    // }
  }

  open() {
    window.open(this.scanResult, '_system', 'location=yes');
  }
 
  handleFile(files: FileList) {
    if (!!files) {
      const file = files.item(0);
  
      var img = new Image();
      img.onload = () => {
        this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
        const imageData = this.canvasContext.getImageData(
          0,
          0,
          this.canvasElement.width,
          this.canvasElement.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        })
  
        if (code) {
          console.log('😁 from image', )
          this.scanResult = code.data;
          this.openSnackBar();      
        }
      }
      img.src = URL.createObjectURL(file);
    }
  }

  captureImage() {
    this.fileinput.nativeElement.click();
  }

}
