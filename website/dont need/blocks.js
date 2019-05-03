


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


Blockly.Blocks['move_hand'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Move")
      .appendField(new Blockly.FieldDropdown([["left hand", "Left hand"], ["right hand", "Right hand"]]), "handSelect")
      .appendField(new Blockly.FieldDropdown([["left", "left"], ["right", "right"]]), "directionSelect");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
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
