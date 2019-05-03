instructionStructure = new Array();
bookUpdateStructure = new Array();
var levelCode = null;
var myInterpreter = null;
var highlightPause = false;
var latestCode = '';
var runTimeout = null;
var state = [];
var instructionUpdateCounter = 0;
var mostRecentHighlightId = null;
var firstErrorBlock = null;
// divs/areas
var lastErrorArea = document.getElementById('lastError');
var table = document.getElementById('movementTable');
// buttons
var nextButton = document.getElementById('nextButton');
var stepButton = document.getElementById('stepButton');
var runButton = document.getElementById('runButton');
var previousButton = document.getElementById('previousButton');
var modalNextLevelButton = document.getElementById('modalNextLevelButton');
var helpButton = document.getElementById('helpButton');
var resetButton = document.getElementById('resetButton');
var homeButton = document.getElementById('homeButton');
var usernameSlot = document.getElementById('usernameSlot');
var errorArea = document.getElementById('errorArea');
var errorAreaText = document.getElementById('errorAreaText');
var errorHighlightButton = document.getElementById('errorHighlightButton');
var variableDisplayArea = document.getElementById('variableDisplayArea');



function conditional_quick(op, arg0, arg1) {
  pushInstruction('conditional_quick', [op, arg0, arg1]);
  return evalStringOperator(arg0, op, arg1);
}

Blockly.JavaScript['conditional_quick'] = function (block) {
  var operator = block.getFieldValue('OP');
  var order = Blockly.JavaScript.ORDER_ATOMIC;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);
  var code = 'conditional_quick("' + operator.toString() + '",' + argument0 + ',' + argument1 + ')';
  return [code, order];
};

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  {
    "type": "conditional_quick",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["=", "Equal"],
          ["\u2260", "NotEqual"],
          ["\u200F<", "Less"],
          ["\u200F\u2264", "LessEqual"],
          ["\u200F>", "Greater"],
          ["\u200F\u2265", "GreaterEqual"]
        ]
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": "%{BKY_LOGIC_HUE}",
    "helpUrl": "%{BKY_LOGIC_COMPARE_HELPURL}",
    "extensions": ["logic_compare", "logic_op_tooltip"]
  }]);



Blockly.Blocks['quick_sort_structure'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("QuickSort")
      .appendField(new Blockly.FieldVariable("Start"), "Left")
      .appendField(new Blockly.FieldNumber(0, 0), "leftInput")
      .appendField(new Blockly.FieldVariable("End"), "Right")
      .appendField(new Blockly.FieldNumber(0, 0), "rightInput");
    this.appendStatementInput("NAME")
      .setCheck(null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setMovable(false);
    this.setDeletable(false);
  }
};
Blockly.JavaScript['quick_sort_structure'] = function (block) {
  var variable_left = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('Left'), Blockly.Variables.NAME_TYPE);
  var number_leftinput = block.getFieldValue('leftInput');
  var variable_right = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('Right'), Blockly.Variables.NAME_TYPE);
  var number_rightinput = block.getFieldValue('rightInput');
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  var branch = Blockly.JavaScript.statementToCode(block, 'NAME');

  return 'quick_sort_structure(' + number_leftinput.toString() + ',' + number_rightinput.toString() + ');\n' + variable_left.toString() + '=' + number_leftinput.toString() + ';\n' + variable_right.toString() + '=' + number_rightinput.toString() + ';\n' + branch;
};
function quick_sort_structure(number_leftinput, number_rightinput) {
  pushInstruction('quick_sort_structure', [number_leftinput, number_rightinput]);
}

