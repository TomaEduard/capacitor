import { DialogDeactivateGuardComponent } from './dialog-deactivate-guard/dialog-deactivate-guard.component';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { take, exhaustMap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  // confirm(message?: string): Observable<boolean> {
  //   const confirmation = window.confirm(message || 'Are you sure?');
  //   //  daca se apasa ok se returneaza true, daca se apasa cancel se returneaza false
  //   return of(confirmation);
  // }

  confirm(titlu?: string, mesaj?: string): Observable<boolean> {
    // console.log('DialogService - confirm');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;

    dialogConfig.data = {
      titlu: titlu || 'Titlu',
      mesaj: mesaj || 'Mesaj'
    };
    return this.dialog.open(DialogDeactivateGuardComponent, dialogConfig).afterClosed().pipe(
      take(1),
      exhaustMap((res: boolean) => {
        if (res === true) {
          return of(true);
        }
        return of(false);
      })
    );
  }
  
  // Titlu
  TITLU_STERGERE: string = 'Confirmare ştergere';
  TITLU_NAVIGARE: string = 'Confirmare navigare';
  
  // Mesaj
  ConfirmareStergere(nume: string): string {
    return 'Sigur doriti sa stergeti ' + nume + '?';
  }
  
  MESAJ_NAVIGARE: string = 'Aveţi modificări care nu au fost salvate. Sigur doriţi să părăsiţi pagină?';
  
  
}
