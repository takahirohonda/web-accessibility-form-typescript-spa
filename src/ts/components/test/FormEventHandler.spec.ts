import FormEventHandler from '../FormEventHandler';
import { IEventHandler, IStore, ISubmitHandler } from '../types/interfaces';

describe('FormEventHandler.spec.ts', () => {
  beforeEach(() => {
    const fixture = `<form id="fixture">
      <div role="radiogroup">
        <h3>Radio buttons</h3>
        <div role="radio" class="radio-input-ac" value="option1" id="option1">
          Option 1
        </div>
        <div role="radio" class="radio-input-ac" value="option2" id="option2">
          Option 2
        </div>
        <div role="radio" class="radio-input-ac" value="option3" id="option3">
          Option 3
        </div>
      </div>
      <div class="select-section">
        <span role="checkbox" aria-checked="false" class="checkbox-input-ac"
          id="subscribe" name="subscribe" /></span>
        <label for="subscribe">subscribe</label>
      </div>
    </form>`;

    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  afterEach(() => {
    document.body.removeChild((document.getElementById('fixture') as HTMLElement));
  });

  it('should call selectEventHandler.init() and submitHandler.init() on init()', () => {
    // Arrange
    const selectEventHandlerMock = new SelectEventHandlerMock();
    const selectEventHandlerInitSpy = spyOn(selectEventHandlerMock, 'init');
    const submitHandlerMock = new SubmitHandlerMock();
    const submitHandlerInitSpy = spyOn(submitHandlerMock, 'init');
    const formElement = document.querySelector('#fixture') as HTMLElement;
    const formEventHandler = new FormEventHandler(formElement, selectEventHandlerMock, submitHandlerMock);

    // Act
    formEventHandler.init();

    // Assert
    expect(selectEventHandlerInitSpy).toHaveBeenCalledTimes(1);
    expect(submitHandlerInitSpy).toHaveBeenCalledTimes(1);

  });

  it('should set correct aria-checked attritube on radio input', () => {
    // Arrange
    const selectEventHandlerMock = new SelectEventHandlerMock();
    const submitHandlerMock = new SubmitHandlerMock();
    const formElement = document.querySelector('#fixture') as HTMLElement;
    const formEventHandler = new FormEventHandler(formElement, selectEventHandlerMock, submitHandlerMock);

    // Act
    formEventHandler.init();
    const clickedElement = document.getElementById('option1') as HTMLInputElement;
    clickedElement.checked = true;
    clickedElement.click();

    // Assert
    const radioGroupElements = document.querySelectorAll('.radio-input-ac') as any;
    for (let elem of radioGroupElements) {
      if (elem.getAttribute('id') === 'option1') {
        expect(elem.getAttribute('aria-checked')).toBe('true');
      } else {
        expect(elem.getAttribute('aria-checked')).toBe('false');
      }
    }
  });

  it('should set aria-checked to true on checkbox input when ticked', () => {
    // Arrange
    const selectEventHandlerMock = new SelectEventHandlerMock();
    const submitHandlerMock = new SubmitHandlerMock();
    const formElement = document.querySelector('#fixture') as HTMLElement;
    const formEventHandler = new FormEventHandler(formElement, selectEventHandlerMock, submitHandlerMock);

    // Act
    formEventHandler.init();
    const clickedElement = document.getElementById('subscribe') as HTMLInputElement;
    clickedElement.checked = true;
    clickedElement.click();

    // Assert
    expect(clickedElement.getAttribute('aria-checked')).toBe('true');
  });

  it('should set aria-checked to false on checkbox input when not ticked', () => {
    // Arrange
    const selectEventHandlerMock = new SelectEventHandlerMock();
    const submitHandlerMock = new SubmitHandlerMock();
    const formElement = document.querySelector('#fixture') as HTMLElement;
    const formEventHandler = new FormEventHandler(formElement, selectEventHandlerMock, submitHandlerMock);

    // Act
    formEventHandler.init();
    const clickedElement = document.getElementById('subscribe') as HTMLInputElement;
    clickedElement.click();

    // Assert
    expect(clickedElement.getAttribute('aria-checked')).toBe('false');
  });
});

class SelectEventHandlerMock implements IEventHandler {
  public init(): void {
    const check = true;
  }
}

class SubmitHandlerMock implements ISubmitHandler {
  public init(): void {
    const check = true;
  }
}
