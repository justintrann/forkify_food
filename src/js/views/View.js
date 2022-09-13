import icons from 'url:../../img/icons.svg';

// FLAG: Remember this is parent of all current Views
export default class View {
  _data;
  //   _data comes from model.js, thank to controller.js (without it, view.js wont know where data coming)

  //   According to our paragraph ...

  _clear() {
    this._parentEle.innerHTML = '';
  }

  renderSpinner() {
    // This function marked as a public func for controller.js's calling!
    const markup = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
  `;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    console.log(this._data);

    const markup = this._generateMarkup();
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMess) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccess(message = this._successMess) {
    const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }
}
