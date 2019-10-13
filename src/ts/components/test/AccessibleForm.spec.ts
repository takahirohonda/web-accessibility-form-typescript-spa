import AccessibleForm from '../AccessibleForm';

describe('AccessibleForm.spec.ts', () => {
  beforeEach(() => {
    const fixture = `<div id="fixture"></div>`;
    document.body.insertAdjacentHTML(
      'afterbegin',
      fixture
    );
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture') as HTMLElement);
    document.body.removeChild(document.querySelector('.example-form-accessible') as HTMLElement);
  });

  it('should render accessibiltiy form', () => {
    const host = document.querySelector('#fixture') as HTMLElement;
    const AccessibileForm = new AccessibleForm(host);
    AccessibileForm.render();
    const formElement = document.querySelector('.example-form-accessible');
    expect(formElement).not.toBe(null);
  });
});
