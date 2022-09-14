import { API_URL, RESULT_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';

// Everydata must to go to STATE . All func is created to serve this STATE
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    currentPage: 1,
    perPage: RESULT_PER_PAGE,
  },
};

// state -> recipe
export const loadRecipe = async function (currentHash) {
  try {
    const recData = await getJSON(`${API_URL}${currentHash}`);
    // console.log(recData);

    const { recipe } = recData.data;

    // Throw recipe above into state.recipe
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // return state.recipe;
  } catch (error) {
    throw error;
  }
};

// state -> search
export const loadSearchRecipes = async function (query) {
  try {
    state.search.query = query;

    const recData = await getJSON(`${API_URL}${query}`);
    const { recipes } = recData.data;

    state.search.results = recipes.map(reci => {
      return {
        id: reci.id,
        title: reci.title,
        publisher: reci.publisher,
        image: reci.image_url,
      };
    });
  } catch (error) {
    throw new Error('This is message from model.js');
    // console.error(error);
    // throw error;
  }
};

export const getSearchResultPages = (_currentPage = 1) => {
  state.search.currentPage = _currentPage;

  const start = (_currentPage - 1) * state.search.perPage;
  const end = _currentPage * 10;

  return state.search.results.slice(start, end);
};

// More like a Method-procedure
export const updateServings = function (needServing) {
  try {
    state.recipe.ingredients.forEach(
      ing =>
        (ing.quantity = (ing.quantity / state.recipe.servings) * needServing)
    );
    // After click, now we have new .servings state
    state.recipe.servings = needServing;
    console.log(needServing);
  } catch (error) {
    throw new Error('This is message from model.js');
  }
};
