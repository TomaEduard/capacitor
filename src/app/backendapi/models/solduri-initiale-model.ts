/* tslint:disable */
import { DetaliiCopil } from './detalii-copil';
import { SoldInitialModel } from './sold-initial-model';
import { TaxaSauAbonamentModel } from './taxa-sau-abonament-model';
export interface SolduriInitialeModel {
  an?: number;
  copii?: Array<DetaliiCopil>;
  solduri?: Array<SoldInitialModel>;
  taxe?: Array<TaxaSauAbonamentModel>;
}
