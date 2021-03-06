const placeholder = {
  USD: 1,
  EUR: "",
  GBP: "",
  INR: "",
  AUD: "",
  CAD: "",
  SGD: "",
  CHF: "",
  MYR: "",
  JPY: "",
  CNY: "",
  NZD: "",
  THB: "",
  HUF: "",
  AED: "",
  HKD: "",
  MXN: "",
  ZAR: "",
  PHP: "",
  SEK: "",
  IDR: "",
  SAR: "",
  BRL: "",
  TRY: "",
  KES: "",
  KRW: "",
  EGP: "",
  IQD: "",
  NOK: "",
  KWD: "",
  RUB: "",
  DKK: "",
  PKR: "",
  ILS: "",
  PLN: "",
  QAR: "",
  XAU: "",
  OMR: "",
  COP: "",
  CLP: "",
  TWD: "",
  ARS: "",
  CZK: "",
  VND: "",
  MAD: "",
  JOD: "",
  BHD: "",
  XOF: "",
  LKR: "",
  UAH: "",
  NGN: "",
  TND: "",
  UGX: "",
  RON: "",
  BDT: "",
  PEN: "",
  GEL: "",
  XAF: "",
  FJD: "",
  VEF: "",
  BYN: "",
  HRK: "",
  UZS: "",
  BGN: "",
  DZD: "",
  IRR: "",
  DOP: "",
  ISK: "",
  XAG: "",
  CRC: "",
  SYP: "",
  LYD: "",
  JMD: "",
  MUR: "",
  GHS: "",
  AOA: "",
  UYU: "",
  AFN: "",
  LBP: "",
  XPF: "",
  TTD: "",
  TZS: "",
  ALL: "",
  XCD: "",
  GTQ: "",
  NPR: "",
  BOB: "",
  ZWD: "",
  BBD: "",
  CUC: "",
  LAK: "",
  BND: "",
  BWP: "",
  HNL: "",
  PYG: "",
  ETB: "",
  NAD: "",
  PGK: "",
  SDG: "",
  MOP: "",
  NIO: "",
  BMD: "",
  KZT: "",
  PAB: "",
  BAM: "",
  GYD: "",
  YER: "",
  MGA: "",
  KYD: "",
  MZN: "",
  RSD: "",
  SCR: "",
  AMD: "",
  SBD: "",
  AZN: "",
  SLL: "",
  TOP: "",
  BZD: "",
  MWK: "",
  GMD: "",
  BIF: "",
  SOS: "",
  HTG: "",
  GNF: "",
  MVR: "",
  MNT: "",
  CDF: "",
  STN: "",
  TJS: "",
  KPW: "",
  MMK: "",
  LSL: "",
  LRD: "",
  KGS: "",
  GIP: "",
  XPT: "",
  MDL: "",
  CUP: "",
  KHR: "",
  MKD: "",
  VUV: "",
  MRU: "",
  ANG: "",
  SZL: "",
  CVE: "",
  SRD: "",
  XPD: "",
  SVC: "",
  BSD: "",
  XDR: "",
  RWF: "",
  AWG: "",
  DJF: "",
  BTN: "",
  KMF: "",
  WST: "",
  SPL: "",
  ERN: "",
  FKP: "",
  SHP: "",
  JEP: "",
  TMT: "",
  TVD: "",
  IMP: "",
  GGP: "",
  ZMW: "",
};
const debugPlaceholder = {
  rate: 42,
  rate_for_amount: 42,
  amount: 42,
  rates: {
    USD: 1,
    AED: 3.673198,
    AFN: 76.200773,
    ALL: 117.000295,
    AMD: 504.95973,
    ANG: 1.790821,
    AOA: 536.679685,
    ARS: 64.433297,
    AUD: 1.64181,
    AWG: 1.8,
    AZN: 1.701595,
    BAM: 1.788065,
    BBD: 2.01993,
    BDT: 84.984199,
    BGN: 1.785387,
    BHD: 0.37704,
    BIF: 1902,
    BMD: 1,
    BND: 1.433645,
    BOB: 6.897929,
    BRL: 5.249706,
    BSD: 1.000411,
    BTC: 0.00015,
    BTN: 75.36909,
    BWP: 11.974675,
    BYN: 2.596576,
    BYR: 19600,
    BZD: 2.016593,
    CAD: 1.415325,
    CDF: 1709.999678,
    CHF: 0.96631,
    CLF: 0.031381,
    CLP: 865.897378,
    CNY: 7.1003,
    COP: 4086.25,
    CRC: 578.744798,
    CUC: 1,
    CUP: 26.5,
    CVE: 101.349774,
    CZK: 25.120499,
    DJF: 177.719637,
    DKK: 6.814701,
    DOP: 54.125028,
    DZD: 125.135002,
    EGP: 15.7453,
    ERN: 14.999691,
    ETB: 32.877673,
    EUR: 0.91299,
    FJD: 2.298901,
    FKP: 0.807658,
    GBP: 0.807699,
    GEL: 3.284994,
    GGP: 0.807658,
    GHS: 5.76501,
    GIP: 0.807658,
    GMD: 50.979631,
    GNF: 9425.000093,
    GTQ: 7.703517,
    GYD: 208.82205,
    HKD: 7.75215,
    HNL: 24.949763,
    HRK: 6.961427,
    HTG: 95.04114,
    HUF: 331.959837,
    IDR: 16418.276,
    ILS: 3.60233,
    IMP: 0.807658,
    INR: 77.605036,
    IQD: 1190.5,
    IRR: 42104.999858,
    ISK: 142.519587,
    JEP: 0.807658,
    JMD: 134.024197,
    JOD: 0.70897,
    JPY: 107.261959,
    KES: 105.19611,
    KGS: 82.187821,
    KHR: 4069.999708,
    KMF: 450.602165,
    KPW: 900.082446,
    KRW: 1235.805028,
    KWD: 0.313044,
    KYD: 0.833703,
    KZT: 449.82515,
    LAK: 8939.999979,
    LBP: 1526.633703,
    LKR: 189.56675,
    LRD: 198.000113,
    LSL: 17.960065,
    LTL: 2.95274,
    LVL: 0.60489,
    LYD: 1.414977,
    MAD: 10.105501,
    MDL: 18.308322,
    MGA: 3744.999712,
    MKD: 56.342466,
    MMK: 1392.990297,
    MNT: 2776.912962,
    MOP: 7.986434,
    MRO: 357.000307,
    MUR: 39.20172,
    MVR: 15.409702,
    MWK: 734.999774,
    MXN: 24.223031,
    MYR: 4.357594,
    MZN: 66.735006,
    NAD: 17.959549,
    NGN: 367.000581,
    NIO: 34.009749,
    NOK: 10.457305,
    NPR: 120.57846,
    NZD: 1.68472,
    OMR: 0.385123,
    PAB: 1.000411,
    PEN: 3.465506,
    PGK: 3.415038,
    PHP: 51.625021,
    PKR: 166.50203,
    PLN: 4.19705,
    PYG: 6566.129799,
    QAR: 3.640997,
    RON: 4.407598,
    RSD: 107.289752,
    RUB: 78.701198,
    RWF: 935,
    SAR: 3.762043,
    SBD: 8.336951,
    SCR: 13.760324,
    SDG: 55.325023,
    SEK: 10.028395,
    SGD: 1.434902,
    SHP: 0.807658,
    SLL: 9712.500237,
    SOS: 584.000099,
    SRD: 7.457988,
    STD: 22052.77227,
    SVC: 8.753885,
    SYP: 514.450347,
    SZL: 17.760026,
    THB: 33.090254,
    TJS: 10.19962,
    TMT: 3.51,
    TND: 2.882972,
    TOP: 2.3486,
    TRY: 6.708304,
    TTD: 6.759609,
    TWD: 30.232984,
    TZS: 2310.799704,
    UAH: 27.700043,
    UGX: 3796.6768,
    UYU: 43.786084,
    UZS: 9544.999628,
    VEF: 9.987498,
    VND: 23632.5,
    VUV: 123.318815,
    WST: 2.784892,
    XAF: 599.62247,
    XAG: 0.071492,
    XAU: 0.000628,
    XCD: 2.70255,
    XDR: 0.732924,
    XOF: 596.999805,
    XPF: 109.650037,
    YER: 250.350014,
    ZAR: 18.231103,
    ZMK: 9001.197203,
    ZMW: 18.233264,
    ZWL: 322.000001,
  },
};

module.exports.placeholder = placeholder;
module.exports.debugPlaceholder = debugPlaceholder;