Blockly.Blocks['quick_sort'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("QuickSort");
    this.appendValueInput("Left")
      .setCheck("Number")
      .appendField("Start Index");
    this.appendValueInput("Right")
      .setCheck("Number")
      .appendField("End Index");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("qiqi helped with this a lot! ");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['quick_sort'] = function (block) {
  var value_left = Blockly.JavaScript.valueToCode(block, 'Left', Blockly.JavaScript.ORDER_ATOMIC);
  var value_right = Blockly.JavaScript.valueToCode(block, 'Right', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'quickSort(' + value_left + ',' + value_right + ',"true");'
  return code;
};


Blockly.Blocks['partition_array'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Partition Array");
    this.appendValueInput("Left")
      .appendField("Start Index");
    this.appendValueInput("Right")
      .appendField("End Index");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['partition_array'] = function (block) {
  var value_left = Blockly.JavaScript.valueToCode(block, 'Left', Blockly.JavaScript.ORDER_ATOMIC);
  var value_right = Blockly.JavaScript.valueToCode(block, 'Right', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'partitionArray(' + value_left + ',' + value_right + ', "true")';
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['swap_status'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["swapped", "swapped"], ["not swapped", "not swapped"]]), "swapped");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['swap_status'] = function (block) {
  var dropdown_swapped = block.getFieldValue('swapped');
  if (dropdown_swapped === 'swapped') {
    var code = 'true'
  } else {
    var code = 'false'
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['controls_for'] = function (block) {
  // For loop.
  var variable0 = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM',
    Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'TO',
    Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var increment = Blockly.JavaScript.valueToCode(block, 'BY',
    Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
  var code;
  if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
    Blockly.isNumber(increment)) {
    // All arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
      variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
      variable0;
    var step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + 'pushInstruction("for_loop",["' + argument0.toString() + '","' + argument1.toString() + '","' + increment + '"]);\n' + branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
      startVar = Blockly.JavaScript.variableDB_.getDistinctName(
        variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'var ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
      var endVar = Blockly.JavaScript.variableDB_.getDistinctName(
        variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + argument1 + ';\n';
    }
    // Determine loop direction at start, in case one of the bounds
    // changes during loop execution.
    var incVar = Blockly.JavaScript.variableDB_.getDistinctName(
      variable0 + '_inc', Blockly.Variables.NAME_TYPE);
    code += 'var ' + incVar + ' = ';
    if (Blockly.isNumber(increment)) {
      code += Math.abs(increment) + ';\n';
    } else {
      code += 'Math.abs(' + increment + ');\n';
    }
    code += 'if (' + startVar + ' > ' + endVar + ') {\n';
    code += Blockly.JavaScript.INDENT + incVar + ' = -' + incVar + ';\n';
    code += '}\n';
    code += 'for (' + variable0 + ' = ' + startVar + '; ' +
      incVar + ' >= 0 ? ' +
      variable0 + ' <= ' + endVar + ' : ' +
      variable0 + ' >= ' + endVar + '; ' +
      variable0 + ' += ' + incVar + ') {\n' +
      branch + '}\n';
  }
  return code;
};


Blockly.Blocks['if_conditional'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldDropdown([["Value", "Value"], ["Index", "Index"]]), "properties");
    this.appendDummyInput()
      .appendField("Left Hand")
      .appendField(new Blockly.FieldDropdown([["<", "Less"], [">", "Greater"], ["<=", "LessEqual"], [">=", "GreaterEqual"], ["=", "Equal"]]), "operator")
      .appendField("Right Hand");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['if_conditional'] = function (block) {
  var dropdown_properties = block.getFieldValue('properties');
  var dropdown_operator = block.getFieldValue('operator');
  // calls function that returns truth value for comparison
  // but the function also pushes the action block to the instruction structure for the IF block and itself
  // this allows for the updating of images to show the books being lifted by the hands for the comparison
  var code = '(conditionalBlockExecution("' + dropdown_properties + '","' + dropdown_operator.toString() + '","Left Hand","Right Hand"))';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['if_conditional_piv'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldDropdown([["Value", "Value"], ["Index", "Index"]]), "properties");
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"], ["Pivot", "Pivot"]]), "compareFirst")
      .appendField(new Blockly.FieldDropdown([["<", "Less"], [">", "Greater"], ["<=", "LessEqual"], [">=", "GreaterEqual"], ["=", "Equal"]]), "operator")
      .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"], ["Pivot", "Pivot"]]), "compareSecond");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['if_conditional_piv'] = function (block) {
  var dropdown_properties = block.getFieldValue('properties');
  var dropdown_operator = block.getFieldValue('operator');
  var compareFirst = block.getFieldValue('compareFirst');
  var compareSecond = block.getFieldValue('compareSecond');
  // calls function that returns truth value for comparison
  // but the function also pushes the action block to the instruction structure for the IF block and itself
  // this allows for the updating of images to show the books being lifted by the hands for the comparison
  var code = '(conditionalBlockExecution("' + dropdown_properties + '","' + dropdown_operator.toString() + '","' + compareFirst.toString() + '","' + compareSecond.toString() + '"))';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['move_hand'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Move")
      .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"]]), "handSelect")
      .appendField(new Blockly.FieldDropdown([["left", "left"], ["right", "right"]]), "directionSelect");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['move_hand'] = function (block) {
  var dropdown_handselect = block.getFieldValue('handSelect');
  var dropdown_directionselect = block.getFieldValue('directionSelect');
  var input = '["' + dropdown_handselect + '","' + dropdown_directionselect + '"]';
  var code = 'pushInstruction("move_hand",' + input + ');'
  return code;
};

Blockly.Blocks['swap_books'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Grab and Swap");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['swap_books'] = function (block) {
  // has to send empty array even if no user input as pushinstructions uses a second param - inputs 
  var code = 'pushInstruction("swap_books",["Left Hand", "Right Hand"]);';
  return code;
};

Blockly.Blocks['swap_books_piv'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Grab and Swap");
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"], ["Pivot", "Pivot"]]), "swapFirst")
      .appendField("and")
      .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"], ["Pivot", "Pivot"]]), "swapSecond");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['swap_books_piv'] = function (block) {
  var swapFirst = block.getFieldValue('swapFirst');
  var swapSecond = block.getFieldValue('swapSecond');
  var code = 'pushInstruction("swap_books",["' + swapFirst + '","' + swapSecond + '"]);';
  return code;
};

Blockly.Blocks['select_hand_position'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Move");
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"]]), "handSelect")
      .appendField("to index")
      .appendField(new Blockly.FieldNumber(0), "indexSelect");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['select_hand_position'] = function (block) {
  var dropdown_handselect = block.getFieldValue('handSelect');
  var number_indexselect = block.getFieldValue('indexSelect');
  var input = '["' + dropdown_handselect + '",' + number_indexselect + ']';
  var code = 'pushInstruction("select_hand_position",' + input + ');'
  return code;
};


Blockly.Blocks['grab_book'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Grab");
    this.appendDummyInput()
      .appendField("with")
      .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"]]), "handSelect");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['grab_book'] = function (block) {
  var dropdown_handselect = block.getFieldValue('handSelect');
  var input = '["' + dropdown_handselect + '"]';
  var code = 'pushInstruction("grab_book",' + input + ');'
  return code;
};

Blockly.Blocks['place_book'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Place");
    this.appendDummyInput()
      .appendField("with")
      .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"]]), "handSelect");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['place_book'] = function (block) {
  var dropdown_handselect = block.getFieldValue('handSelect');
  var input = '["' + dropdown_handselect + '"]';
  var code = 'pushInstruction("place_book",' + input + ');';
  return code;
};


function clearInstructionArray() {
  instructionStructure = [];
}

function clearBookUpdateArray() {
  bookUpdateStructure = [];
}

function showInstructions() {
  return JSON.stringify(instructionStructure);
}

function isEqual(firstBlock, secondBlock) {
  // tests types of blocks, if not the same then return false   
  var type = Object.prototype.toString.call(firstBlock);
  if (type !== Object.prototype.toString.call(secondBlock)) return false;


  // tests if it they are actually an object or array, if not then return false
  // only need to test one as previous if statement ensures same type  
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

  // test to make sure they are the same length
  // if type array then use .length
  // if Object then get array of object keys and then use .length on the result  
  var firstBlockLen = type === '[object Array]' ? firstBlock.length : Object.keys(firstBlock).length;
  var secondBlockLen = type === '[object Array]' ? secondBlock.length : Object.keys(secondBlock).length;
  if (firstBlockLen !== secondBlockLen) return false;

  // Compare two items
  // placed before use
  var compare = function (item1, item2) {

    // get the type of the items
    //checks types of the item
    var itemType = Object.prototype.toString.call(item1);
    if (itemType !== Object.prototype.toString.call(item2)) return false;

    // if they are of type Object or array, call isEqual recursively for comparison
    // if it comes back false, then so does the higher function call
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    }

    // else do a comparison on values
    else {
      // If it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }
    }
    return true;
  };

  // Compare properties
  var match;
  if (type === '[object Array]') {
    for (var i = 0; i < firstBlockLen; i++) {
      if (!compare(firstBlock[i], secondBlock[i])) return false;
    }
  } else {
    for (var key in firstBlock) {
      if (firstBlock.hasOwnProperty(key)) {
        if (!compare(firstBlock[key], secondBlock[key])) return false;
      }
    }
  }

  // if no tests failed, return true to signify they are the same
  return true
}

function getSolution(levelCode) {
  solutionArray = [];
  switch (levelCode) {

    case 1:
      solutionArray = [{ "bookId": "book1", "fromIndex": [2, 0], "toIndex": [1, 0] },
      { "bookId": "book1", "fromIndex": [1, 0], "toIndex": [1, 1] },
      { "bookId": "book1", "fromIndex": [1, 1], "toIndex": [2, 1] }];
      break;

    case 2:
      // swap books  
      solutionArray.push.apply(solutionArray, returnSwapSolution("book1", "book4", 0, 1));
      break;

    case 3:
      // if left > right value then pick up
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book7", 0, 1));
      solutionArray.push.apply(solutionArray, returnGrabSolution("book1", 0));
      break;

    case 4:
      // move direction twice and pickup
      solutionArray = [{ "bookId": "book1", "fromIndex": [2, 2], "toIndex": [1, 2] }];
      break;

    case 5:
      // move book to second column
      // move to index 2, and grab
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book1', 0, 1));
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book1', 1, 2));
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book1', 2, 3));
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book1', 3, 4));
      solutionArray.push.apply(solutionArray, returnPlaceSolution('book1', 4));
      break;

    case 6:
    case 7:
      // move book to second column
      // move to index 2, and grab
      solutionArray.push.apply(solutionArray, returnGrabSolution("book1", 2));
      // move it to index 4
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book1', 2, 3));
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book1', 3, 4));
      break;

    case 8:
      // move book to second column
      // grab and swap two times for index 0 and 1
      solutionArray.push.apply(solutionArray, returnSwapSolution("book1", "book2", 0, 1));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book2", "book1", 0, 1));
      // grab and swap two times for index 1 and 2
      solutionArray.push.apply(solutionArray, returnSwapSolution("book2", "book3", 1, 2));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book3", "book2", 1, 2));
      // grab and swap two times for index 2 and 3
      solutionArray.push.apply(solutionArray, returnSwapSolution("book3", "book4", 2, 3));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book4", "book3", 2, 3));
      // grab and swap two times for index 3 and 4
      solutionArray.push.apply(solutionArray, returnSwapSolution("book4", "book5", 3, 4));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book5", "book4", 3, 4));
      break;

    case 15:
      // one iteration of bubble
      // 3 1 2 5 4
      // compare index 0 and 1 - books 3 and 1, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book1", 0, 1));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book3", "book1", 0, 1));
      // 1 3 2 5 4
      // compare index 1 and 2 - books 3 and 2, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book2", 1, 2));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book3", "book2", 1, 2));
      // 1 2 3 5 4
      // compare index 2 and 3 - books 3 and 5, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book5", 2, 3));
      // 1 2 3 5 4
      // compare index 3 and 4 - books 5 and 4, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book5", "book4", 3, 4));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book5", "book4", 3, 4));
      // bubbled one iteration complete
      break;

    case 16:
      // bubble sort non optimized: 1 7 3 6 5 4 2
      // FIRST PASS
      // compare index 0 and 1 - books 1 and 7, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book7", 0, 1));
      // compare index 1 and 2 - books 7 and 3, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book7", "book3", 1, 2));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book7", "book3", 1, 2));
      // 1 3 7 6 5 4 2
      // compare index 2 and 3 - books 7 and 6, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book7", "book6", 2, 3));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book7", "book6", 2, 3));
      // 1 3 6 7 5 4 2
      // compare index 3 and 4 - books 7 and 5, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book7", "book5", 3, 4));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book7", "book5", 3, 4));
      // 1 3 6 5 7 4 2
      // compare index 4 and 5 - books 7 and 4, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book7", "book4", 4, 5));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book7", "book4", 4, 5));
      // 1 3 6 5 4 7 2
      // compare index 5 and 6 - books 7 and 2, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book7", "book2", 5, 6));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book7", "book2", 5, 6));
      // SECOND PASS - IGNORE INDEXS: 6
      // 1 3 6 5 4 2 7
      // compare index 0 and 1 - books 1 and 3, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book3", 0, 1));
      // 1 3 6 5 4 2 7
      // compare index 1 and 2 - books 3 and 6, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book6", 1, 2));
      // 1 3 6 5 4 2 7
      // compare index 2 and 3 - books 6 and 5, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book6", "book5", 2, 3));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book6", "book5", 2, 3));
      // 1 3 5 6 4 2 7
      // compare index 3 and 4 - books 6 and 4, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book6", "book4", 3, 4));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book6", "book4", 3, 4));
      // 1 3 5 4 6 2 7
      // compare index 4 and 5 - books 6 and 2, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book6", "book2", 4, 5));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book6", "book2", 4, 5));
      // THIRD PASS - IGNORE INDEXS: 5, 6
      // 1 3 5 4 2 6 7
      // compare index 0 and 1 - books 1 and 3, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book3", 0, 1));
      // 1 3 5 4 2 6 7
      // compare index 1 and 2 - books 3 and 5, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book5", 1, 2));
      // 1 3 5 4 2 6 7
      // compare index 2 and 3 - books 5 and 4, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book5", "book4", 2, 3));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book5", "book4", 2, 3));
      // 1 3 4 5 2 6 7
      // compare index 3 and 4 - books 5 and 2, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book5", "book2", 3, 4));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book5", "book2", 3, 4));
      // FORTH PASS - IGNORE INDEXS: 4, 5, 6
      // 1 3 4 2 5 6 7
      // compare index 0 and 1 - books 1 and 3, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book3", 0, 1));
      // 1 3 4 2 5 6 7
      // compare index 1 and 2 - books 3 and 4, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book4", 1, 2));
      // 1 3 4 2 5 6 7
      // compare index 2 and 3 - books 4 and 2, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book4", "book2", 2, 3));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book4", "book2", 2, 3));
      // FIFTH PASS - IGNORE INDEXS: 3, 4, 5, 6
      // 1 3 2 4 5 6 7
      // compare index 0 and 1 - books 1 and 3, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book3", 0, 1));
      // 1 3 2 4 5 6 7
      // compare index 1 and 2 - books 3 and 2, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book2", 1, 2));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book3", "book2", 1, 2));
      // SIXTH PASS - IGNORE INDEXS: 2, 3, 4, 5, 6
      // 1 2 3 4 5 6 7
      // compare index 0 and 1 - books 1 and 3, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book2", 0, 1));
      // SORTED
      break;
    case 17:
      // bubble sort optimized
      // FIRST PASS
      // compare index 0 and 1 - books 1 and 7, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book7", 0, 1));
      // compare index 1 and 2 - books 7 and 3, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book7", "book3", 1, 2));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book7", "book3", 1, 2));
      // 1 3 7 6 5 4 2
      // compare index 2 and 3 - books 7 and 6, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book7", "book6", 2, 3));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book7", "book6", 2, 3));
      // 1 3 6 7 5 4 2
      // compare index 3 and 4 - books 7 and 5, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book7", "book5", 3, 4));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book7", "book5", 3, 4));
      // 1 3 6 5 7 4 2
      // compare index 4 and 5 - books 7 and 4, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book7", "book4", 4, 5));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book7", "book4", 4, 5));
      // 1 3 6 5 4 7 2
      // compare index 5 and 6 - books 7 and 2, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book7", "book2", 5, 6));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book7", "book2", 5, 6));
      // SECOND PASS 
      // 1 3 6 5 4 2 7
      // compare index 0 and 1 - books 1 and 3, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book3", 0, 1));
      // 1 3 6 5 4 2 7
      // compare index 1 and 2 - books 3 and 6, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book6", 1, 2));
      // 1 3 6 5 4 2 7
      // compare index 2 and 3 - books 6 and 5, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book6", "book5", 2, 3));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book6", "book5", 2, 3));
      // 1 3 5 6 4 2 7
      // compare index 3 and 4 - books 6 and 4, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book6", "book4", 3, 4));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book6", "book4", 3, 4));
      // 1 3 5 4 6 2 7
      // compare index 4 and 5 - books 6 and 2, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book6", "book2", 4, 5));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book6", "book2", 4, 5));
      // 1 3 5 4 2 6 7
      // compare index 5 and 6 - books 6 and 2, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book6", "book7", 5, 6));
      // THIRD PASS - 
      // 1 3 5 4 2 6 7
      // compare index 0 and 1 - books 1 and 3, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book3", 0, 1));
      // 1 3 5 4 2 6 7
      // compare index 1 and 2 - books 3 and 5, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book5", 1, 2));
      // 1 3 5 4 2 6 7
      // compare index 2 and 3 - books 5 and 4, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book5", "book4", 2, 3));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book5", "book4", 2, 3));
      // 1 3 4 5 2 6 7
      // compare index 3 and 4 - books 5 and 2, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book5", "book2", 3, 4));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book5", "book2", 3, 4));
      // 1 3 4 2 5 6 7
      // compare index 4 and 5 - books 5 and 6, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book5", "book6", 4, 5));
      // 1 3 4 2 5 6 7
      // compare index 5 and 6 - books 6 and 7, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book6", "book7", 5, 6));
      // FORTH PASS - IGNORE INDEXS: 4, 5, 6
      // 1 3 4 2 5 6 7
      // compare index 0 and 1 - books 1 and 3, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book3", 0, 1));
      // 1 3 4 2 5 6 7
      // compare index 1 and 2 - books 3 and 4, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book4", 1, 2));
      // 1 3 4 2 5 6 7
      // compare index 2 and 3 - books 4 and 2, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book4", "book2", 2, 3));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book4", "book2", 2, 3));
      // 1 3 2 4 5 6 7
      // compare index 3 and 4 - books 4 and 5, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book4", "book5", 3, 4));
      // 1 3 2 4 5 6 7
      // compare index 4 and 5 - books 5 and 6, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book5", "book6", 4, 5));
      // 1 3 2 4 5 6 7
      // compare index 5 and 6 - books 6 and 7, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book6", "book7", 5, 6));
      // FIFTH PASS - IGNORE INDEXS: 3, 4, 5, 6
      // 1 3 2 4 5 6 7
      // compare index 0 and 1 - books 1 and 3, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book3", 0, 1));
      // 1 3 2 4 5 6 7
      // compare index 1 and 2 - books 3 and 2, swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book2", 1, 2));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book3", "book2", 1, 2));
      // 1 2 3 4 5 6 7
      // compare index 2 and 3 - books 3 and 4, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book4", 2, 3));
      // 1 2 3 4 5 6 7
      // compare index 3 and 4 - books 4 and 5, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book4", "book5", 3, 4));
      // 1 2 3 4 5 6 7
      // compare index 4 and 5 - books 5 and 6, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book5", "book6", 4, 5));
      // 1 2 3 4 5 6 7
      // compare index 5 and 6 - books 6 and 7, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book6", "book7", 5, 6));
      // SIXTH PASS - IGNORE INDEXS: 2, 3, 4, 5, 6
      // 1 2 3 4 5 6 7
      // compare index 0 and 1 - books 1 and 2, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book2", 0, 1));
      // 1 2 3 4 5 6 7
      // compare index 1 and 2 - books 2 and 3, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book2", "book3", 1, 2));
      // 1 2 3 4 5 6 7
      // compare index 2 and 3 - books 3 and 4, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book4", 2, 3));
      // 1 2 3 4 5 6 7
      // compare index 3 and 4 - books 4 and 5, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book4", "book5", 3, 4));
      // 1 2 3 4 5 6 7
      // compare index 4 and 5 - books 5 and 6, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book5", "book6", 4, 5));
      // 1 2 3 4 5 6 7
      // compare index 5 and 6 - books 6 and 7, no swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book6", "book7", 5, 6));
      // SORTED
      break;

    case 20: // PARTITION ONE SINGLE ITERATION - NO RETURN VALUE AS OF YET
      // 1, 6, 2, 7, 3, 4, 5
      // compare index 0 and 6 - books 1 and 5
      // i = 0, j = 0
      solutionArray.push.apply(solutionArray, returnIfSolution('book1', 'book5', 0, 6));
      // swap i and j as 1 < 5
      solutionArray.push.apply(solutionArray, returnSwapSolution("book1", "book1", 0, 0));
      // 1, 6, 2, 7, 3, 4, 5
      // i = 1 and j = 1
      // compare index 1 and 6 - books 6 and 5
      solutionArray.push.apply(solutionArray, returnIfSolution('book6', 'book5', 1, 6));
      // i = 1 and j = 2
      // compare index 2 and 6 - books 2 and 5
      solutionArray.push.apply(solutionArray, returnIfSolution('book2', 'book5', 2, 6));
      // swap i and j as 2 < 5
      solutionArray.push.apply(solutionArray, returnSwapSolution("book6", "book2", 1, 2));
      // 1, 2, 6, 7, 3, 4, 5 
      // i = 2 and j = 3
      // compare index 3 and 6 - books 7 and 5
      solutionArray.push.apply(solutionArray, returnIfSolution('book7', 'book5', 3, 6));
      // i = 2 and j = 4
      // compare index 4 and 6 - books 3 and 5
      solutionArray.push.apply(solutionArray, returnIfSolution('book3', 'book5', 4, 6));
      // swap i and j as 3 < 5
      solutionArray.push.apply(solutionArray, returnSwapSolution("book6", "book3", 2, 4));
      // 1, 2, 3, 7, 6, 4, 5 
      // i = 3 and j = 5
      // compare index 5 and 6 - books 4 and 5
      solutionArray.push.apply(solutionArray, returnIfSolution('book4', 'book5', 5, 6));
      // swap i and j as 4 < 5
      solutionArray.push.apply(solutionArray, returnSwapSolution("book7", "book4", 3, 5));
      // 1, 2, 3, 4, 6, 7, 5 
      // i = 4 and j = 6 - exit for loop
      // swap i and pivot(index 6) as for loop ended
      solutionArray.push.apply(solutionArray, returnSwapSolution("book6", "book5", 4, 6));
      // 1, 2, 3, 4, 5, 7, 6
      break;
    case 21:
      solutionArray = [{ "bookId": "quick_sort_structure", "fromIndex": [0, 0], "toIndex": [0, 6] },
      { "bookId": 'conditional_quick', "fromIndex": [0, 0], "toIndex": [1, 1] },
      { "bookId": "partition_array", "fromIndex": [0, 0], "toIndex": [6, 6] },
      { "bookId": 'book77', "fromIndex": [0, 0], "toIndex": [0, 3] },
      { "bookId": 'book77', "fromIndex": [0, 5], "toIndex": [0, 6] }
      ];
      break;

  }
  return solutionArray;
}

function returnSwapSolution(bookLeft, bookRight, bookLeftColumnIndex, bookRightColumnIndex) {
  // var firstBook = returnObjectStateData(bookFirstId);
  // var secondBook = returnObjectStateData(bookSecondId);
  // var indexFirstBook = [2, firstHandColumnIndex];
  // var indexSecondBook = [2, secondHandColumnIndex];
  // // returns [[leftbookId, leftBookIndex],[rightBookId, rightBookIndex]]
  // // needed to figure out which book is leftmost and which is rightmost
  // var indexSorted = returnIndexSortedBookPair(firstBook, indexFirstBook, secondBook, indexSecondBook);
  // var bookLeft= indexSorted[0][0]
  // // swap is done L R L R R L book wise
  var l = bookLeftColumnIndex;
  var r = bookRightColumnIndex;
  solution = [
    { "bookId": bookLeft, "fromIndex": [2, l], "toIndex": [1, l] },
    { "bookId": bookRight, "fromIndex": [2, r], "toIndex": [1, r] },
    { "bookId": bookLeft, "fromIndex": [1, l], "toIndex": [1, r] },
    { "bookId": bookRight, "fromIndex": [1, r], "toIndex": [1, l] },
    { "bookId": bookRight, "fromIndex": [1, l], "toIndex": [2, l] },
    { "bookId": bookLeft, "fromIndex": [1, r], "toIndex": [2, r] }
  ];
  return solution;
}

function returnIfSolution(bookLeft, bookRight, firstComparerColumnIndex, secondComparerColumnIndex) {
  var l = firstComparerColumnIndex;
  var r = secondComparerColumnIndex;

  solution = [
    { "bookId": bookLeft, "fromIndex": [2, l], "toIndex": [1, l] },
    { "bookId": bookRight, "fromIndex": [2, r], "toIndex": [1, r] },
    { "bookId": bookLeft, "fromIndex": [1, l], "toIndex": [2, l] },
    { "bookId": bookRight, "fromIndex": [1, r], "toIndex": [2, r] }
  ];
  return solution;
}

function returnGrabSolution(bookId, handColumnIndex) {
  solution = [
    { "bookId": bookId, "fromIndex": [2, handColumnIndex], "toIndex": [1, handColumnIndex] }
  ];
  return solution;
}

function returnPlaceSolution(bookId, handColumnIndex) {
  solution = [
    { "bookId": bookId, "fromIndex": [1, handColumnIndex], "toIndex": [2, handColumnIndex] }
  ];
  return solution;
}

function returnGrabbedBookMoveSolution(bookId, handColumnIndex, toColumnIndex) {
  solution = [
    { "bookId": bookId, "fromIndex": [1, handColumnIndex], "toIndex": [1, toColumnIndex] }
  ];
  return solution;
}

function compareSolutions(levelCode, updateNumber) {
  // FALSE CAUSES RESET
  // TRUE DOES NOT
  solutionArray = getSolution(levelCode);
  // if wrong latest update and providing the structure isnt empty
  if (updateNumber !== 0 && isEqual(bookUpdateStructure[updateNumber - 1], solutionArray[updateNumber - 1]) === false) {
    updateErrorArea(feedbackOnError(updateNumber - 1, solutionArray));
    return;
  }
  // else must be correct latest update! for all below this!
  // if same length as final solution, then complete! give modal and advance
  else if (bookUpdateStructure.length === solutionArray.length) {
    setTimeout(function () { displayLevelCompletionModal(); }, 500);
    return;
  }
  // if end (if no more blocks, stepcode sets interpt to null to indicate end of execution) 
  else if (myInterpreter === null) {
    alert("All is good so far, but you are not quite finished!, Keep it up!");
    return;
  }
  // if not any of previous three, it must be correct latest yet also not the end/complete, so true
  return;
}

function feedbackOnError(updateNumber, solutionArray) {
  var error = '';
  var errorUpdate = bookUpdateStructure[updateNumber];
  var solutionUpdate = solutionArray[updateNumber]
  if (returnKeyValue(errorUpdate, 0) !== returnKeyValue(solutionUpdate, 0)) {
    error = error.concat('You moved the wrong book');
    return error;
  } else if (!isEqual(returnKeyValue(errorUpdate, 1), returnKeyValue(solutionUpdate, 1))) {
    error = error.concat('You moved the book from the wrong position');
    return error;
  } else if (!isEqual(returnKeyValue(errorUpdate, 1), returnKeyValue(solutionUpdate, 1))) {
    error = error.concat('You moved the book to the wrong position');
    return error;
  } else {
    error = error.concat('The developer didnt forsee your wrong move and as such there is no feedback.\n Sorry, but you are on your own for this one.\n I believe in you!');
    return error;
  }
}

function updateErrorArea(errorText) {
  if (errorArea.classList.contains("redBG")) {
    return;
  }
  markRecentHighlight();
  $(".errorArea").addClass("redBG");
  errorAreaText.innerText = errorText;
  runButton.innerText = "play_arrow";
}
function resetErrorArea() {
  $(".errorArea").removeClass("redBG");
  errorAreaText.innerText = 'No errors \n....yet';
}

function initApi(interpreter, scope) {
  // Add an API function for the alert() block, generated for "text_print" blocks.
  interpreter.setProperty(scope, 'alert',
    interpreter.createNativeFunction(function (text) {
      text = text ? text.toString() : '';
      outputArea.value += '\n' + text;
    }));

  // Add an API function for highlighting blocks.
  wrapper = function (id) {
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(scope, 'highlightBlock',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for saving the id of most recently highlighted block.
  wrapper = function (id) {
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(saveRecentHighlight(id));
  };
  interpreter.setProperty(scope, 'saveRecentHighlight',
    interpreter.createNativeFunction(wrapper));


  // API for finding current variable values for display
  wrapper = function (variableArray) {
    return updateVariableDisplay(variableArray);
  };
  interpreter.setProperty(scope, 'updateVariableDisplay',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for pushing instructions to instructionStructure
  wrapper = function (blockName, inputs) {
    return pushInstruction(blockName, inputs);
  };
  interpreter.setProperty(scope, 'pushInstruction',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for evaluation conditional variable blocks, and pushing them to instruction structure
  wrapper = function (evalProperty, operator, compareFirst, compareSecond) {
    return conditionalBlockExecution(evalProperty, operator, compareFirst, compareSecond);
  };
  interpreter.setProperty(scope, 'conditionalBlockExecution',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for partitioning an array and returning the partition index
  wrapper = function (number_start, number_end, toggle) {
    return partitionArray(number_start, number_end, toggle);
  };
  interpreter.setProperty(scope, 'partitionArray',
    interpreter.createNativeFunction(wrapper));

  wrapper = function (value_left, value_right, trueValue) {
    return quickSort(value_left, value_right, trueValue);
  };
  interpreter.setProperty(scope, 'quickSort',
    interpreter.createNativeFunction(wrapper));

  wrapper = function (number_leftinput, number_rightinput) {
    return quick_sort_structure(number_leftinput, number_rightinput);
  };
  interpreter.setProperty(scope, 'quick_sort_structure',
    interpreter.createNativeFunction(wrapper));

  wrapper = function (operator, argument0, argument1) {
    return conditional_quick(operator, argument0, argument1);
  };
  interpreter.setProperty(scope, 'conditional_quick',
    interpreter.createNativeFunction(wrapper));



}

function highlightBlock(id) {
  workspace.highlightBlock(id);
  highlightPause = true;
}
function markRecentHighlight() {
  console.log('marking :' + mostRecentHighlightId);
  firstErrorBlock = mostRecentHighlightId;
}
function saveRecentHighlight(id) {
  mostRecentHighlightId = id;
  console.log('saving :' + mostRecentHighlightId);
}
function highlightFirstError() {
  console.log('highlighting :' + firstErrorBlock);
  highlightBlock(firstErrorBlock);
}


function pushInstruction(blockName, inputs) {
  var instruction = null;
  switch (blockName.toString()) {
    case "select_hand_position":
      instruction = {
        blockName: blockName,
        hand: inputs.a[0].toString(),
        index: inputs.a[1].toString()
      };
      instructionStructure.push(instruction);
      break;
    case "grab_book":
    case "place_book":
      instruction = {
        blockName: blockName,
        hand: inputs.a[0].toString()
      };
      instructionStructure.push(instruction);
      break;
    case "swap_books":
      instruction = {
        blockName: blockName,
        swapFirst: inputs.a[0].toString(),
        swapSecond: inputs.a[1].toString()
      }
      instructionStructure.push(instruction);
      break;
    case "move_hand":
      instruction = {
        blockName: blockName,
        hand: inputs.a[0].toString(),
        direction: inputs.a[1].toString()
      }
      instructionStructure.push(instruction);
      break;
    case "if_conditional":
      instruction = {
        blockName: blockName,
        property: inputs[0].toString(),
        operator: inputs[1].toString(),
        compareFirst: inputs[2].toString(),
        compareSecond: inputs[3].toString()
      }
      instructionStructure.push(instruction);
      break;
    case "for_loop":
      instruction = {
        blockName: blockName,
        from: inputs.a[0].toString(),
        to: inputs.a[1].toString(),
        increment: inputs.a[2].toString()
      }
      instructionStructure.push(instruction);
      break;
    case "partition_array":
      instruction = {
        blockName: blockName,
        left: inputs[0].toString(),
        right: inputs[1].toString(),
        toggle: inputs[2].toString()
      }
      instructionStructure.push(instruction);
      break;
    case "quick_sort":
      instruction = {
        blockName: blockName,
        left: inputs[0].toString(),
        right: inputs[1].toString()
      }
      instructionStructure.push(instruction);
      break;
    case "conditional_quick":
      instruction = {
        blockName: blockName,
        operator: inputs[0].toString(),
        arg1: inputs[1].toString(),
        arg2: inputs[2].toString()
      }
      instructionStructure.push(instruction);
      break;
    case "quick_sort_structure":
      instruction = {
        blockName: blockName,
        left: inputs[0].toString(),
        right: inputs[1].toString()
      }
      instructionStructure.push(instruction);
      break;
    default:
      throw 'attempted to push unknown instruction block';
  }
}


function resetStepUi() {
  workspace.highlightBlock(null);
  highlightPause = false;
}


function generateCodeAndLoadIntoInterpreter() {

  // Generate JavaScript code and parse it.
  var varArray = workspace.getAllVariables();
  console.log(varArray);
  var prefix = returnVariableDisplayPrefix(varArray);
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\nsaveRecentHighlight(%1);\n' + prefix;
  Blockly.JavaScript.addReservedWords('highlightBlock');
  Blockly.JavaScript.addReservedWords('saveRecentHighlight');
  latestCode = Blockly.JavaScript.workspaceToCode(workspace);
  console.log(latestCode);
  resetStepUi(true);

}

function updateVariableDisplay(varObjects) {
  variableDisplayArea.innerHTML = null;
  console.log(' update variable called:\n' + varObjects);
  debugger;
  var varNames = [];
  workspace.getAllVariables().forEach(element => {
    varNames.push(returnKeyValue(element, 1).toString());
  });

  var values = [];
  for (var b = 0; b < varObjects.a.length; b++) {
    values.push(varObjects.a[b]);
  }

  console.log(varNames);
  console.log(values);

  for (var c = 0; c < values.length; c++) {
    variableDisplayArea.innerHTML = variableDisplayArea.innerHTML + '<div class="col-sm-auto text-center varPadding"><h3>' + varNames[c] + ' = ' + values[c] + '</h3></div>'
  }

}
function returnVariableDisplayPrefix(varArray) {
  var prefix = 'updateVariableDisplay(['
  varArray.forEach(function (element) {
    console.log(returnKeyValue(element, 1).toString());
    prefix = prefix.concat(returnKeyValue(element, 1).toString() + ',');
  });
  if (prefix.charAt(prefix.length - 1) !== '[') {
    prefix = prefix.slice(0, -1);
  }
  prefix = prefix.concat(']);\n');
  console.log('prefix is:   ' + prefix);
  return prefix;
}

stepCode = function (level) {
  if (!myInterpreter) {
    // First statement of this code.
    // Clear the program output.
    levelCode = level;
    reset();
    // resetStepUi();
    // clearInstructionArray();
    // clearBookUpdateArray();
    // instructionUpdateCounter = 0;
    console.log(latestCode);
    myInterpreter = new Interpreter(latestCode, initApi);

    // And then show generated code in an alert.
    // In a timeout to allow the outputArea.value to reset first.
    setTimeout(function () {
      // alert('Ready to execute the following code\n' +
      //   '===================================\n' + latestCode);
      // highlightPause = true;
      stepCode();
    }, 1);
    return;
  }
  highlightPause = false;
  do {
    try {
      var hasMoreCode = myInterpreter.step();
    } finally {
      if (!hasMoreCode) {
        // set interpreter to null to signify end of blocks for global scope
        // used in comparison function to determine what to do - reset or not
        myInterpreter = null;
        // Program complete, no more code to execute.         
        // Cool down, to discourage accidentally restarting the program.

        toggleAllButtonStates();
        setTimeout(function () {
          toggleAllButtonStates();
        }, 2000);

        return;
      }
    }
    // Keep executing until a highlight statement is reached,
    // or the code completes or errors.
  } while (hasMoreCode && !highlightPause);
}

function toggleAllButtonStates() {
  toggleButtonState(nextButton);
  toggleButtonState(stepButton);
  toggleButtonState(runButton);
  toggleButtonState(previousButton);
  toggleButtonState(helpButton);
  toggleButtonState(resetButton);
  toggleButtonState(homeButton);
}

function toggleButtonState(buttonId) {
  if (buttonId.disabled === false) {
    buttonId.disabled = true;
  } else {
    buttonId.disabled = false;
  }
}

function runCode(level) {

  if (runButton.innerText === "play_arrow") {
    runButton.innerText = "pause";
  } else {
    clearTimeout(runTimeout);
    runButton.innerText = "play_arrow";
    return;
  }
  // loops step execution automatically until either
  // an error is met (checked in stepExecution)
  // or it finishes execution of all user blocks (indicated by myInterpreter being null)
  function nextStep() {
    if (stepExecution(level) && myInterpreter !== null) {
      runTimeout = window.setTimeout(nextStep, 1000);
    }
  }
  nextStep();
}


function stepExecution(level) {
  stepCode(level);
  // update the state
  // if returns false it means there was an erronous move
  // in this case a reset happens and this returns false also   
  if (!updateState()) {
    return false;
  }
  updateHTML();

  compareSolutions(levelCode, bookUpdateStructure.length);

  return true;
}


function reset() {
  myInterpreter = null;
  resetStepUi();
  clearInstructionArray();
  clearBookUpdateArray();
  runButton.innerText = "play_arrow";
  setupOnStart(levelCode);
  resetErrorArea();
  instructionUpdateCounter = 0;
  mostRecentHighlightId = null;
}


function setupState(level) {
  levelCode = level;
  switch (levelCode) {

    case 1:
      // move hand and book
      state = [
        ['', ['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />']],
        ['', ''],
        [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'], ['book2', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />']],
      ];
      break;

    case 2:
      // swapbooks
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], ['Right Hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />']],
        ['', ''],
        [['book1', '<img style="display:block;" width="100%" height="15%" src="./media/book_1.svg" />'], ['book7', '<img style="display:block;" width="100%" height="100%" src="./media/book_7.svg" />']]
      ];
      break;

    case 3:
      // if left > right value, pick up left
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], ['Right Hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />']],
        ['', ''],
        [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'], ['book7', '<img style="display:block;" width="100%" height="100%" src="./media/book_7.svg" />']]
      ];
      break;

    case 4:
      // move direction and pickup
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], ['Right Hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />'], ''],
        ['', '', ''],
        ['', '', ['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_7.svg" />']]
      ];
      break;

    case 5:
      // for count , move hand along and drop at end
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], '', '', '', ''],
        [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'], '', '', '', ''],
        ['', '', '', '', '']
      ];
      break;

    case 6:
      // for count move hand along and if index = 2 then grab book
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', ['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'], '', '']
      ];
      break;

    case 7:
      // repeat while, same as previous
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', ['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'], '', '']
      ];
      break;

    case 8:
      // repeat while with count, grab and swap at each index
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'],
        ['Right Hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />']
          , '', '', ''],
        ['', '', '', '', ''],
        [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book2', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book3', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book4', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book5', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />']]
      ];
      break;

    case 15:
      // bubble do one iteration of bubble sort
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'],
        ['Right Hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />']
          , '', '', ''],
        ['', '', '', '', ''],
        [['book3', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book2', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book5', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book4', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />']]
      ];
      break;

    case 16:
    case 17:
      state = [
        // row one - hands
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'],
        ['Right Hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />'],
          '', '', '', '', ''],
        //  row two - grabbed books
        ['', '', '', '', '', '', ''],
        // row three - placed books
        [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book7', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book3', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book6', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book5', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book4', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book2', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />']]
      ];
      break;

    case 20:
    case 21:
      state = [
        // row one - hands
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />', 'Right Hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />'],
          '', '', '', '', '', ['Pivot', '<img style="display:block;" width="100%" height="100%" src="./media/pivot.svg" />']],
        //  row two - grabbed books
        ['', '', '', '', '', '', ''],
        // row three - placed books
        [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book6', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book2', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book7', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book3', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book4', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book5', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />']]
      ];
      break;

  }
}

