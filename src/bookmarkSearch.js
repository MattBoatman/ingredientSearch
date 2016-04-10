var allBookmarks;
var recipeFolder = 're';
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    if (text.startsWith(recipeFolder)) {
      console.log(searchForCorrectFolder(allBookmarks, 'Recipes'));
    }
    //_searchBookMarks(text);
    suggest([
      //these are the suggestions so aka search results
      {content: text + " one", description: "the first one"},
      {content: text + " number two", description: "the second entry"}
    ]);
  });

function searchForCorrectFolder(bookmarks, title) {
  for(var x=0;x<bookmarks.length;x++) {
    console.log(bookmarks[x].title, bookmarks[x].url ? bookmarks[x].url : "[Folder]");
    if (bookmarks[x].title === 'Recipes') {
      console.log('found recipes');
      return bookmarks[x].id;
    }
  }
  //need to work on this if recipe folder is in other bookmarks
      if (bookmarks[0].children) {
       var id = searchForCorrectFolder(bookmarks[0].children);
        if(id)
          return id;
      }


}

function _searchBookMarks(query) {
  chrome.bookmarks.search(query, function(results) {
  });
}
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    console.log(allBookmarks);
    console.log('inputEntered: ' + text);
  });

(function _getBookmarks() {
  chrome.bookmarks.getTree(function(bookmarks) {
    allBookmarks = bookmarks;
  });
})();