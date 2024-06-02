#!/usr/bin/node
/* Houses jquery api that scripts the frontend of a flask app, defined in 1-hbnb.py, inside web_dynamic directory */
$(document).ready(function () {
  /* adds filter boxes on each of the amenities */
  const amenityFilteredNames = [];
  const amenityFilteredIds = [];
  $.each($('.popover ul li input'), function (ind, val) {
    $(val).click(function () {
      const h4Element = $('DIV.amenities H4');
      let texts = '';
      if ($(val).is(':checked')) {
        amenityFilteredNames.push($(this).attr('data-name'));
        amenityFilteredIds.push($(this).attr('data-id'));
      } else {
        amenityFilteredNames.splice(amenityFilteredNames.indexOf($(this).attr('data-name')), 1);
        amenityFilteredIds.splice(amenityFilteredIds.indexOf($(this).attr('data-id')), 1);
      }
      $.each(amenityFilteredNames, function (index, value) {
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
      if (amenityFilteredNames.length < 1) {
        h4Element.html('&nbsp;');
      } else {
        h4Element.text(texts);
      }
    });
  });

  /* makes http request to the hbnb api's status */
  const statusUrl = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(statusUrl, function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  /* makes http request to the hbnb api's places_search endpoint */
  const placeSearchUrl = 'http://0.0.0.0:5001/api/v1/places_search';
  const postData = {};
  $.ajax({
    url: placeSearchUrl,
    method: 'POST',
    data: JSON.stringify(postData),
    contentType: 'application/json',
    dataType: 'json',
    success: function (returnedPlaces) {
      $.each(returnedPlaces, function (index, place) {
        const articleTag = $('<article></article>');
        const titleBox = $('<div>', { class: 'title_box' });
        const h2Tag = $('<h2>', { text: place.name });
        h2Tag.appendTo(titleBox);
        const priceByNight = $('<div>',
          { class: 'price_by_night', text: `$${place.price_by_night}` });
        priceByNight.appendTo(titleBox);
        titleBox.appendTo(articleTag);
        const information = $('<div>', { class: 'information' });
        const maxGuest = $('<div>', { class: 'max_guest' });
        if (place.max_guest > 1) {
          maxGuest.text(`${place.max_guest} Guests`);
        } else {
          maxGuest.text(`${place.max_guest} Guest`);
        }
        maxGuest.appendTo(information);
        const numberRooms = $('<div>', { class: 'number_rooms' });
        if (place.number_rooms > 1) {
          numberRooms.text(`${place.number_rooms} Bedrooms`);
        } else {
          numberRooms.text(`${place.number_rooms} Bedroom`);
        }
        numberRooms.appendTo(information);
        const numberBathrooms = $('<div>', { class: 'number_bathrooms' });
        if (place.number_bathrooms > 1) {
          numberBathrooms.text(`${place.number_bathrooms} Bathrooms`);
        } else {
          numberBathrooms.text(`${place.number_bathrooms} Bathroom`);
        }
        numberBathrooms.appendTo(information);
        information.appendTo(articleTag);
        const userDiv = $('<div>', { class: 'user' });
        if (place.user?.first_name && place.user?.last_name) {
          userDiv.text(`<b>Owner</b> ${place.user.first_name} ${place.user.last_name}`);
        }
        userDiv.appendTo(articleTag);
        const descriptionDiv = $('<div>', { class: 'description' });
        if (place.description) {
          descriptionDiv.text(place.description);
        }
        descriptionDiv.appendTo(articleTag);
        $('section.places').append(articleTag);
      });
    },
    error: function (error) {
      console.error(error);
    }
  });

  /* adds event listener to the button to trigger searching for the place */
  $('button:contains("Search")').click(function () {
    if (amenityFilteredIds.length >= 1) {
      postData.amenities = amenityFilteredIds;
    } else {
      delete postData.amenities;
    }
    $('section.places').empty();
    $.ajax({
      url: placeSearchUrl,
      method: 'POST',
      data: JSON.stringify(postData),
      contentType: 'application/json',
      dataType: 'json',
      success: function (returnedPlaces) {
        $.each(returnedPlaces, function (index, place) {
          const articleTag = $('<article></article>');
          const titleBox = $('<div>', { class: 'title_box' });
          const h2Tag = $('<h2>', { text: place.name });
          h2Tag.appendTo(titleBox);
          const priceByNight = $('<div>',
            { class: 'price_by_night', text: `$${place.price_by_night}` });
          priceByNight.appendTo(titleBox);
          titleBox.appendTo(articleTag);
          const information = $('<div>', { class: 'information' });
          const maxGuest = $('<div>', { class: 'max_guest' });
          if (place.max_guest > 1) {
            maxGuest.text(`${place.max_guest} Guests`);
          } else {
            maxGuest.text(`${place.max_guest} Guest`);
          }
          maxGuest.appendTo(information);
          const numberRooms = $('<div>', { class: 'number_rooms' });
          if (place.number_rooms > 1) {
            numberRooms.text(`${place.number_rooms} Bedrooms`);
          } else {
            numberRooms.text(`${place.number_rooms} Bedroom`);
          }
          numberRooms.appendTo(information);
          const numberBathrooms = $('<div>', { class: 'number_bathrooms' });
          if (place.number_bathrooms > 1) {
            numberBathrooms.text(`${place.number_bathrooms} Bathrooms`);
          } else {
            numberBathrooms.text(`${place.number_bathrooms} Bathroom`);
          }
          numberBathrooms.appendTo(information);
          information.appendTo(articleTag);
          const userDiv = $('<div>', { class: 'user' });
          if (place.user?.first_name && place.user?.last_name) {
            userDiv.text(`<b>Owner</b> ${place.user.first_name} ${place.user.last_name}`);
          }
          userDiv.appendTo(articleTag);
          const descriptionDiv = $('<div>', { class: 'description' });
          if (place.description) {
            descriptionDiv.text(place.description);
          }
          descriptionDiv.appendTo(articleTag);
          $('section.places').append(articleTag);
        });
      },
      error: function (error) {
        console.error(error);
      }
    });
  });
});