function findIndexInState(id) {
  for (var i = 0; i < state.length; i++) {
    var row = state[i];
    for (var j = 0; j < row.length; j++) {
      // cycles along incase there are two hands in one position etc
      for (var b = 0; b < row[j].length; b++) {
        if (row[j][b] === id) {
          return [i, j];
        }
      }
    }
  }
  alert("Couldn't find what you were looking for: " + id + "\n you are out of reach, duuuude");
  return null;
}

function clearStateCell(row, column, id) {
  // if the state element only contains either '' or one object e.g. one hand
  // simply remove it by overwriting it with empty ''
  if (state[row][column].length <= 2) {
    state[row][column] = '';
  } else {
    // else it means there is more than one object in the state space
    // get the index of the object to be removed
    let removalIndex = state[row][column].indexOf(id);
    // and splice away both the object id and its conjoining html image tag text
    let removed = state[row][column].splice(removalIndex, 2);

  }
}

function setStateCell(row, column, data) {
  state[row][column] = data;
}

function returnKeyValue(obj, keyIndex) {
  return obj[Object.keys(obj)[keyIndex]]
}

function bookBelowHand(positionOfHand) {
  if (state[1][positionOfHand[1]] !== '') {
    return true;
  }
  return false;
}

function updateState() {
  var latestIndex = instructionStructure.length;
  // checks if its empty, or if an action block hasnt been executed on this execution step - i.e for/if blocks have no action so do not add to instruction structure
  if (latestIndex == 0 || instructionUpdateCounter == latestIndex) {
    return true;
  }
  // action block was added, so update counter accordingly
  instructionUpdateCounter += 1;
  var instruction = instructionStructure[latestIndex - 1];
  switch (returnKeyValue(instruction, 0)) {

    case "select_hand_position":
      // index of hand      
      var index = findIndexInState(returnKeyValue(instruction, 1));
      var destinationColumn = parseInt(returnKeyValue(instruction, 2));
      // value of hand
      if (destinationColumn < 0 || destinationColumn >= state[0].length) {
        alert('Hand went off the shelf! cant be having that! \n try again');
        reset();
        return false;
      }
      var tempHand = state[index[0]][index[1]];
      // if there is a book below -  meaning a book grabbed
      if (bookBelowHand(index)) {
        // get value of book
        var tempBook = state[1][index[1]];
        // push book update
        pushBookUpdate(tempBook[0], [1, index[1]], [1, destinationColumn]);
        // clear old book cell, middle row (as it has to be grabbed), column of hand
        clearStateCell(1, index[1], tempHand[0]);
        // set new book cell, middle row as still grabbed, column specified in instruction
        setStateCell(1, destinationColumn, tempBook);
      }

      clearStateCell(index[0], index[1], tempHand[0]);
      // inacse moving onto a state index that already has an object in, append
      // else overwrite with set
      if (state[0][destinationColumn] !== '') {
        appendStateCell(0, destinationColumn, tempHand);
      } else {
        setStateCell(0, destinationColumn, tempHand);
      }

      break;

    case "grab_book":
      // findIndexInState(returnKeyValue(instruction, 1)) returns index in state of whichever hand is specified in instruction
      var index = findIndexInState(returnKeyValue(instruction, 1));
      // then temp is set to be equal to whatever is in the lowest/bookshelf row of state in the column of the hand
      var temp = state[2][index[1]];
      if (state[2][index[1]] !== '' && bookBelowHand(index)) {
        alert('Cant grab two books at a time!');
        reset();
        return false;
      }
      // temp[0] will be the book id e.g. book1
      // the index its moving from is lowest row (so 2 as index) and the column of the hand specified
      // index its moving to is the same column but the middle row (so index 1)
      pushBookUpdate(temp[0], [2, index[1]], [1, index[1]]);

      // clear old state cell, row 2, column of hand
      clearStateCell(2, index[1], temp);
      // set new state cell, row 1, column of hand
      setStateCell(1, index[1], temp);
      break;

    case "place_book":
      // get whatever book is under the column index of specified hand in second row
      // place into row 3 in same column index

      // gets index of hand
      var index = findIndexInState(returnKeyValue(instruction, 1));
      // checks to see if book is already below it
      if (state[2][index[1]] !== '') {
        alert('Tried to place book in an index thats already filled\n RESET!');
        reset();
        return false;
      }
      // gets value of book, providing its holding one
      var temp = state[1][index[1]];

      // temp[0] will be the book id e.g. book1
      // the index its moving from is middle row (so 1 as index) and the column of the hand specified
      // index its moving to is the same column but the lowest row (so index 2)
      pushBookUpdate(temp[0], [1, index[1]], [2, index[1]]);

      // clear old state cell, row 1, column of hand
      clearStateCell(1, index[1], '');
      // set new state cell, row 2, column of hand
      setStateCell(2, index[1], temp);
      break;

    case "swap_books":
      // grabs the books
      // swaps swappers and drops, then returns swappers to original positions and imagery(if combo)
      // drops books
      // returns hands to original position
      // pushes book update for each of the three changes

      // these will be used only if either index involved in the swap has a combo of swapper on it e.g. both hands, or a hand and a pivot etc
      // they will retain the original comboed state[][] value
      // as during the swap, the html will only show those two objects involved, and not the combo
      // but at the end, if these were used, the html will be set back to displaying them
      var tempComboFirstSwapper = null;
      var tempComboSecondSwapper = null;

      var indexFirstSwapper = findIndexInState(returnKeyValue(instruction, 1));
      var indexSecondSwapper = findIndexInState(returnKeyValue(instruction, 2));

      // check to see if either of the called swapping objects are combination images
      if (state[indexFirstSwapper[0]][indexFirstSwapper[1]].length > 2) {
        // retain a temp version of it
        tempComboFirstSwapper = state[indexFirstSwapper[0]][indexFirstSwapper[1]];
        // set the state cell to just the one involved in the swap
        setStateCell(indexFirstSwapper[0], indexFirstSwapper[1], returnObjectStateData(returnKeyValue(instruction, 1)));

      }
      if (state[indexSecondSwapper[0]][indexSecondSwapper[1]].length > 2) {
        tempComboSecondSwapper = state[indexSecondSwapper[0]][indexSecondSwapper[1]];
        setStateCell(indexSecondSwapper[0], indexSecondSwapper[1], returnObjectStateData(returnKeyValue(instruction, 2)));
      }
      var tempFirstSwapper = state[indexFirstSwapper[0]][indexFirstSwapper[1]];
      var tempSecondSwapper = state[indexSecondSwapper[0]][indexSecondSwapper[1]];
      var firstBook = state[2][indexFirstSwapper[1]];
      var secondBook = state[2][indexSecondSwapper[1]];
      var firstBookIndex = findIndexInState(firstBook[0]);
      var secondBookIndex = findIndexInState(secondBook[0]);
      // ADDS BOOK UPDATES L R L R R L - based on starting book indexs
      // FIND OUT WHICH IS L OR R USING THE FUNCTION BELOW
      // params are firstbook, firstBookIndex, secondBook, secondBookIndex
      // each section involving the movement of books should use these params to ensure consistency across the code base - i.e. in solutions array
      var indexSorted = returnIndexSortedBookPair(firstBook, firstBookIndex, secondBook, secondBookIndex);
      var tempLeftBook = indexSorted[0][0];
      var tempRightBook = indexSorted[1][0];
      var leftBookIndex = indexSorted[0][1];
      var rightBookIndex = indexSorted[1][1];

      //  MAYBE INTRODUCE ERROR CHECKING FOR IF BOOK IS ALREADY GRABBED? DEPENDS IF GRAB IS AVALIBLE ON SWAP LEVELS
      // for pushing book updates, do left hands book first then right
      // raise books
      pushBookUpdate(tempLeftBook[0], [2, leftBookIndex[1]], [1, leftBookIndex[1]]);
      pushBookUpdate(tempRightBook[0], [2, rightBookIndex[1]], [1, rightBookIndex[1]]);
      clearStateCell(2, leftBookIndex[1]);
      clearStateCell(2, rightBookIndex[1]);
      setStateCell(1, leftBookIndex[1], tempLeftBook);
      setStateCell(1, rightBookIndex[1], tempRightBook);
      updateHTML();
      // swap hand and book positions
      // setTimeout(function () {
      // swap hands
      clearStateCell(indexFirstSwapper[0], indexFirstSwapper[1]);
      clearStateCell(indexSecondSwapper[0], indexSecondSwapper[1]);
      setStateCell(indexSecondSwapper[0], indexSecondSwapper[1], tempFirstSwapper);
      setStateCell(indexFirstSwapper[0], indexFirstSwapper[1], tempSecondSwapper);
      // swap books
      pushBookUpdate(tempLeftBook[0], [1, leftBookIndex[1]], [1, rightBookIndex[1]]);
      pushBookUpdate(tempRightBook[0], [1, rightBookIndex[1]], [1, leftBookIndex[1]]);
      clearStateCell(1, leftBookIndex[1]);
      clearStateCell(1, rightBookIndex[1]);
      setStateCell(1, rightBookIndex[1], tempLeftBook);
      setStateCell(1, leftBookIndex[1], tempRightBook);
      updateHTML();
      // }, 1000);
      // lower books
      // setTimeout(function () {
      // remember, left hand index now corresponds to right book, and vice versa
      pushBookUpdate(tempRightBook[0], [1, leftBookIndex[1]], [2, leftBookIndex[1]]);
      pushBookUpdate(tempLeftBook[0], [1, rightBookIndex[1]], [2, rightBookIndex[1]]);
      clearStateCell(1, leftBookIndex[1]);
      clearStateCell(1, rightBookIndex[1]);
      setStateCell(2, leftBookIndex[1], tempRightBook);
      setStateCell(2, rightBookIndex[1], tempLeftBook);
      updateHTML();
      // }, 1000);
      // swap hands back
      // setTimeout(function () {
      clearStateCell(indexSecondSwapper[0], indexSecondSwapper[1]);
      clearStateCell(indexFirstSwapper[0], indexFirstSwapper[1]);
      setStateCell(indexFirstSwapper[0], indexFirstSwapper[1], tempFirstSwapper);
      setStateCell(indexSecondSwapper[0], indexSecondSwapper[1], tempSecondSwapper);
      updateHTML();
      // }, 1000);

      // now check if the swapper indexs were holding combinations
      // if so, reset them back to the original state values
      if (tempComboFirstSwapper != null) {
        // set the state cell to just the original
        setStateCell(indexFirstSwapper[0], indexFirstSwapper[1], tempComboFirstSwapper);
      }
      if (tempComboSecondSwapper != null) {
        // set the state cell to just the original
        setStateCell(indexSecondSwapper[0], indexSecondSwapper[1], tempComboSecondSwapper);
      }
      updateHTML();

      break;

    case "move_hand":
      // gets index of specified hand's position
      var index = findIndexInState(returnKeyValue(instruction, 1));
      // gets value of hand specified for move
      var tempHand = returnObjectStateData(returnKeyValue(instruction, 1));
      var directionIndex = 0;
      // no book update so dont do it

      // -1 if heading left, +1 if heading right, for use in incrementing the column index
      if (returnKeyValue(instruction, 2) === 'left') {
        directionIndex = -1;
      } else {
        directionIndex = 1;
      }
      // check to for erronous hand movements off the shelf
      if (index[1] + directionIndex < 0 || index[1] + directionIndex >= state[0].length) {
        alert('Hand went off the shelf! cant be having that! \n try again');
        reset();
        return false;
      }
      // if a book is below the hand (grabbed currently) move it along with the hand
      if (bookBelowHand(index)) {
        // get value of book
        var tempBook = state[1][index[1]];
        // push book update
        pushBookUpdate(tempBook[0], [1, index[1]], [1, index[1] + directionIndex]);
        // clear old book cell, middle row (as it has to be grabbed), column of hand
        clearStateCell(1, index[1]);
        // set new book cell, middle row as still grabbed, column specified in instruction
        setStateCell(1, index[1] + directionIndex, tempBook);
      }

      // clear old state cell of hand
      clearStateCell(index[0], index[1], tempHand[0]);
      // set new state cell, with the addition of the directionIndex for column index
      if (state[0][index[1] + directionIndex] !== '') {
        appendStateCell(0, index[1] + directionIndex, tempHand);
      } else {
        setStateCell(0, index[1] + directionIndex, tempHand);
      }
      break;

    case "if_conditional":
      var tempComboFirst = null;
      var tempComboSecond = null;

      var indexFirst = findIndexInState(returnKeyValue(instruction, 3));
      var indexSecond = findIndexInState(returnKeyValue(instruction, 4));

      if (state[indexFirst[0]][indexFirst[1]].length > 2) {
        // retain a temp version of it
        tempComboFirst = state[indexFirst[0]][indexFirst[1]];
        // set the state cell to just the one involved in the swap
        setStateCell(indexFirst[0], indexFirst[1], returnObjectStateData(returnKeyValue(instruction, 3)));
      }
      if (state[indexSecond[0]][indexSecond[1]].length > 2) {
        tempComboSecond = state[indexSecond[0]][indexSecond[1]];
        setStateCell(indexSecond[0], indexSecond[1], returnObjectStateData(returnKeyValue(instruction, 4)));
      }

      if (returnKeyValue(instruction, 1) === 'Value') {
        var tempFirstBook = state[2][indexFirst[1]];
        var tempSecondBook = state[2][indexSecond[1]];
        // ADDS BOOK UPDATES L R L R (book wise)
        // FIND OUT WHICH IS L OR R USING THE FUNCTION BELOW
        // params are firstbook, firstBookIndex, secondBook, secondBookIndex
        var indexSorted = returnIndexSortedBookPair(tempFirstBook, indexFirst, tempSecondBook, indexSecond);
        var leftBook = indexSorted[0][0];
        var rightBook = indexSorted[1][0];
        var leftBookIndex = indexSorted[0][1];
        var rightBookIndex = indexSorted[1][1];

        // raise books up visually +  statewise + update html
        pushBookUpdate(leftBook[0], [2, leftBookIndex[1]], [1, leftBookIndex[1]]);
        pushBookUpdate(rightBook[0], [2, rightBookIndex[1]], [1, rightBookIndex[1]]);
        clearStateCell(2, leftBookIndex[1], '');
        clearStateCell(2, rightBookIndex[1], '');
        setStateCell(1, leftBookIndex[1], leftBook);
        setStateCell(1, rightBookIndex[1], rightBook);
        updateHTML();

        // setTimeout(function () {
        pushBookUpdate(leftBook[0], [1, leftBookIndex[1]], [2, leftBookIndex[1]]);
        pushBookUpdate(rightBook[0], [1, rightBookIndex[1]], [2, rightBookIndex[1]]);
        clearStateCell(1, leftBookIndex[1], '');
        clearStateCell(1, rightBookIndex[1], '');
        setStateCell(2, leftBookIndex[1], leftBook);
        setStateCell(2, rightBookIndex[1], rightBook);
        updateHTML();
        // }, 1000);

        // now check if the swapper indexs were holding combinations
        // if so, reset them back to the original state values
        if (tempComboFirst != null) {
          // set the state cell to just the original
          setStateCell(indexFirst[0], indexFirst[1], tempComboFirst);
        }
        if (tempComboSecond != null) {
          // set the state cell to just the original
          setStateCell(indexSecond[0], indexSecond[1], tempComboSecond);
        }
        updateHTML();

        break;

      } else if (returnKeyValue(instruction, 1) === 'Index') {
        // just highlight and unhighlight
        var firstComparer = state[0][indexFirst[1]];
        var secondComparer = state[0][indexSecond[1]];
        var tempHighlightLeft = [firstComparer[0], returnHighlightedImage()]
        var tempHighlightRight = [secondComparer[0], returnHighlightedImage()]
        setStateCell(0, indexFirst[1], tempHighlightLeft);
        setStateCell(0, indexSecond[1], tempHighlightRight);

        // setTimeout(function () {
        setStateCell(0, indexFirst[1], firstComparer);
        setStateCell(0, indexSecond[1], secondComparer);
        updateHTML();
        // }, 1000);

        // now check if the swapper indexs were holding combinations
        // if so, reset them back to the original state values
        if (tempComboFirst != null) {
          // set the state cell to just the original
          setStateCell(indexFirst[0], indexFirst[1], tempComboFirst);
        }
        if (tempComboSecond != null) {
          // set the state cell to just the original
          setStateCell(indexSecond[0], indexSecond[1], tempComboSecond);
        }
        updateHTML();

        break;
      }
    case "partition_array":
      // does it hoares way
      // but as we just need it to return the index of the pivot variable, it doesnt matter
      var left = parseInt(returnKeyValue(instruction, 1));
      var right = parseInt(returnKeyValue(instruction, 2));
      var currentArray = getArrayBookValues(left, right);

      // only push book update if being called directly from partition block
      // else dont as only need to check quicksort input
      if (returnKeyValue(instruction, 3) === 'true') {
        pushBookUpdate("partition_array", [left, left], [right, right]);
      }

      var pivot = currentArray[currentArray.length - 1]; // last element -  pre determined as lumotos always uses far right
      var i = left;
      // i = right hand
      // j = left hand
      // pivot = pivot
      /*The logic under Lomuto is, we start from the leftmost element and keep track of index of smaller (or equal to) elements as j. 
      While traversing, if we find a smaller element, we swap current element with arr[j]. Otherwise we ignore current element.*/
      // initilaize the hands by moving them to the begining of array/section for partitioning
      updateStateHTMLMove('Right Hand', left, findIndexInState('Right Hand')[1]);
      updateStateHTMLMove('Left Hand', left, findIndexInState('Left Hand')[1]);
      updateStateHTMLMove('Pivot', right, findIndexInState('Pivot')[1]);
      for (var j = left; j < right; j++) {
        // move left hand to new position due to j increasing
        updateStateHTMLMove('Left Hand', j, findIndexInState('Left Hand')[1]);
        // call this to update html for an if comparison
        updateStateHTMLIf('Left Hand', j, 'Pivot', right);
        if (getBookValue(state[2][j][0], 'height') <= pivot) {
          updateStateHTMLSwap('Right Hand', i, 'Left Hand', j);
          i++;
          // update right hand to new position as i has been increased
          updateStateHTMLMove('Right Hand', i, findIndexInState('Right Hand')[1]);
        }
      }
      updateStateHTMLSwap('Right Hand', i, 'Pivot', right);
      // return position of the pivot once its been properly positioned
      break;


    case 'quick_sort_structure':
      var error = indexParamOutOfBounds(instruction)
      if (error !== '') {
        alert(error);
        reset();
        return false;
      }
      // from: [0][left]  to: [0][right] 
      pushBookUpdate('quick_sort_structure', [0, parseInt(returnKeyValue(instruction, 1))], [0, parseInt(returnKeyValue(instruction, 2))]);
      break;


    case 'quick_sort':
      var error = indexParamOutOfBounds(instruction)
      if (error !== '') {
        alert(error);
        reset();
        return false;
      }
      // from: is [0][left/start] and to: is [0][right/end]
      pushBookUpdate('book77', [0, parseInt(returnKeyValue(instruction, 1))], [0, parseInt(returnKeyValue(instruction, 2))]);
      break;


    case 'conditional_quick':
      var correct;
      if (returnKeyValue(instruction, 1) === 'Less') {
        if (parseInt(returnKeyValue(instruction, 2)) < parseInt(returnKeyValue(instruction, 3))) {
          correct = 1;
        }
      } else if (returnKeyValue(instruction, 1) === 'Greater') {
        if (parseInt(returnKeyValue(instruction, 2)) > parseInt(returnKeyValue(instruction, 3))) {
          correct = 1;
        }
      } else {
        operator = 0;
      }
      // so if its correct for < and >  - the only two accepted in last level, correct is 1 else its 0
      pushBookUpdate('conditional_quick', [0, 0], [correct, correct]);
      break;
  }

  return true;
}

