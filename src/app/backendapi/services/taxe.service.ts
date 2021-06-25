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
import { TaxaSauAbonamentModel } from '../models/taxa-sau-abonament-model';
import { ProgramTaxaSpecialaPerGrupaModel } from '../models/program-taxa-speciala-per-grupa-model';

@Injectable({
  providedIn: 'root',
})
class TaxeService extends __BaseService {
  static readonly ListaTaxePath = '/api/Taxe/ListaTaxe';
  static readonly TaxaPath = '/api/Taxe/Taxa';
  static readonly ProgramTaxaPath = '/api/Taxe/ProgramTaxa';
  static readonly AdaugaModificaProgramPath = '/api/Taxe/AdaugaModificaProgram';
  static readonly AdaugaModificaTaxaPath = '/api/Taxe/AdaugaModificaTaxa';
  static readonly StergeTaxaPath = '/api/Taxe/{id}';

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
   * @param arataArhivate undefined
   * @return Success
   */
  ListaTaxeResponse(arataArhivate?: boolean, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<Array<TaxaSauAbonamentModel>>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (arataArhivate != null) __params = __params.set('arataArhivate', arataArhivate.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Taxe/ListaTaxe`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ListaTaxe' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<Array<TaxaSauAbonamentModel>>;
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
          return _r as __StrictHttpResponse<Array<TaxaSauAbonamentModel>>;
        })
      );
    }
  }
  /**
   * @param arataArhivate undefined
   * @return Success
   */
  ListaTaxe(arataArhivate?: boolean, faraProgressBar?: boolean, timeout?: number): __Observable<Array<TaxaSauAbonamentModel>> {
    return this.ListaTaxeResponse(arataArhivate, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as Array<TaxaSauAbonamentModel>)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  TaxaResponse(id?: string, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<TaxaSauAbonamentModel>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Taxe/Taxa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'Taxa' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<TaxaSauAbonamentModel>;
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
          return _r as __StrictHttpResponse<TaxaSauAbonamentModel>;
        })
      );
    }
  }
  /**
   * @param id undefined
   * @return Success
   */
  Taxa(id?: string, faraProgressBar?: boolean, timeout?: number): __Observable<TaxaSauAbonamentModel> {
    return this.TaxaResponse(id, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as TaxaSauAbonamentModel)
    );
  }

  /**
   * @param params The `TaxeService.ProgramTaxaParams` containing the following parameters:
   *
   * - `idTaxaSauAbonament`:
   *
   * - `grupaId`:
   *
   * @return Success
   */
  ProgramTaxaResponse(params: TaxeService.ProgramTaxaParams, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<ProgramTaxaSpecialaPerGrupaModel>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (params.idTaxaSauAbonament != null) __params = __params.set('idTaxaSauAbonament', params.idTaxaSauAbonament.toString());
    if (params.grupaId != null) __params = __params.set('grupaId', params.grupaId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Taxe/ProgramTaxa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ProgramTaxa' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<ProgramTaxaSpecialaPerGrupaModel>;
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
          return _r as __StrictHttpResponse<ProgramTaxaSpecialaPerGrupaModel>;
        })
      );
    }
  }
  /**
   * @param params The `TaxeService.ProgramTaxaParams` containing the following parameters:
   *
   * - `idTaxaSauAbonament`:
   *
   * - `grupaId`:
   *
   * @return Success
   */
  ProgramTaxa(params: TaxeService.ProgramTaxaParams, faraProgressBar?: boolean, timeout?: number): __Observable<ProgramTaxaSpecialaPerGrupaModel> {
    return this.ProgramTaxaResponse(params, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as ProgramTaxaSpecialaPerGrupaModel)
    );
  }

  /**
   * @param programModel undefined
   */
  AdaugaModificaProgramResponse(programModel?: ProgramTaxaSpecialaPerGrupaModel, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = programModel;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Taxe/AdaugaModificaProgram`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'AdaugaModificaProgram' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param programModel undefined
   */
  AdaugaModificaProgram(programModel?: ProgramTaxaSpecialaPerGrupaModel, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.AdaugaModificaProgramResponse(programModel, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param taxaSauAbonamentModel undefined
   * @return Success
   */
  AdaugaModificaTaxaResponse(taxaSauAbonamentModel?: TaxaSauAbonamentModel, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = taxaSauAbonamentModel;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Taxe/AdaugaModificaTaxa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'AdaugaModificaTaxa' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param taxaSauAbonamentModel undefined
   * @return Success
   */
  AdaugaModificaTaxa(taxaSauAbonamentModel?: TaxaSauAbonamentModel, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.AdaugaModificaTaxaResponse(taxaSauAbonamentModel, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  StergeTaxaResponse(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Taxe/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'StergeTaxa' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
  StergeTaxa(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.StergeTaxaResponse(id, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module TaxeService {

  /**
   * Parameters for ProgramTaxa
   */
  export interface ProgramTaxaParams {
    idTaxaSauAbonament?: string;
    grupaId?: string;
  }
}

export { TaxeService }
