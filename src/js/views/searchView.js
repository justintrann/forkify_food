import icons from 'url:../../img/icons.svg';

import View from './View';

class searchView extends View {
  _parentEle = document.querySelector('.search');

  getQuery() {
    const value = this._parentEle.querySelector('.search__field').value;
    this._clearInput();
    return value;
  }

  //   Protected

  _clearInput() {
    this._parentEle.querySelector('.search__field').value = '';
  }

  //   Do it!
  addHandlerSearch(handler) {
    this._parentEle.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
