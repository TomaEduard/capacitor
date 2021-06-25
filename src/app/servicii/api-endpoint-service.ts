import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IApiEndpointDef } from './iapi-endpoint-def';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointService {

  private ApiEndpointDeFolosit: IApiEndpointDef;

  constructor() {
    this.ApiEndpointDeFolosit = undefined;
  }

  public get ApiEndpoint(): IApiEndpointDef {
    const parsedUrl = new URL(window.location.href);
    const bazaURLPagina = 'https://testlive1.e-taxe.ro';
    if (bazaURLPagina.startsWith('testlive1.e-taxe.ro')) {
      const cb3_use_api = localStorage.getItem('cb3_use_api');
      if (cb3_use_api) {
        for (const test of environment.api_urls) {
          if (test.nume === cb3_use_api) {
            return test;
          }
        }
        // Daca am ajuns aici inseamna ca n-am gasit API dupa nume.
        return environment.api_urls[0];
      } else {
        return environment.api_urls[0];
      }
    } else {
      if (!this.ApiEndpointDeFolosit) {
        this.ApiEndpointDeFolosit = {
          nume: 'URL baza',
          url: bazaURLPagina
        }
      }
      return this.ApiEndpointDeFolosit;
    }
  }

  public set ApiEndpoint(value: IApiEndpointDef) {
    // Ma asigur ca endpoint-ul specificat exista efectiv in lista
    let gasit = false;
    for (const test of environment.api_urls) {
      if (test.nume === value.nume && test.url === value.url) {
        gasit = true;
      }
    }
    if (gasit) {
      localStorage.setItem('cb3_use_api', value.nume);
    }
  }

  public EndpointDisponibile(): IApiEndpointDef[] {
    return environment.api_urls;
  }

}