// for developing an error message incase the quicksort params are off shelf
function indexParamOutOfBounds(instruction) {
  var error = '';
  var left = parseInt(returnKeyValue(instruction, 1));
  var right = parseInt(returnKeyValue(instruction, 2));
  if (left < 0) {
    error = error.concat('Quick sort had an out of bounds starting index of: ' + left.toString() + '\n');
  } else if (left >= state[0].length) {
    error = error.concat('Quick sort had an out of bounds starting index of: ' + left.toString() + '\n');
  }
  if (right < 0) {
    error = error.concat('Quick sort had an out of bounds ending index of: ' + right.toString() + '\n');
  } else if (right >= state[0].length) {
    error = error.concat('Quick sort had an out of bounds ending index of: ' + right.toString() + '\n');
  }
  return error;
}

function updateStateHTMLMove(moverId, newIndexColumn, currentIndexColumn) {
  // gets index of specified objects position
  var index = [0, currentIndexColumn];
  var newIndex = [0, newIndexColumn];
  // gets value of object specified for move
  var tempMover = returnObjectStateData(moverId);
  // check to for erronous movements off the shelf
  if (newIndex[1] < 0 || newIndex[1] >= state[0].length) {
    alert('Something went off the shelf! cant be having that! \n try again');
    reset();
    return false;
  }
  // if a book is below the hand (grabbed currently) move it along with the hand
  if (bookBelowHand(index)) {
    // get value of book
    var tempBook = state[1][index[1]];
    // clear old book cell, middle row (as it has to be grabbed), column of hand
    clearStateCell(1, index[1]);
    // set new book cell, middle row as still grabbed, column specified in instruction
    setStateCell(1, newIndex, tempBook);
  }

  // clear old state cell of hand
  clearStateCell(index[0], index[1], tempMover[0]);
  // set new state cell, with the addition of the directionIndex for column index
  if (state[0][newIndex[1]] !== '') {
    appendStateCell(0, newIndex[1], tempMover);
  } else {
    setStateCell(0, newIndex[1], tempMover);
  }
  updateHTML();
}

