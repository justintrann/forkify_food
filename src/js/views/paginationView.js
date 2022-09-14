import icons from 'url:../../img/icons.svg';

import View from './View';

class PaginationView extends View {
  _parentEle = document.querySelector('.pagination');

  _generateMarkup() {
    const totalPage = Math.ceil(this._data.results.length / this._data.perPage);
    // Gen for specific scenario

    // 1. First page .in more page
    if (this._data.currentPage === 1 && totalPage > 1)
      return this._genNextButton();

    // 2. Middle page .in more page
    if (this._data.currentPage > 1 && this._data.currentPage < totalPage)
      return this._genPrevButton() + this._genNextButton();

    // 3. Last page .in more page
    if (this._data.currentPage === totalPage && totalPage > 1)
      return this._genPrevButton();

    ///NO THINGs
    return '';
  }

  _genPrevButton() {
    return `
        <button data-goto=${
          this._data.currentPage - 1
        } class="btn--inline pagination__btn--prev">
             <svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
             </svg>
             <span>Page ${this._data.currentPage - 1}</span>
        </button>
    `;
  }

  _genNextButton() {
    return `
    <button data-goto=${
      this._data.currentPage + 1
    } class="btn--inline pagination__btn--next">
    <span>Page ${this._data.currentPage + 1}</span>
    <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
    </svg>
</button>
`;
  }

  addHandlerClick(handler) {
    this._parentEle.addEventListener('click', function (e) {
      const currClick = e.target.closest('.btn--inline');
      if (!currClick) return;

      let currPageClick = +currClick.dataset.goto;
      handler(currPageClick);
      //   MAGIC of pagi is here: handler trucks currPageClick to Controller
    });
  }
}

export default new PaginationView();
