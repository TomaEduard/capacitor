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
import { SumarGrupa } from '../models/sumar-grupa';
import { GrupaModel } from '../models/grupa-model';
@Injectable({
  providedIn: 'root',
})
class GrupaService extends __BaseService {
  static readonly ListaGrupePath = '/api/Grupa';
  static readonly ModificaGrupaPath = '/api/Grupa';
  static readonly CreeazaGrupaPath = '/api/Grupa';
  static readonly GrupaPath = '/api/Grupa/{id}';
  static readonly StergeGrupaPath = '/api/Grupa/{id}';

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
   * @param inAnulScolar undefined
   * @return Success
   */
  ListaGrupeResponse(inAnulScolar?: number, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<Array<SumarGrupa>>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (inAnulScolar != null) __params = __params.set('inAnulScolar', inAnulScolar.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Grupa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ListaGrupe' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<Array<SumarGrupa>>;
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
          return _r as __StrictHttpResponse<Array<SumarGrupa>>;
        })
      );
    }
  }
  /**
   * @param inAnulScolar undefined
   * @return Success
   */
  ListaGrupe(inAnulScolar?: number, faraProgressBar?: boolean, timeout?: number): __Observable<Array<SumarGrupa>> {
    return this.ListaGrupeResponse(inAnulScolar, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as Array<SumarGrupa>)
    );
  }

  /**
   * @param params The `GrupaService.ModificaGrupaParams` containing the following parameters:
   *
   * - `grupaModel`:
   *
   * - `dataModificare`:
   *
   * @return Success
   */
  ModificaGrupaResponse(params: GrupaService.ModificaGrupaParams, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = params.grupaModel;
    if (params.dataModificare != null) __params = __params.set('dataModificare', params.dataModificare.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Grupa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'ModificaGrupa' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param params The `GrupaService.ModificaGrupaParams` containing the following parameters:
   *
   * - `grupaModel`:
   *
   * - `dataModificare`:
   *
   * @return Success
   */
  ModificaGrupa(params: GrupaService.ModificaGrupaParams, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.ModificaGrupaResponse(params, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param params The `GrupaService.CreeazaGrupaParams` containing the following parameters:
   *
   * - `grupaModel`:
   *
   * - `dataModificare`:
   *
   * @return Success
   */
  CreeazaGrupaResponse(params: GrupaService.CreeazaGrupaParams, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = params.grupaModel;
    if (params.dataModificare != null) __params = __params.set('dataModificare', params.dataModificare.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Grupa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'CreeazaGrupa' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param params The `GrupaService.CreeazaGrupaParams` containing the following parameters:
   *
   * - `grupaModel`:
   *
   * - `dataModificare`:
   *
   * @return Success
   */
  CreeazaGrupa(params: GrupaService.CreeazaGrupaParams, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.CreeazaGrupaResponse(params, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  GrupaResponse(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<GrupaModel>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Grupa/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'Grupa' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<GrupaModel>;
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
          return _r as __StrictHttpResponse<GrupaModel>;
        })
      );
    }
  }
  /**
   * @param id undefined
   * @return Success
   */
  Grupa(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<GrupaModel> {
    return this.GrupaResponse(id, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as GrupaModel)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  StergeGrupaResponse(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Grupa/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'StergeGrupa' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
  StergeGrupa(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.StergeGrupaResponse(id, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module GrupaService {

  /**
   * Parameters for ModificaGrupa
   */
  export interface ModificaGrupaParams {
    grupaModel?: GrupaModel;
    dataModificare?: string;
  }

  /**
   * Parameters for CreeazaGrupa
   */
  export interface CreeazaGrupaParams {
    grupaModel?: GrupaModel;
    dataModificare?: string;
  }
}

export { GrupaService }
