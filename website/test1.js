instructionStructure = new Array();
bookUpdateStructure = new Array();
requiredBlocks = [];
var levelCode = null;
var myInterpreter = null;
var highlightPause = false;
var latestCode = '';
var runTimeout = null;
var state = [];
var instructionUpdateCounter = 0;
var mostRecentHighlightId = null;
var firstErrorBlock = null;
var completed = false;

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
var errorHighlightButton = document.getElementById('errorHighlightButton');
var usernameSlot = document.getElementById('usernameSlot');

// Areas
var errorArea = document.getElementById('errorArea');
var errorAreaText = document.getElementById('errorAreaText');
var variableDisplayArea = document.getElementById('variableDisplayArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var handRow = document.getElementById('handRow');
var bookRow = document.getElementById('bookRow');
var indexDisplay = document.getElementById('indexDisplay');
var levelInstructionArea = document.getElementById('levelInstructionArea');
var checklistArea = document.getElementById('checklistArea');
//help modal
var helpModalTitle = document.getElementById('helpModalTitle');
var helpModalBody = document.getElementById('helpModalBody');
var helpModalButton = document.getElementById('helpModalButton');
// Completion Modal
var completionModalBody = document.getElementById('completionModalBody');
levelInstructionArea.classList.add('centerText');


//  GENERATTORS & DISPLAY FUNCTIONS
// Generators determine the code produced when a block is placed in the workspace
// Display functions determine the visual display of the blocks and their possible fields and inputs
Blockly.JavaScript['controls_whileUntil'] = function (block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
    until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
      Blockly.JavaScript.ORDER_NONE) || 'false';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'pushInstruction("controls_whileUntil", [])' + '\n' + 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.JavaScript['controls_if'] = function (block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.JavaScript.valueToCode(block, 'IF' + n,
      Blockly.JavaScript.ORDER_NONE) || 'false';
    branchCode = Blockly.JavaScript.statementToCode(block, 'DO' + n);
    code += (n > 0 ? ' else ' : '') +
      'if (' + conditionCode + ') {\n' + branchCode + '}';

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.JavaScript.statementToCode(block, 'ELSE');
    code += ' else {\n' + branchCode + '}';
  }
  return 'pushInstruction("controls_if", [])' + '\n' + code + '\n';
};


function conditional_quick(op, arg0, arg1) {
  pushInstruction('conditional_quick', [op, arg0, arg1]);
  return evalStringOperator(arg0, op, arg1);
}

// START - Functions for quick sort - not in final build

// Blockly.JavaScript['conditional_quick'] = function (block) {
//   var operator = block.getFieldValue('OP');
//   var order = Blockly.JavaScript.ORDER_ATOMIC;
//   var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
//   var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);
//   var code = 'conditional_quick("' + operator.toString() + '",' + argument0 + ',' + argument1 + ')';
//   return [code, order];
// };

// Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
//   {
//     "type": "conditional_quick",
//     "message0": "%1 %2 %3",
//     "args0": [
//       {
//         "type": "input_value",
//         "name": "A"
//       },
//       {
//         "type": "field_dropdown",
//         "name": "OP",
//         "options": [
//           ["=", "Equal"],
//           ["\u2260", "NotEqual"],
//           ["\u200F<", "Less"],
//           ["\u200F\u2264", "LessEqual"],
//           ["\u200F>", "Greater"],
//           ["\u200F\u2265", "GreaterEqual"]
//         ]
//       },
//       {
//         "type": "input_value",
//         "name": "B"
//       }
//     ],
//     "inputsInline": true,
//     "output": "Boolean",
//     "colour": "%{BKY_LOGIC_HUE}",
//     "helpUrl": "%{BKY_LOGIC_COMPARE_HELPURL}",
//     "extensions": ["logic_compare", "logic_op_tooltip"]
//   }]);



// Blockly.Blocks['quick_sort_structure'] = {
//   init: function () {
//     this.appendDummyInput()
//       .appendField("QuickSort")
//       .appendField(new Blockly.FieldVariable("Start"), "Left")
//       .appendField(new Blockly.FieldNumber(0, 0), "leftInput")
//       .appendField(new Blockly.FieldVariable("End"), "Right")
//       .appendField(new Blockly.FieldNumber(0, 0), "rightInput");
//     this.appendStatementInput("NAME")
//       .setCheck(null);
//     this.setColour(230);
//     this.setTooltip("");
//     this.setHelpUrl("");
//     this.setMovable(false);
//     this.setDeletable(false);
//   }
// };
// Blockly.JavaScript['quick_sort_structure'] = function (block) {
//   var variable_left = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('Left'), Blockly.Variables.NAME_TYPE);
//   var number_leftinput = block.getFieldValue('leftInput');
//   var variable_right = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('Right'), Blockly.Variables.NAME_TYPE);
//   var number_rightinput = block.getFieldValue('rightInput');
//   var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
//   var branch = Blockly.JavaScript.statementToCode(block, 'NAME');

//   return 'quick_sort_structure(' + number_leftinput.toString() + ',' + number_rightinput.toString() + ');\n' + variable_left.toString() + '=' + number_leftinput.toString() + ';\n' + variable_right.toString() + '=' + number_rightinput.toString() + ';\n' + branch;
// };
// function quick_sort_structure(number_leftinput, number_rightinput) {
//   pushInstruction('quick_sort_structure', [number_leftinput, number_rightinput]);
// }

// Blockly.Blocks['quick_sort'] = {
//   init: function () {
//     this.appendDummyInput()
//       .appendField("QuickSort");
//     this.appendValueInput("Left")
//       .setCheck("Number")
//       .appendField("Start Index");
//     this.appendValueInput("Right")
//       .setCheck("Number")
//       .appendField("End Index");
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(180);
//     this.setTooltip("qiqi helped with this a lot! ");
//     this.setHelpUrl("");
//   }
// };
// Blockly.JavaScript['quick_sort'] = function (block) {
//   var value_left = Blockly.JavaScript.valueToCode(block, 'Left', Blockly.JavaScript.ORDER_ATOMIC);
//   var value_right = Blockly.JavaScript.valueToCode(block, 'Right', Blockly.JavaScript.ORDER_ATOMIC);
//   var code = 'quickSort(' + value_left + ',' + value_right + ',"true");'
//   return code;
// };


// Blockly.Blocks['partition_array'] = {
//   init: function () {
//     this.appendDummyInput()
//       .setAlign(Blockly.ALIGN_CENTRE)
//       .appendField("Partition Array");
//     this.appendValueInput("Left")
//       .appendField("Start Index");
//     this.appendValueInput("Right")
//       .appendField("End Index");
//     this.setOutput(true, null);
//     this.setColour(230);
//     this.setTooltip("");
//     this.setHelpUrl("");
//   }
// };
// Blockly.JavaScript['partition_array'] = function (block) {
//   var value_left = Blockly.JavaScript.valueToCode(block, 'Left', Blockly.JavaScript.ORDER_ATOMIC);
//   var value_right = Blockly.JavaScript.valueToCode(block, 'Right', Blockly.JavaScript.ORDER_ATOMIC);
//   var code = 'partitionArray(' + value_left + ',' + value_right + ', "true")';
//   return [code, Blockly.JavaScript.ORDER_NONE];
// };

// Blockly.Blocks['if_conditional_piv'] = {
//   init: function () {
//     this.appendDummyInput()
//       .setAlign(Blockly.ALIGN_CENTRE)
//       .appendField(new Blockly.FieldDropdown([["Value", "Value"], ["Index", "Index"]]), "properties");
//     this.appendDummyInput()
//       .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"], ["Pivot", "Pivot"]]), "compareFirst")
//       .appendField(new Blockly.FieldDropdown([["<", "Less"], [">", "Greater"], ["<=", "LessEqual"], [">=", "GreaterEqual"], ["=", "Equal"]]), "operator")
//       .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"], ["Pivot", "Pivot"]]), "compareSecond");
//     this.setOutput(true, null);
//     this.setColour(230);
//     this.setTooltip("");
//     this.setHelpUrl("");
//   }
// };
// Blockly.JavaScript['if_conditional_piv'] = function (block) {
//   var dropdown_properties = block.getFieldValue('properties');
//   var dropdown_operator = block.getFieldValue('operator');
//   var compareFirst = block.getFieldValue('compareFirst');
//   var compareSecond = block.getFieldValue('compareSecond');
//   // calls function that returns truth value for comparison
//   // but the function also pushes the action block to the instruction structure for the IF block and itself
//   // this allows for the updating of images to show the books being lifted by the hands for the comparison
//   var code = '(conditionalBlockExecution("' + dropdown_properties + '","' + dropdown_operator.toString() + '","' + compareFirst.toString() + '","' + compareSecond.toString() + '"))';
//   return [code, Blockly.JavaScript.ORDER_NONE];
// };

// Blockly.Blocks['swap_books_piv'] = {
//   init: function () {
//     this.appendDummyInput()
//       .setAlign(Blockly.ALIGN_CENTRE)
//       .appendField("Grab and Swap");
//     this.appendDummyInput()
//       .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"], ["Pivot", "Pivot"]]), "swapFirst")
//       .appendField("and")
//       .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"], ["Pivot", "Pivot"]]), "swapSecond");
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(290);
//     this.setTooltip("");
//     this.setHelpUrl("");
//   }
// };
// Blockly.JavaScript['swap_books_piv'] = function (block) {
//   var swapFirst = block.getFieldValue('swapFirst');
//   var swapSecond = block.getFieldValue('swapSecond');
//   var code = 'pushInstruction("swap_books",["' + swapFirst + '","' + swapSecond + '"]);';
//   return code;
// };

// END

//  Swap Status block
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

// For Loop block
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

// Conditional Comparison block
Blockly.Blocks['if_conditional'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Grab and Compare");
    this.appendDummyInput()
      .appendField("Left Hand")
      .appendField(new Blockly.FieldDropdown([["<", "Less"], [">", "Greater"], ["<=", "LessEqual"], [">=", "GreaterEqual"], ["=", "Equal"]]), "operator")
      .appendField("Right Hand");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip("Conditional Input -\nGrabs the books below each ahnd and compares them \nWill output True or False depending upon the comparison result");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['if_conditional'] = function (block) {
  var dropdown_properties = "Value";
  var dropdown_operator = block.getFieldValue('operator');
  // calls function that returns truth value for comparison
  // but the function also pushes the action block to the instruction structure for the IF block and itself
  // this allows for the updating of images to show the books being lifted by the hands for the comparison
  var code = '(conditionalBlockExecution("' + dropdown_properties + '","' + dropdown_operator.toString() + '","Left Hand","Right Hand"))';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

// Relative Hand Movement block
Blockly.Blocks['move_hand'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Move the ")
      .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"]]), "handSelect");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("One space ")
      .appendField(new Blockly.FieldDropdown([["left", "left"], ["right", "right"]]), "directionSelect");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(15);
    this.setTooltip("Relative Move Hand -\n Moves the hand one space in the chosen direction");
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

// Swap books block
Blockly.Blocks['swap_books'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Grab and Swap");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("Swap Books -\nGrabs the books beneath each hand, swaps them, and then places them down");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['swap_books'] = function (block) {
  // has to send empty array even if no user input as pushinstructions uses a second param - inputs 
  var code = 'pushInstruction("swap_books",["Left Hand", "Right Hand"]);';
  return code;
};


// Index Hand Movement block
Blockly.Blocks['select_hand_position'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Move");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"]]), "handSelect")
      .appendField("to index")
      .appendField(new Blockly.FieldNumber(0), "indexSelect");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(15);
    this.setTooltip("Index Move Hand -\nMoves hand to the chosen index");
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


// Grab book block
Blockly.Blocks['grab_book'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Grab");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("with")
      .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"]]), "handSelect");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("Grab Book -\n Grabs the book beneath the chosen hand");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['grab_book'] = function (block) {
  var dropdown_handselect = block.getFieldValue('handSelect');
  var input = '["' + dropdown_handselect + '"]';
  var code = 'pushInstruction("grab_book",' + input + ');'
  return code;
};

