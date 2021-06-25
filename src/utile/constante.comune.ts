export const Culori = [
  {
    nume: 'ROSU',
    codCSS: 'red'
  },
  {
    nume: 'ALBASTRU',
    codCSS: 'blue'
  },
  {
    nume: 'VERDE',
    codCSS: 'green'
  },
  {
    nume: 'GALBEN',
    codCSS: 'yellow'
  },
  {
    nume: 'PORTOCALIU',
    codCSS: 'orange'
  },
  {
    nume: 'BEJ',
    codCSS: 'beige'
  },
  {
    nume: 'VIOLET',
    codCSS: 'violet'
  },
  {
    nume: 'ROZ',
    codCSS: 'pink'
  },
  {
    nume: 'TURCOAZ',
    codCSS: 'turquoise'
  },
];

export const NumeToken = 'acsGradiAT';
export const NumeTokenAni = 'acsGradiY';
export const NumeTokenAnSelectat = 'acsGradiYS';

export enum Rol {
  Administrator = 'Administrator',
  Educator = 'Educator',
  Parinte = 'Parinte',
}

export const RegimDeTaxare = [
  {
    index: 0,
    valoare: 'Plată lunară indiferent de prezență'
  },
  {
    index: 1,
    valoare: 'Plată lunară, proporțional cu numărul de zile de prezență'
  },
  {
    index: 2,
    valoare: 'Taxare la oră cu regim de ore opționale'
  },
  {
    index: 3,
    valoare: 'Lunar proporțional cu prezența, cu plată în avans și compensarea absențelor prin reducerea plăților viitoare'
  },
  {
    index: 4,
    valoare: 'Taxă cu valoare pe zi de prezenţă'
  },
  {
    index: 5,
    valoare: 'Taxă cu valoare pe zi de prezenţă şi plată în avans'
  },
];
export enum RegimDeTaxareEnum {
  PlataLunaraIndiferentDePrezenta = 0,
  PlataunaraProporționalCuNumarulDeZileDePrezenta = 1,
  TaxareLaOraCuRegimDeOreOptionale = 2,
  LunarProportionalCuPrezentaCuPlataInAvansSiCompensareaAbsentelorPrinReducereaPlatilorViitoare = 3,
  TaxaCuValoarePeZiDePrezenta = 4,
  TaxaCuValoarePeZiDePrezentaSiPlataInAvans = 5,
};

export const CategorieTaxa =
  [
    {
      index: 0,
      valoare: 'Abonament gradinita'
    },
    {
      index: 1,
      valoare: 'Masa'
    },
    {
      index: 2,
      valoare: 'Alta taxa'
    }
  ];

export const Aplicabilitate =
  [
    {
      index: 0,
      valoare: 'Tuturor copiilor din gradinita'
    },
    {
      index: 1,
      valoare: 'Copiilor din grupa'
    },
    {
      index: 2,
      valoare: 'Copiilor selectati'
    }
  ];

export const ParintePoateSolicitaAbsenta =
  [
    {
      index: 0,
      valoare: 'Nu'
    },
    {
      index: 1,
      valoare: 'Ziua lucratoare anterioara pana in ora H'
    },
    {
      index: 2,
      valoare: 'Ziua calendaristica anterioara pana in ora H'
    }
  ];

export enum FelProgramTaxaSpeciala {
  Saptamanal = 0,
  Ocazional = 1,
}

export const EmptyGUID = '00000000-0000-0000-0000-000000000000';

export const EducatorulPoatePosta = [
  {
    index: 0,
    valoare: 'Nu'
  },
  {
    index: 1,
    valoare: 'Doar educatorul de la grupă'
  },
  {
    index: 2,
    valoare: 'Orice educator'
  },
]
export enum EducatorulPoatePostaEnum {
  Nu = 0,
  DoarEducatorulDeLaGrupa = 1,
  OriceEducator = 2
}

export const ModCiclarePostari = [
  {
    index: 0,
    valoare: 'Manual'
  },
  {
    index: 1,
    valoare: 'Afişez doar ultima postare'
  },
  {
    index: 2,
    valoare: 'Afişez ultimele 3 postări'
  },
  {
    index: 3,
    valoare: 'Afişez ultimele 5 postări'
  },
  {
    index: 4,
    valoare: 'Afişez ultimele 10 postări'
  },
]
export enum ModCiclarePostariEnum {
  Manual = 0,
  AfisezDoarUltimaPostare = 1,
  Ultimele3 = 2,
  Ultimele5 = 3,
  Ultimele10 = 4
}

export const FelPanou = [
  {
    index: 0,
    valoare: 'Asociat grădiniţei'
  },
  {
    index: 1,
    valoare: 'Asociat grupei'
  },
]
export enum FelPanouEnum {
  AsociatGradinitei = 0,
  AsociatGrupei = 1
}

export const CineIncaseazaBanii = [
  {
    index: 0,
    valoare: 'Grădinița'
  },
  {
    index: 1,
    valoare: 'Educatoarea de la grupă'
  },
];
export enum CineIncaseazaBaniiEnum {
  Gradinita = 0,
  EducatoareaDeLaGrupa = 1
}

export const TipProgramTaxaPerZiCuPlataInAvans = [
  {
    index: 0,
    valoare: 'Toate zilele lucrătoare'
  },
  {
    index: 1,
    valoare: 'Zilele lucrătoare specificate'
  },
];
export enum TipProgramTaxaPerZiCuPlataInAvansEnum {
  ToateZileleLucratoare = 0,
  ZileleLucratoareSpecificate = 1
}

export enum ModIncadrareEnum
{
    CropCentral = 0,
    Fit = 1
}

export const FelOperatiunePlata =
  [
    {
      index: 0,
      valoare: 'Chitanța'
    },
    {
      index: 1,
      valoare: 'Ordine de Plată'
    },
    {
      index: 2,
      valoare: 'POS'
    },
    {
      index: 3,
      valoare: 'Online'
    },
  ]
export enum FelOperatiunePlataEnum {
  Chitanta = 0,
  OP = 1,
  POS = 2,
  Online = 3
}
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};