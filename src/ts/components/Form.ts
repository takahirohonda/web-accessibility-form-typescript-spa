
import OriginalForm from './OriginalForm';
import AccessibleForm from './AccessibleForm';
import FormEventHandler from './FormEventHandler';
import { IStore, IFormUi, IFormRender } from './types/interfaces';
import {
  ORIGINAL_FORM_TYPE,
  ACCESSIBILITY_FORM_TYPE
} from './constants/constantValues';

class Form implements IFormRender {

  private store: IStore;
  private accessibleForm: IFormUi;
  private originalForm: IFormUi;

  constructor (store: IStore, target: HTMLElement) {
    this.store = store;
    this.accessibleForm = new AccessibleForm(target);
    this.originalForm = new OriginalForm(target);
  }

  public render(): void {

    switch (this.store.getFormType()) {
      case(ORIGINAL_FORM_TYPE):
        this.originalForm.render();
        break;
      case (ACCESSIBILITY_FORM_TYPE):
        this.accessibleForm.render();
        break;
      default:
        this.originalForm.render();
    }
  }

  public reRender(): void {
    const formNode = document.querySelector('#example-form') as HTMLElement;
    if (formNode) {
      formNode.remove();
    }
    this.render();
  }

  private addFormEventListeners(): any {
    const formNode = document.querySelector('#example-form') as HTMLElement;
    const formEventHandler = new FormEventHandler(formNode);
    console.log('Initialising FormEventHandler');
    formEventHandler.init();
  }
}

export default Form;

