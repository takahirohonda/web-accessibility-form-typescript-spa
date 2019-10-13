import { IStore, IFormRender, IEventHandlerInitializer } from './types/interfaces';
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
  private eventHandlerInitializer: IEventHandlerInitializer;

  constructor(store: IStore, form: IFormRender, eventHandlerInitializer: IEventHandlerInitializer) {
    this.store = store;
    this.form = form;
    this.targetEventDiv = document.querySelector('.btn-switch') as HTMLElement;
    this.targetTextDiv = document.querySelector('.button-text') as HTMLElement;
    this.eventHandlerInitializer = eventHandlerInitializer;
  }

  public init(): void {
    this.targetEventDiv.addEventListener('click', () => {
      this.switchFormType();
      this.eventHandlerInitializer.init(document.getElementById('example-form') as HTMLElement);
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
