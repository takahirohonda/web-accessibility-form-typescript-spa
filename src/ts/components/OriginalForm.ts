import { ORIGINAL_FORM_HTML } from './constants/original-form-html';
import { IFormUi } from './types/interfaces';

class OriginalForm implements IFormUi {

  private target: HTMLElement;

  constructor(target: HTMLElement) {
    this.target = target;
  }

  public render(): void {
    this.target.insertAdjacentHTML('afterend', ORIGINAL_FORM_HTML);
  }

}

export default OriginalForm;
