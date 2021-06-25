/* tslint:disable */
import { SumarListaDePrezentaFinalizata } from './sumar-lista-de-prezenta-finalizata';
import { SumarCopilPentruPrezenta } from './sumar-copil-pentru-prezenta';
import { SumarTaxaPentruPrezenta } from './sumar-taxa-pentru-prezenta';
import { ZiCuPrezenta } from './zi-cu-prezenta';
export interface InformatiiPrezenta {
  grupeCuListaDePrezentaFinalizata?: Array<SumarListaDePrezentaFinalizata>;
  listaCopii?: Array<SumarCopilPentruPrezenta>;
  listaTaxe?: Array<SumarTaxaPentruPrezenta>;
  listaZileCuActivitate?: Array<number>;
  listaZileCuPrezenta?: Array<ZiCuPrezenta>;
  tokenRegenerat?: string;
}
