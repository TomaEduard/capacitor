/* tslint:disable */
import { DetaliiCopil } from './detalii-copil';
import { InfoEducator } from './info-educator';
import { TaxaPerGrupaModel } from './taxa-per-grupa-model';
export interface GrupaModel {
  an?: number;
  copiiInGrupa?: Array<DetaliiCopil>;
  culoare?: string;
  denumire?: string;
  educatoriLaGrupa?: Array<InfoEducator>;
  grupaId?: string;
  taxeCopii?: Array<TaxaPerGrupaModel>;
  taxeGradinita?: Array<TaxaPerGrupaModel>;
  taxeGrupa?: Array<TaxaPerGrupaModel>;
}
