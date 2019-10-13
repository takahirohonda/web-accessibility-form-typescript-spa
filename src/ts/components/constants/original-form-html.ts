import {
  FORM_TITLE_ORIGINAL,
  FORM_TITLE,
  FORM_SUBTITLE
} from './constantValues';

export const ORIGINAL_FORM_HTML = `<form class="example-form" id="example-form">
  <h4 class="form-title">${FORM_TITLE}</h4>
  <p class="form-subtitle">*${FORM_TITLE_ORIGINAL} - ${FORM_SUBTITLE}</p>
  <div class="input-field">
    <label class="form-label" for="title">Title</label>
    <select id="title" class="form-input required-input-field" name="title" required>
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
    <input type="text" class="form-input required-input-field" id="firstname" name="firstname" placeholder="Your first name" required />
  </div>

  <div class="input-field">
    <label class="form-label" for="lastname">Last name</label>
    <input type="text" class="form-input required-input-field" id="lastname" name="lastname" placeholder="Your last name" required />
  </div>

  <div class="input-field">
    <label class="form-label" for="email">Email</label>
    <input type="email" class="form-input required-input-field" id="email" name="email" placeholder="Your email" required />
  </div>

  <div class="input-field">
    <label class="form-label" for="phone">Phone</label>
    <input type="text" class="form-input required-input-field" id="phone" name="phone" placeholder="Your phone number" required />
  </div>

  <div class="input-field">
    <label class="form-label">Venue Location</label>
    <div class="radio-button-container venueLocation-group">
      <div class="radio-button-group">
        <input type="radio" class="radio-input radio-input-ac" id="sydney" name="venue" value="Sydney" aria-checked="false" required />
        <label class="radio-label" for="sydney">
          <span class="ph-tick"></span>
          Sydney
        </label>
      </div>
      <div class="radio-button-group">
        <input type="radio" class="radio-input radio-input-ac" id="melbourne" name="venue" value="melbourne" aria-checked="false" />
        <label class="radio-label" for="melbourne">
          <span class="ph-tick"></span>
          Melbourne
        </label>
      </div>
      <div class="radio-button-group">
        <input type="radio" class="radio-input radio-input-ac" id="adelaide" name="venue" value="adelaide" aria-checked="false" />
        <label class="radio-label" for="adelaide">
          <span class="ph-tick"></span>
          Adelaide
        </label>
      </div>
      <div class="radio-button-group">
        <input type="radio" class="radio-input radio-input-ac" id="brisbane" name="venue" value="brisbane" aria-checked="false" />
        <label class="radio-label" for="brisbane">
          <span class="ph-tick"></span>
          Brisbane
        </label>
      </div>
      <div class="radio-button-group">
        <input type="radio" class="radio-input radio-input-ac" id="perth" name="venue" value="perth" aria-checked="false" />
        <label class="radio-label" for="perth">
          <span class="ph-tick"></span>
          Perth
        </label>
      </div>
      <div class="radio-button-group">
        <input type="radio" class="radio-input radio-input-ac" id="goldcoast" name="venue" value="goldcoast" aria-checked="false" />
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
  <button type="submit" class="submit-btn">Submit</button>
</form>`;
