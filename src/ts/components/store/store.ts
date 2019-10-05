import { IStoreData } from '../types/customTypes';
import { IStore } from '../types/interfaces';
import {
  ORIGINAL_FORM_TYPE,
  ACCESSIBILITY_FORM_TYPE
} from '../constants/constantValues';

class Store implements IStore {
  private state: IStoreData;
  private initialState: IStoreData = {
    formType: ORIGINAL_FORM_TYPE
  };

  constructor() {
    this.state = this.initialState;
  }

  updateFormType(formType: string): void {
    this.state.formType = formType;
  }

  getFormType(): string {
    return this.state.formType;
  }

}

export default Store;

