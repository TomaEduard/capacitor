import { UtilsService } from 'src/app/services/utils.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/backendapi/services';
import { AtentionareAcsService } from 'src/app/servicii/atentionare-acs.service';
import { NumeToken, NumeTokenAni, NumeTokenAnSelectat } from 'src/utile/constante.comune';
import { ListaSelectieBazaDeDate, LoginRequest } from 'src/app/backendapi/models';
import { confirmPassword } from 'src/app/servicii/custom-validators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-feature-network',
  templateUrl: './feature-network.component.html',
  styleUrls: ['./feature-network.component.css']
})
export class FeatureNetworkComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private atentionare: AtentionareAcsService,
    private utilsService: UtilsService,
    private fBuilder: FormBuilder,
  ) { }

  @ViewChild('formDirective') private formDirective: NgForm;

  listaDb: ListaSelectieBazaDeDate[];
  form: FormGroup;
  working: boolean;
  hide = true;
  hideSchimbareParola = true;
  hideConfirmareSchibmareParola = true;
  textButonAutentificare = 'Autentificare';
  esteResetareParola: boolean;

  get bazaDeDate() {
    return this.form.get('bazaDeDate');
  }
  get username() {
    return this.form.get('username');
  }
  // de verificat cum ar trebui sa fie ca sa pot folosi validatorul deja creat pentru asta
  get password() {
    return this.form.get('password');
  }
  get parola() {
    return this.form.get('parola');
  }
  get confirmareParolaNoua() {
    return this.form.get('confirmareParolaNoua');
  }

  ngOnInit() {
    // facem refresh la ani
    sessionStorage.removeItem(NumeTokenAni);
    localStorage.removeItem(NumeTokenAnSelectat);
    this.form = new FormGroup({
      bazaDeDate: new FormControl()
    });

    this.form = this.fBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      parola: [{
        value: '',
        disabled: true
      },
      [Validators.required]],
      confirmareParolaNoua: [{
        value: '',
        disabled: true
      },
      [Validators.required, confirmPassword]],
      bazaDeDate: '',
    });
  }

  // daca de la backend primesc raspuns cum ca trebuie sa imi resetez parola, pregatesc form-ul pentru a reseta parola
  pregatesteFormResetareParola() {
    this.esteResetareParola = true;
    this.textButonAutentificare = 'Reseteaza Parola';
    const username = this.username.value;
    const pass = this.password.value;
    this.username.disable();
    this.password.disable();
    this.parola.enable();
    this.confirmareParolaNoua.enable();
    this.formDirective.resetForm();
    this.username.setValue(username);
    this.password.setValue(pass);
  }

  autentificare() {
    this.working = true;
    const parametri: LoginRequest = {
      username: this.username.value,
      password: this.password.value,
      codUnicBd: this.bazaDeDate.value,
      parolaNouaDacaCeaVecheEsteOk: this.parola.value
    };

    if (this.form.valid) {

      this.authService.VerificaLogin(parametri).subscribe(result => {
        // este primul loghin dupa resetarea parolei. trebuie introdusa o parola noua
        // pregatim form in consecinta
        if (result.introduParolaNoua) {
          this.pregatesteFormResetareParola();
        }
        //login cu succes
        else if (!!result.jwt) {
          localStorage.setItem(NumeToken, result.jwt);
          window.alert(result.jwt)
        }
        // login valid pentru mai multe gradinite, trebuie sa alegem una
        else if (!!result.listaBazeDeDate) {
          this.listaDb = result.listaBazeDeDate;
          this.bazaDeDate.setValue(this.listaDb[0].codUnicBd);
          // window.alert('x1')
        }
        // suntem intr-un caz de eroare. afisam eroarea/erorile
        else {
          let mesajEroare = '';
          mesajEroare = result.eroare ? mesajEroare += result.eroare : mesajEroare;
          mesajEroare = result.eroare_user ? mesajEroare += result.eroare_user : mesajEroare;
          this.atentionare.Eroare(mesajEroare);
          // window.alert('x2')
        }
        if (result.resetUser) this.username.setValue('');
        if (result.resetPassword) this.password.setValue('');
        this.working = false;
      },
        _ => this.working = false);
    }
  }

  detectLocalStorage() { 
    const helper = new JwtHelperService();
    const ls =  helper.decodeToken(localStorage.getItem('acsGradiAT')); // aici se afla JWT
    if (!!ls) {
      return true
    } else {
      return false;
    }
  }

}
