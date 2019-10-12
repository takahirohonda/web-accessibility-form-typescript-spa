import { IStoreData, IFormModel } from '../types/models';
import { IStore } from '../types/interfaces';
import { initialState } from '../store/initialState';

class Store implements IStore {
  private state: IStoreData;
  private initialState: IStoreData = initialState;

  constructor() {
    this.state = this.initialState;
  }

  public updateFormType(formType: string): void {
    this.state.formType = formType;
  }

  public getFormType(): string {
    return this.state.formType;
  }

  public updateFormData(formData: IFormModel): void {
    this.state.formData = formData;
  }

  public getFormData(): IFormModel {
    return this.state.formData;
  }

  public updateFormSubmitted(submitted: boolean): void {
    this.state.formSubmitted = submitted;
  }

  public getFormSubmitted(): boolean {
    return this.state.formSubmitted;
  }

}

export default Store;

