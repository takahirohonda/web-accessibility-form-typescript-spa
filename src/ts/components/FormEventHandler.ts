import { IEventHandler, ISubmitHandler } from './types/interfaces';
import SelectEventHandler from './SelectEventHandler';
import SubmitHandler from './SubmitHandler';

class FormEventHandler implements IEventHandler {

  private formElement: HTMLElement;
  private selectEventHandler: IEventHandler;
  private submitHandler: ISubmitHandler;

  constructor(formElement: HTMLElement,
    selectEventHandler: IEventHandler,
    submitHandler: ISubmitHandler) {
    this.formElement = formElement;
    this.selectEventHandler = selectEventHandler;
    this.submitHandler = submitHandler;
  }

  public init(): void {
    this.selectEventHandler.init();
    this.radioInputHandler();
    this.checkboxInputHandler();
    this.submitHandler.init();
  }


  private radioInputHandler(): void {
    const radioInputElements = this.formElement.querySelectorAll('.radio-input-ac');
    this.addEventListenerForAriaCheckedRadio(radioInputElements);

  }

  private checkboxInputHandler(): void {
    const checkboxInputElements = this.formElement.querySelectorAll('.checkbox-input-ac');
    this.addEventListenerForAriaCheckedCheckBox(checkboxInputElements);
  }

  private addEventListenerForAriaCheckedRadio (elementList: any): void {
    for (let elem of elementList) {
      elem.addEventListener('click', () => {
        for (let elem of elementList) {
          if (elem.checked) {
            elem.setAttribute('aria-checked', 'true');
          } else {
            elem.setAttribute('aria-checked', 'false');
          }
        }
      });
    }
  }

  private addEventListenerForAriaCheckedCheckBox (elementList: any): void {
    for (let elem of elementList) {
      elem.addEventListener('click', (e: Event) => {
        this.setAriaChecked(<HTMLInputElement>e.target);
      });
    }
  }

  private setAriaChecked (elem: HTMLInputElement): void {
    if (elem.checked) {
      elem.setAttribute('aria-checked', 'true');
    } else {
      elem.setAttribute('aria-checked', 'false');
    }
  }
}

export default FormEventHandler;
