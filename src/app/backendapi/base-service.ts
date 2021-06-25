/*
  2018.12.14

	  Am modificat acest template sa foloseasca ApiEndpointService pentru identificat root URL, adica am desfiintat
	  algoritmul cu _rootUrl

	2019.01.06

		Am inclus serviciul AtentionareAcsService ca sa pot porni si opri automat progressbar-ul si ca sa pot afisa automat
		mesaje de eroare in caz de... eroare.

	2019.01.07

		Am inclus metoda public static ExtrageMesajEroare ca sa am codul pentru decodat mesajul de eroare intr-un singur loc.

*/
import { ApiEndpointService } from '../servicii/api-endpoint-service';
import { AtentionareAcsService } from '../servicii/atentionare-acs.service';

/* tslint:disable */
import { HttpClient, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

/**
 * Custom parameter codec to correctly handle the plus sign in parameter
 * values. See https://github.com/angular/angular/issues/18261
 */
class ParameterCodec implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
const PARAMETER_CODEC = new ParameterCodec();

/**
 * Base class for API services
 */
export class BaseService {

  public static ExtrageMesajEroare(err: any, status: any): string {
    if (err.error) {
      const e = err.error;
      let mesaj = null;

      // Pot citi mesaj ca property?
      try {
        mesaj = e.mesajEroareCB3;
      } catch {
        mesaj = null;
      }

      let mesaj_implicit = 'Eroare API: ' + e;
      if (status === 403) {
        mesaj_implicit = 'Nu sunteti autorizat 403';
      }

      // mesaj este null sau undefined?
      if (mesaj == null) {
        if (typeof e === 'string') {
          // e este cumva un string care seamana cu un JSON-Object?
          if ((new RegExp('\\"mesajEroareCB3\\"\\ *\\:\\ *\\"')).test(e)) {
            // Incerc sa decodez obiectul json
            try {
              const obj = JSON.parse(e);
              mesaj = obj.mesajEroareCB3;
            } catch {
              mesaj = null;
            }

            if (mesaj == null) {
              mesaj = mesaj_implicit;
            }

          } else {
            mesaj = mesaj_implicit;
          }
        } else {
          mesaj = 'A intervenit o eroare API necunoscuta';
        }
      }

      return mesaj;
    } else {
      // err nu contine un obiect error; Nu stiu ce-i err!
      if (typeof err === 'string') {
        return err;
      } else {
        if (err.name === 'TimeoutError') return 'Serverul nu a raspuns in timpul alocat (Timeout Error)';
        return 'Eroare apel API';
      }
    }

  }

  constructor(
    protected config: ApiConfiguration,
    protected http: HttpClient,
    protected apiEndpoint: ApiEndpointService,
	  protected atentionare: AtentionareAcsService
  ) {
  }

  /**
   * Returns the root url for API operations. If not set directly in this
   * service, will fallback to ApiConfiguration.rootUrl.
   */
  get rootUrl(): string {
    return this.apiEndpoint.ApiEndpoint.url;
  }

  /**
   * Creates a new `HttpParams` with the correct codec
   */
  protected newParams(): HttpParams {
    return new HttpParams({
      encoder: PARAMETER_CODEC
    });
  }
}
