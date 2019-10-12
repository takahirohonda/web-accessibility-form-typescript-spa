import { IFormModel } from './types/models';
import { IStore, ISubmitHandler } from './types/interfaces';

class SubmitHandler implements ISubmitHandler {

  private formElement: HTMLElement;
  private store: IStore;

  constructor(formElement: HTMLElement, store: IStore) {
    this.formElement = formElement;
    this.store = store;
  }

  public init(): void {
    const submitBtn = this.formElement.querySelector('.submit-btn') as HTMLButtonElement;

    // submit button on click handler
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleSubmit();
      const formData = this.store.getFormData();
      console.log(this.store.getFormData());

      const error = this.validateFieldsAndIndicateErrorInput(formData);
      this.addErrorMessage(error);

      // Todo: extract this to function
      const yPosition = (this.formElement.querySelector('.form-title') as HTMLElement).offsetTop;
      console.log(yPosition);
      (this.formElement.querySelector('.form-title') as HTMLElement).scrollIntoView(true);

      if (!error) {
        const message: string = `
        Form Submission Successfull!

        Title: ${formData.title}
        Firstname: ${formData.firstName}
        Lastname: ${formData.lastName}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Venue Location: ${formData.venueLocation}
        Tell us about yourself: ${formData.aboutYourself}
        Subscribed: ${formData.subscribe ? 'Yes' : 'No'}
        `;
        const confirmClosed = window.confirm(message);
        if (confirmClosed) {
          this.clearForm();
        }
      }
    });

    // Input field on click handler
    // Todo: this is a quick hack and not efficient. It needs to be refactored.
    const inputElements = this.formElement.querySelectorAll('.input-field') as any;
    for (let element of inputElements) {
      element.addEventListener('change', (e: Event) => {
        if (this.formElement.querySelector('.required-error-msg')) {
          if ((e.target as HTMLInputElement).value) {
            this.removeErrorBorder((e.target as HTMLElement).classList);
            this.removeErrorMessage();
          }
        }
      });
    }

    const radioInputElements = this.formElement.querySelectorAll('.radio-input') as any;
    for (let element of radioInputElements) {
      element.addEventListener('change', (e: Event) => {
        if (this.formElement.querySelector('.required-error-msg')) {
          if ((e.target as HTMLInputElement).value) {
            this.removeErrorBorder((this.formElement.querySelector('.venueLocation-group') as HTMLElement).classList);
            this.removeErrorMessage();
          }
        }
      });
    }
  }

  // Todo: refactor this method
  private removeErrorMessage(): void {
    const errorBorderClassList = this.formElement.querySelectorAll('.error-border');
    if (!errorBorderClassList.length) {
      (this.formElement.querySelector('.required-error-msg') as HTMLElement).remove();
    }
  }

  // Todo: refactor this method
  private clearForm(): void {
    (this.formElement.querySelector('#title') as HTMLInputElement).value = '';
    (this.formElement.querySelector('#title') as HTMLInputElement).dispatchEvent(new Event('input'));
    (this.formElement.querySelector('#firstname') as HTMLInputElement).value  = '';
    (this.formElement.querySelector('#lastname') as HTMLInputElement).value  = '';
    (this.formElement.querySelector('#email') as HTMLInputElement).value  = '';
    (this.formElement.querySelector('#phone') as HTMLInputElement).value  = '';
    for (let element of this.formElement.querySelectorAll('.radio-input') as any) {
      element.checked = false;
    }
    (this.formElement.querySelector('#tellus') as HTMLInputElement).value  = '';
    (this.formElement.querySelector('#subscribe') as HTMLInputElement).checked = false;
  }

  private handleSubmit(): void {
    this.store.updateFormData(this.getFormValues());
    this.store.updateFormSubmitted(true);
  }

  private getFormValues(): IFormModel {
    const title = (this.formElement.querySelector('#title') as HTMLInputElement).value;
    const firstName = (this.formElement.querySelector('#firstname') as HTMLInputElement).value;
    const lastName = (this.formElement.querySelector('#lastname') as HTMLInputElement).value;
    const email = (this.formElement.querySelector('#email') as HTMLInputElement).value;
    const phone = (this.formElement.querySelector('#phone') as HTMLInputElement).value;
    const venueLocation = this.getVenueLocation(this.formElement.querySelectorAll('.radio-input'));
    const aboutYourself = (this.formElement.querySelector('#tellus') as HTMLInputElement).value;
    const subscribe = (this.formElement.querySelector('#subscribe') as HTMLInputElement).checked;

    return {
      title,
      firstName,
      lastName,
      email,
      phone,
      venueLocation,
      aboutYourself,
      subscribe
    };
  }

  private validateFieldsAndIndicateErrorInput(data: IFormModel): boolean {
    let error = false;
    const titleClassList = (this.formElement.querySelector('#title') as HTMLElement).classList;
    const firstNameClassList = (this.formElement.querySelector('#firstname') as HTMLElement).classList;
    const lastNameClassList = (this.formElement.querySelector('#lastname') as HTMLElement).classList;
    const emailClassList = (this.formElement.querySelector('#email') as HTMLElement).classList;
    const phoneClassList = (this.formElement.querySelector('#phone') as HTMLElement).classList;
    const venueClassList = (this.formElement.querySelector('.venueLocation-group') as HTMLElement).classList;

    // remove error-border class if exists
    if (titleClassList.contains('error-border')) {
      this.removeErrorBorder(titleClassList);
    }
    if (firstNameClassList.contains('error-border')) {
      this.removeErrorBorder(firstNameClassList);
    }
    if (lastNameClassList.contains('error-border')) {
      this.removeErrorBorder(lastNameClassList);
    }
    if (emailClassList.contains('error-border')) {
      this.removeErrorBorder(emailClassList);
    }
    if (phoneClassList.contains('error-border')) {
      this.removeErrorBorder(phoneClassList);
    }
    if (venueClassList.contains('error-border')) {
      this.removeErrorBorder(venueClassList);
    }

    // Check required fields and add error-border class
    if (data.title.length < 1) {
      this.addErrorBorder(titleClassList);
      error = true;
    }
    if (data.firstName.length < 1) {
      this.addErrorBorder(firstNameClassList);
      error = true;
    }
    if (data.lastName.length < 1) {
      this.addErrorBorder(lastNameClassList);
      error = true;
    }
    if (data.email.length < 1) {
      this.addErrorBorder(emailClassList);
      error = true;
    }
    if (data.phone.length < 1) {
      this.addErrorBorder(phoneClassList);
      error = true;
    }
    if (data.venueLocation.length < 1) {
      this.addErrorBorder(venueClassList);
      error = true;
    }
    return error;
  }

  private removeErrorBorder(classList: DOMTokenList): void {
    classList.remove('error-border');
  }

  private addErrorBorder(classList: DOMTokenList): void {
    classList.add('error-border');
  }

  private addErrorMessage (error: boolean): void {
    const errorMessageElem = this.formElement.querySelector('.required-error-msg');

    if (errorMessageElem) {
      errorMessageElem.remove();
    }

    if (error) {
      const targetElem = this.formElement.querySelector('.form-subtitle') as HTMLElement;
      const requiredErrorMsg = `<span class='required-error-msg'>Required field must be filled</span>`;
      targetElem.insertAdjacentHTML('afterend', requiredErrorMsg);
    }
  }

  private getVenueLocation(radioInputGroup: any): string {

    for (let radioInput of radioInputGroup) {
      if (radioInput.checked) {
        return radioInput.value;
      }
    }
    return '';
  }
}

export default SubmitHandler;
