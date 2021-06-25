/* tslint:disable */
import { DetaliiCopil } from './detalii-copil';
import { TaxaSauAbonamentModel } from './taxa-sau-abonament-model';
export interface SoldInitialModel {
  copil?: DetaliiCopil;
  idSoldInitial?: string;
  ramasDePlatit?: number;
  taxa?: TaxaSauAbonamentModel;
  uiCopilId?: string;
}