// Place Book block
Blockly.Blocks['place_book'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Place");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("with")
      .appendField(new Blockly.FieldDropdown([["Left Hand", "Left Hand"], ["Right Hand", "Right Hand"]]), "handSelect");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("Place Book -\n Places the book held by the hand chosen");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['place_book'] = function (block) {
  var dropdown_handselect = block.getFieldValue('handSelect');
  var input = '["' + dropdown_handselect + '"]';
  var code = 'pushInstruction("place_book",' + input + ');';
  return code;
};

// empties instruction array
function clearInstructionArray() {
  instructionStructure = [];
}
// empties book update array
function clearBookUpdateArray() {
  bookUpdateStructure = [];
}
// turns the instruction array into a string and returns it
function showInstructions() {
  return JSON.stringify(instructionStructure);
}

// Checks to see if two passed arguments are equal
// Checks types, length, values
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

// Returns the Book Movement solution for the passed level code
function getSolution(levelCode) {
  solutionArray = [];
  switch (levelCode) {

    case 1:
      solutionArray.push.apply(solutionArray, returnGrabSolution("book7", 0));
      solutionArray.push.apply(solutionArray, returnPlaceSolution('book7', 0));
      break;
    case 2:
      solutionArray = [{ "bookId": "book7", "fromIndex": [2, 0], "toIndex": [1, 0] },
      { "bookId": "book7", "fromIndex": [1, 0], "toIndex": [1, 1] },
      { "bookId": "book7", "fromIndex": [1, 1], "toIndex": [2, 1] }];
      break;

    case 3:
      // swap books  
      solutionArray.push.apply(solutionArray, returnSwapSolution("book1", "book4", 0, 1));
      break;

    case 4:
      // if left > right value then swap
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book7", 0, 1));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book1", "book7", 0, 1));
      break;

    case 5:
      // move direction twice and pickup
      solutionArray = [{ "bookId": "book1", "fromIndex": [2, 2], "toIndex": [1, 2] }];
      break;

    case 6:
      // move book to second column
      // move to index 2, and grab
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book1', 0, 1));
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book1', 1, 2));
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book1', 2, 3));
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book1', 3, 4));
      solutionArray.push.apply(solutionArray, returnPlaceSolution('book1', 4));
      break;

    case 7:
    case 8:
      // move book to second column
      // move to index 2, and grab
      solutionArray.push.apply(solutionArray, returnGrabSolution("book7", 2));
      // move it to index 4
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book7', 2, 3));
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book7', 3, 4));
      // place book
      solutionArray.push.apply(solutionArray, returnPlaceSolution('book7', 4));
      break;

    case 9:
      // 5 books index 3 and 4 are out of order
      // using a repeat while, keep left hand on index 0 while moving right to the location of out of order book and swap them
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book2", 0, 1));
      //
      solutionArray.push.apply(solutionArray, returnIfSolution("book2", "book3", 1, 2));
      //
      solutionArray.push.apply(solutionArray, returnIfSolution("book3", "book5", 2, 3));
      //
      solutionArray.push.apply(solutionArray, returnIfSolution("book5", "book4", 3, 4));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book5", "book4", 3, 4));
      break;

    case 10:
      // 
      solutionArray.push.apply(solutionArray, returnIfSolution("book1", "book2", 0, 1));
      //
      solutionArray.push.apply(solutionArray, returnIfSolution("book2", "book4", 1, 2));
      //
      solutionArray.push.apply(solutionArray, returnIfSolution("book4", "book3", 2, 3));
      solutionArray.push.apply(solutionArray, returnSwapSolution("book4", "book3", 2, 3));
      break;

    case 11:
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

    case 12:
      // grab book in index 0, then move it to the end, then reset hands position back to 0
      solutionArray.push.apply(solutionArray, returnGrabSolution("book5", 0));
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book5', 0, 1));
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book5', 1, 2));
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book5', 2, 3));
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book5', 3, 4));
      solutionArray.push.apply(solutionArray, returnGrabbedBookMoveSolution('book5', 4, 0));
      solutionArray.push.apply(solutionArray, returnPlaceSolution('book5', 0));
      break;


    case 13:
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

    case 14:
      // bubble sort non optimized
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

    case 15:
      // bubble sort optimized: 1 7 3 6 5 4 2
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


    case 16: // PARTITION ONE SINGLE ITERATION - NO RETURN VALUE AS OF YET
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
    case 17:
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

// returns a swap solution book movement based on the arguments
function returnSwapSolution(bookLeft, bookRight, bookLeftColumnIndex, bookRightColumnIndex) {
  // swap is done L R L R R L book wise
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

//  returns If book movement solution
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
// Grab
function returnGrabSolution(bookId, handColumnIndex) {
  solution = [
    { "bookId": bookId, "fromIndex": [2, handColumnIndex], "toIndex": [1, handColumnIndex] }
  ];
  return solution;
}
// Place
function returnPlaceSolution(bookId, handColumnIndex) {
  solution = [
    { "bookId": bookId, "fromIndex": [1, handColumnIndex], "toIndex": [2, handColumnIndex] }
  ];
  return solution;
}
// Grabbed book Movement
function returnGrabbedBookMoveSolution(bookId, handColumnIndex, toColumnIndex) {
  solution = [
    { "bookId": bookId, "fromIndex": [1, handColumnIndex], "toIndex": [1, toColumnIndex] }
  ];
  return solution;
}

// Compares the most recent addition to the book update structure against that of the level solution
function compareSolutions(levelCode, updateNumber) {
  debugger;
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
  else if (bookUpdateStructure.length === solutionArray.length && myInterpreter === null) {
    disableAllButtonStates();
    myInterpreter = null;
    runButton.innerText = "play_arrow";
    if (levelCode != 3) {
      displayLevelCompletionModal();
    } else {
      setTimeout(function () { displayLevelCompletionModal(); }, 1000);
    }
    enableAllButtonStates(); enableButtonState(nextButton);
    var fileName = location.href.split("/").slice(-1);
    var numberObject = fileName[0].match(/\d+/g);
    setCookie('levelProgression', Number(numberObject[0]) + 1, 7);

    // setTimeout(function () { displayLevelCompletionModal(); enableAllButtonStates(); }, 1000);    
    return;
  }
  // if end (if no more blocks, stepcode sets interpt to null to indicate end of execution) 
  else if (myInterpreter === null) {
    setTimeout(function () { alert("Reached end of execution without error or completion, keep going!"); }, 1000);
    return;
  }
  // if not any of previous three, it must be correct latest yet also not the end/complete, so true
  return;
}

//  returns feedback based on the reason for the error
function feedbackOnError(updateNumber, solutionArray) {
  if (updateNumber > solutionArray.length) {
    return '';
  }
  var error = '';
  var errorUpdate = bookUpdateStructure[updateNumber];
  var solutionUpdate = solutionArray[updateNumber];
  if (solutionUpdate === undefined) {
    error = error.concat('You had already completed the level, this book movement and any after it are uneeded');
    alert('You had already completed the level, this book movement and any after it are uneeded');
    reset();
    runButton.innerText = "play_arrow";
    enableButtonState(stepButton);
    return error;
  }
  if (returnKeyValue(errorUpdate, 0) !== returnKeyValue(solutionUpdate, 0)) {
    error = error.concat('You moved the wrong book, or tried to at an empty index');
    return error;
  } else if (!isEqual(returnKeyValue(errorUpdate, 1), returnKeyValue(solutionUpdate, 1))) {
    error = error.concat('You moved the book from the wrong position');
    return error;
  } else if (!isEqual(returnKeyValue(errorUpdate, 2), returnKeyValue(solutionUpdate, 2))) {
    error = error.concat('You moved the book to the wrong position');
    return error;
  } else {
    error = error.concat('The developer didnt forsee your wrong move and as such there is no feedback.\n Sorry, but you are on your own for this one.\n I believe in you!');
    return error;
  }
}

// updates the error area on the ui with the feedback text passed as a param
function updateErrorArea(errorText) {
  if (errorArea.classList.contains("redBG")) {
    return;
  }
  markRecentHighlight();
  $(".errorArea").addClass("redBG");
  errorAreaText.innerHTML = '<h4>' + errorText + '</h4>';
  // clearTimeout(runTimeout);
  // runButton.innerText = "play_arrow";
}
// Resets the error area to starting state
function resetErrorArea() {
  $(".errorArea").removeClass("redBG");
  errorAreaText.innerText = 'No errors \n....yet';
}

// Function including all API functions for use with the JS interpreter
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

// Highlights block with the passed ID
function highlightBlock(id) {
  workspace.highlightBlock(id);
  highlightPause = true;
}
//  marks the most recent block incase of error
function markRecentHighlight() {  
  firstErrorBlock = mostRecentHighlightId;
}
//  called on error, saves the marked block for use with the highlight error button
function saveRecentHighlight(id) {
  mostRecentHighlightId = id;  
}
// highlights the saved error block
function highlightFirstError() {  
  highlightBlock(firstErrorBlock);
}

//  Called from block code, pushes instruction objects to instruction array
//  these objects describe the block along with its inputs
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
    case "controls_if":
    case "controls_whileUntil":
      instruction = {
        blockName: blockName
      }
      instructionStructure.push(instruction);
      break;
    default:
      throw 'attempted to push unknown instruction block';
  }
}

// Resets the highlighting 
function resetStepUi() {
  workspace.highlightBlock(null);
  highlightPause = false;
}

// Generate JavaScript code from the blocks and parses it.
// Called everytime the workspace is edited
function generateCodeAndLoadIntoInterpreter() {  
  var varArray = getVarArray();
  var prefix = returnVariableDisplayPrefix(varArray);
  //  set prefixzes to appear before every blocks generated code
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\nsaveRecentHighlight(%1);\n' + prefix;
  Blockly.JavaScript.addReservedWords('highlightBlock');
  Blockly.JavaScript.addReservedWords('saveRecentHighlight');
  //  generate the code form the blocks on the workspace
  latestCode = Blockly.JavaScript.workspaceToCode(workspace);
  // updates the checklist area
  updateRequiredBlocksMet(latestCode);  
  resetStepUi(true);
}

//  returns array of all currently used variables by the user
function getVarArray() {
  returnArray = [];
  latestCode = Blockly.JavaScript.workspaceToCode(workspace);
  var varString = latestCode.split('\n')[0];
  if (varString[0] !== 'v') {
    return [];
  } else {
    varString = varString.split(' ');
    for (a = 1; a < varString.length; a++) {
      returnArray.push(varString[a].slice(0, -1));
    }
  }
  return returnArray;
}
//  updates the variable display area on the UI with the variable names and values
function updateVariableDisplay(varObjects) {
  debugger;
  variableDisplayArea.innerHTML = '<h3 class="fontOverride">Variables:</h3>';

  var varNames = [];
  workspace.getAllVariables().forEach(element => {
    varNames.push(returnKeyValue(element, 1).toString());
  });

  var values = [];
  for (var b = 0; b < varObjects.a.length; b++) {
    if (typeof varObjects.a[b] === "number" | "boolean") {
      values.push(varObjects.a[b]);
    } else {
      values.push('');
    }
  }

  for (var c = 0; c < values.length; c++) {
    if (typeof values[c] === "number") {
      variableDisplayArea.innerHTML += '<h4>' + varNames[c] + ' = ' + values[c] + '</h4>'
    }
  }

}
// returns the needed prefix, used before code is generated so that as it runs
//  variable display area can be updated dynmaically throughout execution
function returnVariableDisplayPrefix(varArray) {
  var prefix = 'updateVariableDisplay(['
  varArray.forEach(function (element) {
    prefix = prefix.concat(element + ',');
  });
  if (prefix.charAt(prefix.length - 1) !== '[') {
    prefix = prefix.slice(0, -1);
  }
  prefix = prefix.concat(']);\n');  
  return prefix;
}

