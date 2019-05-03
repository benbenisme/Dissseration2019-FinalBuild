Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  {
    "type": "math_arithmetic_quick",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
          ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
          ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
          ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
          ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": "%{BKY_MATH_HUE}",
    "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
    "extensions": ["math_op_tooltip"]
  }]);
Blockly.JavaScript['math_arithmetic_quick'] = function (block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.JavaScript.ORDER_ADDITION],
    'MINUS': [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
    'MULTIPLY': [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
    'DIVIDE': [' / ', Blockly.JavaScript.ORDER_DIVISION],
    'POWER': [null, Blockly.JavaScript.ORDER_COMMA]  // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
  return 'math_arithmetic_quick(' + operator.toString() + ',' + argument0.toString() + ',' + argument1.toString() + ');'
};
function math_arithmetic_quick(op, arg0, arg1) {
  let operator = parseInt(op);
  let argument0 = parseInt(arg0);
  let argument1 = parseInt(arg1);
  pushInstruction('math_arithmetic_quick', [operator, argument0, argument1]);
  var code;
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
  code = argument0 + operator + argument1;
  return [code, order];
}


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

  return 'quick_sort_structure(' + number_leftinput.toString() + ',' + number_rightinput.toString() + ');' + variable_left.toString() + '=' + number_leftinput.toString() + ';' + variable_right.toString() + '=' + number_rightinput.toString() + ';';
};
function quick_sort_structure(number_leftinput, number_rightinput) {
  pushInstruction('quick_sort_sturcture', [number_leftinput, number_rightinput]);
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
  var code = 'quickSort("' + value_left + '","' + value_right + '","true");'
  return code;
};


Blockly.Blocks['partition_array'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Partition Array");
    this.appendValueInput("Left")
      .setCheck("Number")
      .appendField("Start Index");
    this.appendValueInput("Right")
      .setCheck("Number")
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

  var code = 'partitionArray("' + value_left.toString() + '","' + value_right.toString() + '")';
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