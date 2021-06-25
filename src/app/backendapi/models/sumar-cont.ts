/* tslint:disable */
import { SumarTaxa } from './sumar-taxa';
export interface SumarCont {
  denumire?: string;
  felCont?: 0 | 1;
  listaTaxe?: Array<SumarTaxa>;
  simbolCont?: string;
  totalCreditari?: number;
  totalDebitari?: number;
}