//  Unused function
// function returnVariableDisplayPrefix(varArray) {
//   var prefix = 'updateVariableDisplay(['
//   varArray.forEach(function (element) {
//     console.log(returnKeyValue(element, 1).toString());
//     if (element)
//       prefix = prefix.concat(returnKeyValue(element, 1).toString() + ',');
//   });
//   if (prefix.charAt(prefix.length - 1) !== '[') {
//     prefix = prefix.slice(0, -1);
//   }
//   prefix = prefix.concat(']);\n');
//   console.log('prefix is:   ' + prefix);
//   return prefix;
// }

// Step function
// executes on blocks worth of generated code until no more remains
// initilaises the interpreter if its not previously been made - e.g. at the start of execution
stepCode = function (level) {
  if (!myInterpreter) {

    // First statement of this code.
    // Clear the program output.
    levelCode = level;
    completed = false;
    reset();
    mostRecentHighlightId = null;
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
        console.log('inertp null')
        // Program complete, no more code to execute.         
        // Cool down, to discourage accidentally restarting the program.

        disableAllButtonStates();
        runButton.innerText = "play_arrow";
        setTimeout(function () {
          enableAllButtonStates();
        }, 2000);

        return;
      }
    }
    // Keep executing until a highlight statement is reached,
    // or the code completes or errors.
  } while (hasMoreCode && !highlightPause);
}

// enables stepbutton if not currently running
// not running means play button will have text 'play_arrow' as opposed to 'pause' when it is running
function enableStepIfNotRunOrEnd() {
  if (runButton.innerText === "play_arrow" && myInterpreter !== null) {
    enableButtonState(stepButton);
  }
}

//  toggles all buttons
function toggleAllButtonStates() {
  toggleButtonState(stepButton);
  toggleButtonState(runButton);
  toggleButtonState(previousButton);
  toggleButtonState(helpButton);
  toggleButtonState(resetButton);
  toggleButtonState(homeButton);
}
function disableAllButtonStates() {
  disableButtonState(stepButton);
  disableButtonState(runButton);
  disableButtonState(previousButton);
  disableButtonState(helpButton);
  disableButtonState(resetButton);
  disableButtonState(homeButton);
}
function enableAllButtonStates() {
  enableButtonState(stepButton);
  enableButtonState(runButton);
  enableButtonState(previousButton);
  enableButtonState(helpButton);
  enableButtonState(resetButton);
  enableButtonState(homeButton);
}

function toggleButtonState(buttonId) {
  if (buttonId.disabled === false) {
    buttonId.disabled = true;
  } else {
    buttonId.disabled = false;
  }
}
function disableButtonState(buttonId) {
  buttonId.disabled = true;
}
function enableButtonState(buttonId) {
  buttonId.disabled = false;
}

//  Runs code - auto execution of blocks
//  calls step in a loop until no more code or user presses pause
function runCode(level) {

  if (runButton.innerText === "play_arrow") {
    runButton.innerText = "pause";
    disableButtonState(stepButton);
  } else {
    clearTimeout(runTimeout);
    runButton.innerText = "play_arrow";
    enableButtonState(stepButton);
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


// main processing function
// checks all required blocks are used
// steps code
// compares
function stepExecution(level) {

  if (!checkRequiredBlocksAreMet()) {
    alert('You have not included all the necessary blocks, cant start yet');
    clearTimeout(runTimeout);
    runButton.innerText = "play_arrow";
    enableAllButtonStates();
    reset();
    return;
  }
  stepCode(level);
  // update the state
  // if returns false it means there was an erronous move
  // in this case a reset happens and this returns false also   
  if (!updateState()) {
    return false;
  }

  compareSolutions(levelCode, bookUpdateStructure.length);

  return true;
}

// resets
// used on error or on press of reset button
function reset() {
  // if interpreter exists then blocks are executing
  if (myInterpreter) {
    clearTimeout(runTimeout);
    runButton.innerText = "play_arrow";
    enableAllButtonStates();
  }

  myInterpreter = null;
  resetStepUi();
  clearInstructionArray();
  clearBookUpdateArray();
  setupOnStart(levelCode);
  resetErrorArea();
  variableDisplayArea.innerHTML = '<h3>Variables:<h3>';
  instructionUpdateCounter = 0;
}

//  initlaises the starting state depending upon level code
function setupState(level) {

  levelCode = level;
  switch (levelCode) {
    case 0:
      // move hand and book
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], ['Right Hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />']],
        ['', ''],
        [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'], ['book2', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />']],
      ];

      break;
    case 1:
      // move hand and book
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />']],
        ['',],
        [['book7', '<img style="display:block;" width="100%" height="100%" src="./media/book_7.svg" />']],
      ];
      break;
    case 2:
      // move hand and book
      state = [
        ['', ['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />']],
        ['', ''],
        [['book7', '<img style="display:block;" width="100%" height="100%" src="./media/book_7.svg" />'], ''],
      ];
      break;

    case 3:
      // swapbooks
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], ['Right Hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />']],
        ['', ''],
        [['book1', '<img style="display:block;" width="100%" height="15%" src="./media/book_1.svg" />'], ['book7', '<img style="display:block;" width="100%" height="100%" src="./media/book_7.svg" />']]
      ];
      break;

    case 4:
      // if left > right value, pick up left
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], ['Right Hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />']],
        ['', ''],
        [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'], ['book7', '<img style="display:block;" width="100%" height="100%" src="./media/book_7.svg" />']]
      ];
      break;

    case 5:
      // move direction and pickup
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], '', ''],
        ['', '', ''],
        ['', '', ['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_7.svg" />']]
      ];
      break;

    case 6:
      // for count , move hand along and drop at end
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], '', '', '', ''],
        [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'], '', '', '', ''],
        ['', '', '', '', '']
      ];
      break;

    case 7:
      // for count move hand along and if index = 2 then grab book
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', ['book7', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'], '', '']
      ];
      break;

    case 8:
      // repeat while, same as previous
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', ['book7', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'], '', '']
      ];
      break;

    case 9:
      // Repeat while with nums, sort the two out of order at end
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'],
        ['Right Hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />']
          , '', '', ''],
        ['', '', '', '', ''],
        [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book2', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book3', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book5', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book4', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />']
        ]
      ];
      break;

    case 10:
      // repeat while with truth values, stop after first swap
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'],
        ['Right Hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />']
          , '', '', ''],
        ['', '', '', '', ''],
        [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book2', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book4', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book3', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
        ['book5', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />']
        ]
      ];
      break;

    case 11:
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

    case 12:
      // grab book
      // move to end, then reset hand to start and then place
      state = [
        [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'],
          '', '', '', ''],
        ['', '', '', '', ''],
        [['book5', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'], '', '', '', '']
      ];
      break;

    case 13:
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

    case 14:
    case 15:
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

    // QUICK SORT - NOT USED
    // case 16:
    // case 17:
    //   state = [
    //     // row one - hands
    //     [['Left Hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />', 'Right Hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />'],
    //       '', '', '', '', '', ['Pivot', '<img style="display:block;" width="100%" height="100%" src="./media/pivot.svg" />']],
    //     //  row two - grabbed books
    //     ['', '', '', '', '', '', ''],
    //     // row three - placed books
    //     [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
    //     ['book6', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
    //     ['book2', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
    //     ['book7', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
    //     ['book3', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
    //     ['book4', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'],
    //     ['book5', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />']]
    //   ];
    //   break;

  }
}

// finds index in the state of the object with the ID param
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
  alert("Couldn't find what you were looking for: " + id);
  reset();
  updateErrorArea("Couldn't find what you were looking for: " + id);
  runButton.innerText = "play_arrow";
  enableButtonState(stepButton);
  return null;
}

// clears the specified state cell
// used during object movements
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
// set state cell
function setStateCell(row, column, data) {
  state[row][column] = data;
}
// returns the key value of an object in the given key index
function returnKeyValue(obj, keyIndex) {
  return obj[Object.keys(obj)[keyIndex]]
}
// checks to see if a book is below the specified hand
function bookBelowHand(positionOfHand) {
  if (state[1][positionOfHand[1]] !== '') {
    return true;
  }
  return false;
}

