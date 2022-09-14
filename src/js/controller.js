import 'core-js/stable';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// CENTER - V
const controlRecipe = async function () {
  try {
    // STAGE # 0: Initial
    let currentHash = window.location.hash.slice(1);
    if (!currentHash) return;
    recipeView.renderSpinner();

    // STAGE # 1: Get Data API
    await model.loadRecipe(currentHash);

    // STAGE # 2: Rendering Recipe API from #1
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

// TOP AND LEFT - V
const controlSearchResult = async function () {
  try {
    // STAGE # 0: Initial data and event
    resultView.renderSpinner();

    // STAGE # 1: GET query from input
    const query = searchView.getQuery();
    if (!query) return;

    // STAGE # 2: Load data from model + clear input field
    await model.loadSearchRecipes(`?search=${query}`);

    // STAGE # 3: Render list (On the left)
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultPages());

    // STAGE # 4: Render Pagination Button
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error + ' From Controller');
  }
};

// LEFT - V
const controlPagination = function (newCurrPage) {
  try {
    // STAGE # 1: Render NEW list (On the left)
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultPages(newCurrPage));

    // STAGE # 2: Render NEW Pagination Button
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error + ' From Controller');
  }
};

// CURRENT
//prettier-ignore
const controlServings = function (newServings) {
  try {
    // STAGE # 1: Update new number Serving in state
    model.updateServings(newServings);

    // STAGE # 2: Re-render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error + ' From Controller');
  }
};
////////////////////////////////////////////
// Subscriber Event - LISTEN
// const init = (function () {
//   recipeView.addHandlerRender(controlRecipe);
// })();
// This is the same

(function init() {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  // controlServings();
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
})();

if (module.hot) module.hot.accept();
