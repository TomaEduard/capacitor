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
import { DetaliiPanouDeInformatii } from '../models/detalii-panou-de-informatii';
import { ModelPanouDeInformatii } from '../models/model-panou-de-informatii';
import { UploadImagineDocumnetPanouRequest } from '../models/upload-imagine-documnet-panou-request';
@Injectable({
  providedIn: 'root',
})
class PanouDeInformatiiService extends __BaseService {
  static readonly ListaPanouriPath = '/api/PanouDeInformatii/ListaPanouri';
  static readonly PanouInformatiiPath = '/api/PanouDeInformatii/PanouInformatii';
  static readonly AdaugaModificaPanouPath = '/api/PanouDeInformatii/AdaugaModificaPanou';
  static readonly StergePanouPath = '/api/PanouDeInformatii/StergePanou';
  static readonly StergeDocumentPath = '/api/PanouDeInformatii/StergeDocument';
  static readonly UploadImaginePath = '/api/PanouDeInformatii/UploadImagine';
  static readonly DownloadImaginePath = '/api/PanouDeInformatii/DownloadImagine/{latime}/{inaltime}/{modIncadrare}/{idPanouInformatiiDocument}/{numeFisier}';

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
  ListaPanouriResponse(faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<Array<DetaliiPanouDeInformatii>>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/PanouDeInformatii/ListaPanouri`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'ListaPanouri' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<Array<DetaliiPanouDeInformatii>>;
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
          return _r as __StrictHttpResponse<Array<DetaliiPanouDeInformatii>>;
        })
      );
    }
  }
  /**
   * @return Success
   */
  ListaPanouri(faraProgressBar?: boolean, timeout?: number): __Observable<Array<DetaliiPanouDeInformatii>> {
    return this.ListaPanouriResponse(faraProgressBar, timeout).pipe(
      __map(_r => _r.body as Array<DetaliiPanouDeInformatii>)
    );
  }

  /**
   * @param params The `PanouDeInformatiiService.PanouInformatiiParams` containing the following parameters:
   *
   * - `idPanou`:
   *
   * - `anScolar`:
   *
   * @return Success
   */
  PanouInformatiiResponse(params: PanouDeInformatiiService.PanouInformatiiParams, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<DetaliiPanouDeInformatii>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (params.idPanou != null) __params = __params.set('idPanou', params.idPanou.toString());
    if (params.anScolar != null) __params = __params.set('anScolar', params.anScolar.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/PanouDeInformatii/PanouInformatii`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'PanouInformatii' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
          return _r as __StrictHttpResponse<DetaliiPanouDeInformatii>;
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
          return _r as __StrictHttpResponse<DetaliiPanouDeInformatii>;
        })
      );
    }
  }
  /**
   * @param params The `PanouDeInformatiiService.PanouInformatiiParams` containing the following parameters:
   *
   * - `idPanou`:
   *
   * - `anScolar`:
   *
   * @return Success
   */
  PanouInformatii(params: PanouDeInformatiiService.PanouInformatiiParams, faraProgressBar?: boolean, timeout?: number): __Observable<DetaliiPanouDeInformatii> {
    return this.PanouInformatiiResponse(params, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as DetaliiPanouDeInformatii)
    );
  }

  /**
   * @param model undefined
   */
  AdaugaModificaPanouResponse(model?: ModelPanouDeInformatii, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = model;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/PanouDeInformatii/AdaugaModificaPanou`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'AdaugaModificaPanou' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
  AdaugaModificaPanou(model?: ModelPanouDeInformatii, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.AdaugaModificaPanouResponse(model, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param idPanou undefined
   */
  StergePanouResponse(idPanou?: string, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (idPanou != null) __params = __params.set('idPanou', idPanou.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/PanouDeInformatii/StergePanou`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'StergePanou' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param idPanou undefined
   */
  StergePanou(idPanou?: string, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.StergePanouResponse(idPanou, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param idDocument undefined
   */
  StergeDocumentResponse(idDocument?: string, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    if (idDocument != null) __params = __params.set('idDocument', idDocument.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/PanouDeInformatii/StergeDocument`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    const cod = 'StergeDocument' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param idDocument undefined
   */
  StergeDocument(idDocument?: string, faraProgressBar?: boolean, timeout?: number): __Observable<null> {
    return this.StergeDocumentResponse(idDocument, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param request undefined
   * @return Success
   */
  UploadImagineResponse(request?: UploadImagineDocumnetPanouRequest, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/PanouDeInformatii/UploadImagine`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'UploadImagine' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param request undefined
   * @return Success
   */
  UploadImagine(request?: UploadImagineDocumnetPanouRequest, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.UploadImagineResponse(request, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param params The `PanouDeInformatiiService.DownloadImagineParams` containing the following parameters:
   *
   * - `numeFisier`:
   *
   * - `modIncadrare`:
   *
   * - `latime`:
   *
   * - `inaltime`:
   *
   * - `idPanouInformatiiDocument`:
   *
   * @return Success
   */
  DownloadImagineResponse(params: PanouDeInformatiiService.DownloadImagineParams, faraProgressBar?: boolean, timeout?: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    const token = localStorage.getItem(NumeToken);
    let __headers = token ? new HttpHeaders().set("Authorization", "Bearer " + token) : new HttpHeaders();
    let __body: any = null;





    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/PanouDeInformatii/DownloadImagine/${encodeURIComponent(params.latime)}/${encodeURIComponent(params.inaltime)}/${encodeURIComponent(params.modIncadrare)}/${encodeURIComponent(params.idPanouInformatiiDocument)}/${encodeURIComponent(params.numeFisier)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    const cod = 'DownloadImagine' + Math.floor(Math.random() * 999999) + '_' + Math.floor(Math.random() * 999999);

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
   * @param params The `PanouDeInformatiiService.DownloadImagineParams` containing the following parameters:
   *
   * - `numeFisier`:
   *
   * - `modIncadrare`:
   *
   * - `latime`:
   *
   * - `inaltime`:
   *
   * - `idPanouInformatiiDocument`:
   *
   * @return Success
   */
  DownloadImagine(params: PanouDeInformatiiService.DownloadImagineParams, faraProgressBar?: boolean, timeout?: number): __Observable<string> {
    return this.DownloadImagineResponse(params, faraProgressBar, timeout).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module PanouDeInformatiiService {

  /**
   * Parameters for PanouInformatii
   */
  export interface PanouInformatiiParams {
    idPanou?: string;
    anScolar?: number;
  }

  /**
   * Parameters for DownloadImagine
   */
  export interface DownloadImagineParams {
    numeFisier: string;
    modIncadrare: 0 | 1;
    latime: number;
    inaltime: number;
    idPanouInformatiiDocument: string;
  }
}

export { PanouDeInformatiiService }
