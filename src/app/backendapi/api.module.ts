/*
  Atentie, acesta este un template MODIFICAT astfel incat sa pot include ApiEndpointService (si sa-l fac functional)
  Daca actualizezi ng-swagger-gen probabil trebuie actualizat si template-ul.

  Modificarile au fost urmatoarele:
  - Adaugat import ModuleWithProviders
  - Importat ApiEndpointService
  - Implementat metoda forRoot
*/

/* tslint:disable */
import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { HttpClientModule, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';
import { Observable } from 'rxjs';
import { NumeToken } from '../utile/constante.comune';

import { ApiEndpointService } from '../servicii/api-endpoint-service';

import { AdministratoriService } from './services/administratori.service';
import { AniService } from './services/ani.service';
import { AuthService } from './services/auth.service';
import { ClientService } from './services/client.service';
import { ContService } from './services/cont.service';
import { CopiiService } from './services/copii.service';
import { EducatoriService } from './services/educatori.service';
import { GrupaService } from './services/grupa.service';
import { PanouDeInformatiiService } from './services/panou-de-informatii.service';
import { ParintiService } from './services/parinti.service';
import { PlatiService } from './services/plati.service';
import { PrezentaCopiiService } from './services/prezenta-copii.service';
import { SuportDeployService } from './services/suport-deploy.service';
import { TaxeService } from './services/taxe.service';
import { UtilitareService } from './services/utilitare.service';

@Injectable()
export class H3 implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let id_token = localStorage.getItem(NumeToken);
        if (!id_token) {
            id_token = sessionStorage.getItem(NumeToken);
        }

        if (id_token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + id_token)
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    AdministratoriService,
    AniService,
    AuthService,
    ClientService,
    ContService,
    CopiiService,
    EducatoriService,
    GrupaService,
    PanouDeInformatiiService,
    ParintiService,
    PlatiService,
    PrezentaCopiiService,
    SuportDeployService,
    TaxeService,
    UtilitareService
	,{provide: HTTP_INTERCEPTORS, useClass: H3, multi: true}
  ],
})
export class ApiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [ ApiEndpointService ]
    };
  }
}
