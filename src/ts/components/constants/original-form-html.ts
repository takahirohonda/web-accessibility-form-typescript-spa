import {
  FORM_TITLE_ORIGINAL,
  FORM_TITLE,
  FORM_SUBTITLE
} from './constantValues';

export const ORIGINAL_FORM_HTML = `<form class="example-form" id="example-form">
  <h4>${FORM_TITLE}</h4>
  <p>*${FORM_TITLE_ORIGINAL} - ${FORM_SUBTITLE}</p>
  <div class="input-field">
    <label class="form-label" for="title">Title</label>
    <select id="title" class="form-input" name="title">
      <optgroup>
      <option value="">Select your title</option>
      </optgroup>
      <option value="Dr">Dr</option>
      <option value="Master">Master</option>
      <option value="Ms">Ms</option>
      <option value="Mrs">Mrs</option>
      <option value="Mr">Mr</option>
      <option value="Mx">Mx</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <div class="input-field">
    <label class="form-label" for="firstname">First name</label>
    <input type="text" class="form-input" id="firstname" name="firstname" placeholder="Your first name" />
  </div>

  <div class="input-field">
    <label class="form-label" for="lastname">Last name</label>
    <input type="text" class="form-input" id="lastname" name="lastname" placeholder="Your last name" />
  </div>

  <div class="input-field">
    <label class="form-label" for="email">Email</label>
    <input type="email" class="form-input" id="email" name="email" placeholder="Your email" />
  </div>

  <div class="input-field">
    <label class="form-label" for="phone">Phone</label>
    <input type="text" class="form-input" id="phone" name="phone" placeholder="Your phone number" />
  </div>

  <div class="input-field">
    <label class="form-label">Venue Location</label>
    <div class="radio-button-container">
      <div class="radio-button-group">
        <input type="radio" class="radio-input" id="sydney" name="venue" value="Sydney" />
        <label class="radio-label" for="sydney">
          <span class="ph-tick"></span>
          Sydney
        </label>
      </div>
      <div class="radio-button-group">
        <input type="radio" class="radio-input" id="melbourne" name="venue" value="melbourne" />
        <label class="radio-label" for="melbourne">
          <span class="ph-tick"></span>
          Melbourne
        </label>
      </div>
      <div class="radio-button-group">
        <input type="radio" class="radio-input" id="adelaide" name="venue" value="adelaide" />
        <label class="radio-label" for="adelaide">
          <span class="ph-tick"></span>
          Adelaide
        </label>
      </div>
      <div class="radio-button-group">
        <input type="radio" class="radio-input" id="brisbane" name="venue" value="brisbane" />
        <label class="radio-label" for="brisbane">
          <span class="ph-tick"></span>
          Brisbane
        </label>
      </div>
      <div class="radio-button-group">
        <input type="radio" class="radio-input" id="perth" name="venue" value="perth" />
        <label class="radio-label" for="perth">
          <span class="ph-tick"></span>
          Perth
        </label>
      </div>
      <div class="radio-button-group">
        <input type="radio" class="radio-input" id="goldcoast" name="venue" value="goldcoast" />
        <label class="radio-label" for="goldcoast">
          <span class="ph-tick"></span>
          Gold Coast
        </label>
      </div>
    </div>
  </div>

  <div class="input-field">
    <label class="form-label" for="tellus">Tell us about yourself</label>
    <textarea class="form-input-textarea" id="tellus" name="tellus" row = "10" placeholder="Go for it..."></textarea>
  </div>

  <div class="input-field">
    <p class="checkbox-title">Subscribe to our news letter</p>
    <div class="checkbox-group">
      <input type="checkbox" class="radio-input" id="subscribe" name="subscribe"/>
      <label class="radio-label" for="subscribe">
        <span class="ph-tick"></span>
        Subscribe
      </label>
    </div>
  </div>
  <button type="button" class="submit-btn">Submit</button>
</form>`;
