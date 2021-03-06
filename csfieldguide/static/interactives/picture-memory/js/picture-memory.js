var items = [
  gettext("backpack"),
  gettext("banana"),
  gettext("bike"),
  gettext("book"),
  gettext("cactus"),
  gettext("calculator"),
  gettext("camera"),
  gettext("chair"),
  gettext("mug"),
  gettext("duck"),
  gettext("envelope"),
  gettext("football"),
  gettext("forklift"),
  gettext("glasses"),
  gettext("guitar"),
  gettext("scissors"),
  gettext("sheep"),
  gettext("sock"),
  gettext("teapot"),
  gettext("t-shirt"),
  gettext("toothbrush")
]

var itemsShown = [];
const NUM_ITEMS_SHOWN = 16;

$(document).ready(function(){
  $('#ready-button').click(function() {
    showItems();
    $('#items-container').removeClass('d-none');
    $('.intro-content').addClass('d-none');

    var timerDisplay = $('#stm-timer');
    timerDisplay.removeClass('d-none');
    var timeLeft = 29; // 30 is already displayed in html template
    var timerText = $('#time-left');
    var timerFunction = setInterval(countdown, 1000);
  
    /* Timer for displaying items */
    function countdown() {
      if (timeLeft <= 0) {
        clearTimeout(timerFunction);
        $('#items-container').addClass('d-none');
        timerDisplay.addClass('d-none');
        $('#answer-instructions').removeClass('d-none');
        $('#answer-input').removeClass('d-none');
        $('#answer-input').addClass('d-flex justify-content-center');
        $('#submit-div').removeClass('d-none');
      } else {
        if (timeLeft <= 5) {
          $('#stm-timer b').css('color', 'red');
        }
        timerText.html(timeLeft);
        timeLeft--;
      }
    }
  });

  /* Checks how many items the user remembered correctly.
  *  Displays how many items they remembered, what items they forgot and
  *  what items they thought they saw (but were in fact not shown). */
  $('#submit-button').click(function() {
    var itemsChecked = [];
    $.each($("input[name='answers']:checked"), function() {            
      itemsChecked.push($(this).val());
    });

    var correct = 0;
    for (i = 0; i < itemsChecked.length; i++) {
      if (itemsShown.includes(itemsChecked[i])) {
        correct += 1;
      }
    }

    $('#num-correct').html(correct);
    $('#answer-input').removeClass('d-flex justify-content-center');
    $('#answer-input').addClass('d-none');
    $('#submit-div').addClass('d-none');
    $('#answer-instructions').addClass('d-none');
    var answerSet = new Set(itemsChecked);
    var itemsShownSet = new Set(itemsShown);
    var itemsIncorrect = new Set([...answerSet].filter(x => !itemsShownSet.has(x)));
    if (correct === NUM_ITEMS_SHOWN) {
      $('#items-correct-text').removeClass('d-none');
    } else if (correct < NUM_ITEMS_SHOWN) {
      // Show the items that were missed
      answerSet.forEach(function(value) {
        itemDiv = $('#item-' + value);
        itemDiv.addClass('d-none');
      });

      $('#items-missed-text').removeClass('d-none');
      $('#items-container').removeClass('d-none');
    }

    // If the user selected items that weren't shown
    if (itemsIncorrect.size > 0) {
      itemsIncorrectString = '';
      // List items the user checked that were never shown
      itemsIncorrect.forEach(function(value) {
        itemsIncorrectString += value.charAt(0).toUpperCase() + value.slice(1) + '<br>';
      });
      $('#incorrect-items-div').removeClass('d-none');
      $('#incorrect-items').html(itemsIncorrectString);
    }

    $('#restart-div').removeClass('d-none');
  });

  // Reset interface
  $('#restart-button').click(function() {
    $('.intro-content').removeClass('d-none');
    $('#stm-timer b').css('color', '#212529');
    $('#answer-input').removeClass('d-flex justify-content-center');
    $('#answer-input').addClass('d-none');
    $('#submit-div').addClass('d-none');
    $('#answer-instructions').addClass('d-none');
    $('input[type="checkbox"]').prop('checked', false);
    $('#restart-div').addClass('d-none');
    $('#items-correct-text').addClass('d-none');
    $('#items-missed-text').addClass('d-none');
    $('#items-missed').html('');
    $('#incorrect-items-div').addClass('d-none');
    $('#incorrect-items').html('');
    resetItems();
    $('#time-left').html(30);
    $('#stm-answer-input').val('');
  });
});

/* Shuffles the items list and displays the 
*  first 16 items in the list. */
function showItems() {
  shuffle(items);
  itemsToShow = items.slice(0, NUM_ITEMS_SHOWN);
  itemsShown = itemsToShow;
  for (i = 0; i < items.length; i++) {
    itemDiv = $('#item-' + itemsToShow[i]);
    itemDiv.removeClass('d-none');
    itemDiv.prependTo($('#items-container'));
  }
}

/* Hide all items. */
function resetItems() {
  for (i = 0; i < items.length; i++) {
    itemDiv = $('#item-' + items[i]);
    itemDiv.addClass('d-none');
  }
}


/**
 * Shuffles array in place.
 * @param {Array} a The array containing the items.
 * Taken from high-score-boxes.js
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
  }
}
