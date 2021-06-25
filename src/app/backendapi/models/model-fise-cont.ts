/* tslint:disable */
import { SumarChitanta } from './sumar-chitanta';
import { ModelDebitare } from './model-debitare';
import { ModelFisaCont } from './model-fisa-cont';
export interface ModelFiseCont {
  listaChitante?: Array<SumarChitanta>;
  listaDebitari?: Array<ModelDebitare>;
  listaFiseCont?: Array<ModelFisaCont>;
}
