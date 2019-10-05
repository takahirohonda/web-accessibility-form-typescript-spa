import { IEventHandler } from './types/interfaces';
import SelectEventHandler from './SelectEventHandler';

class FormEventHandler implements IEventHandler {

  private formElement: HTMLElement;
  private selectEventHandler: IEventHandler;

  constructor(formElement: HTMLElement) {
    this.formElement = formElement;
    this.selectEventHandler = new SelectEventHandler(this.formElement);
  }

  init(): void {
    this.selectEventHandler.init();
  }

}

export default FormEventHandler;
