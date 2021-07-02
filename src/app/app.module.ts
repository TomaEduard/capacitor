import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "src/app-routing.module";
import { MaterialModule } from "src/shared/material-module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { DocumentationComponent } from "./page/capacitor/documentation/documentation.component";
import { FeatureAccelerometerComponent } from "./page/capacitor/feature-accelerometer/feature-accelerometer.component";
import { FeatureCameraComponent } from "./page/capacitor/feature-camera/feature-camera.component";
import { FeatureFileSystemComponent } from "./page/capacitor/feature-file-system/feature-file-system.component";
import { FeatureGeolocationComponent } from "./page/capacitor/feature-geolocation/feature-geolocation.component";
import { FeatureNetworkComponent } from "./page/capacitor/feature-network/feature-network.component";
import { FeatureNotificationsComponent } from "./page/capacitor/feature-notifications/feature-notifications.component";
import { FeaturesComponent } from "./page/capacitor/features/features.component";
import { QrCodeComponent } from "./page/capacitor/qr-code/qr-code.component";
import { HomeComponent } from "./page/home/home.component";
import { JsqrComponent } from "./page/plugins/jsqr/jsqr.component";
import { AppInfoDialogComponent } from "./page/plugins/zxing/app-info-dialog/app-info-dialog.component";
import { AppInfoComponent } from "./page/plugins/zxing/app-info/app-info.component";
import { FormatsDialogComponent } from "./page/plugins/zxing/formats-dialog/formats-dialog.component";
import { ZxingComponent } from "./page/plugins/zxing/zxing.component";
import { DialogAddImageComponent } from './page/plugins/jsqr/components/dialog-add-image/dialog-add-image.component';
import { CustomSnackbarComponent } from './page/plugins/custom-snackbar/custom-snackbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FeatureCameraComponent,
    FeatureFileSystemComponent,
    FeaturesComponent,
    HomeComponent,
    FeatureNetworkComponent,
    FeatureGeolocationComponent,
    FeatureNotificationsComponent,
    FeatureAccelerometerComponent,
    DocumentationComponent,
    QrCodeComponent,
    AppInfoDialogComponent,
    FormatsDialogComponent,
    ZxingComponent,
    AppInfoComponent,
    JsqrComponent,
    DialogAddImageComponent,
    CustomSnackbarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
