/* tslint:disable */
import { Suprasolvire } from './suprasolvire';
export interface DetaliiRestituire {
  anulat?: boolean;
  banca?: string;
  beneficiar?: string;
  copilId?: string;
  data?: string;
  felOperatiune?: 0 | 1 | 2 | 3;
  iban?: string;
  idRestituire?: string;
  numarCI?: string;
  pentruCopilulCuNumele?: string;
  persoanaId?: string;
  serieCI?: string;
  simbolContTaxa?: string;
  sumaReturnata?: number;
  suprasolvire?: Suprasolvire;
}
