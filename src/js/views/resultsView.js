import View from './View';

class ResultView extends View {
  _parentEle = document.querySelector('.results');
  _errorMess = 'No recipes found for your query. Please try again!';
  _successMess = 'NICE';

  _generateMarkup() {
    const resPreview = this._data
      .map(val => this._generatePreviewMarkup(val))
      .join('');

    return resPreview;
  }

  _generatePreviewMarkup(element) {
    const currId = window.location.hash.slice(1);
    return `
    <li class="preview">
            <a class="preview__link ${
              currId === element.id ? 'preview__link--active' : ''
            }" href="#${element.id}">
              <figure class="preview__fig">
                <img src="${element.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${element.title}</h4>
                <p class="preview__publisher">${element.publisher}</p>
              </div>
            </a>
          </li>
    `;
  }
}

export default new ResultView();
