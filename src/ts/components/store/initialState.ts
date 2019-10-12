import { IStoreData } from '../types/models';
import { ORIGINAL_FORM_TYPE } from '../constants/constantValues';

export const initialState: IStoreData = {
  formType: ORIGINAL_FORM_TYPE,
  formData: {
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    venueLocation: '',
    aboutYourself: '',
    subscribe: false
  },
  formSubmitted: false
};
