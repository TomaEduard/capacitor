/* tslint:disable */
import { CopilModel } from './copil-model';
import { Suprasolvire } from './suprasolvire';
export interface DetaliiParinte {
  adresa?: string;
  copiiAiParintelui?: Array<CopilModel>;
  email?: string;
  listaSuprasolviri?: Array<Suprasolvire>;
  numeSiPrenume?: string;
  numeUtilizator?: string;
  persoanaId?: string;
  ramasDePlata?: number;
  suprasolviri?: number;
  telefon?: string;
}
