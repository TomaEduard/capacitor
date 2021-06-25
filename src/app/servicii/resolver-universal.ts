import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { finalize, catchError, map } from 'rxjs/operators';

import { CopiiService, AdministratoriService, GrupaService, EducatoriService, PrezentaCopiiService, TaxeService, ContService, PlatiService, ClientService, PanouDeInformatiiService } from '../backendapi/services';
import { AtentionareAcsService } from './atentionare-acs.service';
import { ParintiService } from '../backendapi/services/parinti.service';

export class Apis {
  public router: Router;
  public copiiService: CopiiService;
  public administratoriService: AdministratoriService;
  public grupaService: GrupaService;
  public educatoriService: EducatoriService;
  public parintiService: ParintiService;
  public prezentaCopiiService: PrezentaCopiiService;
  public taxeService: TaxeService;
  public contService: ContService;
  public platiService: PlatiService;
  public clientService: ClientService;
  public panouInformatiiService: PanouDeInformatiiService;
}

@Injectable({
  providedIn: 'root'
})

export class ResolverUniversal implements Resolve<any> {

  private apis: Apis;

  constructor(
    private router: Router,
    private copiiService: CopiiService,
    private administratoriService: AdministratoriService,
    private grupaService: GrupaService,
    private educatoriService: EducatoriService,
    private parintiService: ParintiService,
    private prezentaCopiiService: PrezentaCopiiService,
    private taxeService: TaxeService,
    private contService: ContService,
    private platiService: PlatiService,
    private atentionari: AtentionareAcsService,
    private clientService: ClientService,
    private panouInformatiiService: PanouDeInformatiiService,
  ) {
    this.apis = new Apis();
    this.apis.copiiService = copiiService;
    this.apis.administratoriService = administratoriService;
    this.apis.grupaService = grupaService;
    this.apis.educatoriService = educatoriService;
    this.apis.parintiService = parintiService;
    this.apis.prezentaCopiiService = prezentaCopiiService;
    this.apis.taxeService = taxeService;
    this.apis.contService = contService;
    this.apis.platiService = platiService;
    this.apis.clientService = clientService;
    this.apis.panouInformatiiService = panouInformatiiService;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (route.component) {
      let c: any;
      c = route.component;
      if (c.ResolveUniversal) {

        // Pregatesc parametrii pentru Resolver; In principu extrag din Ruta tot ce pot
        let ru;
        try {
          ru = c.ResolveUniversal(route.params, route.queryParams, this.apis);
        } catch (error) {
          // S-a intamplat "ceva" cand am apelat ResolveUniversal... ce? De ce?
          console.log(`A fost ridicata o exceptie cand am apelat ResolveUniversal. ${error.message}`);
          this.atentionari.Eroare(error.message);
          return EMPTY;
        }

        if (ru === EMPTY) {
          return EMPTY;
        }

        // "ru" este sau nu Observable?
        if (ru instanceof Observable) {
          // No bun, "ru" este Observable, incerc sa citesc datele
          this.atentionari.PornesteProgressBar('resolver-universal');

          return ru
            .pipe(
              map(d => {

                if (d) {
                  return d;
                }

                this.atentionari.Eroare('API nu a returnat date');
                return EMPTY;
              }),
              finalize(() => {
                this.atentionari.OpresteProgressBar('resolver-universal');
              }),
              catchError(error => {
                this.atentionari.Eroare(JSON.stringify(error));
                return EMPTY;
              })
            );
        } else {
          this.atentionari.Eroare('ResolveUniversal nu a returnat un Observable');
        }

      } else {
        this.atentionari.Eroare('Nu are o metoda ResolveUniversal');
        return EMPTY;
      }
    } else {
      // Nu am componenta: nu pot rezolva
      this.atentionari.Eroare('Ruta nu are Componenta');
      return EMPTY;
    }

  }
}
