import { IStore, IFormRender } from './types/interfaces';
import {
  ORIGINAL_FORM_TYPE,
  ACCESSIBILITY_FORM_TYPE,
  SWITCH_TO_ACCESSIBLE,
  SWITCH_TO_ORIGINAL
} from './constants/constantValues';

class SwitchBtnEventHandler {
  private store: IStore;
  private targetEventDiv: HTMLElement;
  private targetTextDiv: HTMLElement;
  private form: IFormRender;

  constructor(store: IStore, form: IFormRender) {
    this.store = store;
    this.form = form;
    this.targetEventDiv = document.querySelector('.btn-switch') as HTMLElement;
    this.targetTextDiv = document.querySelector('.button-text') as HTMLElement;
  }

  public init(): void {
    this.targetEventDiv.addEventListener('click', () => {
      console.log('clicked');
      this.switchFormType();
    });
  }

  private switchFormType(): void {
    switch (this.store.getFormType()) {
      case (ORIGINAL_FORM_TYPE):
        this.targetTextDiv.innerHTML = '';
        this.targetTextDiv.innerHTML = SWITCH_TO_ORIGINAL;
        this.store.updateFormType(ACCESSIBILITY_FORM_TYPE);
        this.form.reRender();
        break;
      case (ACCESSIBILITY_FORM_TYPE):
        this.targetTextDiv.innerHTML = '';
        this.targetTextDiv.innerHTML = SWITCH_TO_ACCESSIBLE;
        this.store.updateFormType(ORIGINAL_FORM_TYPE);
        this.form.reRender();
        break;
      default:
        break;
    }
  }
}

export default SwitchBtnEventHandler;


