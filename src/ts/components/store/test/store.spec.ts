import Store from '../store';

describe('store.spec.ts', () => {

  it('updateFormType()', () => {
    const store = new Store();
    store.updateFormType('new form type');
    expect(store.getFormType()).toBe('new form type');
  });

  it('updateFormData()', () => {
    const store = new Store();
    const mockData = {
      title: 'Mr',
      firstName: 'Test',
      lastName: 'Mock',
      email: 'email@mail.com',
      phone: '0400000000',
      venueLocation: 'Sydney',
      aboutYourself: 'Hello World',
      subscribe: true
    };
    store.updateFormData(mockData);
    expect(store.getFormData()).toEqual(mockData);
  });

  it('updateFormSubmitted()', () => {
    const store = new Store();
    store.updateFormSubmitted(true);
    expect(store.getFormSubmitted()).toBe(true);
  });
});
