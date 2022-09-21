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

  render(data, renderBoolean = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    //This function render only return string html, not insert anything
    const markup = this._generateMarkup();
    if (!renderBoolean) return markup;

    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;

    const markup = this._generateMarkup();
    const virtualDOM = document.createRange().createContextualFragment(markup);
    const virtualEle = virtualDOM.querySelectorAll('*');
    const realEle = this._parentEle.querySelectorAll('*');
    // console.log(virtualDOM);
    const currRealDOM = Array.from(realEle);
    const currFakeDOM = Array.from(virtualEle);

    currFakeDOM.forEach((nodeFake, i) => {
      const nodeReal = currRealDOM[i];

      // Change textContent
      if (
        !nodeFake.isEqualNode(nodeReal) &&
        nodeFake.firstChild?.nodeValue.trim() !== ''
      ) {
        nodeReal.textContent = nodeFake.textContent;

        // console.log(nodeFake.firstChild?.nodeValue);
      }

      // Change dataset attr
      if (!nodeFake.isEqualNode(nodeReal)) {
        // DOM way (Only for recipeView.js)
        // this._parentEle.querySelector(
        //   '.btn--update-servings'
        // ).dataset.updatenumber = this._data.servings;

        // Advance way
        Array.from(nodeFake.attributes).forEach(attr =>
          nodeReal.setAttribute(attr.name, attr.value)
        );
      }
    });

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
