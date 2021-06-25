/* tslint:disable */
import { DetaliiLinieChitanta } from './detalii-linie-chitanta';
export interface ChitantaModel {
  anulat?: boolean;
  copilId?: string;
  data?: string;
  felOperatiunePlata?: 0 | 1 | 2 | 3;
  idChitanta?: string;
  idPersoana?: string;
  liniiChitanta?: Array<DetaliiLinieChitanta>;
  numar?: string;
  pentruCopilulCuNumele?: string;
  platitor?: string;
  serie?: string;
}
