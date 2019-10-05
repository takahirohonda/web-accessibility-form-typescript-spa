// import { validation } from './form-validation/validate.event.handlers';
// export { validation };

import Form from './components/form';
import Store from './components/store/store';
import SwitchBtnEventHandler from './components/SwitchBtnEventHandler';
import FormEventHandler from './components/FormEventHandler';

document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('#form-root') as HTMLElement;
  const store = new Store();
  const form = new Form(store, target);
  const switchBtnEventHandler = new SwitchBtnEventHandler(store, form);
  switchBtnEventHandler.init();
  console.log('Rendering form');
  form.render();

  // Attach Form Event
  const formNode = document.querySelector('#example-form') as HTMLElement;
  const formEventHandler = new FormEventHandler(formNode);
  console.log('Initialising FormEventHandler');
  formEventHandler.init();
});
