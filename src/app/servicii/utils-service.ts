import { EducatoriService, AniService } from '../backendapi/services';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AniBazaDeDate } from '../backendapi/models';
import { NumeToken, Rol, NumeTokenAni, NumeTokenAnSelectat } from '../utile/constante.comune';
import { AniUi } from '../modele-locale/ani-ui';
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UtilsService {
  private previousUrls: string[] = [];
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private aniService: AniService,
  ) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      // daca cel pe care vreau sa il adaug acum este cel care a fost 1 tura inainte, nu mai adaug nimic, ci sterg ultima inregistrare
      if (event instanceof NavigationEnd) {
        if (this.previousUrl === event.url) {
          this.previousUrls.splice(this.previousUrls.length - 1, 1);
          this.previousUrl = this.previousUrls[this.previousUrls.length - 1];
          this.currentUrl = event.url;
        } else {
          this.previousUrls.push(this.currentUrl);
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;
        }
      };
    });
  }

  navigateBack() {
    if (!this.previousUrl || this.previousUrl === "/") {
      if (!!this.currentUrl) {
        const routerLinkArray = this.currentUrl.split("/").map(p => "/" + p);
        routerLinkArray.splice(0, 1);
        routerLinkArray.splice(routerLinkArray.length - 1, 1);
        this.router.navigate(routerLinkArray);
      } else {
        this.router.navigate(["/"]);
      }
    } else {
      this.router.navigate([this.previousUrl]);
    }
  }

  GoToUserHomePage(token: string) {
    const decodedToken = this.parseJwt(token);
    switch (decodedToken.rol) {
      case 'Educator':
        this.router.navigate(['/prezentaeducator']);
        break;
      case 'Parinte':
        this.router.navigate(['/prezentaparinti']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  parseJwt(token) {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }
  }

  CalculeazaCoordonatePentruPopup() {
    const latime = (80 * window.screen.width) / 100;
    const inaltime = (80 * window.screen.height) / 100;
    const top = (window.screen.height - inaltime) / 2;
    const left = (window.screen.width - latime) / 2;
    return `width=${latime},height=${inaltime},top=${top},left=${left}`;
  }

  getNextTempId(listaIduri: string[]) {
    let nextId = 1;
    if (!!listaIduri) {
      const iduriTemporare = listaIduri.filter(p => p.includes('tempId')).map(p => +(p.replace('tempId', '')));
      nextId = iduriTemporare.length > 0 ? iduriTemporare.reduce((a, b) => Math.max(a, b)) + 1 : 1;
    }
    return 'tempId' + nextId;
  }

  getIdUserLogat() {
    const decodedToken = this.parseJwt(localStorage.getItem(NumeToken));
    return !!decodedToken ? decodedToken.sub : '';
  }

  transformaStringInGuid(idUserLogat: string): string {
    // exemplar return: eb72e8de-77bb-4c83-96f4-2ae8d074e077
    let string1 = idUserLogat.slice(0, 8).concat('-');
    let string2 = idUserLogat.slice(8, 12).concat('-');
    let string3 = idUserLogat.slice(12, 16).concat('-');
    let string4 = idUserLogat.slice(16, 20).concat('-');
    let string5 = idUserLogat.slice(20, 32);
    return string1.concat(string2, string3, string4, string5);
  }

  getUserRole() {
    const decodedToken = this.parseJwt(localStorage.getItem(NumeToken));
    return !!decodedToken ? decodedToken.rol : '';
  }

  EsteAdminACS(): boolean {
    const decodedToken = this.parseJwt(localStorage.getItem(NumeToken));
    return decodedToken ? decodedToken.adminACS === 'True' : false;
  }

  esteUserAutentificat() {
    return !!localStorage.getItem(NumeToken);
  }

  esteParinte() {
    return this.getUserRole() === Rol.Parinte;
  }

  esteAdministrator() {
    return this.getUserRole() === Rol.Administrator;
  }

  esteEducator() {
    return this.getUserRole() === Rol.Educator;
  }

  getAni() {
    return new Promise<AniUi>(resolve => {
      // luam datele salvate pentru UI
      let aniDinSession = sessionStorage.getItem(NumeTokenAni);
      let anCurentUI = localStorage.getItem(NumeTokenAnSelectat);
      let rezultat: AniUi;

      // am toate datele local, doar le returnez
      if (!!aniDinSession) {
        const aniDB: AniBazaDeDate = JSON.parse(aniDinSession);
        rezultat = {
          listaAni: aniDB.ani,
          anCurentAPI: aniDB.anulCurent,
          // daca nu am inca un an selectat in UI, il folosesc pe cel din API
          anCurentUI: anCurentUI ? JSON.parse(anCurentUI) : aniDB.anulCurent
        }
        resolve(rezultat);
      } else {
        // daca nu am lista cu ani salvata in SessionStorage, inseamna ca este prima data cand am nevoie de ele. 
        this.aniService.ListaAni(null, 7000).subscribe(result => {
          // Le iau din API si le salvez in SessionStorage lista cu ani si anul selectat in DB.
          this.setAni(result);
          rezultat = {
            listaAni: result.ani,
            anCurentAPI: result.anulCurent,
            // daca nu am inca un an selectat in UI, il folosesc pe cel din API
            anCurentUI: anCurentUI ? JSON.parse(anCurentUI) : result.anulCurent
          }
          resolve(rezultat);
        });
      }
    });
  }

  setAni(aniDb?: AniBazaDeDate, anSelectatUI?: number) {
    if (!!aniDb) {
      sessionStorage.setItem(NumeTokenAni, JSON.stringify(aniDb));
    }
    if (anSelectatUI) {
      localStorage.setItem(NumeTokenAnSelectat, JSON.stringify(anSelectatUI))
    }
  }

  primaLiteraMare(inputString: string) {
    if (!inputString || inputString.length === 0) {
      return inputString;
    } else {
      return inputString.charAt(0).toUpperCase() + inputString.substr(1).toLowerCase();
    }
  }

  dateleSuntEgale(data1: string, data2: string) {
    return this.datePipe.transform(data1, 'yyyy-MM-dd').valueOf() === this.datePipe.transform(data2, 'yyyy-MM-dd').valueOf();
  }

  dateleDateSuntEgale(data1: Date, data2: Date) {
    return data1.valueOf() === data2.valueOf();
  }
  
  dateleFaraTimpSuntEgale(data1: Date, data2: Date) {
    const d1 = new Date(data1.getFullYear(), data1.getMonth(), data1.getDate());
    const d2 = new Date(data2.getFullYear(), data2.getMonth(), data2.getDate());
    return d1.valueOf() === d2.valueOf();
  }

  ExtrageHashCodUnicDbDinJWT() {
    const jwt = localStorage.getItem(NumeToken);
    const helper = new JwtHelperService();
    try {
      const decodedToken = helper.decodeToken(jwt);
      return decodedToken.DBID;
    } catch {
      return undefined;
    }
  }

  copiazaInObiectNou(obiect: any) {
    return JSON.parse(JSON.stringify(obiect));
  }

  numarZileInLuna(an: number, luna: number){
    return new Date(an, luna + 1, 0).getDate();
  }

  numarZileIntreDateleInclusiv(data1: Date, data2: Date){
    const difTimp = Math.abs(data1.valueOf()-data2.valueOf());
    const difZile = Math.ceil(difTimp / (1000 * 60 * 60 * 24)); 
    return difZile;
  }

  esteInAcelasiAnScolar(dataCurenta: Date, anDeVerificat: number){
    let rezultat = false;

    if (dataCurenta.getFullYear() === anDeVerificat) {
      // daca este vorba de acelasi an, trebuie sa fie cel putin luna Septembrie, altfel sunt in anul Scolar anterior
      rezultat = dataCurenta.getMonth() >= 8;
    } else if (dataCurenta.getFullYear() - 1 === anDeVerificat) {
      // sunt cu un an peste anul de verificat, trebuie sa fie luna mai mica de iunie
      rezultat = dataCurenta.getMonth() < 6;
    }
    return rezultat;
  }
}
