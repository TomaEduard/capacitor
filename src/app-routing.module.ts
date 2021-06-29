import { JsqrComponent } from './app/page/plugins/jsqr/jsqr.component';
import { ZxingComponent } from './app/page/plugins/zxing/zxing.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DocumentationComponent } from "./app/page/capacitor/documentation/documentation.component";
import { FeatureCameraComponent } from "./app/page/capacitor/feature-camera/feature-camera.component";
import { FeatureFileSystemComponent } from "./app/page/capacitor/feature-file-system/feature-file-system.component";
import { FeatureGeolocationComponent } from "./app/page/capacitor/feature-geolocation/feature-geolocation.component";
import { FeatureNetworkComponent } from "./app/page/capacitor/feature-network/feature-network.component";
import { FeatureNotificationsComponent } from "./app/page/capacitor/feature-notifications/feature-notifications.component";
import { FeaturesComponent } from "./app/page/capacitor/features/features.component";
import { QrCodeComponent } from "./app/page/capacitor/qr-code/qr-code.component";


const routes: Routes = [

  // Plugins
  {
    path: 'ZXing',
    component: ZxingComponent,
  },
  {
    path: 'jsQR',
    component: JsqrComponent,
  },

  // Capacitor
  {
    path: 'documentation',
    component: DocumentationComponent,
  },
  {
    path: 'features',
    component: FeaturesComponent,
  },

  {
    path: 'features/qr-code',
    component: QrCodeComponent,
  },
  {
    path: 'features/camera',
    component: FeatureCameraComponent,
  },
  {
    path: 'features/file-system',
    component: FeatureFileSystemComponent,
  },
  {
    path: 'features/network',
    component: FeatureNetworkComponent,
  },
  {
    path: 'features/geolocation',
    component: FeatureGeolocationComponent,
  },
  {
    path: 'features/notifications',
    component: FeatureNotificationsComponent,
  },
  {
    path: 'features/accelerometer',
    component: FeatureNotificationsComponent,
  },

  {
    path: '**',
    component: DocumentationComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// @NgModule({
//   // imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
//   // imports: [RouterModule.forChild(routes)],
//   // imports: [RouterModule.forRoot(routes)],
//   // imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: true })],

//   imports: [
//     CommonModule,
//     RouterModule.forRoot(routes),
//   ],
//   declarations: [],

//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
