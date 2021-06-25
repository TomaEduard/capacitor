/* tslint:disable */
import { SumarTaxa } from './sumar-taxa';
export interface ModelDatePentruDebitare {
  oraCurenta?: string;
  taxeCuDebitareInAvans?: Array<SumarTaxa>;
  taxeFaraDebitareInAvans?: Array<SumarTaxa>;
}
