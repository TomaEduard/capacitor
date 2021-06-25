/*
	2019.01.06

		Am inclus serviciul AtentionareAcsService ca sa pot porni si opri automat progressbar-ul si ca sa pot afisa automat
		mesaje de eroare in caz de... eroare.

  2019.02.12

    Import modulul Router ca sa pot redirecta in caz de status 401

*/

/* tslint:disable */
import { ApiEndpointService } from '../../servicii/api-endpoint-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter, catchError as __catchError, finalize as __finalize, timeout as __timeout } from 'rxjs/operators';
import { AtentionareAcsService } from '../../servicii/atentionare-acs.service';
import { Router } from '@angular/router';
import { NumeToken } from 'src/utile/constante.comune';

import { InformatiiDinBazaDeDate } from '../models/informatii-din-baza-de-date';
@Injectable({
  providedIn: 'root',
})
class SuportDeployService extends __BaseService {
  static readonly ListeazaBazeDeDatePath = '/api/SuportDeploy/ListeazaBazeDeDate';
  static readonly InfoBazaDeDatePath = '/api/SuportDeploy/InfoBazaDeDate';

  constructor(
    config: __Configuration,
    http: HttpClient,
    endpoint: ApiEndpointService,
	at: AtentionareAcsService,
  private router: Router
  ) {
    super(config, http, endpoint, at);
  }

  /**
   * @return Success
   */
  ListeazaBazeDeDateResponse(faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<Array<string>>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/SuportDeploy/ListeazaBazeDeDate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ListeazaBazeDeDate' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

    if (faraProgressBar !== true) { this.atentionare.PornesteProgressBar(cod); }

    if (timeout == 0) {
      return this.http.request<any>(req)
      .pipe(
        __catchError(err => {
          const mesaj = __BaseService.ExtrageMesajEroare(err, err.status === 401);
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          } else if (err.status === 403) {
            this.atentionare.Eroare(mesaj);
          } else {
            this.atentionare.Eroare(mesaj);
          }
          throw mesaj;
        }),
        __finalize(() => { if (faraProgressBar !== true) { this.atentionare.OpresteProgressBar(cod); }}),
        __filter(_r => _r instanceof HttpResponse),
        __map((_r) => {
          return _r as __StrictHttpResponse<Array<string>>;
        })
      );
    } else {
      return this.http.request<any>(req)
      .pipe(
        __timeout(!!timeout ? timeout : 2000),
        __catchError(err => {
          const mesaj = __BaseService.ExtrageMesajEroare(err, err.status === 401);
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          } else if (err.status === 403) {
            this.atentionare.Eroare(mesaj);
          } else {
            this.atentionare.Eroare(mesaj);
          }
          throw mesaj;
        }),
        __finalize(() => { if (faraProgressBar !== true) { this.atentionare.OpresteProgressBar(cod); }}),
        __filter(_r => _r instanceof HttpResponse),
        __map((_r) => {
          return _r as __StrictHttpResponse<Array<string>>;
        })
      );
    }
  }
  /**
   * @return Success
   */
  ListeazaBazeDeDate(faraProgressBar?: boolean, timeout?: number): __Observable<Array<string>> {
    return this.ListeazaBazeDeDateResponse(faraProgressBar, timeout).pipe(
      __map(_r => _r.body as Array<string>)
    );
  }

  /**
   * @param codUnicBd undefined
   * @return Success
   */
  InfoBazaDeDateResponse(codUnicBd?: string, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<InformatiiDinBazaDeDate>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (codUnicBd != null) __params = __params.set('codUnicBd', codUnicBd.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/SuportDeploy/InfoBazaDeDate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'InfoBazaDeDate' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

    if (faraProgressBar !== true) { this.atentionare.PornesteProgressBar(cod); }

    if (timeout == 0) {
      return this.http.request<any>(req)
      .pipe(
        __catchError(err => {
          const mesaj = __BaseService.ExtrageMesajEroare(err, err.status === 401);
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          } else if (err.status === 403) {
            this.atentionare.Eroare(mesaj);
          } else {
            this.atentionare.Eroare(mesaj);
          }
          throw mesaj;
        }),
        __finalize(() => { if (faraProgressBar !== true) { this.atentionare.OpresteProgressBar(cod); }}),
        __filter(_r => _r instanceof HttpResponse),
        __map((_r) => {
          return _r as __StrictHttpResponse<InformatiiDinBazaDeDate>;
        })
      );
    } else {
      return this.http.request<any>(req)
      .pipe(
        __timeout(!!timeout ? timeout : 2000),
        __catchError(err => {
          const mesaj = __BaseService.ExtrageMesajEroare(err, err.status === 401);
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          } else if (err.status === 403) {
            this.atentionare.Eroare(mesaj);
          } else {
            this.atentionare.Eroare(mesaj);
          }
          throw mesaj;
        }),
        __finalize(() => { if (faraProgressBar !== true) { this.atentionare.OpresteProgressBar(cod); }}),
        __filter(_r => _r instanceof HttpResponse),
        __map((_r) => {
          return _r as __StrictHttpResponse<InformatiiDinBazaDeDate>;
        })
      );
    }
  }
  /**
   * @param codUnicBd undefined
   * @return Success
   */
  InfoBazaDeDate(codUnicBd?: string, faraProgressBar?: boolean, timeout?: number): __Observable<InformatiiDinBazaDeDate> {
    return this.InfoBazaDeDateResponse(codUnicBd, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as InformatiiDinBazaDeDate)
    );
  }
}

module SuportDeployService {
}

export { SuportDeployService }