function updateStateHTMLSwap(firstComparerId, firstIndex, secondComparerId, secondIndex) {
  // same as if a swap_hands block as seen in the updateState() call
  // no book updates, as this is called in partition array, hence only need to check for partition_array block and its inputs
  var tempComboFirstSwapper = null;
  var tempComboSecondSwapper = null;

  var indexFirstSwapper = [0, firstIndex];
  var indexSecondSwapper = [0, secondIndex];

  // check to see if either of the called swapping objects are combination images
  if (state[indexFirstSwapper[0]][indexFirstSwapper[1]].length > 2) {
    // retain a temp version of it
    tempComboFirstSwapper = state[indexFirstSwapper[0]][indexFirstSwapper[1]];
    // set the state cell to just the one involved in the swap
    setStateCell(indexFirstSwapper[0], indexFirstSwapper[1], returnObjectStateData(firstComparerId));

  }
  if (state[indexSecondSwapper[0]][indexSecondSwapper[1]].length > 2) {
    tempComboSecondSwapper = state[indexSecondSwapper[0]][indexSecondSwapper[1]];
    setStateCell(indexSecondSwapper[0], indexSecondSwapper[1], returnObjectStateData(secondComparerId));
  }

  var tempFirstSwapper = state[indexFirstSwapper[0]][indexFirstSwapper[1]];
  var tempSecondSwapper = state[indexSecondSwapper[0]][indexSecondSwapper[1]];
  var firstBook = state[2][indexFirstSwapper[1]];
  var secondBook = state[2][indexSecondSwapper[1]];
  var firstBookIndex = findIndexInState(firstBook[0]);
  var secondBookIndex = findIndexInState(secondBook[0]);

  var indexSorted = returnIndexSortedBookPair(firstBook, firstBookIndex, secondBook, secondBookIndex);
  var tempLeftBook = indexSorted[0][0];
  var tempRightBook = indexSorted[1][0];
  var leftBookIndex = indexSorted[0][1];
  var rightBookIndex = indexSorted[1][1];


  clearStateCell(2, leftBookIndex[1]);
  clearStateCell(2, rightBookIndex[1]);
  setStateCell(1, leftBookIndex[1], tempLeftBook);
  setStateCell(1, rightBookIndex[1], tempRightBook);
  updateHTML();

  clearStateCell(indexFirstSwapper[0], indexFirstSwapper[1]);
  clearStateCell(indexSecondSwapper[0], indexSecondSwapper[1]);
  setStateCell(indexSecondSwapper[0], indexSecondSwapper[1], tempFirstSwapper);
  setStateCell(indexFirstSwapper[0], indexFirstSwapper[1], tempSecondSwapper);

  clearStateCell(1, leftBookIndex[1]);
  clearStateCell(1, rightBookIndex[1]);
  setStateCell(1, rightBookIndex[1], tempLeftBook);
  setStateCell(1, leftBookIndex[1], tempRightBook);
  updateHTML();

  clearStateCell(1, leftBookIndex[1]);
  clearStateCell(1, rightBookIndex[1]);
  setStateCell(2, leftBookIndex[1], tempRightBook);
  setStateCell(2, rightBookIndex[1], tempLeftBook);
  updateHTML();

  clearStateCell(indexSecondSwapper[0], indexSecondSwapper[1]);
  clearStateCell(indexFirstSwapper[0], indexFirstSwapper[1]);
  setStateCell(indexFirstSwapper[0], indexFirstSwapper[1], tempFirstSwapper);
  setStateCell(indexSecondSwapper[0], indexSecondSwapper[1], tempSecondSwapper);
  updateHTML();

  if (tempComboFirstSwapper != null) {
    setStateCell(indexFirstSwapper[0], indexFirstSwapper[1], tempComboFirstSwapper);
  }
  if (tempComboSecondSwapper != null) {
    setStateCell(indexSecondSwapper[0], indexSecondSwapper[1], tempComboSecondSwapper);
  }
  updateHTML();

}

