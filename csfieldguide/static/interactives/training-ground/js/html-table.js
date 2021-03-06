var TXT_REMAINING = gettext("Sticks<br>remaining:");
var TXT_CHANCE = gettext("Chance AI picks (%):");
var TXT_NETWORK = gettext("Nathaniel's neural network:");
var TXT_STICKS = {
  '1': gettext("1 stick"),
  '2': gettext("2 sticks"),
  '3': gettext("3 sticks")
}

const HIGHLIGHTS = {
  WIN: 'green',
  LOSS: 'red',
  UNDECIDED: 'blue'
}

/**
 * HtmlTable contains functions for creating and manipulating an HTML probability table
 */
class HtmlTable {
  constructor(parentDiv) {
    this.$parent = parentDiv;
  }

  /**
   * Builds the table, with the number of rows being the given size + 2 (for the headers)
   */
  createTable(size) {
    this.rows = size;
    var baseTable = '<tr>\n';
    baseTable +=    '  <th colspan="4">' + TXT_NETWORK + '</th>\n'
              +     '</tr>\n'
              +     '<tr>\n'
              +     '  <th rowspan="2">' + TXT_REMAINING + '</th>\n'
              +     '  <th colspan="3">' + TXT_CHANCE + '</th>\n'
              +     '</tr>\n'
              +     '<tr>\n'
              +     '  <th>' + TXT_STICKS['1'] + '</th>\n'
              +     '  <th>' + TXT_STICKS['2'] + '</th>\n'
              +     '  <th>' + TXT_STICKS['3'] + '</th>\n'
              +     '</tr>\n';
    for (var i=this.rows; i > 0; i--) {
      baseTable +=  '<tr id="row-' + i + '">\n'
                +   '  <td id="' + i + '-remaining">' + i + '</td>\n'
                +   '  <td id="' + i + '-1-sticks">N/A</td>\n'
                +   '  <td id="' + i + '-2-sticks">N/A</td>\n'
                +   '  <td id="' + i + '-3-sticks">N/A</td>\n'
                +   '</tr>\n';
    }
    this.$parent.html(baseTable);
  }

  /**
   * Highlights a row by adding the given css class 'colour' to two cells in the row:
   * The number of sticks 'remaining' (leftmost cell) and the 'number' of sticks chosen (one of the remaining three)
   */
  highlightCell(remaining, number, colour) {
    $('#' + remaining + '-remaining').addClass(colour);
    $('#' + remaining + '-' + number + '-sticks').addClass(colour);
  }

  /**
   * Replaces the class of any highlighted cell with the given colour class
   */
  recolourCells(colour) {
    $('.' + HIGHLIGHTS.UNDECIDED).addClass(colour).removeClass(HIGHLIGHTS.UNDECIDED);
  }

  /**
   * Removes all highlight css classes from all cells
   */
  uncolourCells() {
    $('.' + HIGHLIGHTS.UNDECIDED).removeClass(HIGHLIGHTS.UNDECIDED);
    $('.' + HIGHLIGHTS.WIN).removeClass(HIGHLIGHTS.WIN);
    $('.' + HIGHLIGHTS.LOSS).removeClass(HIGHLIGHTS.LOSS);
  }

  /**
   * Populates the probability values in the table with the given neural network map
   */
  populateTable(networkMap) {
    var entry;
    for (var value in networkMap) {
      entry = networkMap[value];
      $('#' + entry[0] + '-1-sticks').html(entry[1]);
      $('#' + entry[0] + '-2-sticks').html(entry[2]);
      $('#' + entry[0] + '-3-sticks').html(entry[3]);
    }
  }
}

module.exports = {
  HtmlTable,
  HIGHLIGHTS
}
