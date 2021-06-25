import { DialogService } from './canDeactivateGuard/dialogService';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { DetaliiEntitate } from '../utile/detalii-entitate.interface';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanDeactivate<any> {

  constructor(public dialogService: DialogService) { }

  canDeactivate(
    component: DetaliiEntitate
  ) {
    const canDeactivate = JSON.stringify(component.preiaDetaliiForm()) === JSON.stringify(component.initialObject);

    if (!canDeactivate) {
      return this.dialogService.confirm(this.dialogService.TITLU_NAVIGARE, this.dialogService.MESAJ_NAVIGARE);
    } else
      return true;
  }
}