// Updates the state depending upon the most recent instruction
function updateState() {

  var latestIndex = instructionStructure.length;
  // checks if its empty, or if an action block hasnt been executed on this execution step - i.e for/if blocks have no action so do not add to instruction structure
  if (latestIndex == 0 || instructionUpdateCounter == latestIndex) {
    setTimeout(function () {
      updateHTML(); enableStepIfNotRunOrEnd(); if (completed) {
        displayLevelCompletionModal(); enableAllButtonStates();
      }
    }, 800);
    return true;
  }
  // action block was added, so update counter accordingly
  instructionUpdateCounter += (latestIndex - instructionUpdateCounter);
  var instruction = instructionStructure[latestIndex - 1];
  switch (returnKeyValue(instruction, 0)) {

    case "select_hand_position":
      // index of hand      
      var index = findIndexInState(returnKeyValue(instruction, 1));
      var destinationColumn = parseInt(returnKeyValue(instruction, 2));
      // value of hand
      if (destinationColumn < 0 || destinationColumn >= state[0].length) {
        alert(returnKeyValue(instruction, 1) + ' went off the shelf! cant be having that! try again');
        reset();
        updateErrorArea(returnKeyValue(instruction, 1) + ' went off the shelf! cant be having that! try again');
        runButton.innerText = "play_arrow";
        enableButtonState(stepButton);
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
        animateMove('1' + index[1], '1' + destinationColumn, 'book', '', false);
      }
      animateMove('0' + index[1], '0' + destinationColumn, 'hand', tempHand, true);
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
      // if (state[2][index[1]] !== '' && bookBelowHand(index)) {
      if (bookBelowHand(index)) {
        alert('Your ' + returnKeyValue(instruction, 1) + ' is already full, place the book before you try and grab a new one');
        reset();
        updateErrorArea('Your ' + returnKeyValue(instruction, 1) + ' was already full, place the book before you try and grab a new one');
        runButton.innerText = "play_arrow";
        enableButtonState(stepButton);
        return false;
      }
      // temp[0] will be the book id e.g. book1
      // the index its moving from is lowest row (so 2 as index) and the column of the hand specified
      // index its moving to is the same column but the middle row (so index 1)
      pushBookUpdate(temp[0], [2, index[1]], [1, index[1]]);
      animateMove('2' + index[1], '1' + index[1], 'book', '', true);
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
        alert('Tried to place book in an index thats already occupied');
        reset();
        updateErrorArea('Tried to place book in an index thats already occupied');
        runButton.innerText = "play_arrow";
        enableButtonState(stepButton);
        return false;
      }
      // gets value of book, providing its holding one
      var temp = state[1][index[1]];

      // temp[0] will be the book id e.g. book1
      // the index its moving from is middle row (so 1 as index) and the column of the hand specified
      // index its moving to is the same column but the lowest row (so index 2)
      pushBookUpdate(temp[0], [1, index[1]], [2, index[1]]);
      animateMove('1' + index[1], '2' + index[1], 'book', '', true);
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

      animateSwap(indexFirstSwapper, indexSecondSwapper, leftBookIndex, rightBookIndex, tempFirstSwapper, tempSecondSwapper);
      // raise books
      pushBookUpdate(tempLeftBook[0], [2, leftBookIndex[1]], [1, leftBookIndex[1]]);
      pushBookUpdate(tempRightBook[0], [2, rightBookIndex[1]], [1, rightBookIndex[1]]);
      clearStateCell(2, leftBookIndex[1]);
      clearStateCell(2, rightBookIndex[1]);
      setStateCell(1, leftBookIndex[1], tempLeftBook);
      setStateCell(1, rightBookIndex[1], tempRightBook);


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


      // lower books
      // setTimeout(function () {
      // remember, left hand index now corresponds to right book, and vice versa
      pushBookUpdate(tempRightBook[0], [1, leftBookIndex[1]], [2, leftBookIndex[1]]);
      pushBookUpdate(tempLeftBook[0], [1, rightBookIndex[1]], [2, rightBookIndex[1]]);
      clearStateCell(1, leftBookIndex[1]);
      clearStateCell(1, rightBookIndex[1]);
      setStateCell(2, leftBookIndex[1], tempRightBook);
      setStateCell(2, rightBookIndex[1], tempLeftBook);


      // swap hands back           
      clearStateCell(indexSecondSwapper[0], indexSecondSwapper[1]);
      clearStateCell(indexFirstSwapper[0], indexFirstSwapper[1]);
      setStateCell(indexFirstSwapper[0], indexFirstSwapper[1], tempFirstSwapper);
      setStateCell(indexSecondSwapper[0], indexSecondSwapper[1], tempSecondSwapper);


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

      // setTimeout(function () { updateHTML(); enableStepIfNotRunOrEnd(); }, 1500);
      break;

    case "move_hand":

      console.log('move state start');
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
        alert(tempHand[0] + ' went off the shelf!');
        reset();
        updateErrorArea(tempHand[0] + ' went off the shelf!');
        runButton.innerText = "play_arrow";
        enableButtonState(stepButton);
        return false;
      }
      // animate hand move


      // if a book is below the hand (grabbed currently) move it along with the hand
      if (bookBelowHand(index)) {
        animateMove('1' + index[1], '1' + (index[1] + directionIndex), 'book', '', false);
        // get value of book
        var tempBook = state[1][index[1]];
        // push book update
        pushBookUpdate(tempBook[0], [1, index[1]], [1, index[1] + directionIndex]);

        // clear old book cell, middle row (as it has to be grabbed), column of hand
        clearStateCell(1, index[1]);
        // set new book cell, middle row as still grabbed, column specified in instruction
        setStateCell(1, index[1] + directionIndex, tempBook);
      }
      animateMove('0' + index[1], '0' + (index[1] + directionIndex), 'hand', tempHand, true);

      // clear old state cell of hand
      clearStateCell(index[0], index[1], tempHand[0]);
      // set new state cell, with the addition of the directionIndex for column index
      if (state[0][index[1] + directionIndex] !== '') {
        appendStateCell(0, index[1] + directionIndex, tempHand);
      } else {
        setStateCell(0, index[1] + directionIndex, tempHand);
      }

      // timeout to update html after animations have finished
      // also renables stepbutton
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

        animateIf('2' + leftBookIndex[1], '2' + rightBookIndex[1]);
        // raise books up statewise
        pushBookUpdate(leftBook[0], [2, leftBookIndex[1]], [1, leftBookIndex[1]]);
        pushBookUpdate(rightBook[0], [2, rightBookIndex[1]], [1, rightBookIndex[1]]);
        clearStateCell(2, leftBookIndex[1], '');
        clearStateCell(2, rightBookIndex[1], '');
        setStateCell(1, leftBookIndex[1], leftBook);
        setStateCell(1, rightBookIndex[1], rightBook);
        // then lower again
        pushBookUpdate(leftBook[0], [1, leftBookIndex[1]], [2, leftBookIndex[1]]);
        pushBookUpdate(rightBook[0], [1, rightBookIndex[1]], [2, rightBookIndex[1]]);
        clearStateCell(1, leftBookIndex[1], '');
        clearStateCell(1, rightBookIndex[1], '');
        setStateCell(2, leftBookIndex[1], leftBook);
        setStateCell(2, rightBookIndex[1], rightBook);

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

        // timeout to update html after animations have finished
        // also renables stepbutton

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
      break;

    default:
      setTimeout(function () {
        enableStepIfNotRunOrEnd(); if (completed) {
          displayLevelCompletionModal(); enableAllButtonStates();
        }
      }, 500);
  }




  //  NOT USED - QUICK SORT
  // case "partition_array":
  //   // does it hoares way
  //   // but as we just need it to return the index of the pivot variable, it doesnt matter
  //   var left = parseInt(returnKeyValue(instruction, 1));
  //   var right = parseInt(returnKeyValue(instruction, 2));
  //   var currentArray = getArrayBookValues(left, right);

  //   // only push book update if being called directly from partition block
  //   // else dont as only need to check quicksort input
  //   if (returnKeyValue(instruction, 3) === 'true') {
  //     pushBookUpdate("partition_array", [left, left], [right, right]);
  //   }

  //   var pivot = currentArray[currentArray.length - 1]; // last element -  pre determined as lumotos always uses far right
  //   var i = left;
  //   // i = right hand
  //   // j = left hand
  //   // pivot = pivot
  //   /*The logic under Lomuto is, we start from the leftmost element and keep track of index of smaller (or equal to) elements as j. 
  //   While traversing, if we find a smaller element, we swap current element with arr[j]. Otherwise we ignore current element.*/
  //   // initilaize the hands by moving them to the begining of array/section for partitioning
  //   updateStateHTMLMove('Right Hand', left, findIndexInState('Right Hand')[1]);
  //   updateStateHTMLMove('Left Hand', left, findIndexInState('Left Hand')[1]);
  //   updateStateHTMLMove('Pivot', right, findIndexInState('Pivot')[1]);
  //   for (var j = left; j < right; j++) {
  //     // move left hand to new position due to j increasing
  //     updateStateHTMLMove('Left Hand', j, findIndexInState('Left Hand')[1]);
  //     // call this to update html for an if comparison
  //     updateStateHTMLIf('Left Hand', j, 'Pivot', right);
  //     if (getBookValue(state[2][j][0], 'height') <= pivot) {
  //       updateStateHTMLSwap('Right Hand', i, 'Left Hand', j);
  //       i++;
  //       // update right hand to new position as i has been increased
  //       updateStateHTMLMove('Right Hand', i, findIndexInState('Right Hand')[1]);
  //     }
  //   }
  //   updateStateHTMLSwap('Right Hand', i, 'Pivot', right);
  //   // return position of the pivot once its been properly positioned
  //   break;


  // case 'quick_sort_structure':
  //   var error = indexParamOutOfBounds(instruction)
  //   if (error !== '') {
  //     alert(error);
  //     reset();
  //     return false;
  //   }
  //   // from: [0][left]  to: [0][right] 
  //   pushBookUpdate('quick_sort_structure', [0, parseInt(returnKeyValue(instruction, 1))], [0, parseInt(returnKeyValue(instruction, 2))]);
  //   break;


  // case 'quick_sort':
  //   var error = indexParamOutOfBounds(instruction)
  //   if (error !== '') {
  //     alert(error);
  //     reset();
  //     return false;
  //   }
  //   // from: is [0][left/start] and to: is [0][right/end]
  //   pushBookUpdate('book77', [0, parseInt(returnKeyValue(instruction, 1))], [0, parseInt(returnKeyValue(instruction, 2))]);
  //   break;


  // case 'conditional_quick':
  //   var correct;
  //   if (returnKeyValue(instruction, 1) === 'Less') {
  //     if (parseInt(returnKeyValue(instruction, 2)) < parseInt(returnKeyValue(instruction, 3))) {
  //       correct = 1;
  //     }
  //   } else if (returnKeyValue(instruction, 1) === 'Greater') {
  //     if (parseInt(returnKeyValue(instruction, 2)) > parseInt(returnKeyValue(instruction, 3))) {
  //       correct = 1;
  //     }
  //   } else {
  //     operator = 0;
  //   }
  //   // so if its correct for < and >  - the only two accepted in last level, correct is 1 else its 0
  //   pushBookUpdate('conditional_quick', [0, 0], [correct, correct]);
  //   break;



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

// quick sort stuff
// function updateStateHTMLMove(moverId, newIndexColumn, currentIndexColumn) {
//   // gets index of specified objects position
//   var index = [0, currentIndexColumn];
//   var newIndex = [0, newIndexColumn];
//   // gets value of object specified for move
//   var tempMover = returnObjectStateData(moverId);
//   // check to for erronous movements off the shelf
//   if (newIndex[1] < 0 || newIndex[1] >= state[0].length) {
//     alert('Something went off the shelf! cant be having that! \n try again');
//     reset();
//     return false;
//   }
//   // if a book is below the hand (grabbed currently) move it along with the hand
//   if (bookBelowHand(index)) {
//     // get value of book
//     var tempBook = state[1][index[1]];
//     // clear old book cell, middle row (as it has to be grabbed), column of hand
//     clearStateCell(1, index[1]);
//     // set new book cell, middle row as still grabbed, column specified in instruction
//     setStateCell(1, newIndex, tempBook);
//   }

//   // clear old state cell of hand
//   clearStateCell(index[0], index[1], tempMover[0]);
//   // set new state cell, with the addition of the directionIndex for column index
//   if (state[0][newIndex[1]] !== '') {
//     appendStateCell(0, newIndex[1], tempMover);
//   } else {
//     setStateCell(0, newIndex[1], tempMover);
//   }
//   updateHTML();
// }

// function updateStateHTMLSwap(firstComparerId, firstIndex, secondComparerId, secondIndex) {
//   // same as if a swap_hands block as seen in the updateState() call
//   // no book updates, as this is called in partition array, hence only need to check for partition_array block and its inputs
//   var tempComboFirstSwapper = null;
//   var tempComboSecondSwapper = null;

//   var indexFirstSwapper = [0, firstIndex];
//   var indexSecondSwapper = [0, secondIndex];

//   // check to see if either of the called swapping objects are combination images
//   if (state[indexFirstSwapper[0]][indexFirstSwapper[1]].length > 2) {
//     // retain a temp version of it
//     tempComboFirstSwapper = state[indexFirstSwapper[0]][indexFirstSwapper[1]];
//     // set the state cell to just the one involved in the swap
//     setStateCell(indexFirstSwapper[0], indexFirstSwapper[1], returnObjectStateData(firstComparerId));

//   }
//   if (state[indexSecondSwapper[0]][indexSecondSwapper[1]].length > 2) {
//     tempComboSecondSwapper = state[indexSecondSwapper[0]][indexSecondSwapper[1]];
//     setStateCell(indexSecondSwapper[0], indexSecondSwapper[1], returnObjectStateData(secondComparerId));
//   }

//   var tempFirstSwapper = state[indexFirstSwapper[0]][indexFirstSwapper[1]];
//   var tempSecondSwapper = state[indexSecondSwapper[0]][indexSecondSwapper[1]];
//   var firstBook = state[2][indexFirstSwapper[1]];
//   var secondBook = state[2][indexSecondSwapper[1]];
//   var firstBookIndex = findIndexInState(firstBook[0]);
//   var secondBookIndex = findIndexInState(secondBook[0]);

//   var indexSorted = returnIndexSortedBookPair(firstBook, firstBookIndex, secondBook, secondBookIndex);
//   var tempLeftBook = indexSorted[0][0];
//   var tempRightBook = indexSorted[1][0];
//   var leftBookIndex = indexSorted[0][1];
//   var rightBookIndex = indexSorted[1][1];


//   clearStateCell(2, leftBookIndex[1]);
//   clearStateCell(2, rightBookIndex[1]);
//   setStateCell(1, leftBookIndex[1], tempLeftBook);
//   setStateCell(1, rightBookIndex[1], tempRightBook);
//   updateHTML();

//   clearStateCell(indexFirstSwapper[0], indexFirstSwapper[1]);
//   clearStateCell(indexSecondSwapper[0], indexSecondSwapper[1]);
//   setStateCell(indexSecondSwapper[0], indexSecondSwapper[1], tempFirstSwapper);
//   setStateCell(indexFirstSwapper[0], indexFirstSwapper[1], tempSecondSwapper);

//   clearStateCell(1, leftBookIndex[1]);
//   clearStateCell(1, rightBookIndex[1]);
//   setStateCell(1, rightBookIndex[1], tempLeftBook);
//   setStateCell(1, leftBookIndex[1], tempRightBook);
//   updateHTML();

//   clearStateCell(1, leftBookIndex[1]);
//   clearStateCell(1, rightBookIndex[1]);
//   setStateCell(2, leftBookIndex[1], tempRightBook);
//   setStateCell(2, rightBookIndex[1], tempLeftBook);
//   updateHTML();

