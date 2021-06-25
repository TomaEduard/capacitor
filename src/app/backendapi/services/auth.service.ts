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

import { LoginResponse } from '../models/login-response';
import { LoginRequest } from '../models/login-request';
import { SchimbaParolaRequest } from '../models/schimba-parola-request';
import { ReseteazaParolaResponse } from '../models/reseteaza-parola-response';
import { ReseteazaParolaRequest } from '../models/reseteaza-parola-request';
import { NumeToken } from 'src/utile/constante.comune';

@Injectable({
  providedIn: 'root',
})
class AuthService extends __BaseService {
  static readonly VerificaLoginPath = '/api/Auth/login';
  static readonly PingPath = '/api/Auth/ping';
  static readonly SchimbaParolaPath = '/api/Auth/SchimbaParola';
  static readonly ReseteazaParolaPath = '/api/Auth/ReseteazaParola';
  static readonly RegenereazaContAdministratorACSPath = '/api/Auth/RegenereazaContAdmin/{numeCont}/{continutValidare}';

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
   * @param loginParams undefined
   * @return Success
   */
  VerificaLoginResponse(loginParams?: LoginRequest, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<LoginResponse>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = loginParams;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Auth/login`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    // console.log('req', req)
    // console.log('__headers', __headers)
    // window.alert(this.rootUrl);

    const cod = 'VerificaLogin' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<LoginResponse>;
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
          return _r as __StrictHttpResponse<LoginResponse>;
        })
      );
    }
  }
  /**
   * @param loginParams undefined
   * @return Success
   */
  VerificaLogin(loginParams?: LoginRequest, faraProgressBar?: boolean, timeout?: number): __Observable<LoginResponse> {
    return this.VerificaLoginResponse(loginParams, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as LoginResponse)
    );
  }

  /**
   * @return Success
   */
  PingResponse(faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Auth/ping`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'Ping' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @return Success
   */
  Ping(faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.PingResponse(faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param request undefined
   */
  SchimbaParolaResponse(request?: SchimbaParolaRequest, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Auth/SchimbaParola`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'SchimbaParola' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<null>;
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
          return _r as __StrictHttpResponse<null>;
        })
      );
    }
  }
  /**
   * @param request undefined
   */
  SchimbaParola(request?: SchimbaParolaRequest, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.SchimbaParolaResponse(request, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param request undefined
   * @return Success
   */
  ReseteazaParolaResponse(request?: ReseteazaParolaRequest, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<ReseteazaParolaResponse>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Auth/ReseteazaParola`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ReseteazaParola' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<ReseteazaParolaResponse>;
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
          return _r as __StrictHttpResponse<ReseteazaParolaResponse>;
        })
      );
    }
  }
  /**
   * @param request undefined
   * @return Success
   */
  ReseteazaParola(request?: ReseteazaParolaRequest, faraProgressBar?: boolean, timeout?: number): __Observable<ReseteazaParolaResponse> {
    return this.ReseteazaParolaResponse(request, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as ReseteazaParolaResponse)
    );
  }

  /**
   * @param params The `AuthService.RegenereazaContAdministratorACSParams` containing the following parameters:
   *
   * - `numeCont`:
   *
   * - `continutValidare`:
   *
   * - `parolaCont`:
   *
   * - `codUnicDb`:
   *
   * - `codFiscal`:
   *
   * @return Success
   */
  RegenereazaContAdministratorACSResponse(params: AuthService.RegenereazaContAdministratorACSParams, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;


    if (params.parolaCont != null) __params = __params.set('parolaCont', params.parolaCont.toString());
    if (params.codUnicDb != null) __params = __params.set('codUnicDb', params.codUnicDb.toString());
    if (params.codFiscal != null) __params = __params.set('codFiscal', params.codFiscal.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Auth/RegenereazaContAdmin/${encodeURIComponent(params.numeCont)}/${encodeURIComponent(params.continutValidare)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'RegenereazaContAdministratorACS' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param params The `AuthService.RegenereazaContAdministratorACSParams` containing the following parameters:
   *
   * - `numeCont`:
   *
   * - `continutValidare`:
   *
   * - `parolaCont`:
   *
   * - `codUnicDb`:
   *
   * - `codFiscal`:
   *
   * @return Success
   */
  RegenereazaContAdministratorACS(params: AuthService.RegenereazaContAdministratorACSParams, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.RegenereazaContAdministratorACSResponse(params, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module AuthService {

  /**
   * Parameters for RegenereazaContAdministratorACS
   */
  export interface RegenereazaContAdministratorACSParams {
    numeCont: string;
    continutValidare: string;
    parolaCont?: string;
    codUnicDb?: string;
    codFiscal?: string;
  }
}

export { AuthService }
