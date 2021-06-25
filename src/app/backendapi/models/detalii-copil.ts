/* tslint:disable */
import { CopilModel } from './copil-model';
import { SumarParinte } from './sumar-parinte';
import { TaxaPerCopilModel } from './taxa-per-copil-model';
import { ModelTranzitie } from './model-tranzitie';
export interface DetaliiCopil {
  copilId?: string;
  denumire?: string;
  dinAnul?: number;
  frati?: Array<CopilModel>;
  grupaId?: string;
  numeSiPrenume?: string;
  numeSiPrenumeParinti?: Array<string>;
  panaInAnul?: number;
  parinti?: Array<SumarParinte>;
  prezenta?: Array<string>;
  taxeCopil?: Array<TaxaPerCopilModel>;
  taxeGradinita?: Array<TaxaPerCopilModel>;
  taxeGrupa?: Array<TaxaPerCopilModel>;
  tranzitii?: Array<ModelTranzitie>;
}
