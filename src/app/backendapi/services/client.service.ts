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

import { InformatiiClientModel } from '../models/informatii-client-model';
@Injectable({
  providedIn: 'root',
})
class ClientService extends __BaseService {
  static readonly GetInformatiiClientPath = '/api/Client/GetInformatiiClient';
  static readonly ModificaInformatiiClientPath = '/api/Client';
  static readonly ExtrageToateHeaderelePath = '/api/Client/ExtrageToateHeaderele';

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
  GetInformatiiClientResponse(faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<InformatiiClientModel>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Client/GetInformatiiClient`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'GetInformatiiClient' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<InformatiiClientModel>;
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
          return _r as __StrictHttpResponse<InformatiiClientModel>;
        })
      );
    }
  }
  /**
   * @return Success
   */
  GetInformatiiClient(faraProgressBar?: boolean, timeout?: number): __Observable<InformatiiClientModel> {
    return this.GetInformatiiClientResponse(faraProgressBar, timeout).pipe(
      __map(_r => _r.body as InformatiiClientModel)
    );
  }

  /**
   * @param client undefined
   * @return Success
   */
  ModificaInformatiiClientResponse(client?: InformatiiClientModel, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = client;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Client`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'ModificaInformatiiClient' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<string>;
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
          return _r as __StrictHttpResponse<string>;
        })
      );
    }
  }
  /**
   * @param client undefined
   * @return Success
   */
  ModificaInformatiiClient(client?: InformatiiClientModel, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.ModificaInformatiiClientResponse(client, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @return Success
   */
  ExtrageToateHeadereleResponse(faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<{[key: string]: string}>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Client/ExtrageToateHeaderele`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ExtrageToateHeaderele' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<{[key: string]: string}>;
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
          return _r as __StrictHttpResponse<{[key: string]: string}>;
        })
      );
    }
  }
  /**
   * @return Success
   */
  ExtrageToateHeaderele(faraProgressBar?: boolean, timeout?: number): __Observable<{[key: string]: string}> {
    return this.ExtrageToateHeadereleResponse(faraProgressBar, timeout).pipe(
      __map(_r => _r.body as {[key: string]: string})
    );
  }
}

module ClientService {
}

export { ClientService }
