import SwitchBtnEventHandler from '../SwitchBtnEventHandler';
import Store from '../store/store';
import { IFormUi, IEventHandlerInitializer } from '../types/interfaces';
import Form from '../form';
import {
  ORIGINAL_FORM_TYPE,
  ACCESSIBILITY_FORM_TYPE,
  SWITCH_TO_ACCESSIBLE,
  SWITCH_TO_ORIGINAL
} from '../constants/constantValues';

describe('SwitchBtnEventHandler.spec.ts', () => {

  beforeEach(() => {
    const fixture = `<div id="fixture"><button type="button" class="btn-switch">
    <span class="button-text"></span>
    </button></div>
    `;
    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture') as HTMLElement);
  });

  it('should switch to original form when type is Original', () => {
    // Arrange
    const store = new Store();
    spyOn(store, 'getFormType').and.returnValue(ORIGINAL_FORM_TYPE);
    const updateFormTypeSpy = spyOn(store, 'updateFormType');
    const accessibleFormMock = new AccessibleFormMock();
    const originalFormMock = new OriginalFormMock();
    const eventHandlerInitializerMock = new EventHandlerInitializerMock();
    const form = new Form(store, accessibleFormMock, originalFormMock);
    const formReRenderSpy = spyOn(form, 'reRender');

    const switchBtnEventHandler = new SwitchBtnEventHandler(store, form, eventHandlerInitializerMock);
    switchBtnEventHandler.init();

    // Act
    const btn = document.querySelector('.btn-switch') as HTMLElement;
    btn.click();

    // Assert
    expect(updateFormTypeSpy).toHaveBeenCalledWith(ACCESSIBILITY_FORM_TYPE);
    expect(formReRenderSpy).toHaveBeenCalledTimes(1);
    expect((document.querySelector('.button-text') as HTMLElement).innerHTML)
    .toBe(SWITCH_TO_ORIGINAL);
  });

  it('should switch to accessible form when type is Accessibile', () => {
    // Arrange
    const store = new Store();
    spyOn(store, 'getFormType').and.returnValue(ACCESSIBILITY_FORM_TYPE);
    const updateFormTypeSpy = spyOn(store, 'updateFormType');
    const accessibleFormMock = new AccessibleFormMock();
    const originalFormMock = new OriginalFormMock();
    const eventHandlerInitializerMock = new EventHandlerInitializerMock();
    const form = new Form(store, accessibleFormMock, originalFormMock);
    const formReRenderSpy = spyOn(form, 'reRender');

    const switchBtnEventHandler = new SwitchBtnEventHandler(store, form, eventHandlerInitializerMock);
    switchBtnEventHandler.init();

    // Act
    const btn = document.querySelector('.btn-switch') as HTMLElement;
    btn.dispatchEvent(new Event('click'));

    // Assert
    expect(updateFormTypeSpy).toHaveBeenCalledWith(ORIGINAL_FORM_TYPE);
    expect(formReRenderSpy).toHaveBeenCalledTimes(1);
    expect((document.querySelector('.button-text') as HTMLElement).innerHTML)
    .toBe(SWITCH_TO_ACCESSIBLE);
  });
});

class AccessibleFormMock implements IFormUi {
  public render(): void {
    const check = true;
  }
  public reRender(): void {
    const check = true;
  }
}

class OriginalFormMock implements IFormUi {
  public render(): void {
    const check = true;
  }
  public reRender(): void {
    const check = true;
  }
}

class EventHandlerInitializerMock implements IEventHandlerInitializer {
  public init(elem: HTMLElement): void {
    const check = elem;
  }
}
