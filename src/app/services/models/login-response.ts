import { ListaSelectieBazaDeDate } from "./lista-selectie-baza-de-date";

/* tslint:disable */
export interface LoginResponse {
  eroare?: string;
  eroare_user?: string;
  introduParolaNoua: boolean;
  jwt?: string;
  listaBazeDeDate?: Array<ListaSelectieBazaDeDate>;
  resetPassword: boolean;
  resetUser: boolean;
}
