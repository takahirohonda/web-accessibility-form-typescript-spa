import { IStoreData, IFormModel } from './models';

export interface IStore {
  updateFormType(formType: string): void;
  getFormType(): string;
  updateFormData(formData: IFormModel): void;
  getFormData(): IFormModel;
  updateFormSubmitted(submitted: boolean): void;
  getFormSubmitted(): boolean;
}

export interface IFormUi {
  render(): void;
}

export interface IFormRender {
  render(): void;
  reRender(): void;
}

export interface IEventHandler {
  init(): void;
}

export interface ISubmitHandler {
  init(): void;
}
