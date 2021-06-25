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
import { DetaliiCopil } from '../models/detalii-copil';
import { SolduriInitialeModel } from '../models/solduri-initiale-model';
@Injectable({
  providedIn: 'root',
})
class CopiiService extends __BaseService {
  static readonly ListaCopiiPath = '/api/Copii';
  static readonly CopilPath = '/api/Copii/{id}';
  static readonly StergeCopilPath = '/api/Copii/{id}';
  static readonly ModificaCopilPath = '/api/Copii/ModificaCopil';
  static readonly SolduriInitialePath = '/api/Copii/SolduriInitiale';
  static readonly AdaugaModificaSolduriInitialePath = '/api/Copii/AdaugaModificaSolduriInitiale';

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
  ListaCopiiResponse(inAnulScolar?: number, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<Array<DetaliiCopil>>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (inAnulScolar != null) __params = __params.set('inAnulScolar', inAnulScolar.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Copii`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ListaCopii' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<Array<DetaliiCopil>>;
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
          return _r as __StrictHttpResponse<Array<DetaliiCopil>>;
        })
      );
    }
  }
  /**
   * @param inAnulScolar undefined
   * @return Success
   */
  ListaCopii(inAnulScolar?: number, faraProgressBar?: boolean, timeout?: number): __Observable<Array<DetaliiCopil>> {
    return this.ListaCopiiResponse(inAnulScolar, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as Array<DetaliiCopil>)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  CopilResponse(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<DetaliiCopil>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Copii/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'Copil' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<DetaliiCopil>;
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
          return _r as __StrictHttpResponse<DetaliiCopil>;
        })
      );
    }
  }
  /**
   * @param id undefined
   * @return Success
   */
  Copil(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<DetaliiCopil> {
    return this.CopilResponse(id, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as DetaliiCopil)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  StergeCopilResponse(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Copii/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'StergeCopil' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
  StergeCopil(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.StergeCopilResponse(id, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param detaliiCopil undefined
   * @return Success
   */
  ModificaCopilResponse(detaliiCopil?: DetaliiCopil, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = detaliiCopil;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Copii/ModificaCopil`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'ModificaCopil' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param detaliiCopil undefined
   * @return Success
   */
  ModificaCopil(detaliiCopil?: DetaliiCopil, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.ModificaCopilResponse(detaliiCopil, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param anScolar undefined
   * @return Success
   */
  SolduriInitialeResponse(anScolar?: number, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<SolduriInitialeModel>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (anScolar != null) __params = __params.set('anScolar', anScolar.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Copii/SolduriInitiale`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'SolduriInitiale' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<SolduriInitialeModel>;
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
          return _r as __StrictHttpResponse<SolduriInitialeModel>;
        })
      );
    }
  }
  /**
   * @param anScolar undefined
   * @return Success
   */
  SolduriInitiale(anScolar?: number, faraProgressBar?: boolean, timeout?: number): __Observable<SolduriInitialeModel> {
    return this.SolduriInitialeResponse(anScolar, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as SolduriInitialeModel)
    );
  }

  /**
   * @param solduriInitiale undefined
   * @return Success
   */
  AdaugaModificaSolduriInitialeResponse(solduriInitiale?: SolduriInitialeModel, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<SolduriInitialeModel>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = solduriInitiale;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Copii/AdaugaModificaSolduriInitiale`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'AdaugaModificaSolduriInitiale' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<SolduriInitialeModel>;
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
          return _r as __StrictHttpResponse<SolduriInitialeModel>;
        })
      );
    }
  }
  /**
   * @param solduriInitiale undefined
   * @return Success
   */
  AdaugaModificaSolduriInitiale(solduriInitiale?: SolduriInitialeModel, faraProgressBar?: boolean, timeout?: number): __Observable<SolduriInitialeModel> {
    return this.AdaugaModificaSolduriInitialeResponse(solduriInitiale, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as SolduriInitialeModel)
    );
  }
}

module CopiiService {
}

export { CopiiService }
