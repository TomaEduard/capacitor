import { FeatureFileSystemComponent } from './page/feature-file-system/feature-file-system.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/shared/material-module';
import { AppRoutingModule } from 'src/app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FeatureCameraComponent } from './page/feature-camera/feature-camera.component';
import { FeaturesComponent } from './page/features/features.component';
import { HomeComponent } from './page/home/home.component';
import { FeatureNetworkComponent } from './page/feature-network/feature-network.component';
import { FeatureGeolocationComponent } from './page/feature-geolocation/feature-geolocation.component';
import { FeatureNotificationsComponent } from './page/feature-notifications/feature-notifications.component';
import { FeatureAccelerometerComponent } from './page/feature-accelerometer/feature-accelerometer.component';
import { HttpClientModule } from '@angular/common/http';
import { FereastraSnackbarMultipluComponent } from './dialogs/fereastra-snackbar-multiplu/fereastra-snackbar-multiplu.component';
import { AtentionareAcsService } from './servicii/atentionare-acs.service';
import { UtilsService } from './services/utils.service';
import { DocumentationComponent } from './page/documentation/documentation.component';
import { QrCodeComponent } from './page/qr-code/qr-code.component';

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
    FereastraSnackbarMultipluComponent,
    DocumentationComponent,
    QrCodeComponent
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
  providers: [
    AtentionareAcsService,
    UtilsService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
