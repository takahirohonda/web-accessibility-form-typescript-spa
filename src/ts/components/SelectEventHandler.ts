import { IEventHandler } from './types/interfaces';

class SelectEventHandler implements IEventHandler {

  private formElement: HTMLElement;
  private selectElements: any;

  constructor(formElement: HTMLElement) {
    this.formElement = formElement;
    this.selectElements = this.formElement.querySelectorAll('select');
  }

  public init(): void {
    this.selectStyleAddEvents();
  }

  private selectStyleAddEvents(): void {
    for (let elem of this.selectElements) {
      elem.addEventListener('input', (e: any) => {
        this.changeStyle(e.target.value, elem);
      });
      elem.addEventListener('blur', (e: any) => {
        this.changeStyle(e.target.value, elem);
      });
      elem.addEventListener('focus', () => {
        elem.style.color = 'black';
      });
    }
  }

  private changeStyle(value: string, elem: HTMLElement): void {
    if (value.length > 0) {
      elem.style.color = 'black';
    } else {
      elem.style.color = 'rgb(117, 117, 117)';
    }
  }
}

export default SelectEventHandler;
