/* tslint:disable */
import { ContModel } from './cont-model';
import { ValoareTaxaSauAbonamentModel } from './valoare-taxa-sau-abonament-model';
export interface TaxaSauAbonamentModel {
  aFostFolositaLaDebitare?: boolean;
  aplicabilitate?: 0 | 1 | 2;
  arhivata?: boolean;
  categorieTaxa?: 0 | 1 | 2;
  cineIncaseazaBanii?: 0 | 1;
  cont?: ContModel;
  dataUltimeiDebitari?: string;
  denumire?: string;
  idTaxaSauAbonament?: string;
  oraHSolicitareAbsenta?: number;
  parintePoateSolicitaAbsenta?: 0 | 1 | 2;
  regimDeTaxare?: 0 | 1 | 2 | 3 | 4 | 5;
  tipProgramTaxaPerZiCuPlataInAvans?: 0 | 1;
  valoriTaxaSauAbonament?: Array<ValoareTaxaSauAbonamentModel>;
  zileLucratoareTaxaPeZiPlatitaInAvans?: Array<string>;
}
