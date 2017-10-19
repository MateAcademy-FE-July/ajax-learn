// IIFE - Immediately Invoked Function Expression
(function ($, window, document) {

  // The $ is now locally scoped 

  // Listen for the jQuery ready event on the document
  $(function () {
      $('.load-me').on('click',function(){
        getNewItem();
      });

      // $(document).on('click', '.gallery__item', function(event){
      //   console.log($(event.target));
      //   console.log($(this).index());
      // });
  });

  function getNewItem() {
    $.ajax({
      type: 'GET',
      url: 'data.json',
      success: function(file) {
        createItems(file);
      },
      error: function() {
        console.log('WRONG');
      }
    });
  }

  // function createListItem() {
  //   var content = document.querySelector('template').content;
  //   var targetContainer = document.querySelector('.gallery');

  //   targetContainer.appendChild(document.importNode(content, true));
  // }

  function createItems(data){
    for (key in data) {
      if (typeof(data[key]) === 'object') {
        createItems(data[key]);
      } else {
        createListItem(data[key]);
      } 
    } 
  }

  function createListItem(country){
    var item = $('#template-item') // template-item::DOM
      .clone() // new DOM
      .removeAttr('id') // DOM without id
      .removeAttr('style'); // DOM without style
    
    item
      .find('.country') // .country span
      .html(country); 

    item.appendTo('.gallery');
  }

}(window.jQuery, window, document));
// The global jQuery object is passed as a parameter