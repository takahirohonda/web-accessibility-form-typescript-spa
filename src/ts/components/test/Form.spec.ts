import Form from '../Form';
import AccessibleForm from '../AccessibleForm';
import OriginalForm from '../OriginalForm';
import Store from '../store/store';
import {
  ORIGINAL_FORM_TYPE,
  ACCESSIBILITY_FORM_TYPE
} from '../constants/constantValues';

describe('Form.spec.ts', () => {
  beforeEach(() => {
    const fixture = '<div id="fixture"><form id="example-form"></form></div>';
    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture') as HTMLElement);
  });

  it('should call render method from original form when type is original', () => {
    // Arrange
    const targetElement = document.getElementById('fixture') as HTMLElement;
    // Mock OriginalForm & AccessibleForm
    const originalForm = new OriginalForm(targetElement);
    const spyOriginalFormRender = spyOn(originalForm, 'render');
    const accessibleForm = new AccessibleForm(targetElement);
    const spyAccessibleFormRender = spyOn(accessibleForm, 'render');
    // Mock Store
    const store = new Store();
    spyOn(store, 'getFormType').and.returnValue(ORIGINAL_FORM_TYPE);
    // Instantiate the class to test
    const form = new Form(store, accessibleForm, originalForm);

    // Act
    form.render();

    // Assert
    expect(spyOriginalFormRender).toHaveBeenCalledTimes(1);
    expect(spyAccessibleFormRender).toHaveBeenCalledTimes(0);
  });

  it('should call render method from accessible form when type is accessible', () => {
    // Arrange
    const targetElement = document.getElementById('fixture') as HTMLElement;
    // Mock OriginalForm & AccessibleForm
    const originalForm = new OriginalForm(targetElement);
    const spyOriginalFormRender = spyOn(originalForm, 'render');
    const accessibleForm = new AccessibleForm(targetElement);
    const spyAccessibleFormRender = spyOn(accessibleForm, 'render');
    // Mock Store
    const store = new Store();
    spyOn(store, 'getFormType').and.returnValue(ACCESSIBILITY_FORM_TYPE);
    // Instantiate the class to test
    const form = new Form(store, accessibleForm, originalForm);

    // Act
    form.render();

    // Assert
    expect(spyOriginalFormRender).toHaveBeenCalledTimes(0);
    expect(spyAccessibleFormRender).toHaveBeenCalledTimes(1);
  });
});
