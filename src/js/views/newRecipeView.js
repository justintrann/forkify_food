import icons from 'url:../../img/icons.svg';

import View from './View';

class newRecipeView extends View {
  _parentEle = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  //   Run immediately
  constructor() {
    super();
    this._addHandlerShowModal();
  }

  toggleRecipeForm() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowModal() {
    [this._btnOpen, this._btnClose, this._overlay].forEach(btn =>
      btn.addEventListener('click', this.toggleRecipeForm.bind(this))
    );
  }

  addHandlerUpload(handler) {
    this._parentEle.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      handler(Object.fromEntries(data));
    });
  }

  _generateMarkup() {}
}

export default new newRecipeView();
