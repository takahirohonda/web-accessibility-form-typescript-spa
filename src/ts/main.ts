// import { validation } from './form-validation/validate.event.handlers';
// export { validation };

import Form from './components/form';
import Store from './components/store/store';
import SwitchBtnEventHandler from './components/SwitchBtnEventHandler';

document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('#form-root') as HTMLElement;
  const store = new Store();
  const form = new Form(store, target);
  const switchBtnEventHandler = new SwitchBtnEventHandler(store, form);
  switchBtnEventHandler.init();
  form.render();
});
