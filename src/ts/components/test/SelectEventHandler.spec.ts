import SelectEventHandler from '../SelectEventHandler';

describe('SelectEventHandler.spec.ts', () => {

  beforeEach(() => {
    const fixture = `<div id="fixture">
      <form id="mock-form">
        <select id="first-select">
          <option value="" class="default">Select option</option>
          <option value="Dr" class="option">Dr</option>
        </select>
        <select id="second-select">
          <option value="" class="default">Select option</option>
          <option value="Dr" class="option">Dr</option>
        </select>
      </form>
    </div>`;

    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture') as HTMLElement);
  });

  it('should change to ligher color on all select elements on input without any input value', () => {
    const formElement = document.querySelector('#mock-form') as HTMLElement;
    const selectEventHandler = new SelectEventHandler(formElement);
    selectEventHandler.init();
    const selectElements = document.querySelectorAll('select') as any;

    for (let selectElem of selectElements) {
      selectElem.dispatchEvent(new Event('input'));
      expect(selectElem.style.color).toBe('rgb(117, 117, 117)');
    }
  });

  it('should change to black on all select elements on input with input value', () => {
    const formElement = document.querySelector('#mock-form') as HTMLElement;
    const selectEventHandler = new SelectEventHandler(formElement);
    selectEventHandler.init();
    const selectElements = document.querySelectorAll('select') as any;

    for (let selectElem of selectElements) {
      // this value needs to be the one exists in option.
      // if you put random value like 'hello', this will not work.
      selectElem.value = 'Dr';
      selectElem.dispatchEvent(new Event('input'));
      expect(selectElem.style.color).toBe('black');
    }
  });

  it('should change color to black on all select elements on focus', () => {
    const formElement = document.querySelector('#mock-form') as HTMLElement;
    const selectEventHandler = new SelectEventHandler(formElement);
    selectEventHandler.init();
    const selectElements = document.querySelectorAll('select') as any;

    for (let selectElem of selectElements) {
      selectElem.dispatchEvent(new Event('focus'));
      expect(selectElem.style.color).toBe('black');
    }
  });

  it('should change to ligher color on all select elements on blur without any input value', () => {
    const formElement = document.querySelector('#mock-form') as HTMLElement;
    const selectEventHandler = new SelectEventHandler(formElement);
    selectEventHandler.init();
    const selectElements = document.querySelectorAll('select') as any;

    for (let selectElem of selectElements) {
      selectElem.dispatchEvent(new Event('blur'));
      expect(selectElem.style.color).toBe('rgb(117, 117, 117)');
    }
  });

  it('should change to black on all select elements on blur with input value', () => {
    const formElement = document.querySelector('#mock-form') as HTMLElement;
    const selectEventHandler = new SelectEventHandler(formElement);
    selectEventHandler.init();
    const selectElements = document.querySelectorAll('select') as any;

    for (let selectElem of selectElements) {
      selectElem.value = 'Dr';
      selectElem.dispatchEvent(new Event('blur'));
      expect(selectElem.style.color).toBe('black');
    }
  });
});
