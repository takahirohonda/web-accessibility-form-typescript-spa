import SelectEventHandler from './SelectEventHandler';
import SubmitHandler from './SubmitHandler';
import FormEventHandler from './FormEventHandler';
import { IEventHandlerInitializer, IStore } from './types/interfaces';

class EventHandlerInitializer implements IEventHandlerInitializer {

  private store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  public init(formElement: HTMLElement): void {
    const selectEventHandler = new SelectEventHandler(formElement);
    const submitHandler = new SubmitHandler(formElement, this.store);
    const formEventHandler = new FormEventHandler(formElement, selectEventHandler, submitHandler);
    formEventHandler.init();
  }
}

export default EventHandlerInitializer;

