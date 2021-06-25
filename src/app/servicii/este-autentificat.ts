import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UtilsService } from './utils-service';

@Injectable({
  providedIn: 'root'
})
export class EsteAutentificat implements CanActivate {

  constructor(
    private utils: UtilsService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    // verifica daca userul aste autentificat
    let autentificat = this.utils.esteUserAutentificat();
    // daca avem route.data si aceasta contine informatii despre rolurile pe care vrem sa le autentificam
    if (route.data && 'auth' in route.data) {
      // verificam daca rolul utilizatorului curent este printre cele cerute in a fi autentificate
      const roluri: string[] = route.data.auth;
      if (roluri.includes(this.utils.getUserRole())) {
        autentificat = true;
      } else {
        autentificat = false;
      }
    }
    return autentificat
  }
}