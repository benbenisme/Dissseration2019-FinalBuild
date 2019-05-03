instructionStructure = new Array();
bookUpdateStructure = new Array();
var levelCode = null;
var myInterpreter = null;
var highlightPause = false;
var latestCode = '';
var runTimeout = null;
var state = [];
var instructionUpdateCounter = 0;

Blockly.Blocks['if_conditional'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldDropdown([["Value", "Value"], ["Index", "Index"]]), "properties");
    this.appendDummyInput()
      .appendField("Left hand")
      .appendField(new Blockly.FieldDropdown([["<", "Less"], [">", "Greater"], ["<=", "LessEqual"], [">=", "GreaterEqual"], ["=", "Equal"]]), "operator")
      .appendField("Right hand");
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
  var code = '(conditionalBlockExecution("' + dropdown_properties + '","' + dropdown_operator.toString() + '"))';
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['move_hand'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Move")
      .appendField(new Blockly.FieldDropdown([["left hand", "leftHandSelect"], ["right hand", "rightHandSelect"]]), "handSelect")
      .appendField(new Blockly.FieldDropdown([["left", "leftDirectionSelect"], ["right", "rightDirectionSelect"]]), "directionSelect");
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
  var input = '["' + dropdown_handselect + '",' + dropdown_directionselect + ']';
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
  var code = 'pushInstruction("swap_books",[]);';
  return code;
};

Blockly.Blocks['select_hand_position'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Move");
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["left hand", "Left hand"], ["right hand", "Right hand"]]), "handSelect")
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
      .appendField(new Blockly.FieldDropdown([["left hand", "Left hand"], ["right hand", "Right hand"]]), "handSelect");
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
      .appendField(new Blockly.FieldDropdown([["left hand", "Left hand"], ["right hand", "Right hand"]]), "handSelect");
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
  switch (levelCode) {
    case 1:
      solutionArray = [{ "bookId": "book1", "fromIndex": [2, 0], "toIndex": [1, 0] },
      { "bookId": "book1", "fromIndex": [1, 0], "toIndex": [1, 1] },
      { "bookId": "book1", "fromIndex": [1, 1], "toIndex": [2, 1] }]
      break;
  }
  return solutionArray;
}

function compareSolutions(levelCode, updateNumber) {
  solutionArray = getSolution(levelCode);

  if (isEqual(bookUpdateStructure[updateNumber - 1], solutionArray[updateNumber - 1]) === false) {
    alert("Incorrect on highlighted step: " + updateNumber);
    return false;
  } else if ((updateNumber) === solutionArray.length) {
    alert("congrats you did it!");
  }
  // Called if no wrong blocks, but isnt final solution -
  // checks for interpreter value being null as its set to null once the interpreter evals 
  // the currently compared block as being the users last.
  else if (myInterpreter === null) {
    alert("All is good so far, but you are not quite finished!, Keep it up!");
  }
  return true;
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

  // Add an API function for pushing instructions to instructionStructure
  wrapper = function (blockName, inputs) {
    return pushInstruction(blockName, inputs);
  };
  interpreter.setProperty(scope, 'pushInstruction',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for evaluation conditional variable blocks, and pushing them to instruction structure
  wrapper = function (evalProperty, operator) {
    return conditionalBlockExecution(evalProperty, operator);
  };
  interpreter.setProperty(scope, 'conditionalBlockExecution',
    interpreter.createNativeFunction(wrapper));
}



function highlightBlock(id) {
  workspace.highlightBlock(id);
  highlightPause = true;
}


function pushInstruction(blockName, inputs) {
  console.log(blockName);
  console.log(inputs);

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
        blockName: blockName
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
        operator: inputs[1].toString()
      }
      instructionStructure.push(instruction);
      break;
    default:
      throw 'attempted to push unknown instruction block';
  }
  console.log(instructionStructure);
}


function resetStepUi(clearOutput) {
  workspace.highlightBlock(null);
  highlightPause = false;
}


function generateCodeAndLoadIntoInterpreter() {
  // Generate JavaScript code and parse it.
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');
  latestCode = Blockly.JavaScript.workspaceToCode(workspace);
  resetStepUi(true);
}

stepCode = function (level) {
  if (!myInterpreter) {
    // First statement of this code.
    // Clear the program output.
    levelCode = level;
    resetStepUi(true);
    clearInstructionArray();
    clearBookUpdateArray();
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
        // Program complete, no more code to execute.         
        myInterpreter = null;
        resetStepUi(false);
        runButton.innerText = "Run";

        // Cool down, to discourage accidentally restarting the program.
        stepButton.disabled = 'disabled';
        runButton.disabled = 'disabled';
        setTimeout(function () {
          stepButton.disabled = '';
          runButton.disabled = '';
        }, 2000);

        return;
      }
    }
    // Keep executing until a highlight statement is reached,
    // or the code completes or errors.
  } while (hasMoreCode && !highlightPause);
}

