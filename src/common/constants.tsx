export default class CONSTANTS {
  static readonly DEBIT_TRANSACTION = 'DEBIT_TRANSACTION';
  static readonly CREDIT_TRANSACTION = 'CREDIT_TRANSACTION';
  static readonly DEFAULT_MODAL_VALUES = {
    title: '',
    body: 'For Gold card, income should be between £20,000 and £50,000. For Platinum card, income should be more than £50,000.',
    footerText: ''
  }
  static readonly GOLD_CARD_MIN_BALANCE = 20000;
  static readonly GOLD_CARD_MAX_BALANCE = 50000;
  static readonly PLATINUM_CARD_MIN_BALANCE = 50000;
  static readonly CARD_TYPE_GOLD = 'CARD_TYPE_GOLD';
  static readonly CARD_TYPE_PLATINUM = 'CARD_TYPE_PLATINUM';
  static readonly DEFAULT_FORM_VALUES = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    occupation: '',
    income: 0,
    pan: '',
    password: '',
    confirmPassword: '',
  };
}