function updateStateHTMLIf(firstComparerId, firstIndex, secondComparerId, secondIndex) {
  // basically same as if doing a 'if_conditional' block in update state
  // but without any book update structure pushes, as we only need to check for the partition array and its inputs
  var tempComboFirst = null;
  var tempComboSecond = null;

  var indexFirst = [0, firstIndex];
  var indexSecond = [0, secondIndex];

  if (state[indexFirst[0]][indexFirst[1]].length > 2) {
    // retain a temp version of it
    tempComboFirst = state[indexFirst[0]][indexFirst[1]];
    // set the state cell to just the one involved in the swap
    setStateCell(indexFirst[0], indexFirst[1], returnObjectStateData(firstComparerId));
  }
  if (state[indexSecond[0]][indexSecond[1]].length > 2) {
    tempComboSecond = state[indexSecond[0]][indexSecond[1]];
    setStateCell(indexSecond[0], indexSecond[1], returnObjectStateData(secondComparerId));
  }
  updateHTML();

  // just for value - if need index then add that into params and build new section¬
  var tempFirstBook = state[2][indexFirst[1]];
  var tempSecondBook = state[2][indexSecond[1]];
  // ADDS BOOK UPDATES L R L R (book wise)
  // FIND OUT WHICH IS L OR R USING THE FUNCTION BELOW
  // params are firstbook, firstBookIndex, secondBook, secondBookIndex
  var indexSorted = returnIndexSortedBookPair(tempFirstBook, indexFirst, tempSecondBook, indexSecond);
  var leftBook = indexSorted[0][0];
  var rightBook = indexSorted[1][0];
  var leftBookIndex = indexSorted[0][1];
  var rightBookIndex = indexSorted[1][1];

  // raise books up visually +  statewise + update html
  clearStateCell(2, leftBookIndex[1], '');
  clearStateCell(2, rightBookIndex[1], '');
  setStateCell(1, leftBookIndex[1], leftBook);
  setStateCell(1, rightBookIndex[1], rightBook);
  updateHTML();

  // setTimeout(function () {
  clearStateCell(1, leftBookIndex[1], '');
  clearStateCell(1, rightBookIndex[1], '');
  setStateCell(2, leftBookIndex[1], leftBook);
  setStateCell(2, rightBookIndex[1], rightBook);
  updateHTML();
  // }, 1000);

  // now check if the swapper indexs were holding combinations
  // if so, reset them back to the original state values
  if (tempComboFirst != null) {
    // set the state cell to just the original
    setStateCell(indexFirst[0], indexFirst[1], tempComboFirst);
  }
  if (tempComboSecond != null) {
    // set the state cell to just the original
    setStateCell(indexSecond[0], indexSecond[1], tempComboSecond);
  }
  updateHTML();

}

