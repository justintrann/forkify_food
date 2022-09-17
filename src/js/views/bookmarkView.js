import View from './View';
import previewView from './previewView';

class bookmarkView extends View {
  _parentEle = document.querySelector('.bookmarks__list');
  _errorMess = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _successMess = 'NICE';

  _generateMarkup() {
    return this._data.map(val => previewView.render(val, false)).join('');
  }
}

export default new bookmarkView();
