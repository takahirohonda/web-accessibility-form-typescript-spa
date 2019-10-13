import OriginalForm from '../OriginalForm';

describe('OriginalForm.spec.ts', () => {
  beforeEach(() => {
    const fixture = `<div id="fixture"></div>`;
    document.body.insertAdjacentHTML(
      'afterbegin',
      fixture
    );
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture') as HTMLElement);
    document.body.removeChild(document.querySelector('.example-form') as HTMLElement);
  });

  it('should render original form', () => {
    const host = document.querySelector('#fixture') as HTMLElement;
    const originalForm = new OriginalForm(host);
    originalForm.render();
    const formElement = document.querySelector('.example-form');
    expect(formElement).not.toBe(null);
  });
});
