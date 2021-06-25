/* tslint:disable */
import { ProgramTaxaSpecialaPerGrupaModel } from './program-taxa-speciala-per-grupa-model';
export interface TaxaPerGrupaModel {
  aplicabilitate?: 0 | 1 | 2;
  asociat?: boolean;
  data?: string;
  denumire?: string;
  grupaId?: string;
  idTaxaPerGrupa?: string;
  idTaxaSauAbonament?: string;
  programTaxa?: ProgramTaxaSpecialaPerGrupaModel;
  regimDeTaxare?: 0 | 1 | 2 | 3 | 4 | 5;
}
