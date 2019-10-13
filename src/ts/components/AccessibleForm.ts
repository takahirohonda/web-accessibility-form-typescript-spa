import { ACCESIBLE_FORM_HTML } from './constants/accessible-form-html';
import { IFormUi } from './types/interfaces'
;
class AccessibleForm implements IFormUi {

  private target: HTMLElement;

  constructor(target: HTMLElement) {
    this.target = target;
  }

  public render(): void {
    this.target.insertAdjacentHTML('afterend', ACCESIBLE_FORM_HTML);
  }
}

export default AccessibleForm;
