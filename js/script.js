// On load focus on first field and hide color choices
$("#name").focus();
$("#colors-js-puns").hide();

// Hides children of a given element
var hideChildren = function(e){
  $(e).children().hide();
}

// If "other" is selected for Job Role append text field
var customTitle = function(){
  $("#title").on("change",function(){
    if($(this).val() === "other"){
      $(".basic-info").append("<input type='text' id='other-title' placeholder='Your Title'>");
      $("#other-title").focus();
    } else {
      $('#other-title').remove()
    }
  });
}

// Shows corresponding T-Shirt color for design selection
var tshirtColor = function(){
  $("#design").on("change", function(){
    // Initially hide all the colors
    hideChildren("#color");
    // Show corresponding colors
    if($(this).val() === "js puns"){
      $("option[value='cornflowerblue']").show();
      $("option[value='darkslategrey']").show();
      $("option[value='gold']").show();
      $("#color").val('cornflowerblue').show();
    } else if($(this).val() === "heart js") {
      $("option[value='tomato']").show();
      $("option[value='steelblue']").show();
      $("option[value='dimgrey']").show();
      $("#color").val('tomato').show();
    } else {
      $("#color").val('default');
    }
    $("#colors-js-puns").show();
  });
}

//Function calls
customTitle();
tshirtColor();
