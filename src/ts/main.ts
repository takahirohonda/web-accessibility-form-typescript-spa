// import { validation } from './form-validation/validate.event.handlers';
// export { validation };
import OriginalForm from './components/OriginalForm';
import AccessibleForm from './components/AccessibleForm';
import Form from './components/form';
import Store from './components/store/store';
import SwitchBtnEventHandler from './components/SwitchBtnEventHandler';
import EventHandlerInitializer from './components/EventHandlerInitializer';

document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('#form-root') as HTMLElement;
  const store = new Store();
  const originalForm = new OriginalForm(target);
  const accessibleForm = new AccessibleForm(target);
  const form = new Form(store, accessibleForm, originalForm);
  const eventHandlerInitializer = new EventHandlerInitializer(store);
  const switchBtnEventHandler = new SwitchBtnEventHandler(store, form, eventHandlerInitializer);

  // initialise button event handler
  switchBtnEventHandler.init();

  // Render form
  form.render();

  // attach event handlers to form
  const formElement = document.getElementById('example-form') as HTMLElement;
  eventHandlerInitializer.init(formElement);
});
