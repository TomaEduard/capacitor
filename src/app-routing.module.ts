import { QrCodeComponent } from './app/page/qr-code/qr-code.component';
import { DocumentationComponent } from './app/page/documentation/documentation.component';
import { FeatureGeolocationComponent } from './app/page/feature-geolocation/feature-geolocation.component';
import { FeatureNotificationsComponent } from './app/page/feature-notifications/feature-notifications.component';
import { FeatureNetworkComponent } from './app/page/feature-network/feature-network.component';
import { FeatureFileSystemComponent } from './app/page/feature-file-system/feature-file-system.component';
import { FeaturesComponent } from './app/page/features/features.component';
import { FeatureCameraComponent } from './app/page/feature-camera/feature-camera.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [

  //  Documentation
  {
    path: 'documentation',
    component: DocumentationComponent,
  },

  // Features
  {
    path: 'features',
    component: FeaturesComponent,
  },

  // 
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

  // {
  //   path: 'features/camera',
  //   component: FeaturesComponent,
  //   children: [
  //     {
  //       path: 'camera',
  //       pathMatch: 'full',
  //       component: FeatureCameraComponent,
  //     },
  //     {
  //       path: 'file-system',
  //       pathMatch: 'full',
  //       component: FeatureFileSystemComponent,
  //     },

  //   ],
  // },

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
