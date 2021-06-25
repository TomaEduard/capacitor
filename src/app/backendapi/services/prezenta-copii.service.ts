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
import { GrupaPentruPrezenta } from '../models/grupa-pentru-prezenta';
import { PrezentaCopilModel } from '../models/prezenta-copil-model';
import { InformatiiPrezenta } from '../models/informatii-prezenta';
import { TaxaSpecialaEfectuataModel } from '../models/taxa-speciala-efectuata-model';
import { PrezentaCopilTaxaModel } from '../models/prezenta-copil-taxa-model';
import { ParametriInchideListaPrezenta } from '../models/parametri-inchide-lista-prezenta';
import { ParametriModificarePrezentaCuListaInchisa } from '../models/parametri-modificare-prezenta-cu-lista-inchisa';
@Injectable({
  providedIn: 'root',
})
class PrezentaCopiiService extends __BaseService {
  static readonly GetPrezentaGrupaLaDataPath = '/api/PrezentaCopii/GetPrezentaGrupaLaData';
  static readonly GetPrezentaCopilInLunaPath = '/api/PrezentaCopii/GetPrezentaCopilInLuna';
  static readonly SeteazaCaPrezentPath = '/api/PrezentaCopii';
  static readonly SeteazaCaAbsentPath = '/api/PrezentaCopii';
  static readonly GetInformatiiPrezentaPath = '/api/PrezentaCopii/GetInformatiiPrezenta';
  static readonly GetInformatiiPrezentaPentruParintePath = '/api/PrezentaCopii/GetInformatiiPrezentaPentruParinte';
  static readonly ModificaZiCuActivitatePath = '/api/PrezentaCopii/ModificaZiCuActivitate';
  static readonly AdaugaModificaTaxaSpecialaEfectuataPath = '/api/PrezentaCopii/AdaugaModificaTaxaSpecialaEfectuata';
  static readonly ModificaPrezentaLaOraSpecialaPath = '/api/PrezentaCopii/ModificaPrezentaLaOraSpeciala';
  static readonly ZileCuActivitateInAnulPath = '/api/PrezentaCopii/ZileCuActivitateInAnul';
  static readonly InchideListaPrezentaPath = '/api/PrezentaCopii/InchideListaPrezenta';
  static readonly DeblocheazaListaPrezentaPath = '/api/PrezentaCopii/DeblocheazaListaPrezenta';
  static readonly ModficaPrezentaDinListaInchisaPath = '/api/PrezentaCopii/ModficaPrezentaDinListaInchisa';

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
   * @param params The `PrezentaCopiiService.GetPrezentaGrupaLaDataParams` containing the following parameters:
   *
   * - `laData`:
   *
   * - `grupaId`:
   *
   * @return Success
   */
  GetPrezentaGrupaLaDataResponse(params: PrezentaCopiiService.GetPrezentaGrupaLaDataParams, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<GrupaPentruPrezenta>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (params.laData != null) __params = __params.set('laData', params.laData.toString());
    if (params.grupaId != null) __params = __params.set('grupaId', params.grupaId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/PrezentaCopii/GetPrezentaGrupaLaData`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'GetPrezentaGrupaLaData' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<GrupaPentruPrezenta>;
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
          return _r as __StrictHttpResponse<GrupaPentruPrezenta>;
        })
      );
    }
  }
  /**
   * @param params The `PrezentaCopiiService.GetPrezentaGrupaLaDataParams` containing the following parameters:
   *
   * - `laData`:
   *
   * - `grupaId`:
   *
   * @return Success
   */
  GetPrezentaGrupaLaData(params: PrezentaCopiiService.GetPrezentaGrupaLaDataParams, faraProgressBar?: boolean, timeout?: number): __Observable<GrupaPentruPrezenta> {
    return this.GetPrezentaGrupaLaDataResponse(params, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as GrupaPentruPrezenta)
    );
  }

  /**
   * @param params The `PrezentaCopiiService.GetPrezentaCopilInLunaParams` containing the following parameters:
   *
   * - `laData`:
   *
   * - `copilId`:
   *
   * @return Success
   */
  GetPrezentaCopilInLunaResponse(params: PrezentaCopiiService.GetPrezentaCopilInLunaParams, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<Array<PrezentaCopilModel>>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (params.laData != null) __params = __params.set('laData', params.laData.toString());
    if (params.copilId != null) __params = __params.set('copilId', params.copilId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/PrezentaCopii/GetPrezentaCopilInLuna`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'GetPrezentaCopilInLuna' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<Array<PrezentaCopilModel>>;
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
          return _r as __StrictHttpResponse<Array<PrezentaCopilModel>>;
        })
      );
    }
  }
  /**
   * @param params The `PrezentaCopiiService.GetPrezentaCopilInLunaParams` containing the following parameters:
   *
   * - `laData`:
   *
   * - `copilId`:
   *
   * @return Success
   */
  GetPrezentaCopilInLuna(params: PrezentaCopiiService.GetPrezentaCopilInLunaParams, faraProgressBar?: boolean, timeout?: number): __Observable<Array<PrezentaCopilModel>> {
    return this.GetPrezentaCopilInLunaResponse(params, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as Array<PrezentaCopilModel>)
    );
  }

  /**
   * @param prezentaCopil undefined
   * @return Success
   */
  SeteazaCaPrezentResponse(prezentaCopil?: PrezentaCopilModel, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<PrezentaCopilModel>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = prezentaCopil;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/PrezentaCopii`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'SeteazaCaPrezent' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<PrezentaCopilModel>;
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
          return _r as __StrictHttpResponse<PrezentaCopilModel>;
        })
      );
    }
  }
  /**
   * @param prezentaCopil undefined
   * @return Success
   */
  SeteazaCaPrezent(prezentaCopil?: PrezentaCopilModel, faraProgressBar?: boolean, timeout?: number): __Observable<PrezentaCopilModel> {
    return this.SeteazaCaPrezentResponse(prezentaCopil, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as PrezentaCopilModel)
    );
  }

  /**
   * @param prezentaCopil undefined
   * @return Success
   */
  SeteazaCaAbsentResponse(prezentaCopil?: PrezentaCopilModel, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<PrezentaCopilModel>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = prezentaCopil;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/PrezentaCopii`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'SeteazaCaAbsent' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<PrezentaCopilModel>;
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
          return _r as __StrictHttpResponse<PrezentaCopilModel>;
        })
      );
    }
  }
  /**
   * @param prezentaCopil undefined
   * @return Success
   */
  SeteazaCaAbsent(prezentaCopil?: PrezentaCopilModel, faraProgressBar?: boolean, timeout?: number): __Observable<PrezentaCopilModel> {
    return this.SeteazaCaAbsentResponse(prezentaCopil, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as PrezentaCopilModel)
    );
  }

  /**
   * @param params The `PrezentaCopiiService.GetInformatiiPrezentaParams` containing the following parameters:
   *
   * - `luna`:
   *
   * - `anCalendaristic`:
   *
   * - `EducatorId`:
   *
   * @return Success
   */
  GetInformatiiPrezentaResponse(params: PrezentaCopiiService.GetInformatiiPrezentaParams, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<InformatiiPrezenta>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (params.luna != null) __params = __params.set('luna', params.luna.toString());
    if (params.anCalendaristic != null) __params = __params.set('anCalendaristic', params.anCalendaristic.toString());
    if (params.EducatorId != null) __params = __params.set('EducatorId', params.EducatorId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/PrezentaCopii/GetInformatiiPrezenta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'GetInformatiiPrezenta' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<InformatiiPrezenta>;
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
          return _r as __StrictHttpResponse<InformatiiPrezenta>;
        })
      );
    }
  }
  /**
   * @param params The `PrezentaCopiiService.GetInformatiiPrezentaParams` containing the following parameters:
   *
   * - `luna`:
   *
   * - `anCalendaristic`:
   *
   * - `EducatorId`:
   *
   * @return Success
   */
  GetInformatiiPrezenta(params: PrezentaCopiiService.GetInformatiiPrezentaParams, faraProgressBar?: boolean, timeout?: number): __Observable<InformatiiPrezenta> {
    return this.GetInformatiiPrezentaResponse(params, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as InformatiiPrezenta)
    );
  }

  /**
   * @param params The `PrezentaCopiiService.GetInformatiiPrezentaPentruParinteParams` containing the following parameters:
   *
   * - `persoanaId`:
   *
   * - `luna`:
   *
   * - `anCalendaristic`:
   *
   * @return Success
   */
  GetInformatiiPrezentaPentruParinteResponse(params: PrezentaCopiiService.GetInformatiiPrezentaPentruParinteParams, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<InformatiiPrezenta>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (params.persoanaId != null) __params = __params.set('persoanaId', params.persoanaId.toString());
    if (params.luna != null) __params = __params.set('luna', params.luna.toString());
    if (params.anCalendaristic != null) __params = __params.set('anCalendaristic', params.anCalendaristic.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/PrezentaCopii/GetInformatiiPrezentaPentruParinte`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'GetInformatiiPrezentaPentruParinte' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<InformatiiPrezenta>;
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
          return _r as __StrictHttpResponse<InformatiiPrezenta>;
        })
      );
    }
  }
  /**
   * @param params The `PrezentaCopiiService.GetInformatiiPrezentaPentruParinteParams` containing the following parameters:
   *
   * - `persoanaId`:
   *
   * - `luna`:
   *
   * - `anCalendaristic`:
   *
   * @return Success
   */
  GetInformatiiPrezentaPentruParinte(params: PrezentaCopiiService.GetInformatiiPrezentaPentruParinteParams, faraProgressBar?: boolean, timeout?: number): __Observable<InformatiiPrezenta> {
    return this.GetInformatiiPrezentaPentruParinteResponse(params, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as InformatiiPrezenta)
    );
  }

  /**
   * @param params The `PrezentaCopiiService.ModificaZiCuActivitateParams` containing the following parameters:
   *
   * - `data`:
   *
   * - `AmActivitate`:
   */
  ModificaZiCuActivitateResponse(params: PrezentaCopiiService.ModificaZiCuActivitateParams, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (params.data != null) __params = __params.set('data', params.data.toString());
    if (params.AmActivitate != null) __params = __params.set('AmActivitate', params.AmActivitate.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/PrezentaCopii/ModificaZiCuActivitate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ModificaZiCuActivitate' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param params The `PrezentaCopiiService.ModificaZiCuActivitateParams` containing the following parameters:
   *
   * - `data`:
   *
   * - `AmActivitate`:
   */
  ModificaZiCuActivitate(params: PrezentaCopiiService.ModificaZiCuActivitateParams, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.ModificaZiCuActivitateResponse(params, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param model undefined
   */
  AdaugaModificaTaxaSpecialaEfectuataResponse(model?: TaxaSpecialaEfectuataModel, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = model;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/PrezentaCopii/AdaugaModificaTaxaSpecialaEfectuata`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'AdaugaModificaTaxaSpecialaEfectuata' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param model undefined
   */
  AdaugaModificaTaxaSpecialaEfectuata(model?: TaxaSpecialaEfectuataModel, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.AdaugaModificaTaxaSpecialaEfectuataResponse(model, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param prezenta undefined
   */
  ModificaPrezentaLaOraSpecialaResponse(prezenta?: PrezentaCopilTaxaModel, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = prezenta;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/PrezentaCopii/ModificaPrezentaLaOraSpeciala`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ModificaPrezentaLaOraSpeciala' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param prezenta undefined
   */
  ModificaPrezentaLaOraSpeciala(prezenta?: PrezentaCopilTaxaModel, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.ModificaPrezentaLaOraSpecialaResponse(prezenta, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param anCalendaristic undefined
   * @return Success
   */
  ZileCuActivitateInAnulResponse(anCalendaristic?: number, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<Array<string>>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (anCalendaristic != null) __params = __params.set('anCalendaristic', anCalendaristic.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/PrezentaCopii/ZileCuActivitateInAnul`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ZileCuActivitateInAnul' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param anCalendaristic undefined
   * @return Success
   */
  ZileCuActivitateInAnul(anCalendaristic?: number, faraProgressBar?: boolean, timeout?: number): __Observable<Array<string>> {
    return this.ZileCuActivitateInAnulResponse(anCalendaristic, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as Array<string>)
    );
  }

  /**
   * @param requestParams undefined
   * @return Success
   */
  InchideListaPrezentaResponse(requestParams?: ParametriInchideListaPrezenta, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<GrupaPentruPrezenta>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = requestParams;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/PrezentaCopii/InchideListaPrezenta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'InchideListaPrezenta' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<GrupaPentruPrezenta>;
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
          return _r as __StrictHttpResponse<GrupaPentruPrezenta>;
        })
      );
    }
  }
  /**
   * @param requestParams undefined
   * @return Success
   */
  InchideListaPrezenta(requestParams?: ParametriInchideListaPrezenta, faraProgressBar?: boolean, timeout?: number): __Observable<GrupaPentruPrezenta> {
    return this.InchideListaPrezentaResponse(requestParams, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as GrupaPentruPrezenta)
    );
  }

  /**
   * @param idListaDePrezentaFinalizata undefined
   * @return Success
   */
  DeblocheazaListaPrezentaResponse(idListaDePrezentaFinalizata?: string, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (idListaDePrezentaFinalizata != null) __params = __params.set('idListaDePrezentaFinalizata', idListaDePrezentaFinalizata.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/PrezentaCopii/DeblocheazaListaPrezenta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'DeblocheazaListaPrezenta' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
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
          return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
        })
      );
    }
  }
  /**
   * @param idListaDePrezentaFinalizata undefined
   * @return Success
   */
  DeblocheazaListaPrezenta(idListaDePrezentaFinalizata?: string, faraProgressBar?: boolean, timeout?: number): __Observable<boolean> {
    return this.DeblocheazaListaPrezentaResponse(idListaDePrezentaFinalizata, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param request undefined
   */
  ModficaPrezentaDinListaInchisaResponse(request?: ParametriModificarePrezentaCuListaInchisa, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/PrezentaCopii/ModficaPrezentaDinListaInchisa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ModficaPrezentaDinListaInchisa' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
  ModficaPrezentaDinListaInchisa(request?: ParametriModificarePrezentaCuListaInchisa, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.ModficaPrezentaDinListaInchisaResponse(request, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module PrezentaCopiiService {

  /**
   * Parameters for GetPrezentaGrupaLaData
   */
  export interface GetPrezentaGrupaLaDataParams {
    laData?: string;
    grupaId?: string;
  }

  /**
   * Parameters for GetPrezentaCopilInLuna
   */
  export interface GetPrezentaCopilInLunaParams {
    laData?: string;
    copilId?: string;
  }

  /**
   * Parameters for GetInformatiiPrezenta
   */
  export interface GetInformatiiPrezentaParams {
    luna?: number;
    anCalendaristic?: number;
    EducatorId?: string;
  }

  /**
   * Parameters for GetInformatiiPrezentaPentruParinte
   */
  export interface GetInformatiiPrezentaPentruParinteParams {
    persoanaId?: string;
    luna?: number;
    anCalendaristic?: number;
  }

  /**
   * Parameters for ModificaZiCuActivitate
   */
  export interface ModificaZiCuActivitateParams {
    data?: string;
    AmActivitate?: boolean;
  }
}

export { PrezentaCopiiService }
