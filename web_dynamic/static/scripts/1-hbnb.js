#!/usr/bin/node
/* Houses jquery api that scripts the frontend of a flask app, defined in 1-hbnb.py, inside web_dynamic directory */
$(document).ready(function () {
  $('.popover ul li input').click(function () {
    if (this.checked) {
      
    }
    $('.amenities h4').append(this['data-name']);
  });
});
