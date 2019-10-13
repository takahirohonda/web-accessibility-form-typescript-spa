import SubmitHandler from '../SubmitHandler';
import { ACCESIBLE_FORM_HTML } from '../constants/accessible-form-html';
import Store from '../store/store';

describe('SubmitHandler.spec.ts', () => {

  beforeEach(() => {
    const fixture = `<div id="fixture">${ACCESIBLE_FORM_HTML}</div>`;
    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture') as HTMLElement);
  });

  it('should call right functions on submit with all the required field filled', () => {
    // Arrange
    const store = new Store();
    const formElement = document.querySelector('.example-form-accessible') as HTMLElement;
    const submitHandler = new SubmitHandler(formElement, store);
    submitHandler.init();
    // create spy for called methods
    const scrollIntoViewSpy = spyOn((formElement.querySelector('.form-title') as HTMLElement),
      'scrollIntoView');
    const confirmSpy = spyOn(window, 'confirm');
    // update form values
    (formElement.querySelector('#title') as HTMLInputElement).value = 'Dr';
    (formElement.querySelector('#firstname') as HTMLInputElement).value  = 'Hello';
    (formElement.querySelector('#lastname') as HTMLInputElement).value  = 'World';
    (formElement.querySelector('#email') as HTMLInputElement).value  = 'email@mail.com';
    (formElement.querySelector('#phone') as HTMLInputElement).value  = '0400000000';
    (formElement.querySelector('#melbourne') as HTMLInputElement).checked  = true;
    (formElement.querySelector('#tellus') as HTMLInputElement).value  = 'hello world';
    (formElement.querySelector('#subscribe') as HTMLInputElement).checked  = true;
    // Expected pop up message
    // Indentation is needed for string match
        const expectedMessage: string = `
        Form Submission Successfull!

        Title: Dr
        Firstname: Hello
        Lastname: World
        Email: email@mail.com
        Phone: 0400000000
        Venue Location: melbourne
        Tell us about yourself: hello world
        Subscribed: Yes`;

    // Act
    const submitBtn = formElement.querySelector('.submit-btn') as HTMLButtonElement;
    submitBtn.click();

    // Assert
    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewSpy).toHaveBeenCalledWith(true);
    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(confirmSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should add error message on submit without required field filled', () => {
    // Arrange
    const store = new Store();
    const formElement = document.querySelector('.example-form-accessible') as HTMLElement;
    const submitHandler = new SubmitHandler(formElement, store);
    submitHandler.init();
    // create spy for called methods
    const scrollIntoViewSpy = spyOn((formElement.querySelector('.form-title') as HTMLElement),
      'scrollIntoView');
    const confirmSpy = spyOn(window, 'confirm');

    // Act
    const submitBtn = formElement.querySelector('.submit-btn') as HTMLButtonElement;
    submitBtn.click();

    // Assert
    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewSpy).toHaveBeenCalledWith(true);
    expect(confirmSpy).toHaveBeenCalledTimes(0);

    const titleClassList = (formElement.querySelector('#title') as HTMLElement).classList;
    const firstNameClassList = (formElement.querySelector('#firstname') as HTMLElement).classList;
    const lastNameClassList = (formElement.querySelector('#lastname') as HTMLElement).classList;
    const emailClassList = (formElement.querySelector('#email') as HTMLElement).classList;
    const phoneClassList = (formElement.querySelector('#phone') as HTMLElement).classList;
    const venueClassList = (formElement.querySelector('.venueLocation-group') as HTMLElement).classList;
    expect(titleClassList.contains('error-border')).toBe(true);
    expect(firstNameClassList.contains('error-border')).toBe(true);
    expect(lastNameClassList.contains('error-border')).toBe(true);
    expect(emailClassList.contains('error-border')).toBe(true);
    expect(phoneClassList.contains('error-border')).toBe(true);
    expect(venueClassList.contains('error-border')).toBe(true);
    expect((formElement.querySelector('.required-error-msg') as HTMLElement)).not.toBeNull();
  });

  it('should remove error message as required fields are being filled', () => {
    // Arrange
    const store = new Store();
    const formElement = document.querySelector('.example-form-accessible') as HTMLElement;
    const submitHandler = new SubmitHandler(formElement, store);
    submitHandler.init();
    // create spy for called methods
    const scrollIntoViewSpy = spyOn((formElement.querySelector('.form-title') as HTMLElement),
      'scrollIntoView');
    const confirmSpy = spyOn(window, 'confirm');

    // Act & Assert
    // (1) first get all the error messages
    const submitBtn = formElement.querySelector('.submit-btn') as HTMLButtonElement;
    submitBtn.click();
    // Make sure error messages exist
    const titleClassList = (formElement.querySelector('#title') as HTMLElement).classList;
    const firstNameClassList = (formElement.querySelector('#firstname') as HTMLElement).classList;
    const lastNameClassList = (formElement.querySelector('#lastname') as HTMLElement).classList;
    const emailClassList = (formElement.querySelector('#email') as HTMLElement).classList;
    const phoneClassList = (formElement.querySelector('#phone') as HTMLElement).classList;
    const venueClassList = (formElement.querySelector('.venueLocation-group') as HTMLElement).classList;
    expect(titleClassList.contains('error-border')).toBe(true);
    expect(firstNameClassList.contains('error-border')).toBe(true);
    expect(lastNameClassList.contains('error-border')).toBe(true);
    expect(emailClassList.contains('error-border')).toBe(true);
    expect(phoneClassList.contains('error-border')).toBe(true);
    expect(venueClassList.contains('error-border')).toBe(true);
    expect((formElement.querySelector('.required-error-msg') as HTMLElement)).not.toBeNull();
    // (2) Change the input fields
    // title
    const titleInputElem = formElement.querySelector('#title') as HTMLInputElement;
    titleInputElem.value = 'Dr';
    titleInputElem.dispatchEvent(new Event('change'));
    expect((formElement.querySelector('#title') as HTMLInputElement).classList).not.toContain('error-border');
    expect((formElement.querySelector('.required-error-msg') as HTMLElement)).not.toBeNull();
    // firstName
    const firstNameInputElem = formElement.querySelector('#firstname') as HTMLInputElement;
    firstNameInputElem.value = 'my first name';
    firstNameInputElem.dispatchEvent(new Event('change'));
    expect((formElement.querySelector('#firstname') as HTMLInputElement).classList).not.toContain('error-border');
    expect((formElement.querySelector('.required-error-msg') as HTMLElement)).not.toBeNull();
    // lastName
    const lastNameInputElem = formElement.querySelector('#lastname') as HTMLInputElement;
    lastNameInputElem.value = 'my last name';
    lastNameInputElem.dispatchEvent(new Event('change'));
    expect((formElement.querySelector('#lastname') as HTMLInputElement).classList).not.toContain('error-border');
    expect((formElement.querySelector('.required-error-msg') as HTMLElement)).not.toBeNull();
    // email
    const emailInputElem = formElement.querySelector('#email') as HTMLInputElement;
    emailInputElem.value = 'mail@email.com';
    emailInputElem.dispatchEvent(new Event('change'));
    expect((formElement.querySelector('#email') as HTMLInputElement).classList).not.toContain('error-border');
    expect((formElement.querySelector('.required-error-msg') as HTMLElement)).not.toBeNull();
    // phone
    const phoneInputElem = formElement.querySelector('#phone') as HTMLInputElement;
    phoneInputElem.value = '0400000000';
    phoneInputElem.dispatchEvent(new Event('change'));
    expect((formElement.querySelector('#phone') as HTMLInputElement).classList).not.toContain('error-border');
    expect((formElement.querySelector('.required-error-msg') as HTMLElement)).not.toBeNull();
    // venueLocation
    // error message at the top should be gone.
    const venueLocationInputElem = formElement.querySelector('#melbourne') as HTMLInputElement;
    venueLocationInputElem.checked = true;
    venueLocationInputElem.dispatchEvent(new Event('change'));
    expect((formElement.querySelector('.venueLocation-group') as HTMLInputElement).classList).not.toContain('error-border');
    expect((formElement.querySelector('.required-error-msg') as HTMLElement)).toBeNull();
  });
});
