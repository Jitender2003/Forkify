import * as model from './model.js';
import recipeView  from './views/recipeView.js';
import "regenerator-runtime/runtime";
import SearchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';

const recipeContainer = document.querySelector('.recipe');


const controlRecipes = async function () {
  try { 
    const id = window.location.hash.slice(1);    
    if(!id) return;

    recipeView.renderSpinner();
   
    await model.loadRecipe(id);

    const { recipe } = model.state;
    recipeView.render(model.state.recipe);

    controlServings;

  } catch (err) {
   
    recipeView.renderError(`We couldn't find that recipe, ,Please try another one!`); 
  }

  
}; 

const controlSearchResults = async function () {
  try{
   
    
    const query = SearchView.getQuery();
    if(!query) return;

    resultView.renderSpinner();
   await model.loadSearchResults(query); 
   
  //  console.log(model.getSearchResultsPage());
   resultView.render(model.getSearchResultsPage());


   paginationView.render(model.state.search);
  }catch(err){
    console.log(err);
  }
  
}

controlSearchResults();

const controlPagination = function(goToPage){
  // console.log(goToPage);
  resultView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  // update the recipe servings(in state)
  model.updateServings(newServings);


  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

};

const controlAddBookmark = function(){
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
}


const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);

}
const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
 
  
};

init();

