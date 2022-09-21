import icons from 'url:../../img/icons.svg';

import View from './View';

class newRecipeView extends View {
  _parentEle = document.querySelector('.upload');
  _successMess = 'Uploaded successfully bro';
  _errorMess = 'Damnn. It"s failed';

  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  _errorMess = 'Sth go wrong when create new recipe';
  //   Run immediately
  constructor() {
    super();
    this._addHandlerShowModal();
  }

  toggleRecipeForm() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');

    if (
      this._parentEle.querySelector('.error') ||
      this._parentEle.querySelector('.message')
    ) {
      this._clear();

      this._parentEle.insertAdjacentHTML(
        'afterbegin',
        this._generateDefaultMarkup()
      );
    }
  }

  reGenerateMarkup() {}
  _addHandlerShowModal() {
    [this._btnOpen, this._btnClose, this._overlay].forEach(btn =>
      btn.addEventListener(
        'click',
        // this.reGenerateMarkup.bind(this);
        this.toggleRecipeForm.bind(this)
      )
    );
  }

  addHandlerUpload(handler) {
    this._parentEle.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      handler(Object.fromEntries(data));
    });
  }

  _generateDefaultMarkup() {
    return `
    <form class="upload">
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="TEST" required name="title" type="text" />
        <label>URL</label>
        <input value="TEST" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="TEST" required name="image" type="text" />
        <label>Publisher</label>
        <input value="TEST" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="23" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="23" required name="servings" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input value="0.5,kg,Rice" type="text" required name="ingredient-1"
          placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 2</label>
        <input value="1,,Avocado" type="text" name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 3</label>
        <input value=",,salt" type="text" name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 4</label>
        <input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 5</label>
        <input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 6</label>
        <input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="${icons}#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
    </form>
    `;
  }

  _generateMarkup() {}
}

export default new newRecipeView();
