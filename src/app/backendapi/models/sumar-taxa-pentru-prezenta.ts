/* tslint:disable */
import { SumarGrupa } from './sumar-grupa';
import { TaxaPerZiSiGrupa } from './taxa-per-zi-si-grupa';
export interface SumarTaxaPentruPrezenta {
  denumireTaxa?: string;
  idTaxaSauAbonament?: string;
  listaGrupe?: Array<SumarGrupa>;
  listaTaxePerZiSiGrupa?: Array<TaxaPerZiSiGrupa>;
  regimDeTaxare?: 0 | 1 | 2 | 3 | 4 | 5;
}