//   clearStateCell(indexSecondSwapper[0], indexSecondSwapper[1]);
//   clearStateCell(indexFirstSwapper[0], indexFirstSwapper[1]);
//   setStateCell(indexFirstSwapper[0], indexFirstSwapper[1], tempFirstSwapper);
//   setStateCell(indexSecondSwapper[0], indexSecondSwapper[1], tempSecondSwapper);
//   updateHTML();

//   if (tempComboFirstSwapper != null) {
//     setStateCell(indexFirstSwapper[0], indexFirstSwapper[1], tempComboFirstSwapper);
//   }
//   if (tempComboSecondSwapper != null) {
//     setStateCell(indexSecondSwapper[0], indexSecondSwapper[1], tempComboSecondSwapper);
//   }
//   updateHTML();

// }

// function updateStateHTMLIf(firstComparerId, firstIndex, secondComparerId, secondIndex) {
//   // basically same as if doing a 'if_conditional' block in update state
//   // but without any book update structure pushes, as we only need to check for the partition array and its inputs
//   var tempComboFirst = null;
//   var tempComboSecond = null;

//   var indexFirst = [0, firstIndex];
//   var indexSecond = [0, secondIndex];

//   if (state[indexFirst[0]][indexFirst[1]].length > 2) {
//     // retain a temp version of it
//     tempComboFirst = state[indexFirst[0]][indexFirst[1]];
//     // set the state cell to just the one involved in the swap
//     setStateCell(indexFirst[0], indexFirst[1], returnObjectStateData(firstComparerId));
//   }
//   if (state[indexSecond[0]][indexSecond[1]].length > 2) {
//     tempComboSecond = state[indexSecond[0]][indexSecond[1]];
//     setStateCell(indexSecond[0], indexSecond[1], returnObjectStateData(secondComparerId));
//   }
//   updateHTML();

//   // just for value - if need index then add that into params and build new section¬
//   var tempFirstBook = state[2][indexFirst[1]];
//   var tempSecondBook = state[2][indexSecond[1]];
//   // ADDS BOOK UPDATES L R L R (book wise)
//   // FIND OUT WHICH IS L OR R USING THE FUNCTION BELOW
//   // params are firstbook, firstBookIndex, secondBook, secondBookIndex
//   var indexSorted = returnIndexSortedBookPair(tempFirstBook, indexFirst, tempSecondBook, indexSecond);
//   var leftBook = indexSorted[0][0];
//   var rightBook = indexSorted[1][0];
//   var leftBookIndex = indexSorted[0][1];
//   var rightBookIndex = indexSorted[1][1];

//   // raise books up visually +  statewise + update html
//   clearStateCell(2, leftBookIndex[1], '');
//   clearStateCell(2, rightBookIndex[1], '');
//   setStateCell(1, leftBookIndex[1], leftBook);
//   setStateCell(1, rightBookIndex[1], rightBook);
//   updateHTML();

//   // setTimeout(function () {
//   clearStateCell(1, leftBookIndex[1], '');
//   clearStateCell(1, rightBookIndex[1], '');
//   setStateCell(2, leftBookIndex[1], leftBook);
//   setStateCell(2, rightBookIndex[1], rightBook);
//   updateHTML();
//   // }, 1000);

//   // now check if the swapper indexs were holding combinations
//   // if so, reset them back to the original state values
//   if (tempComboFirst != null) {
//     // set the state cell to just the original
//     setStateCell(indexFirst[0], indexFirst[1], tempComboFirst);
//   }
//   if (tempComboSecond != null) {
//     // set the state cell to just the original
//     setStateCell(indexSecond[0], indexSecond[1], tempComboSecond);
//   }
//   updateHTML();

// }

//  returns a sorted pair of books depending upon which has lower index
//  used because swaps and such have a left book priority in movement
function returnIndexSortedBookPair(firstBook, firstBookIndex, secondBook, secondBookIndex) {
  if (firstBookIndex[1] <= secondBookIndex[1]) {
    return [[firstBook, firstBookIndex], [secondBook, secondBookIndex]];
  } else {
    return [[secondBook, secondBookIndex], [firstBook, firstBookIndex]];
  }
}

//  returns object state data based on ID
function returnObjectStateData(id) {
  switch (id) {
    case 'Left Hand':
      return ['Left Hand', '<img class="hand" src="./media/left_hand.svg" />'];
    case 'Right Hand':
      return ['Right Hand', '<img class="hand" src="./media/right_hand.svg" />'];
    case 'Pivot':
      return ['Pivot', '<img class="hand" src="./media/pivot.svg" />'];
    case 'Pivot Left':
      return ['<img class="hand" src="./media/pivot_left.svg" />'];
    case 'Pivot Right':
      return ['<img class="hand" src="./media/pivot_right.svg" />'];
    case 'Two Hands':
      return ['<img class="" src="./media/two_hands.svg" />'];
    case 'book1':
      return ['book1', '<img class="book" src="./media/book_1.svg" />'];
    case 'book2':
      return ['book2', '<img class="book"   src="./media/book_2.svg" />'];
    case 'book3':
      return ['book3', '<img class="book"  src="./media/book_3.svg" />'];
    case 'book4':
      return ['book4', '<img class="book"   src="./media/book_4.svg" />'];
    case 'book5':
      return ['book5', '<img class="book"   src="./media/book_5.svg" />'];
    case 'book6':
      return ['book6', '<img class="book"  src="./media/book_6.svg" />'];
    case 'book7':
      return ['book7', '<img class="book"  src="./media/book_7.svg" />'];
  }
}

//  append state data to other state data
function appendStateCell(row, column, data) {
  state[row][column].push.apply(state[row][column], data);
}

// returns highlighted image html for each of the three index indicators
function returnHightlightedImage(imageId) {
  switch (imageId) {
    case 'Left Hand':
      return '<img class="hand" src="./media/left_hand_hightlight.svg" />'
    case 'Right Hand':
      return '<img class="hand" src="./media/right_hand_hightlight.svg" />'
    case 'Pivot':
      return '<img class="hand" src="./media/pivot_hightlight.svg" />'
  }
}

// updates the HTML table based upon the state values
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

//  gets HTML image based upon the state data
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
                return '<img class="" src="./media/two_hands.svg" />';
              case 'Pivot':
                return '<img class="hand" src="./media/pivot_left.svg" />';
            }
          case 'Pivot':
            switch (idArray[1]) {
              case 'Left Hand':
                return '<img class="hand" src="./media/pivot_left.svg" />';
              case 'Right Hand':
                return '<img class="hand" src="./media/pivot_right.svg" />';
            }
          case 'Right Hand':
            switch (idArray[1]) {
              case 'Left Hand':
                return '<img class="" src="./media/two_hands.svg" />';
              case 'Pivot':
                return '<img class="hand" src="./media/pivot_right.svg" />';
            }
        }
      case 3:
        return '<img class="hand" src="./media/pivot_two.svg" />';
    }
  }
  alert('couldnt find image for the state data: ' + stateData);
}

//  returns the Id in the given state cell data
function extractIdsFromStateData(stateData) {
  var idArray = [];
  for (var a = 0; a < stateData.length; a += 2) {
    idArray.push(stateData[a]);
  }
  return idArray;
}

//  called upon start to setup the level
function setupOnStart(lvl) {
  setupState(lvl);
  updateHTML();
  resetErrorArea();
  if (lvl == 0) {
    tutorialStart();
  }
}

//  inserts the levels instruction text based upon level code param
function insertLevelInstructions(lvl) {
  switch (lvl) {
    case 0:
      levelInstructionArea.innerHTML = '<h4><h4>';
      break;

    case 1:
      levelInstructionArea.innerHTML = '<h4>Activate the blocks to Grab and then Place the book</h4>';
      break;

    case 2:
      levelInstructionArea.innerHTML = '<h4>Move the book from index 0 to index 1</h4>';
      break;

    case 3:
      levelInstructionArea.innerHTML = '<h4>Grab and Swap the books<h4>';
      break;

    case 4:
      levelInstructionArea.innerHTML = '<h4>Compare the books</h4>'
        + '<h4>If the left is smaller than the right, Swap them</h4>';
      break;

    case 5:
      levelInstructionArea.innerHTML = '<h4>Move the left hand to the book</h4>'
        + '<h4>Then grab it<h4>';
      break;

    case 6:
      levelInstructionArea.innerHTML = '<h4>Move the book to the end of the shelf</h4>'
        + '<h4>Then place the book</h4>';
      break;

    case 7:
      levelInstructionArea.innerHTML = '<h4>Move along the shelf using the loop and hand movements</h4>'
        + '<h4>Use the IF block to pick the book up when the hand is above it</h4>';
      break;

    case 8:
      levelInstructionArea.innerHTML = '<h4>Move along, pick the book up, and then place it at the end of the shelf<h4>';
      break;

    case 9:
      levelInstructionArea.innerHTML = '<h4>Move along the shelf<h4>'
        + '<h4>Compare neighbouring books.<h4>'
        + '<h4>Swap books if they are out of order<h4>';
      break;

    case 10:
      levelInstructionArea.innerHTML = '<h4>Same as before<h4>'
        + '<h4>But stop the loop once a swap is made<h4>';
      break;

    case 11:
      levelInstructionArea.innerHTML = '<h4>Swap all neighbouring books precisely twice<h4>'
        + '<h4>Use nested loops!<h4>';
      break;

    case 12:
      levelInstructionArea.innerHTML = '<h4>Grab the book and move it to the end one space at a time<h4>'
        + '<h4>Then reset the hand to the start<h4>';
      break;

    case 13:
      levelInstructionArea.innerHTML = '<h4>Compare neighbouring books, move the larger book to the right side<h4>';
      break;

    case 14:
      levelInstructionArea.innerHTML = '<h4>Bubble a book, reset, repeat until no swaps are made<h4>'
        + '<h4>include all indexs in each bubble iteration<h4>';
      break;

    case 15:
      levelInstructionArea.innerHTML = '<h4>Bubble a book, reset, repeat for however many books<h4>'
        + '<h4>Ignore already bubbled books in following bubble iterations<h4>';
      break;

  }
}

//  called upon the start of the tutorial level
//  adds the  popovers to the html elements
function tutorialStart() {
  highlightBlock('O-]-)fC6=}vpAj7cr+]q');
  variableDisplayArea.innerHTML = '<div class="col-sm-auto text-center varPadding"><h3>Variables:</h3><h3>Example Variable = 77</h3></div>';
  $('#blocklyDiv').popover({ content: getPopContent('blocklyDiv') });
  $('#homeButton').popover({ content: getPopContent('homeButton') });
  $('#runButton').popover({ content: getPopContent('runButton') });
  $('#stepButton').popover({ content: getPopContent('stepButton') });
  $('#resetButton').popover({ content: getPopContent('resetButton') });
  $('#previousButton').popover({ content: getPopContent('previousButton') });
  $('#nextButton').popover({ content: getPopContent('nextButton') });
  $('#helpButton ').popover({ content: getPopContent('helpButton') });
  $('#usernameSlot').popover({ content: getPopContent('usernameSlotn') });
  $('#handRow').popover({ content: getPopContent('handRow') });
  $('#bookRow').popover({ content: getPopContent('bookRow') });
  $('#indexDisplay').popover({ content: getPopContent('indexDisplay') });
  $('#variableDisplayArea').popover({ content: getPopContent('variableDisplayArea') });
  $('#checklistArea').popover({ content: getPopContent('checklistArea') });
  $('#errorArea').popover({ content: getPopContent('errorArea') });
  $('#errorHighlightButton').popover({ content: getPopContent('errorHighlightButton') });
  // show first to set off the chain
  $('#blocklyDiv').popover('show');

}

