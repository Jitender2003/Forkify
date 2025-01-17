import "regenerator-runtime/runtime";
import View from "./view";

class PaginationView extends View {
    
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            // console.log(btn);
            if(!btn)return;

            const goToPage = +btn.dataset.goto;
            // console.log(goToPage);
            handler(goToPage);

        })

    }
   

    _generateMarkup() {
        const  currPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // console.log(numPages);

        //  at page 1, ther are other pages
        if(currPage === 1 && numPages > 1){
            return `
                      <button data-goto = "${currPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>`;

        }

        // page 2, and ther are no other pages

        // last page
        if(currPage === numPages && numPages > 1){
            return `
            <button data-goto = " ${currPage - 1}"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage -1}</span>
          </button>`;

        }

        // Other pages
        if(currPage < numPages){
            return `
              <button data-goto = " ${currPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
           <button data-goto = "${currPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>`;
        }

        return '';

    }
}

export default new PaginationView();