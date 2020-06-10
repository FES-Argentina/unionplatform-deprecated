import { getCurrentTokens, getCookie } from './session';

/**
 * Helper class to build headers for api requests to the backend.
 */
export default class Headers {
  static types = {
    APPLICATION_JSON: 'application/json',
    APPLICATION_HAL_JSON: 'application/hal+json',
    APPLICATION_OCTET_STREAM: 'application/octet-stream',
  }

  constructor(contentType = false) {
    this.headers = {};
    if (contentType) {
      this.setContentType(contentType);
    }
  }

  /**
   * Sets the current session cookie.
   */
  setCookie() {
    const cookie = getCookie();
    this.headers['Cookie'] = `${cookie.name}=${cookie.value}`;
    return this;
  }

  /**
   * Sets the current session authToken as X-CSRF-Token.
   */
  setAuthToken() {
    const { authToken } = getCurrentTokens();
    return this.setToken(authToken);
  }

  /**
   * Sets token as the X-CSRF-Token header.
   */
  setToken(token) {
    this.headers['X-CSRF-Token'] = token;
    return this;
  }

  /**
   * Sets the Content-Type header to type.
   */
  setContentType(contentType) {
    this.headers['Content-Type'] = contentType;
    return this;
  }

  /**
   * Sets the content disposition header using filename.
   */
  setContentDisposition(filename) {
    this.headers['Content-Disposition'] = `file; filename="${filename}"`;
    return this;
  }

  /**
   * Returns the assembled headers Object.
   */
  build() {
    return this.headers;
  }

}
