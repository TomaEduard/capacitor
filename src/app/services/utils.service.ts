import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public isMobile$: Observable<boolean> = this.isMobile.asObservable();

  constructor(
    public http: HttpClient,
  ) { }

  // protected newParams(): HttpParams {
  //   return new HttpParams({
  //     encoder: this.PARAMETER_CODEC
  //   });
  // }

  // PARAMETER_CODEC = new ParameterCodec();

  // GasesteUtilizator(numeUtilizator?: string): __Observable<Array<VariantaLogare>> {
  //   return this.GasesteUtilizatorResponse(numeUtilizator).pipe(
  //     __map(_r => _r['body'] as Array<VariantaLogare>)
  //   );
  // }

  // GasesteUtilizatorResponse(numeUtilizator?: string): any {

  //   console.log('#2', numeUtilizator)

  //   let __params = this.newParams();
  //   let __headers = new HttpHeaders();
  //   let __body: any = null;
  //   if (numeUtilizator != null) __params = __params.set('numeUtilizator', numeUtilizator.toString());

  //   let req = new HttpRequest<any>(
  //     'POST',
  //     'https://gradinita28.e-taxe.ro/api/Auth/login',
  //     __body,
  //     {
  //       headers: __headers,
  //       params: __params,
  //       responseType: 'json'
  //     }
  //   );
    
  //   console.log('#3', JSON.stringify(req))
    
  //   return this.http.request<any>(req)
  //   .pipe(

  //     __catchError(err => {
  //       window.alert(JSON.stringify(err))
  //       console.error('*******', JSON.stringify(err))
  //       throw err;
  //     }),

  //     __filter(_r => _r instanceof HttpResponse),

  //     __map((_r) => {
  //       return _r as __StrictHttpResponse<VariantaLogare[]>;
  //     })

  //   );

  // }
  
}