//  inserts text into the element popovers
function getPopContent(btnId) {
  var textContent = '<div class="media">';
  switch (btnId) {

    case 'blocklyDiv':
      var buttonToAdd = '<button class="btn btn-secondary allowInteraction font" onclick="progressTutorial(0)"><h4>Next</h4></button></div>';
      textContent = textContent.concat('<h2>Workspace</h2>'
        + '<h3>Toolbox on the left contains action blocks</h3><h3>Place the blocks in this workspace to build your action structure</h3>');
      return (textContent + buttonToAdd);

    case 'runButton':
      var buttonToAdd = '<button class="btn btn-secondary allowInteraction font" onclick="progressTutorial(1)"><h4>Next</h4></button></div>';
      textContent = textContent.concat('<h3>Press to activate your action structure automatically</h3>' +
        '<h3>Press again to pause</h3>');
      return (textContent + buttonToAdd);

    case 'stepButton':
      var buttonToAdd = '<button class="btn btn-secondary allowInteraction font" onclick="progressTutorial(2)"><h4>Next</h4></button></div>';
      textContent = textContent.concat('<h3>Press to activate only the next block</h3>');
      return (textContent + buttonToAdd);

    case 'resetButton':
      var buttonToAdd = '<button class="btn btn-secondary allowInteraction font" onclick="progressTutorial(3)"><h4>Next</h4></button></div>';
      textContent = textContent.concat('<h3>Press to reset the shelf</h3>' + '<h3>Your blocks will not be removed</h3>');
      return (textContent + buttonToAdd);

    case 'previousButton':
      var buttonToAdd = '<button class="btn btn-secondary allowInteraction font" onclick="progressTutorial(4)"><h4>Next</h4></button></div>';
      textContent = textContent.concat('<h3>Previous Level</h3>');
      return (textContent + buttonToAdd);

    case 'nextButton':
      var buttonToAdd = '<button class="btn btn-secondary allowInteraction font" onclick="progressTutorial(5)"><h4>Next</h4></button></div>';
      textContent = textContent.concat('<h3>Next Level</h3>');
      return (textContent + buttonToAdd);

    case 'handRow':
      var buttonToAdd = '<button class="btn btn-secondary allowInteraction font" onclick="progressTutorial(6)"><h4>Next</h4></button></div>';
      textContent = textContent.concat('<h3>Hands are used to move the books</h3>' + '<h3>Books are stored on the bookshelf</h3>');
      return (textContent + buttonToAdd);

    case 'variableDisplayArea':
      var buttonToAdd = '<button class="btn btn-secondary allowInteraction font" onclick="progressTutorial(7)"><h4>Next</h4></button></div>';
      textContent = textContent.concat('<h3>Variable values will be displayed here</h3>');
      return (textContent + buttonToAdd);

    case 'checklistArea':
      var buttonToAdd = '<button class="btn btn-secondary allowInteraction font" onclick="progressTutorial(8)"><h4>Next</h4></button></div>';
      textContent = textContent.concat('<h3>You must include any blocks shown here in your structure</h3>');
      return (textContent + buttonToAdd);

    case 'errorArea':
      var buttonToAdd = '<button class="btn btn-secondary allowInteraction font" onclick="progressTutorial(9)"><h4>Next</h4></button></div>';
      textContent = textContent.concat('<h3>Errors will be displayed here</h3>');
      return (textContent + buttonToAdd);

    case 'errorHighlightButton':
      var buttonToAdd = '<button class="btn btn-secondary allowInteraction font" onclick="progressTutorial(10)"><h4>Next</h4></button></div>';
      textContent = textContent.concat('<h3>This button highlights the block that caused the latest error</h3>');
      return (textContent + buttonToAdd);

  }
}

//  processes button click chain used in tutorial to navigate through popovers
function progressTutorial(buttonId) {
  console.log(buttonId);
  switch (buttonId) {
    case 0:
      $('#blocklyDiv').popover('hide');
      $('#runButton').popover('show');
      break;

    case 1:
      $('#runButton').popover('hide');
      $('#stepButton').popover('show');
      break;

    case 2:
      $('#stepButton').popover('hide');
      $('#resetButton').popover('show');
      break;

    case 3:
      $('#resetButton').popover('hide');
      $('#previousButton').popover('show');
      break;

    case 4:
      $('#previousButton').popover('hide');
      $('#nextButton').popover('show');
      break;

    case 5:
      $('#nextButton').popover('hide');
      $('#handRow').popover('show');
      break;

    case 6:
      $('#handRow').popover('hide');
      $('#variableDisplayArea').popover('show');
      break;

    case 7:
      $('#variableDisplayArea').popover('hide');
      $('#checklistArea').popover('show');
      break;

    case 8:
      $('#checklistArea').popover('hide');
      $('#errorArea').popover('show');
      break;

    case 9:
      $('#errorArea').popover('hide');
      $('#errorHighlightButton').popover('show');
      break;

    case 10:
      $('#errorHighlightButton').popover('hide');
      displayLevelCompletionModal();
      break;
  }
}

//  displays help modal
function displayHelpModal(lvl) {
  $('#helpModal').modal('toggle');
}
function displayLevelCompletionModal() {
  $('#completionModal').modal('toggle');
}
//  enables the button to move to next level
function enableNextLevelButton() {
  enableButtonState(nextButton);
}

//  changes current page
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

//  get height value based on specified book ID
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

//  returns level code based on html page address
function getLevelCodeFromHTML() {
  var fileName = location.href.split("/").slice(-1);
  return numberObject = Number(fileName[0].match(/\d+/g));

}

//  called upon page load, sets up the page
function onLoad() {
  levelCode = getLevelCodeFromHTML();
  if (levelCode !== 0) {
    insertModalContent(levelCode);
    displayHelpModal(levelCode);
  }
  generateCodeAndLoadIntoInterpreter();
  setupOnStart(levelCode);
  insertLevelInstructions(levelCode);
  insertChecklist();
  nextLevelButtonDetermine();
  variableDisplayArea.innerHTML = '<h3 class="fontOverride">Variables:</h3>';
}
onLoad();

//  LISTENERS
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
  disableButtonState(runButton);

  setTimeout(function () { enableButtonState(runButton) }, 1000);
  runCode(levelCode);
})
stepButton.addEventListener('click', function () {
  disableButtonState(stepButton);
  console.log('button pressed');
  stepExecution(levelCode);
  if (!myInterpreter) { enableButtonState(stepButton) }
})

