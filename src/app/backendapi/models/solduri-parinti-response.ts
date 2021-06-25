/* tslint:disable */
import { SituatieSoldCopil } from './situatie-sold-copil';
import { SumarSoldTaxa } from './sumar-sold-taxa';
export interface SolduriParintiResponse {
  listaSolduriCopii?: Array<SituatieSoldCopil>;
  listaSolduriPeTaxa?: Array<SumarSoldTaxa>;
  total?: number;
}
