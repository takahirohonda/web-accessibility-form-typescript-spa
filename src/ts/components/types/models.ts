export interface IStoreData {
  formType: string;
  formData: IFormModel;
  formSubmitted: boolean;
}

export interface IFormModel {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  venueLocation: string;
  aboutYourself: string;
  subscribe: boolean;
}