function returnIndexSortedBookPair(firstBook, firstBookIndex, secondBook, secondBookIndex) {
  if (firstBookIndex[1] <= secondBookIndex[1]) {
    return [[firstBook, firstBookIndex], [secondBook, secondBookIndex]];
  } else {
    return [[secondBookId, secondBookIndex], [firstBookId, firstBookIndex]];
  }
}

function returnObjectStateData(id) {
  switch (id) {
    case 'Left Hand':
      return ['Left Hand', '<img class="element" src="./media/left_hand.svg" />'];
    case 'Right Hand':
      return ['Right Hand', '<img class="element" src="./media/right_hand.svg" />'];
    case 'Pivot':
      return ['Pivot', '<img class="element" src="./media/pivot.svg" />'];
    case 'book1':
      return ['book1', '<img class="element" src="./media/book_1.svg" />'];
    case 'book2':
      return ['book2', '<img class="element"   src="./media/book_2.svg" />'];
    case 'book3':
      return ['book3', '<img class="element"  src="./media/book_3.svg" />'];
    case 'book4':
      return ['book4', '<img class="element"   src="./media/book_4.svg" />'];
    case 'book5':
      return ['book5', '<img class="element"   src="./media/book_5.svg" />'];
    case 'book6':
      return ['book6', '<img class="element"  src="./media/book_6.svg" />'];
    case 'book7':
      return ['book7', '<img class="element"  src="./media/book_7.svg" />'];
  }
}


