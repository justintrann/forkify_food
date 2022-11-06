// FLAG: At the first time, every protected is private . But View.js will extends all of this . So that why we convert to protected

import icons from 'url:../../img/icons.svg';
// import { Fraction } from 'fractional';

import View from './View';
import { API_KEY } from '../config';
class RecipeView extends View {
  _parentEle = document.querySelector('.recipe');
  _currentServing = document.querySelector('.recipe__info-data--people');

  _errorMess = 'No recipes found for your query. Please try again!';
  _successMess = 'NICE';

  // Publisher Event
  //   Cái này ảnh hưởng tới việc SHOW DATA to Client nên phải đặt ở Views - Sử dụng PubSub Pattern - Cho phép đặt event bên dưới ở đúng vị trí tại Views
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(currE =>
      window.addEventListener(`${currE}`, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentEle.addEventListener('click', function (e) {
      const currClick = e.target.closest('.btn--update-servings');
      if (!currClick) return;

      let currentData = +currClick.dataset.updatenumber;
      if (currentData === 0) return;
      handler(currentData);
    });
  }

  addHandlerBookmark(handler) {
    this._parentEle.addEventListener('click', function (e) {
      const currClick = e.target.closest('.btn--bookmark');
      if (!currClick) return;
      handler();
    });
  }

  //   P.R.I.V.A.T.E

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button data-updateNumber=${
            this._data.servings - 1
          } class="btn--tiny btn--update-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button data-updateNumber=${
            this._data.servings + 1
          } class="btn--tiny btn--update-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated ${
        !(this._data.key === API_KEY) ? 'hidden' : ''
      }">
        <svg>
            <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${
            this._data.bookmarked
              ? `${icons}#icon-bookmark-fill`
              : `${icons}#icon-bookmark`
          }"></use>

        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">

      ${this._data.ingredients.map(this._generateMarkupIngredients).join('')}

      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;
  }

  _generateMarkupIngredients(ing) {
    return `
    <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          // ing.quantity ? new Fraction(ing.quantity).toString() : ''
          ing.quantity ? ing.quantity : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
    </li>
  `;
  }
}

export default new RecipeView();
// Why export like dat' above ?? Because mostly we will create new Instance from father Class, remember that ?
