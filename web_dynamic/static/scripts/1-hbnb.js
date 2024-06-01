#!/usr/bin/node
/* Houses jquery api that scripts the frontend of a flask app, defined in 1-hbnb.py, inside web_dynamic directory */
$(document).ready(function () {
  const filters = [];
  $.each($('.popover ul li input'), function (ind, val) {
    $(val).click(function () {
      const h4Element = $('DIV.amenities H4');
      let texts = '';
      if ($(val).is(':checked')) {
        filters.push($(this).attr('data-name'));
      } else {
        filters.splice(filters.indexOf($(this).attr('data-name')), 1);
      }
      $.each(filters, function (index, value) {
        if (texts.length < 2) {
          texts = texts.concat(value);
        } else {
          texts = texts.concat(', ');
          texts = texts.concat(value);
        }
      });
      if (texts.length > 30) {
        texts = texts.substring(0, 30) + '...';
      }
      if (filters.length < 1) {
        h4Element.html('&nbsp;');
      } else {
        h4Element.text(texts);
      }
    });
  });
});