function appendStateCell(row, column, data) {
  state[row][column].push.apply(state[row][column], data);
}

// returns highlighted image html for each of the three index indicators
function returnHightlightedImage(imageId) {
  switch (imageId) {
    case 'Left Hand':
      return '<img class="element" src="./media/left_hand_hightlight.svg" />'
    case 'Right Hand':
      return '<img class="element" src="./media/right_hand_hightlight.svg" />'
    case 'Pivot':
      return '<img class="element" src="./media/pivot_hightlight.svg" />'
  }
}


function updateHTML() {
  for (var i = 0; i < state.length; i++) {
    var row = state[i];
    for (var j = 0; j < row.length; j++) {
      if (state[i][j].length >= 2) {
        table.rows[i].cells[j].innerHTML = getHTMLImage(state[i][j]);
      } else {
        table.rows[i].cells[j].innerHTML = '';
      }
    }
  }
}

function getHTMLImage(stateData) {

  if (stateData.length == 2) {
    return returnObjectStateData(stateData[0])[1];
  } else {
    let idArray = extractIdsFromStateData(stateData);
    switch (idArray.length) {
      case 2:
        switch (idArray[0]) {
          case 'Left Hand':
            switch (idArray[1]) {
              case 'Right Hand':
                return '<img class="element" src="./media/two_hands.svg" />';
              case 'Pivot':
                // CHANGETHIS need a combo pic for a hand and pivot
                return '<img class="element" src="./media/pivot_left.svg" />';
            }
          case 'Pivot':
            switch (idArray[1]) {
              case 'Left Hand':
                // CHANGETHIS need a combo pic for a left hand and pivot
                return '<img class="element" src="./media/pivot_left.svg" />';
              case 'Right Hand':
                // CHANGETHIS need a combo pic for a right hand and pivot
                return '<img class="element" src="./media/pivot_right.svg" />';
            }
          case 'Right Hand':
            switch (idArray[1]) {
              case 'Left Hand':
                return '<img class="element" src="./media/two_hands.svg" />';
              case 'Pivot':
                // CHANGETHIS need a combo pic for a Right hand and pivot
                return '<img class="element" src="./media/pivot_right.svg" />';
            }
        }
      case 3:
        // always going to be triple combo
        // CHANGETHIS need a combo pic for two hands and a pivot
        return '<img class="element" src="./media/pivot_two.svg" />';
    }
  }
  alert('couldnt find image for the state data: ' + stateData);
}


function extractIdsFromStateData(stateData) {
  var idArray = [];
  for (var a = 0; a < stateData.length; a += 2) {
    idArray.push(stateData[a]);
  }
  return idArray;
}

function setupOnStart(lvl) {
  // nextLevelButtonDetermine();
  setupState(lvl);
  updateHTML();
  resetErrorArea();
}

function displayHelpModal() {
  $('#helpModal').modal('toggle');
}

function displayLevelCompletionModal() {
  $('#completionModal').modal('toggle');
}

function enableNextLevelButton() {
  $('#nextButton').class('disabled');
}

function changePage(direction) {
  var fileName = location.href.split("/").slice(-1);
  switch (direction) {

    case 'home':
      document.location.href = 'home.html';
      break;

    case 'next':
      var numberObject = fileName[0].match(/\d+/g);
      var urlNext = 'test' + ((Number(numberObject[0]) + 1).toString()) + '.html';
      document.location.href = urlNext;
      break;

    case 'previous':
      switch (fileName[0]) {

        case 'test1.html':
          document.location.href = 'home.html';
          break;

        default:
          var numberObject = fileName[0].match(/\d+/g);
          var urlNext = 'test' + ((Number(numberObject[0]) - 1).toString()) + '.html';
          document.location.href = urlNext;
          break;
      }
      break;
  }
}

function pushBookUpdate(id, from, to) {
  bookUpdate = {
    // temp[0] will be the book id e.g. book1
    bookId: id,
    // the index its moving from is lowest row (so 2 as index) and the column of the hand specified
    fromIndex: from,
    // index its moving to is the same column but the middle row (so index 1)
    toIndex: to
  };
  bookUpdateStructure.push(bookUpdate);
}


function conditionalBlockExecution(evalProperty, operator, compareFirst, compareSecond) {
  var indexFirst = findIndexInState(compareFirst);
  var indexSecond = findIndexInState(compareSecond);
  var tempFirst = state[2][indexFirst[1]];
  var tempSecond = state[2][indexSecond[1]];
  pushInstruction("if_conditional", [evalProperty, operator, compareFirst, compareSecond]);
  switch (evalProperty) {
    case 'Value':
      if (evalStringOperator(getBookValue(tempFirst[0], 'height'),
        operator,
        getBookValue(tempSecond[0], 'height')
      )) {
        return true;
      }
      return false;
    case 'Index':
      if (evalStringOperator(indexFirst[1], operator, indexSecond[1])) {
        return true;
      }
      return false;
  }
}

function evalStringOperator(first, operator, second) {
  switch (operator) {
    case 'Less':
      return (first < second);
    case 'Greater':
      return (first > second);
    case 'Equal':
      return (first == second);
    case 'LessEqual':
      return (first <= second);
    case 'GreaterEqual':
      return (first >= second);
    case 'NotEqual':
      return (first != second);
  }
}

function getBookValue(id, property) {
  switch (id) {

    case 'book1':
      switch (property) {
        case 'height':
          return 1;
      }
      break;

    case 'book2':
      switch (property) {
        case 'height':
          return 2;
      }
      break;

    case 'book3':
      switch (property) {
        case 'height':
          return 3;
      }
      break;
    case 'book4':
      switch (property) {
        case 'height':
          return 4;
      }
      break;
    case 'book5':
      switch (property) {
        case 'height':
          return 5;
      }
      break;
    case 'book6':
      switch (property) {
        case 'height':
          return 6;
      }
      break;
    case 'book7':
      switch (property) {
        case 'height':
          return 7;
      }
      break;
  }
}

function getLevelCodeFromHTML() {
  var fileName = location.href.split("/").slice(-1);
  return numberObject = Number(fileName[0].match(/\d+/g));

}


generateCodeAndLoadIntoInterpreter();
setupOnStart(getLevelCodeFromHTML());
workspace.addChangeListener(function (event) {
  if (!(event instanceof Blockly.Events.Ui)) {
    // Something changed. Parser needs to be reloaded.    
    generateCodeAndLoadIntoInterpreter();
  }
});

nextButton.addEventListener('click', function () {
  changePage('next');
})
previousButton.addEventListener('click', function () {
  changePage('previous');
})
runButton.addEventListener('click', function () {
  runCode(levelCode);
})
stepButton.addEventListener('click', function () {
  stepExecution(levelCode);
})
resetButton.addEventListener('click', function () {
  reset();
})
helpButton.addEventListener('click', function () {
  displayHelpModal(levelCode);
})
homeButton.addEventListener('click', function () {
  changePage('home');
})
modalNextLevelButton.addEventListener('click', function () {
  changePage('next');
})
errorHighlightButton.addEventListener('click', function () {
  highlightFirstError();
})

function getUsername() {
  usernameSlot.innerText = findGetParameter('user');
}
function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  var items = location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
    tmp = items[index].split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}

function updateLevelProgressionLog() {
  username = getUsername();
  newLevel = getLevelCodeFromHTML() + 1;
  $.post("updateLevelProgression.php",
    {
      user: username,
      level: newLevel
    });
}

function nextLevelButtonDetermine() {
  levelProgression = $.post("getLevelProgression.php",
    {
      user: username
    });
  currentLevel = getLevelCodeFromHTML();
  if (levelProgression > currentLevel) {
    enableNextLevelButton();
  }
}

function partitionArray(l, r, pushInstructionToggle) {

  var left = parseInt(l);
  var right = parseInt(r);

  // does lomutos way
  // partitions a tempoary array taken from the states current values when executed
  // doesnt change the state, merely used to push an instruction that later will in updateState()
  // in addition to calculating the final partition index for use in the quicksort structure -  which is returned (i)

  // give instruction toggle
  // dictates whether called from block directly or inside quick sort function
  // true being directly
  pushInstruction('partition_array', [left, right, pushInstructionToggle]);

  // gets array of current book values from the state
  var array = getArrayBookValues(left, right);
  // Lomuto algorithm always uses the last element, array[right], for the pivot.
  var pivot = right;
  var i = left;

  /*The logic under Lomuto is, we start from the leftmost element and keep track of index of smaller (or equal to) elements as j. While traversing, if we find a smaller element, we swap current element with arr[j]. Otherwise we ignore current element.*/
  for (var j = left; j < right; j++) {
    if (array[j] <= array[pivot]) {
      swap(array, i, j);
      i++
    }
  }
  swap(array, i, j);
  return i;
}
function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function getArrayBookValues(start, end) {
  let array = []
  for (var a = start; a <= end; a++) {
    array.push(getBookValue(state[2][a][0], 'height'));
  }
  return array;
}

function quickSort(l, r, pushInstructionToggle, direction) {
  console.log(l + '  ' + r + '   ' + direction);
  console.log(state[2]);
  let left = parseInt(l);
  let right = parseInt(r);
  if (left < right) {
    pi = partitionArray(left, right, false);
    updateState();
    updateHTML();
    var leftPi = pi - 1;
    var rightPi = pi + 1;
    quickSort(left, leftPi, 'false', 'left');
    quickSort(rightPi, right, 'false', 'right');
  }
  if (pushInstructionToggle === 'true') {
    pushInstruction('quick_sort', [left, right]);
  }
}

