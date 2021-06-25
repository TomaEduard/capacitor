/* tslint:disable */
export interface ModelDebitare {
  avertizari?: Array<string>;
  codDebitTarget?: string;
  codLunaDebitata?: number;
  codPlata?: string;
  copilId?: string;
  corectii?: Array<ModelDebitare>;
  credit?: number;
  dataDebitare?: string;
  dataUltimeiPlati?: string;
  debit?: number;
  debitareId?: string;
  explicatii?: string;
  explicatii_DenumireTaxa?: string;
  explicatii_DetalierePerioada?: string;
  explicatii_NumeSiPrenumeCopil?: string;
  explicatii_PerioadaDebitata?: string;
  idTaxaSauAbonament?: string;
  lunaDebitata?: string;
  ramasDePlata?: number;
  simbolContClient?: string;
  simbolContTaxa?: string;
  totalCorectii?: string;
  valoareInitiala?: number;
  valoarePlatita?: number;
}
