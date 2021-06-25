import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter } from '@angular/core';
import { FereastraSnackbarMultipluComponent } from '../dialogs/fereastra-snackbar-multiplu/fereastra-snackbar-multiplu.component';

@Injectable()
export class AtentionareAcsService {
    listaAtentionari: MesajPentruSnackbar[] = [];
    ContorProgresBarVizibil = 0;

    // Acest set de variabile este folosit pentru a afisa un nou Mesaj V2 fara sa re-construim fereastra
    // Teoria: componenta pentru afisat mesajele face true componentaV2Afisata din ngOnInit si-l face false din
    // ngOnDestroy, deci am putea folosi acest Boolean sa stim daca avem sau nu o componenta afisata acum. Pentru
    // mai multa siguranta (sa nu avem vre-un race-condition care face Booleanul sa ramana true desi nu mai avem
    // componenta afisata) folosim si componentaV2Live: vom IGNORA valoarea booleanului componentaV2Afisata daca
    // componentaV2Live e mai veci de 10 secunde
    public componentaV2Afisata = false;
    public componentaV2Live = Date.now();
    public amAdaugatMesaj: EventEmitter<MesajPentruSnackbar> = new EventEmitter<MesajPentruSnackbar>(false);

    private coduri_pb_active: string[] = [];

    constructor(
        private snackbar: MatSnackBar
    ) { }

    // daca "nume" este specificat si aici si la OpresteProgressBar atunci progressbar-ul activat pentru acest
    // nume va fi dezactivat o singura data in OpresteProgressBar(nume)
    PornesteProgressBar(nume?: string): void {
        if (nume) {
            this.coduri_pb_active.push(nume);
        }
        this.ContorProgresBarVizibil++;
    }

    OpresteProgressBar(nume?: string): void {
        if (nume) {
            const idx = this.coduri_pb_active.indexOf(nume);
            if (idx < 0) {
                return;
            } else {
                this.coduri_pb_active.splice(idx, 1);
            }
        }
        this.ContorProgresBarVizibil--;
    }

    Atentionare(mesaj: string): void {
        this.AfiseazaMesaje(new MesajPentruSnackbar(mesaj, 'atentionare', 50000));
    }

    Eroare(mesaj: string): void {
        this.AfiseazaMesaje(new MesajPentruSnackbar(mesaj, 'eroare', 10));
    }

    Succes(mesaj: string): void {
        this.AfiseazaMesaje(new MesajPentruSnackbar(mesaj, 'succes', 5));
    }
    AfiseazaMesaje(mesajNou: MesajPentruSnackbar): any {
        this.listaAtentionari.push(mesajNou);
        this.listaAtentionari = this.listaAtentionari.filter(mesaj => mesaj.secundeDeAfisat > 0);

        if (this.componentaV2Afisata && (Date.now() - this.componentaV2Live) < 20 * 1000) {
            // Am componenta afisata in urma cu mai putin de 20 de secunde.
            console.log('Transmit mesajul spre componenta fara sa re-construiesc componenta');
            this.amAdaugatMesaj.emit(mesajNou);
        } else {
            console.log('Afisez componenta noua');
            this.snackbar.openFromComponent(FereastraSnackbarMultipluComponent, {
                data: {
                    mesaje: this.listaAtentionari,
                    serviciu: this
                },
                panelClass: ['snackbar-multiplu']
            });
        }
    }
}

export class MesajPentruSnackbar {
    mesaj: string;
    felMesaj: string;
    secundeDeAfisat: number;
    constructor(mesaj: string, fel: string, secunde: number) {
        this.mesaj = mesaj;
        this.felMesaj = fel;
        this.secundeDeAfisat = secunde;
    }
}
