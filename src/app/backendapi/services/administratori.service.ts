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

import { AdministratorModel } from '../models/administrator-model';
import { NumeToken } from 'src/utile/constante.comune';
@Injectable({
  providedIn: 'root',
})
class AdministratoriService extends __BaseService {
  static readonly ListaAdministratoriPath = '/api/Administratori';
  static readonly ModificaAdministratorPath = '/api/Administratori';
  static readonly CreeazaAdministratorPath = '/api/Administratori';
  static readonly AdministratorPath = '/api/Administratori/{id}';
  static readonly StergeAdministratorPath = '/api/Administratori/{id}';

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
  ListaAdministratoriResponse(faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<Array<AdministratorModel>>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Administratori`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ListaAdministratori' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<Array<AdministratorModel>>;
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
          return _r as __StrictHttpResponse<Array<AdministratorModel>>;
        })
      );
    }
  }
  /**
   * @return Success
   */
  ListaAdministratori(faraProgressBar?: boolean, timeout?: number): __Observable<Array<AdministratorModel>> {
    return this.ListaAdministratoriResponse(faraProgressBar, timeout).pipe(
      __map(_r => _r.body as Array<AdministratorModel>)
    );
  }

  /**
   * @param administratorModel undefined
   * @return Success
   */
  ModificaAdministratorResponse(administratorModel?: AdministratorModel, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = administratorModel;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Administratori`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'ModificaAdministrator' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param administratorModel undefined
   * @return Success
   */
  ModificaAdministrator(administratorModel?: AdministratorModel, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.ModificaAdministratorResponse(administratorModel, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param params The `AdministratoriService.CreeazaAdministratorParams` containing the following parameters:
   *
   * - `clearTextPassword`:
   *
   * - `administratorModel`:
   *
   * @return Success
   */
  CreeazaAdministratorResponse(params: AdministratoriService.CreeazaAdministratorParams, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (params.clearTextPassword != null) __headers = __headers.set('clearTextPassword', params.clearTextPassword.toString());
    __body = params.administratorModel;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Administratori`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'CreeazaAdministrator' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param params The `AdministratoriService.CreeazaAdministratorParams` containing the following parameters:
   *
   * - `clearTextPassword`:
   *
   * - `administratorModel`:
   *
   * @return Success
   */
  CreeazaAdministrator(params: AdministratoriService.CreeazaAdministratorParams, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.CreeazaAdministratorResponse(params, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  AdministratorResponse(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<AdministratorModel>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Administratori/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'Administrator' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<AdministratorModel>;
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
          return _r as __StrictHttpResponse<AdministratorModel>;
        })
      );
    }
  }
  /**
   * @param id undefined
   * @return Success
   */
  Administrator(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<AdministratorModel> {
    return this.AdministratorResponse(id, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as AdministratorModel)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  StergeAdministratorResponse(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Administratori/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'StergeAdministrator' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param id undefined
   * @return Success
   */
  StergeAdministrator(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.StergeAdministratorResponse(id, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module AdministratoriService {

  /**
   * Parameters for CreeazaAdministrator
   */
  export interface CreeazaAdministratorParams {
    clearTextPassword?: string;
    administratorModel?: AdministratorModel;
  }
}

export { AdministratoriService }
