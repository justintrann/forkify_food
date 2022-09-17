import View from './View';
import previewView from './previewView';

class ResultView extends View {
  _parentEle = document.querySelector('.results');
  _errorMess = 'No recipes found for your query. Please try again!';
  _successMess = 'NICE';

  _generateMarkup() {
    return this._data.map(val => previewView.render(val, false)).join('');
  }
}

export default new ResultView();