function runCode(level) {
  // var runButton = document.getElementById("runButton");
  if (runButton.innerText === "Run") {
    runButton.innerText = "Pause";
  } else {
    clearTimeout(runTimeout);
    runButton.innerText = "Run";
    return;
  }
  // loops step execution automatically until either
  // an error is met (checked in stepExecution)
  // or it finishes execution of all user blocks (indicated by interpreter being null)
  function nextStep() {
    if (stepExecution(level) && myInterpreter !== null) {
      runTimeout = window.setTimeout(nextStep, 1000);
    }
  }
  nextStep();
}


function stepExecution(level) {
  if (myInterpreter == null) {
    setupOnStart(levelCode);
  }
  //execute
  stepCode(level);
  // update the html and state anyhow   
  updateState();
  updateHTML();
  // if (bookUpdateStructure.length !== 0 && compareSolutions(levelCode, bookUpdateStructure.length) === false) {
  //   lastErrorArea.value = 'FIRST ENCOUNTERED ERROR ON LAST ITERATION: \n \n Wrong on block number '
  //     + bookUp.length.toString();
  //   alert('Moved Wrong Book/ to the wrong place');
  //   clearInstructionArray();
  //   clearBookUpdateArray();
  //   myInterpreter = null;
  //   resetStepUi(false);
  //   return false;
  // }
  return true;
}


function reset() {
  myInterpreter = null;
  resetStepUi(true);
  clearInstructionArray();
  clearBookUpdateArray();
  runButton.innerText = "Run";
  setupOnStart(levelCode);
  console.log(instructionStructure);
  console.log(bookUpdateStructure);
  console.log(state);
}


