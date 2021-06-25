/* tslint:disable */
import { CopilInGrupaPentruPrezenta } from './copil-in-grupa-pentru-prezenta';
export interface GrupaPentruPrezenta {
  copii?: Array<CopilInGrupaPentruPrezenta>;
  dataPrezenta?: string;
  denumireGrupa?: string;
  idGrupa?: string;
  listaDePrezentaInchisa?: boolean;
  listaDePrezentaInchisaDe?: string;
  listaDePrezentaInchisaId?: string;
  listaDePrezentaInchisaLaOra?: string;
  semnaturaOlografaInchidereLista?: string;
  tokenRegenerat?: string;
}
