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
import { ListaCopiiParintiResponse } from '../models/lista-copii-parinti-response';
import { SolduriParintiResponse } from '../models/solduri-parinti-response';
import { InfoChitanta } from '../models/info-chitanta';
import { DatePentruDebitarePlata } from '../models/date-pentru-debitare-plata';
import { ModelDatePentruPlata } from '../models/model-date-pentru-plata';
import { ChitantaModel } from '../models/chitanta-model';
import { FiltrareChitante } from '../models/filtrare-chitante';
import { ModelDatePentruDebitare } from '../models/model-date-pentru-debitare';
import { DateDebitareTotala } from '../models/date-debitare-totala';
import { RequestAnulareOperatiuneFinanciara } from '../models/request-anulare-operatiune-financiara';
import { DetaliiRestituire } from '../models/detalii-restituire';
@Injectable({
  providedIn: 'root',
})
class PlatiService extends __BaseService {
  static readonly ListaCopiiParintiPath = '/api/Plati/ListaCopiiParinti';
  static readonly SolduriParintiPath = '/api/Plati/SolduriParinti';
  static readonly IstoricPlatiParintiPath = '/api/Plati/IstoricPlatiParinti';
  static readonly DebiteazaPath = '/api/Plati/Debiteaza';
  static readonly DatePentruPlataPath = '/api/Plati/DatePentruPlata';
  static readonly EmiteChitantaPath = '/api/Plati/EmiteChitanta';
  static readonly ChitantePath = '/api/Plati/Chitante';
  static readonly DatePentruDebitarePath = '/api/Plati/DatePentruDebitare';
  static readonly DebitareTotalaPath = '/api/Plati/DebitareTotala';
  static readonly AnuleazaChitantaPath = '/api/Plati/AnuleazaChitanta';
  static readonly StergeChitantaPath = '/api/Plati/StergeChitanta';
  static readonly RegularizeazaPath = '/api/Plati/Regularizeaza';
  static readonly ListaRestiruiriPath = '/api/Plati/ListaRestiruiri';
  static readonly StergeRestituireaPath = '/api/Plati/StergeRestituirea';
  static readonly AnuleazaRestituireaPath = '/api/Plati/AnuleazaRestituirea';
  static readonly DetaliiRestituirePath = '/api/Plati/{id}';
  static readonly ModificaRestiruirePath = '/api/Plati';

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
   * @param anScolar undefined
   * @return Success
   */
  ListaCopiiParintiResponse(anScolar?: number, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<ListaCopiiParintiResponse>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (anScolar != null) __params = __params.set('anScolar', anScolar.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Plati/ListaCopiiParinti`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ListaCopiiParinti' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<ListaCopiiParintiResponse>;
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
          return _r as __StrictHttpResponse<ListaCopiiParintiResponse>;
        })
      );
    }
  }
  /**
   * @param anScolar undefined
   * @return Success
   */
  ListaCopiiParinti(anScolar?: number, faraProgressBar?: boolean, timeout?: number): __Observable<ListaCopiiParintiResponse> {
    return this.ListaCopiiParintiResponse(anScolar, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as ListaCopiiParintiResponse)
    );
  }

  /**
   * @return Success
   */
  SolduriParintiResponse(faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<SolduriParintiResponse>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Plati/SolduriParinti`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'SolduriParinti' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

    if (faraProgressBar !== true) { this.atentionare.PornesteProgressBar(cod); }

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
        return _r as __StrictHttpResponse<SolduriParintiResponse>;
      })
    );
  }
  /**
   * @return Success
   */
  SolduriParinti(faraProgressBar?: boolean, timeout?: number): __Observable<SolduriParintiResponse> {
    return this.SolduriParintiResponse(faraProgressBar, timeout).pipe(
      __map(_r => _r.body as SolduriParintiResponse)
    );
  }

  /**
   * @return Success
   */
  IstoricPlatiParintiResponse(faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<Array<InfoChitanta>>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Plati/IstoricPlatiParinti`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'IstoricPlatiParinti' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

    if (faraProgressBar !== true) { this.atentionare.PornesteProgressBar(cod); }

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
        return _r as __StrictHttpResponse<Array<InfoChitanta>>;
      })
    );
  }
  /**
   * @return Success
   */
  IstoricPlatiParinti(faraProgressBar?: boolean, timeout?: number): __Observable<Array<InfoChitanta>> {
    return this.IstoricPlatiParintiResponse(faraProgressBar, timeout).pipe(
      __map(_r => _r.body as Array<InfoChitanta>)
    );
  }

  /**
   * @param request undefined
   * @return Success
   */
  DebiteazaResponse(request?: DatePentruDebitarePlata, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<ListaCopiiParintiResponse>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Plati/Debiteaza`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'Debiteaza' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<ListaCopiiParintiResponse>;
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
          return _r as __StrictHttpResponse<ListaCopiiParintiResponse>;
        })
      );
    }
  }
  /**
   * @param request undefined
   * @return Success
   */
  Debiteaza(request?: DatePentruDebitarePlata, faraProgressBar?: boolean, timeout?: number): __Observable<ListaCopiiParintiResponse> {
    return this.DebiteazaResponse(request, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as ListaCopiiParintiResponse)
    );
  }

  /**
   * @param date undefined
   * @return Success
   */
  DatePentruPlataResponse(date?: DatePentruDebitarePlata, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<ModelDatePentruPlata>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = date;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Plati/DatePentruPlata`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'DatePentruPlata' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<ModelDatePentruPlata>;
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
          return _r as __StrictHttpResponse<ModelDatePentruPlata>;
        })
      );
    }
  }
  /**
   * @param date undefined
   * @return Success
   */
  DatePentruPlata(date?: DatePentruDebitarePlata, faraProgressBar?: boolean, timeout?: number): __Observable<ModelDatePentruPlata> {
    return this.DatePentruPlataResponse(date, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as ModelDatePentruPlata)
    );
  }

  /**
   * @param chitantaModel undefined
   * @return Success
   */
  EmiteChitantaResponse(chitantaModel?: ChitantaModel, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = chitantaModel;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Plati/EmiteChitanta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'EmiteChitanta' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param chitantaModel undefined
   * @return Success
   */
  EmiteChitanta(chitantaModel?: ChitantaModel, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.EmiteChitantaResponse(chitantaModel, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param filtrareChitante undefined
   * @return Success
   */
  ChitanteResponse(filtrareChitante?: FiltrareChitante, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<Array<ChitantaModel>>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = filtrareChitante;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Plati/Chitante`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'Chitante' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<Array<ChitantaModel>>;
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
          return _r as __StrictHttpResponse<Array<ChitantaModel>>;
        })
      );
    }
  }
  /**
   * @param filtrareChitante undefined
   * @return Success
   */
  Chitante(filtrareChitante?: FiltrareChitante, faraProgressBar?: boolean, timeout?: number): __Observable<Array<ChitantaModel>> {
    return this.ChitanteResponse(filtrareChitante, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as Array<ChitantaModel>)
    );
  }

  /**
   * @return Success
   */
  DatePentruDebitareResponse(faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<ModelDatePentruDebitare>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Plati/DatePentruDebitare`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'DatePentruDebitare' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<ModelDatePentruDebitare>;
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
          return _r as __StrictHttpResponse<ModelDatePentruDebitare>;
        })
      );
    }
  }
  /**
   * @return Success
   */
  DatePentruDebitare(faraProgressBar?: boolean, timeout?: number): __Observable<ModelDatePentruDebitare> {
    return this.DatePentruDebitareResponse(faraProgressBar, timeout).pipe(
      __map(_r => _r.body as ModelDatePentruDebitare)
    );
  }

  /**
   * @param dateDebitare undefined
   */
  DebitareTotalaResponse(dateDebitare?: DateDebitareTotala, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = dateDebitare;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Plati/DebitareTotala`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'DebitareTotala' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param dateDebitare undefined
   */
  DebitareTotala(dateDebitare?: DateDebitareTotala, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.DebitareTotalaResponse(dateDebitare, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param request undefined
   */
  AnuleazaChitantaResponse(request?: RequestAnulareOperatiuneFinanciara, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Plati/AnuleazaChitanta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'AnuleazaChitanta' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
  AnuleazaChitanta(request?: RequestAnulareOperatiuneFinanciara, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.AnuleazaChitantaResponse(request, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param request undefined
   */
  StergeChitantaResponse(request?: RequestAnulareOperatiuneFinanciara, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Plati/StergeChitanta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'StergeChitanta' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
  StergeChitanta(request?: RequestAnulareOperatiuneFinanciara, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.StergeChitantaResponse(request, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param request undefined
   */
  RegularizeazaResponse(request?: DetaliiRestituire, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Plati/Regularizeaza`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'Regularizeaza' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
  Regularizeaza(request?: DetaliiRestituire, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.RegularizeazaResponse(request, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param request undefined
   * @return Success
   */
  ListaRestiruiriResponse(request?: FiltrareChitante, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<Array<DetaliiRestituire>>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Plati/ListaRestiruiri`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ListaRestiruiri' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<Array<DetaliiRestituire>>;
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
          return _r as __StrictHttpResponse<Array<DetaliiRestituire>>;
        })
      );
    }
  }
  /**
   * @param request undefined
   * @return Success
   */
  ListaRestiruiri(request?: FiltrareChitante, faraProgressBar?: boolean, timeout?: number): __Observable<Array<DetaliiRestituire>> {
    return this.ListaRestiruiriResponse(request, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as Array<DetaliiRestituire>)
    );
  }

  /**
   * @param request undefined
   */
  StergeRestituireaResponse(request?: RequestAnulareOperatiuneFinanciara, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Plati/StergeRestituirea`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'StergeRestituirea' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
  StergeRestituirea(request?: RequestAnulareOperatiuneFinanciara, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.StergeRestituireaResponse(request, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param request undefined
   */
  AnuleazaRestituireaResponse(request?: RequestAnulareOperatiuneFinanciara, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Plati/AnuleazaRestituirea`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'AnuleazaRestituirea' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
  AnuleazaRestituirea(request?: RequestAnulareOperatiuneFinanciara, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.AnuleazaRestituireaResponse(request, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  DetaliiRestituireResponse(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<DetaliiRestituire>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Plati/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'DetaliiRestituire' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<DetaliiRestituire>;
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
          return _r as __StrictHttpResponse<DetaliiRestituire>;
        })
      );
    }
  }
  /**
   * @param id undefined
   * @return Success
   */
  DetaliiRestituire(id: string, faraProgressBar?: boolean, timeout?: number): __Observable<DetaliiRestituire> {
    return this.DetaliiRestituireResponse(id, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as DetaliiRestituire)
    );
  }

  /**
   * @param request undefined
   */
  ModificaRestiruireResponse(request?: DetaliiRestituire, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Plati`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ModificaRestiruire' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
  ModificaRestiruire(request?: DetaliiRestituire, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.ModificaRestiruireResponse(request, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module PlatiService {
}

export { PlatiService }
