import { Component, OnInit, Inject, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { timer, Subscription } from 'rxjs';
import { MesajPentruSnackbar } from 'src/app/servicii/atentionare-acs.service';
import { AtentionareAcsService } from 'src/app/servicii/atentionare-acs.service';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-fereastra-snackbar-multiplu',
  templateUrl: './fereastra-snackbar-multiplu.component.html',
  animations: [trigger('items', [
    transition(':enter', [
      style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
      animate('0.2s cubic-bezier(.8, -0.6, 0.2, 1.5)',
        style({ transform: 'scale(1)', opacity: 1 }))  // final
    ])
  , transition(':leave', [
    style({ transform: 'scale(1)', opacity: 1, height: '*' }),
    animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
     style({
       transform: 'scale(0.5)', opacity: 0,
       height: '0px', margin: '0px'
     }))
  ])])
],
  styleUrls: ['./fereastra-snackbar-multiplu.component.scss'],
})
export class FereastraSnackbarMultipluComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private subMesajNou: Subscription;
  public suntInSnackbar = false;
  private esteVizibil = true;
  public mesaje: MesajPentruSnackbar[];
  private serviciu: AtentionareAcsService = undefined;
  public esteDarkTheme: boolean;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
    private ref: ChangeDetectorRef,
    private snackBarRef: MatSnackBarRef<FereastraSnackbarMultipluComponent>
  ) {
    this.mesaje = data.mesaje;
    this.serviciu = data.serviciu;
    this.esteDarkTheme = this.ExtrageTema();
  }

  ngOnInit() {
    if (this.serviciu) {
      this.serviciu.componentaV2Live = Date.now();
      this.serviciu.componentaV2Afisata = true;
      this.subMesajNou = this.serviciu.amAdaugatMesaj.subscribe((mesajNou) => {
        // Am receptionat un nou mesaj
        if (!this.mesaje.includes(mesajNou)) {
          this.mesaje.push(mesajNou);
          this.actualizeazaListaMesaje();
          this.serviciu.componentaV2Live = Date.now();
        }
      });
    }

    this.sub = timer(1000, 1000).subscribe((x) => {
      if (this.suntInSnackbar === false) {
        this.mesaje.forEach(element => {
          element.secundeDeAfisat--;
        });
        this.actualizeazaListaMesaje();
      }
    });
  }

  private actualizeazaListaMesaje(): void {
    this.mesaje = this.mesaje.filter(mesaj => mesaj.secundeDeAfisat > 0);
    this.ref.detectChanges();
    if (this.mesaje.length === 0) {
      this.snackBarRef.dismiss();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if (this.serviciu) {
      this.serviciu.componentaV2Afisata = false;
    }
    if (this.subMesajNou) {
      this.subMesajNou.unsubscribe();
    }
  }

  StergeMesaj(index: number) {
    this.mesaje[index].secundeDeAfisat = 0;
    this.mesaje.splice(index, 1);
    this.ref.detectChanges();
  }

  private ExtrageTema(): boolean {
    const text = localStorage.getItem('uiOptions');
    if (text) {
        const x = JSON.parse(text);
        return x.Dark;
      } else {
      return false;
    }
  }
}

