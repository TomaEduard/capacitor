import { Observable } from 'rxjs';
import { DetaliiEntitate } from './detalii-entitate.interface';

declare module 'rxjs/internal/Observable' {
  interface Observable<T> {
    subscribeFinalizeEditEntityPage( 
      this: Observable<T>,
      component: any
    ): void;
  }
}

Observable.prototype.subscribeFinalizeEditEntityPage =
  function (
    this: Observable<any>,
    component: DetaliiEntitate
  ): void {
    component.working = true;
    this.subscribe(
      success => {
        component.initialObject = component.preiaDetaliiForm();
        // go back one level
        const routerLinkArray = component.route.snapshot.url.map(p => p.path);
        routerLinkArray.splice(routerLinkArray.length - 1, 1);
        component.router.navigate(routerLinkArray);

        component.working = false;
      },
      error => {
        component.working = false;
      }
    );
  };