resetButton.addEventListener('click', function () {
  reset('hard');
})
helpButton.addEventListener('click', function () {
  insertModalContent('options');
  displayHelpModal();
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

//  determines whether to enable the Next Level button based on user progression
function nextLevelButtonDetermine() {

  disableButtonState(nextButton);
  var levelProgression = Number(getCookie('levelProgression'));
  console.log(levelProgression);
  var currentLevel = getLevelCodeFromHTML();
  console.log(currentLevel);
  if (levelProgression > currentLevel) {
    enableNextLevelButton();
  }
}

//  QUICK SORT- UNUSED
// function partitionArray(l, r, pushInstructionToggle) {

//   var left = parseInt(l);
//   var right = parseInt(r);

//   // does lomutos way
//   // partitions a tempoary array taken from the states current values when executed
//   // doesnt change the state, merely used to push an instruction that later will in updateState()
//   // in addition to calculating the final partition index for use in the quicksort structure -  which is returned (i)

//   // give instruction toggle
//   // dictates whether called from block directly or inside quick sort function
//   // true being directly
//   pushInstruction('partition_array', [left, right, pushInstructionToggle]);

//   // gets array of current book values from the state
//   var array = getArrayBookValues(left, right);
//   // Lomuto algorithm always uses the last element, array[right], for the pivot.
//   var pivot = right;
//   var i = left;

//   /*The logic under Lomuto is, we start from the leftmost element and keep track of index of smaller (or equal to) elements as j. While traversing, if we find a smaller element, we swap current element with arr[j]. Otherwise we ignore current element.*/
//   for (var j = left; j < right; j++) {
//     if (array[j] <= array[pivot]) {
//       swap(array, i, j);
//       i++
//     }
//   }
//   swap(array, i, j);
//   return i;
// }
// function swap(array, i, j) {
//   var temp = array[i];
//   array[i] = array[j];
//   array[j] = temp;
// }

function getArrayBookValues(start, end) {
  let array = []
  for (var a = start; a <= end; a++) {
    array.push(getBookValue(state[2][a][0], 'height'));
  }
  return array;
}

//  QUICK SORT -  UNUUSED
// function quickSort(l, r, pushInstructionToggle, direction) {
//   console.log(l + '  ' + r + '   ' + direction);
//   console.log(state[2]);
//   let left = parseInt(l);
//   let right = parseInt(r);
//   if (left < right) {
//     pi = partitionArray(left, right, false);
//     updateState();
//     updateHTML();
//     var leftPi = pi - 1;
//     var rightPi = pi + 1;
//     quickSort(left, leftPi, 'false', 'left');
//     quickSort(rightPi, right, 'false', 'right');
//   }
//   if (pushInstructionToggle === 'true') {
//     pushInstruction('quick_sort', [left, right]);
//   }
// }

//  inserts content into help modal
function insertLevelHelp(helpLevelCode, optionBool) {
  debugger;
  helpModalBody.innerHTML = '';
  switch (helpLevelCode) {

    case 1:
      helpModalTitle.innerText = 'Level One - Grab and Place';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-12">'
        + '<h3>Now you will be asked to simply activate a few blocks by using the buttons you just learned about!</h3>'
        + '</div><hr />';
      break;

    case 2:
      helpModalTitle.innerText = 'Level Two';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/select_hand_position.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Moves hand to chosen index</h3></div>'
        + '</div><hr />';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/grab_book.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Grabs books so you can move them</h3></div>'
        + '</div><hr />';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/place_book.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Places any books held in the chosen hand</div>'
        + '</div>';
      break;

    case 3:
      helpModalTitle.innerText = 'Level Three - Swapping';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/swap.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Both Grabs and Swaps the books below each hand/h3>'
        + '</div><hr />';
      break;

    case 4:
      helpModalTitle.innerText = 'Level Four - Conditionals';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImageSmall" src="./media/if.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>-IF- Block</h3><h3>Blocks placed inside will only activate if its input is True</h3></div>'
        + '</div><hr />';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/if_conditional.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Grabs and Compares books below the hands, outputs True or False</h3></div>'
        + '</div><hr />';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/if_options.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Blocks held inside Else sections will activate if the input is False</h3></div>';
      break;

    case 5:
      helpModalTitle.innerText = 'Level Five - Moving Without Indexing';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/move_hand.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Moves hand one space left or right</h3></div>'
      break;

    case 6:
      helpModalTitle.innerText = 'Level Six - Loooops';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImageBig" src="./media/for_loop.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Will repeatedly activate the blocks inside until its variable(e.g. i) reaches the second value</h3>'
        + '<h3>Note: If the variable does not already exist, then it will be created</h3></div>'
      break;

    case 7:
      helpModalTitle.innerText = 'Level Seven - Combining Everything';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-12">'
        + '<h3>In this level you are required to combine what you have learnt so far</h3>'
        + '</div></div><hr />';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/logic_conditional.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Ouputs a True or False value</h3></div>'
      break;

    case 8:
      helpModalTitle.innerText = 'Level Eight- While Loop';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/while_loop.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Will repeatedly activate blocks inside till its input is False</h3>'
        + '<h3>Use a variable and a Logic Comparison block to get True and False inputs</h3></div>'
        + '</div><hr />';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/set_var.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Set the variables value</h3></div>'
        + '</div><hr />';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/change_var.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Change the variables value by the amount given</h3></div>';
      break;

    case 9:
      helpModalTitle.innerText = 'Level Nine - While & Swap';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<h3>Using the while loop go along the shelf with both hands, comparing neighbouring books as you do so</h3>'
        + '<h3>If you reach any that are out of order, swap them!</h3></div>'
        + '</div';
      break;

    case 10:
      helpModalTitle.innerText = 'Level Ten - While & Swap (using booleans)';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/logic_boolean.png"/></div>'
        + '<div class="col-sm-6">'
        + '<h3>Booleans have either a value of True or False</h3></div><hr />';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/set_var_boolean.png"/></div>'
        + '<div class="col-sm-6">'
        + '<h3>You can use the boolean block to assign a True or False value to a variable</h3></div>';
      break;

    case 11:
      helpModalTitle.innerText = 'Level Eleven - Nested Loop';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImageBig" src="./media/nested.png"/><h3>This will move the hand four times - twice for each inner loop activation, which itself gets activated twice</h3></div>'
        + '<div class="col-sm-6">'
        + '<h3>Putting one loop inside of another is called a Nested loop</h3>'
        + '<h3>The inner loop will fully activate the blocks inside for each activation of the outter loop</h3></div>'
        + '</div>';
      break;

    case 12:
      helpModalTitle.innerText = 'Level Twelve - Iterative Approach';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/reload.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Many sorting algorithms require you to go over the shelf multiple times</h3>'
        + '<h3>Use the different hand movements to do a full iteration and return to the start</h3></div>'
        + '</div>';
      break;


    case 13:
      helpModalTitle.innerText = 'Level Thirteen - Bubble a book';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImageSmall" src="./media/bubble_1.png"/><br>'
        + '<img class="blockImageSmall" src="./media/bubble_2.png"/><br>'
        + '<img class="blockImageSmall" src="./media/bubble_3.png"/></div>'
        + '<div class="col-sm-6">'
        + '<h3>Bubbling an element is the basis upon which the Bubble sort is built</h3>'
        + '<h3>You have already done most of this so far!</h3>'
        + '<h3>Compare neighbours, swap if they are out of order, then move onto next neighbouring pair and repeat</h3></div>'
        + '</div>';
      break;

    case 14:
      helpModalTitle.innerText = 'Level Fourteen - Non-Optimized Bubble Sort';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/bubbles.png"/></div>'
        + '<div class="col-sm-6">'
        + '<h3>Non-optimized Bubble sort</h3>'
        + '<h3>Compare neightbours, swap if out of order, then move onto the next pair and repeat</h3>'
        + '<h3>Non-optimized version of bubble sort requires you to go through the whole shelf on each iteration, without skipping any books</h3>'
        + '<h3>Remember to reset the hands to the start at the end of each iteration!</h3></div>'
        + '</div>';
      break;

    case 15:
      helpModalTitle.innerText = 'Level Fifthteen - Optimized Bubble Sort';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/bubbles.png"/> </div>'
        + '<div class="col-sm-6">'
        + '<h3>Optimized version of bubble sort</h3><h3>Once an element has been bubbled, its index can be ignored in the next iteration.</h3>'
        + '<h3>Because of this, less comparisons are made, and as a result it is faster!</h3></div>'
        + '</div>';
      break;
  }

  // only executes if called from help button options
  if (optionBool) {
    helpModalButton.removeAttribute('data-dismiss');
    helpModalButton.setAttribute('onClick', 'insertModalContent("options")');
  }

}

//  inserts help button modal contents
function insertModalContent(levelCodeOp) {
  helpModalButton.innerHTML = '<h3>Got it!</h3>';
  switch (levelCodeOp) {
    case 'options':
      debugger;
      helpModalBody.innerHTML = '';
      helpModalButton.setAttribute('data-dismiss', 'modal');
      helpModalButton.removeAttribute('onClick');
      helpModalTitle.innerText = 'Choose a levels help screen';
      helpModalButton.innerHTML = '<h3>Got it!</h3>';     
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-8">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn0" onclick="insertLevelHelp(' + levelCode + ',true)">Current Level</button></div>'
        + '</div><hr />';
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<h2>Level</h2></div>'
        + '<div class="col-sm-6">'
        + '<h2>Blocks Explained</h2></div>'
        + '</div><hr />';
      // 1      
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn1" onclick="insertLevelHelp(1,true)">Level 1</button></div>'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/grab_book.png"/><img class="blockImage" src="./media/place_book.png"/>'
        + '</div></div><hr />';
      // 2
      helpModalBody.innerHTML += '<div class = "row helpRow" >'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn2" onclick="insertLevelHelp(2,true)">Level 2</button></div>'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/select_hand_position.png"/>'
        + '</div></div><hr />';
      // 3
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn3" onclick="insertLevelHelp(3,true)">Level 3</button></div>'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/swap.png"/>'
        + '</div></div><hr />';
      // 4
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn4" onclick="insertLevelHelp(4,true)">Level 4</button></div>'
        + '<div class="col-sm-6">'
        + '<img class="blockImageSmall" src="./media/if.png"/><img class="blockImage" src="./media/if_conditional.png"/>'
        + '</div></div><hr />';
      // 5
      helpModalBody.innerHTML += '<div class = "row helpRow" >'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn5" onclick="insertLevelHelp(5,true)">Level 5</button></div>'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/move_hand.png"/>'
        + '</div></div><hr />';
      // 6
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn6" onclick="insertLevelHelp(6,true)">Level 6</button></div>'
        + '<div class="col-sm-6">'
        + '<img class="blockImageBig" src="./media/for_loop.png"/>'
        + '</div></div><hr />';
      // 7
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn7" onclick="insertLevelHelp(7,true)">Level 7</button></div>'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/logic_conditional.png"/>'
        + '</div></div><hr />';
      // 8
      helpModalBody.innerHTML += '<div class = "row helpRow" >'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn8" onclick="insertLevelHelp(8,true)">Level 8</button></div>'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/while_loop.png"/><img class="blockImage" src="./media/set_var.png"/><img class="blockImage" src="./media/change_var.png"/>'
        + '</div></div><hr />';
      // 9
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn9" onclick="insertLevelHelp(9,true)">Level 9</button></div>'
        + '<div class="col-sm-6">'
        + '<h3>While Loop and Swapping</h3>'
        + '</div></div><hr />';
      // 10
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn10" onclick="insertLevelHelp(10,true)">Level 10</button></div>'
        + '<div class="col-sm-6">'
        + '<img class="blockImage" src="./media/logic_boolean.png"/><img class="blockImage" src="./media/set_var_boolean.png"/>'       
        + '</div></div><hr />';
      // 11
      helpModalBody.innerHTML += '<div class = "row helpRow" >'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn11" onclick="insertLevelHelp(11,true)">Level 11</button></div>'
        + '<div class="col-sm-6">'
        + '<img class="blockImageBig" src="./media/nested.png"/>'
        + '</div></div><hr />';
      // 12
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn12" onclick="insertLevelHelp(12,true)">Level 12</button></div>'
        + '<div class="col-sm-6">'
        + '<h3>Multiple Iterations</h3>'
        + '</div></div><hr />';
      // 13
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn13" onclick="insertLevelHelp(13,true)">Level 13</button></div>'
        + '<div class="col-sm-6">'
        + '<h3>Bubble one element</h3>'
        + '</div></div><hr />';
      // 14
      helpModalBody.innerHTML += '<div class = "row helpRow" >'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn14" onclick="insertLevelHelp(14,true)">Level 14</button></div>'
        + '<div class="col-sm-6">'
        + '<h3>Non-Optimized Bubble sort</h3>'
        + '</div></div><hr />';
      // 15
      helpModalBody.innerHTML += '<div class = "row helpRow">'
        + '<div class="col-sm-6">'
        + '<button class="btn btn-secondary font helpModalLevelButton" id="helpBtn15" onclick="insertLevelHelp(15,true)">Level 15</button></div>'
        + '<div class="col-sm-6">'
        + '<h3>Optimized bubble Sort</h3>'
        + '</div></div>';

    case 0:
      // completion modal
      completionModalBody.innerHTML += '<h2>Tutorial Complete/h2>'
        + '<h2>Click to move to next level and start your sorting journey.</h2>';
      break;

    case 1:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level One Complete</h2>'
        + '<h2>Now to make your own block structure!</h2>';
      insertLevelHelp(1);
      break;

    case 2:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Two Complete</h2>'
        + '<h2>Good job moving that book, now lets move onto a key basic of sorting.</h2>';
      insertLevelHelp(2);
      break;

    case 3:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Three Complete</h2>'
        + '<h2>You can now swap to your hearts content</h2>';
      insertLevelHelp(3);
      break;

    case 4:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Four Complete</h2>'
        + '<h2>Conditionals are strong and can add variance to your actions!</h2>';
      insertLevelHelp(4);
      break;

    case 5:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Five Complete</h2>'
        + '<h2>You will be using these relative hand movements often</h2>';
      insertLevelHelp(5);
      break;

    case 6:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Six Complete</h2>'
        + '<h2>Loops are another important part of sorting algorithms, you will be asked to implement them in many of the levels to come</h2>';
      insertLevelHelp(6);
      break;

    case 7:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Seven Complete</h2>'
        + '<h2>You are one step closer to building your own book sorting algorithm!</h2>';
      insertLevelHelp(7);
      break;

    case 8:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Eight Complete</h2>';
      + '<h2>While loops are also used often in many sorting algorithims, a few of which you will learn about</h2>';
      insertLevelHelp(8);
      break;

    case 9:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Nine Complete</h2>';
      + '<h2>You are a natural at this!</h2>';
      insertLevelHelp(9);
      break;

    case 10:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Ten Complete</h2>';
      + '<h2>Hint: remember this stuff for the Bubble Sort</h2>';
      insertLevelHelp(10);
      break;

    case 11:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Eleven Complete</h2>';
      + '<h2>Nested loops are not easy to understad, you should be proud of yourself for getting this far!</h2>';
      insertLevelHelp(11);
      break;

    case 12:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Twelve Complete</h2>';
      + '<h2>Keep up the level iteration and you will be a sorting master in no time</h2>';
      insertLevelHelp(12);
      break;


    case 13:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Thirteen Complete</h2>';
      + '<h2>Now to use the bubble function to sort a whole shelf!</h2>';
      insertLevelHelp(13);
      break;

    case 14:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Fourteen Complete</h2>';
      + '<h2>You have nailed the non-optimized version, now lets move onto the improved optimized version</h2>';
      insertLevelHelp(14);
      break;

    case 15:
      // completion modal
      completionModalBody.innerHTML += '<h2>Level Fifthteen Complete</h2>';
      + '<h2>Wooooo! you sorting god, now to go onto even greater heights</h2>';
      insertLevelHelp(15);
      break;
  }
}

//  inserts the required blocks into the checlist area
function insertChecklist() {
  checklistArea.innerHTML = '<h3 class="fontOverride">Blocks to Include:</h3>'
  switch (levelCode) {
    case 1:
      requiredBlocks = [{ id: 'grab_book', used: false },
      { id: 'place_book', used: false }];
      break;
    case 2:
      requiredBlocks = [{ id: 'grab_book', used: false },
      { id: 'place_book', used: false }];
      break;
    case 3:
      requiredBlocks = [{ id: 'swap_books', used: false }];
      break;
    case 4:
      requiredBlocks = [{ id: 'controls_if', used: false },
      { id: 'conditionalBlockExecution', used: false }];
      break;
    case 6:
      requiredBlocks = [{ id: 'for_loop', used: false }];
      break;
    case 7:
      requiredBlocks = [{ id: 'for_loop', used: false },
      { id: 'controls_if', used: false }];
      break;
    case 8:
      requiredBlocks = [{ id: 'controls_whileUntil', used: false },
      { id: 'controls_if', used: false }];
      break;
    case 9:
      requiredBlocks = [{ id: 'controls_whileUntil', used: false },
      { id: 'controls_if', used: false },
      { id: 'conditionalBlockExecution', used: false }];
      break;
    case 10:
      requiredBlocks = [{ id: 'controls_whileUntil', used: false },
      { id: 'controls_if', used: false },
      { id: 'conditionalBlockExecution', used: false }];
      break;
    case 11:
      requiredBlocks = [{ id: 'controls_whileUntil', used: false },
      { id: 'for_loop', used: false },
      { id: 'controls_if', used: false }];
      break;
    case 12:
      requiredBlocks = [{ id: 'for_loop', used: false },
      { id: 'select_hand_position', used: false },
      { id: 'move_hand', used: false },];
      break;
    case 13:
      requiredBlocks = [{ id: 'for_loop', used: false },
      { id: 'controls_if', used: false },
      { id: 'conditionalBlockExecution', used: false }];
      break;
    case 14:
      requiredBlocks = [{ id: 'for_loop', used: false },
      { id: 'controls_whileUntil', used: false },
      { id: 'controls_if', used: false },
      { id: 'conditionalBlockExecution', used: false }];
      break;
    case 15:
      requiredBlocks = [{ id: 'for_loop', used: false },
      { id: 'controls_if', used: false },
      { id: 'conditionalBlockExecution', used: false }];
      break;
  }
  // if nothing to check return
  if (requiredBlocks.length == 0) {
    checklistArea.innerHTML += '<h4>Anything you want!</h4>';
    return;
  }

  // if checks, insert them
  for (a = 0; a < requiredBlocks.length; a++) {
    // should create a h element with unique id - used to change colour
    checklistArea.innerHTML += '<h4 class="requirementNotMet" id="checkBlock' + a + '">' + idToChecklistName(returnKeyValue(requiredBlocks[a], 0)) + '</h4>';
  }
}

function idToChecklistName(id) {
  switch (id) {
    case 'for_loop':
      return 'For/Count Loop';
    case 'controls_if':
      return 'If Conditional';
    case 'conditionalBlockExecution':
      return 'Conditional Input'
    case 'controls_whileUntil':
      return 'While Loop';
    case 'select_hand_position':
      return 'Index Move Hand';
    case 'move_hand':
      return 'Relative Move Hand';
    case 'swap_books':
      return 'Swap Books';
    case 'grab_book':
      return 'Grab Book';
    case 'place_book':
      return 'Place Book';
  }
}

function updateRequiredBlocksMet(latestCode) {
  debugger;
  for (var b = 0; b < requiredBlocks.length; b++) {
    if (latestCode.indexOf(returnKeyValue(requiredBlocks[b], 0)) !== -1) {
      requiredBlocks[b].used = true;
      document.getElementById('checkBlock' + b).classList.remove('requirementNotMet');
      document.getElementById('checkBlock' + b).classList.add('requirementMet');
    } else {
      requiredBlocks[b].used = false;
      document.getElementById('checkBlock' + b).classList.remove('requirementMet');
      document.getElementById('checkBlock' + b).classList.add('requirementNotMet');
    }
  }
}

function checkRequiredBlocksAreMet() {
  for (a = 0; a < requiredBlocks.length; a++) {
    if (returnKeyValue(requiredBlocks[a], 1) == false) {
      return false;
    }
  }
  return true;
}

//  gets the image path held in a state cell
function getStateContents(indexRow, indexCol) {
  var content = getHTMLImage(state[indexRow][indexCol]);
  var regexp = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/g;
  var match = regexp.exec(content);
  var src = match[1];
  return src;
}

//  animates an object movement on the HTML table
function animateMove(td1, td2, type, objectMoving, isLast) {

  var cloneObjectClass = null;
  switch (type) {
    case 'book':
      cloneObjectClass = 'cloneBook';
      break;
    case 'hand':
      cloneObjectClass = 'cloneHand';
      break;
  }
  // from
  var $d = $('#td' + td1)
  // to
  var $a = $('#td' + td2)

  var offsetD = $d.offset()
  var offsetA = $a.offset()

  // if hands moving, then need to edit table before clone
  // also need to keep copy of anything remaining to set back once clone moves

  if (objectMoving !== '') {
    var contents = retrieveContents(getStateContents(td1[0], td1[1]), objectMoving);
    table.rows[td1[0]].cells[td1[1]].innerHTML = contents[0];
  }

  var $clone = $('<div>')
    .addClass(cloneObjectClass)
    .append($d.contents())
    .css(offsetD)
    .appendTo('body')
  setClonePosition();

  // set td back as clone will start moving soon
  if (objectMoving !== '') {
    table.rows[td1[0]].cells[td1[1]].innerHTML = contents[1];
  }

  $clone.animate(offsetA, 200, function () {
    $a.empty().append($clone.contents())
    $clone.remove()
    // if last move animation to be called in that specific update of state
    // update html and start timeout to re-enable button
    if (isLast == true) {
      updateHTML();
      console.log('move update');
      setTimeout(function () {
        enableStepIfNotRunOrEnd();
      }, 200);
    }
  })
}

// returns array [toClone, toKeep] in regards to td content
function retrieveContents(contents, object) {

  var img = contents;
  img = img.substring(img.lastIndexOf("/") + 1, img.length);
  // removes file extension
  img = img.substring(0, img.lastIndexOf("."));

  switch (img) {
    case 'left_hand':
      return [returnObjectStateData('Left Hand')[1], ''];
    case 'pivot':
      return [returnObjectStateData('Pivot')[1], ''];
    case 'right_hand':
      return [returnObjectStateData('Right Hand')[1], ''];
    case 'two_hands':
      switch (object[0]) {
        case 'Left Hand':
          return [returnObjectStateData('Left Hand')[1], returnObjectStateData('Right Hand')[1]];
        case 'Right Hand':
          return [returnObjectStateData('Right Hand')[1], returnObjectStateData('Left Hand')[1]];
      }
    case 'pivot_left':
      switch (object[0]) {
        case 'Left Hand':
          return [returnObjectStateData('Left Hand')[1], returnObjectStateData('Pivot')[1]];
        case 'Pivot':
          return [returnObjectStateData('Pivot')[1], returnObjectStateData('Left Hand')[1]];
      }
    case 'pivot_right':
      switch (object[0]) {
        case 'Right Hand':
          return [returnObjectStateData('Right Hand')[1], returnObjectStateData('Pivot')[1]];
        case 'Pivot':
          return [returnObjectStateData('Pivot')[1], returnObjectStateData('Right Hand')[1]];
      }
    case 'pivot_two':
      switch (object[0]) {
        case 'Right Hand':
          return [returnObjectStateData('Right Hand')[1], returnObjectStateData('Pivot Left')[1]];
        case 'Left Hand':
          return [returnObjectStateData('Left Hand')[1], returnObjectStateData('Pivot Right')[1]];
        case 'Pivot':
          return [returnObjectStateData('Pivot')[1], returnObjectStateData('Two Hands')[1]];
      }
      alert('couldnt find image breakdown');
  }
}

//  animates an IF comparison movement 
function animateIf(indexb1, indexb2) {

  var fb = indexb1;
  var sb = indexb2;

  var $fb = $('#td' + fb[0] + fb[1]);
  var $sb = $('#td' + sb[0] + sb[1]);
  var $fbr = $('#td' + '1' + fb[1]);
  var $sbr = $('#td' + '1' + sb[1]);

  var offsetFB = $fb.offset()
  var offsetSB = $sb.offset()
  var offsetFBR = $fbr.offset()
  var offsetSBR = $sbr.offset()

  var $cloneFB = $('<div>')
    .addClass('cloneBook')
    .append($fb.contents())
    .css(offsetFB)
    .appendTo('body')
  var $cloneSB = $('<div>')
    .addClass('cloneBook')
    .append($sb.contents())
    .css(offsetSB)
    .appendTo('body')
  setClonePosition();
  // Raise books
  // DO SECOND FIRST AS IF SAME INDEX IT WONT OVERWRITE THE SPACE WITH ''
  $cloneSB.animate(offsetSBR, 200)
  $cloneFB.animate(offsetFBR, 200, function () {
    // Lower books
    $cloneSB.animate(offsetSB, 200, function () {
      $sb.empty().append($cloneSB.contents())
      $cloneSB.remove()
    })
    $cloneFB.animate(offsetFB, 200, function () {
      $fb.empty().append($cloneFB.contents())
      $cloneFB.remove()
      updateHTML();

      // timeout to update html after animations have finished
      // also renables stepbutton
      setTimeout(function () {
        enableStepIfNotRunOrEnd();
      }, 200);
    })
  })
}

//  swap animation
function animateSwap(indexh1, indexh2, indexb1, indexb2, objectMoving1, objectMoving2) {

  var fb = indexb1;
  var sb = indexb2;
  var fh = indexh1;
  var sh = indexh2;

  // hands
  var $fh = $('#td' + fh[0] + fh[1]);
  var $sh = $('#td' + sh[0] + sh[1]);
  // books
  var $fb = $('#td' + fb[0] + fb[1]);
  var $sb = $('#td' + sb[0] + sb[1]);
  // // books raised
  var $fbr = $('#td' + '1' + fb[1]);
  var $sbr = $('#td' + '1' + sb[1]);

  // // offsets
  var offsetFH = $fh.offset()
  var offsetSH = $sh.offset()
  var offsetFB = $fb.offset()
  var offsetSB = $sb.offset()
  var offsetFBR = $fbr.offset()
  var offsetSBR = $sbr.offset()

  // replace td before clone with just the object which is moving
  if (objectMoving1 !== '') {
    var contentsFH = retrieveContents(getStateContents(indexh1[0], indexh1[1]), objectMoving1);
    table.rows[indexh1[0]].cells[indexh1[1]].innerHTML = contentsFH[0];
  }
  if (objectMoving2 !== '') {
    var contentsSH = retrieveContents(getStateContents(indexh2[0], indexh2[1]), objectMoving2);
    table.rows[indexh2[0]].cells[indexh2[1]].innerHTML = contentsSH[0];
  }

  // hand clones
  var $cloneFH = $('<div>')
    .addClass('cloneHand')
    .append($fh.contents())
    .css(offsetFH)
    .appendTo('body')
  var $cloneSH = $('<div>')
    .addClass('cloneHand')
    .append($sh.contents())
    .css(offsetSH)
    .appendTo('body')
  // book clones
  var $cloneFB = $('<div>')
    .addClass('cloneBook')
    .append($fb.contents())
    .css(offsetFB)
    .appendTo('body')
  var $cloneSB = $('<div>')
    .addClass('cloneBook')
    .append($sb.contents())
    .css(offsetSB)
    .appendTo('body')
  setClonePosition();

  // after clone set td to the object(s) which remain after the move
  if (objectMoving1 !== '') {
    table.rows[indexh1[0]].cells[indexh1[1]].innerHTML = contentsFH[1];
  }
  if (objectMoving2 !== '') {
    table.rows[indexh2[0]].cells[indexh2[1]].innerHTML = contentsSH[1];
  }

  // Raise books
  $cloneFB.animate(offsetFBR, 200)
  $cloneSB.animate(offsetSBR, 200, function () {
    // Swap hands
    $cloneFH.animate(offsetSH, 200)
    $cloneSH.animate(offsetFH, 200)
    // Swap books
    $cloneFB.animate(offsetSBR, 200)
    $cloneSB.animate(offsetFBR, 200, function () {
      // Lower books
      $cloneFB.animate(offsetSB, 200, function () {
        // $sb.empty().append($cloneFB.contents())
        // $cloneFB.remove()
      })
      $cloneSB.animate(offsetFB, 200, function () {
        // $fb.empty().append($cloneSB.contents())
        // $cloneSB.remove()
        // Swap hands
        $cloneFH.animate(offsetFH, 200, function () {
          // $fh.empty().append($cloneFH.contents())
          // $cloneFH.remove()
        })
        $cloneSH.animate(offsetSH, 200, function () {
          console.log('swap end');
          // $sh.empty().append($cloneSH.contents())
          // $cloneSH.remove()
          // timeout to update html after animations have finished
          // also renables stepbutton


          $cloneFH.remove()
          $cloneSH.remove()
          $cloneSB.remove()
          $cloneFB.remove()
          updateHTML();
          console.log('swap update');
          setTimeout(function () {
            enableStepIfNotRunOrEnd();
          }, 200);
        })
      })
    })
  })
}


function setClonePosition() {
  var widthBook = $('#td00').width();
  $('.cloneBook').css("width", widthBook);
  var widthHand = $('#td20').width();
  $('.cloneHand').css("width", widthHand);
}

// COOKIEESSS
function setCookie(cname, cvalue, exdays) {

  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "no cookie found";
}