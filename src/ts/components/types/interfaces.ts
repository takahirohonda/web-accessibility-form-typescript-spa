import { IStoreData } from './customTypes';

export interface IStore {
  updateFormType(formType: string): void;
  getFormType(): string;
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
