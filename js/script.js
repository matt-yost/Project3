// On load focus on first field
$("#name").focus();

// Function to hide children of a given element
var hideChildren = function(e){
  $(e).children().hide();
};

// If "other" is selected for Job Role append text field
$("#title").on("change",function(){
  if($(this).val() === "other"){
    $(".basic-info").append("<input type='text' id='other-title' placeholder='Your Title'>");
    // After "other" field is appended focus
    $("#other-title").focus();
  } else {
    $('#other-title').remove();
  }
});

// Shows corresponding T-Shirt color for design selection
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

// Define checkboxes
var frameworks = $("input[name='js-frameworks']");
var libs = $("input[name='js-libs']");
var express = $("input[name='express']");
var node = $("input[name='node']");

// If event is checked, any conflicting events will be disabled and styled
var eventSelector = function(input, conflict){
  $(".activities").on("change", function(){
    if($(input).prop("checked")){
      $(conflict).attr("disabled", true);
      $(conflict).parent().css({"text-decoration": "line-through",
                                "color": "lightgrey"});
    } else {
      $(conflict).attr("disabled", false);
      $(conflict).parent().css({"text-decoration": "none",
                                "color": "initial"});
    }
  });
};

// Calculate the total cost of any events clicked
$('.activities input').click(function() {
  var total = 0;
  $(".activities input:checked").each(function() {
    total += parseInt($(this).val());
  });
  $("#total-cost").text("Total cost: $" + total);
});

// Initiate validation booleans
var ccIsValid = false;
var noCC = false;
var zipIsValid = false;
var cvvIsValid = false;
var nameIsValid = false;
var emailIsValid = false;
var activityIsValid = false;

// Use JqueryCreditCardValidator.js to check if CC number is valid
$("#credit-card").focusout(function(){
  ccIsValid = $("#cc-num").validateCreditCard().valid;
  // Style based on true/false
  if(ccIsValid){
    $("label[for=cc-num]").css("color", "black");
  } else {
    $("label[for=cc-num]").css("color", "red");
  }
});

// Show and hide correct inforamtion based on payment selection
var payMethod = function(){
  // Initially show credit card payment
  $("#paypal, #bitcoin").hide();
  $("#payment").val("credit card");
  // Show and hide corresponding elements
  $("#payment").on("change", function() {
    if($("#payment").val() === "credit card"){
      $("#credit-card").show();
      $("#paypal, #bitcoin").hide();
    } else if($("#payment").val() === "paypal"){
      $("#credit-card, #bitcoin").hide();
      $("#paypal").show();
      noCC = true;
    } else if($("#payment").val() === "bitcoin") {
      $("#credit-card, #paypal").hide();
      $("#bitcoin").show();
      noCC = true;
    }
  });
};

// Check for zip of at least 5 characters
$("#zip").focusout(function(){
  var zipLength = $("#zip").val().length;
  if(zipLength < 5){
    $("label[for=zip]").css("color", "red");
  } else if(zipLength >= 5){
    $("label[for=zip]").css("color", "black");
    zipIsValid = true;
  }
});

// Check for cvv of 3 numbers
$("#cvv").focusout(function(){
  var cvvLength = $(this).val().length;
  if(cvvLength !== 3){
    $("label[for=cvv]").css("color", "red");
  } else {
    $("label[for=cvv]").css("color", "black");
    cvvIsValid = true;
  }
});

// Check for filled in name field
$("#name").focusout(function(){
  if($("#name").val() === ""){
    $("label[for=name]").css("color", "red");
    nameIsValid = false;
  } else {
    $("label[for=name]").css("color", "black");
    nameIsValid = true;
  }
});

// Check for valid email address
$("#mail").focusout(function(){
  var email = $("#mail").val();
  if( /(.+)@(.+){2,}\.(.+){2,}/.test(email) ){
    // Valid email
    $("label[for=mail]").css("color", "black");
    emailIsValid = true;
  } else {
    // Invalid email
    $("label[for=mail]").css("color", "red");
    emailIsValid = false;
  }
});


// On submit, check for at least one checked box
$("button[type='submit']").click(function(){
  var activitiesSelected = $(".activities input");
  activitiesSelected.each(function(){
    if($(this).prop("checked")){
      activityIsValid = true;
    }
  });
  // Check for any form errors w/ credit card
  var ccReady = (zipIsValid && ccIsValid && cvvIsValid && nameIsValid && emailIsValid && activityIsValid);
  // Check for any form errors w/out credit card
  var noCcReady = (nameIsValid && emailIsValid && activityIsValid && noCC);
  var ready = (ccReady || noCcReady);
  if(ready){
    event.preventDefault();
    $("#form-error").addClass("is-hidden")
    // Send form
  } else {
    event.preventDefault();
    // Dont send form and show error message
    $("#form-error").removeClass("is-hidden");
  }
});

//Function calls
eventSelector(frameworks,express);
eventSelector(libs,node);
eventSelector(express,frameworks);
eventSelector(node,libs);
payMethod();