function setupState(levelCode) {
  switch (levelCode) {
    case 1:
      state = [
        ['', ['Left hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />']],
        ['', ''],
        [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'], ''],
      ];
      break;
    case 2:
      state = [
        [['Left hand', '<img style="display:block;" width="100%" height="100%" src="./media/left_hand.svg" />'], ['Right hand', '<img style="display:block;" width="100%" height="100%" src="./media/right_hand.svg" />']],
        ['', ''],
        [['book1', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />'], ['book2', '<img style="display:block;" width="100%" height="100%" src="./media/book_1.svg" />']]
      ];
      break;
  }
}

function findIndexInState(id) {
  for (var i = 0; i < state.length; i++) {
    var row = state[i];
    for (var j = 0; j < row.length; j++) {
      if (row[j][0] === id) {
        return [i, j];
      }
    }
  }
}

function clearStateCell(row, column) {
  state[row][column] = '';
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
    return;
  }
  // action block was added, so update counter accordingly
  instructionUpdateCounter += 1;
  var instruction = instructionStructure[latestIndex - 1];
  console.log(instruction);
  console.log(returnKeyValue(instruction, 0));
  switch (returnKeyValue(instruction, 0)) {

    case "select_hand_position":
      // index of hand      
      var index = findIndexInState(returnKeyValue(instruction, 1));
      var destinationColumn = parseInt(returnKeyValue(instruction, 2));
      // value of hand
      var tempHand = state[index[0]][index[1]];
      // if there is a book below -  meaning a book grabbed
      if (bookBelowHand(index)) {
        // get value of book
        var tempBook = state[1][index[1]];
        // push book update
        pushBookUpdate(tempBook[0], [1, index[1]], [1, destinationColumn]);
        // clear old book cell, middle row (as it has to be grabbed), column of hand
        clearStateCell(1, index[1]);
        // set new book cell, middle row as still grabbed, column specified in instruction
        setStateCell(1, destinationColumn, tempBook);
      }
      clearStateCell(index[0], index[1]);
      setStateCell(index[0], destinationColumn, tempHand);

      break;

    case "grab_book":
      // findIndexInState(returnKeyValue(instruction, 1)) returns index in state of whichever hand is specified in instruction
      var index = findIndexInState(returnKeyValue(instruction, 1));
      // then temp is set to be equal to whatever is in the lowest/bookshelf row of state in the column of the hand
      var temp = state[2][index[1]];

      // temp[0] will be the book id e.g. book1
      // the index its moving from is lowest row (so 2 as index) and the column of the hand specified
      // index its moving to is the same column but the middle row (so index 1)
      pushBookUpdate(temp[0], [2, index[1]], [1, index[1]]);

      // clear old state cell, row 2, column of hand
      clearStateCell(2, index[1]);
      // set new state cell, row 1, column of hand
      setStateCell(1, index[1], temp);
      break;

    case "place_book":
      // get whatever book is under the column index of specified hand in second row
      // place into row 3 in same column index

      // gets index of hand
      var index = findIndexInState(returnKeyValue(instruction, 1));
      // gets value of book, providing its holding one
      var temp = state[1][index[1]];

      // temp[0] will be the book id e.g. book1
      // the index its moving from is middle row (so 1 as index) and the column of the hand specified
      // index its moving to is the same column but the lowest row (so index 2)
      pushBookUpdate(temp[0], [1, index[1]], [2, index[1]]);

      // clear old state cell, row 1, column of hand
      clearStateCell(1, index[1]);
      // set new state cell, row 2, column of hand
      setStateCell(2, index[1], temp);
      break;

    case "swap_books":
      var indexLeft = findIndexInState("Left hand");
      var indexRight = findIndexInState("Right hand");
      var tempLeft = state[2][indexLeft[1]];
      var tempRight = state[2][indexRight[1]];
      // for pushing book updates, do left first then right
      pushBookUpdate(tempLeft[0], [2, indexLeft[1]], [2, indexRight[1]]);
      pushBookUpdate(tempRight[0], [2, indexRight[1]], [2, indexLeft[1]]);

      clearStateCell(2, indexLeft[1]);
      clearStateCell(2, indexRight[1]);

      setStateCell(2, indexRight[1], tempLeft);
      setStateCell(2, indexRight[1], tempRight);

      break;

    case "move_hand":
      // gets index of specified hand's position
      var index = findIndexInState(returnKeyValue(instruction, 1));
      // gets value of hand
      var tempHand = state[index[0]][index[1]];
      var directionIndex = 0;
      // no book update so dont do it

      // -1 if heading left, +1 if heading right, for use in incrementing the column index
      if (returnKeyValue(instruction, 2) === 'LeftDirectionSelect') {
        directionIndex = -1;
      } else {
        directionIndex = 1;
      }

      // if a book is bloew the hand (grabbed currently) move it along with the hand
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
      clearStateCell(index[0], index[1]);
      // set new state cell, with the addition of the directionIndex for column index++++
      setStateCell(2, index[0], index[1] + directionIndex, tempHand);
      break;

    case "if_conditional":
      var indexLeftHand = findIndexInState('Left hand');
      var indexRightHand = findIndexInState('Right hand');
      if (returnKeyValue(instruction, 1) === 'Value') {
        var tempLeftBook = state[2][indexLeftHand[1]];
        var tempRightBook = state[2][indexRightHand[1]];

        // raise books up visually +  statewise + update html
        console.log("raise");
        pushBookUpdate(tempLeftBook[0], [2, indexLeftHand[1]], [1, indexLeftHand[1]]);
        pushBookUpdate(tempRightBook[0], [2, indexRightHand[1]], [1, indexRightHand[1]]);
        clearStateCell(2, indexLeftHand[1]);
        clearStateCell(2, indexRightHand[1]);
        setStateCell(1, indexLeftHand[1], tempLeftBook);
        setStateCell(1, indexRightHand[1], tempRightBook);
        updateHTML();

        setTimeout(function () {
          console.log("lower");
          pushBookUpdate(tempLeftBook[0], [1, indexLeftHand[1]], [2, indexLeftHand[1]]);
          pushBookUpdate(tempRightBook[0], [1, indexRightHand[1]], [2, indexRightHand[1]]);
          clearStateCell(1, indexLeftHand[1]);
          clearStateCell(1, indexRightHand[1]);
          setStateCell(2, indexLeftHand[1], tempLeftBook);
          setStateCell(2, indexRightHand[1], tempRightBook);
          updateHTML();
        }, 1000);
        // Lower books down visually + statewise (no need to update html as will do after anyways)

        break;

      } else if (returnKeyValue(instruction, 1) === 'Index') {
        // just highlight and unhighlight
        var leftHand = state[0][indexLeftHand[1]];
        var rightHand = state[0][indexRightHand[1]];
        var tempHighlightLeft = [leftHand[0], '<img style="display:block;" width="100%" height="100%" src="./media/left_hand_highlight.svg" />']
        var tempHighlightRight = [rightHand[0], '<img style="display:block;" width="100%" height="100%" src="./media/right_hand_highlight.svg" />']
        setStateCell(0, indexLeftHand[1], tempHighlightLeft);
        setStateCell(0, indexRightHand[1], tempHighlightRight);

        setTimeout(function () {          
          setStateCell(0, indexLeftHand[1], leftHand);
          setStateCell(0, indexRightHand[1], rightHand);
          updateHTML();
        }, 1000);

        break;
      }

  }  
}


function updateHTML() {
  for (var i = 0; i < state.length; i++) {
    var row = state[i];
    for (var j = 0; j < row.length; j++) {
      if (state[i][j][1] != null) {
        table.rows[i].cells[j].innerHTML = state[i][j][1];
      } else {
        table.rows[i].cells[j].innerHTML = '';
      }
    }
  }
}


function setupOnStart(lvl) {
  setupState(lvl);
  updateHTML();
}

function displayHelpModal() {
  $('#myModal').modal('toggle');
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

function conditionalBlockExecution(evalProperty, operator) {

  var indexLeft = findIndexInState("Left hand");
  var indexRight = findIndexInState("Right hand");
  var tempLeft = state[2][indexLeft[1]];
  var tempRight = state[2][indexRight[1]];
  pushInstruction("if_conditional", [evalProperty, operator]);
  switch (evalProperty) {
    case 'Value':
      if (evalStringOperator(getBookValue(tempLeft[0], 'height'),
        operator,
        getBookValue(tempRight[0], 'height')
      )) {
        return true;
      }
      return false;
    case 'Index':
      if (evalStringOperator(indexLeft[1], operator, indexRight[1])) {
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
  }
}