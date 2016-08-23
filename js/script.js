// On load focus on first field
$("#name").focus();
$("#zip-error").hide();
$("#credit-error").hide();

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

// Define checkboxes
var frameworks = $("input[name='js-frameworks']");
var libs = $("input[name='js-libs']");
var express = $("input[name='express']");
var node = $("input[name='node']");

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
}

var totalCost = function(){
  $('.activities input').on('click', function() {
    var total = 0;
    $('.activities input:checked').each(function() {
      total += parseInt($(this).val());
    });
    $('#total-cost').text("Total cost: $" + total);
  });
}

var payMethod = function(){
  $("#paypal, #bitcoin").hide();
  $("#payment").on("change", function() {
    if($("#payment").val() === "credit card"){
      $("#credit-card").show();
      $("#paypal, #bitcoin").hide();
    } else if($("#payment").val() === "paypal"){
      $("#credit-card, #bitcoin").hide();
      $("#paypal").show();
      //ccIsValid = true;
    } else if($("#payment").val() === "bitcoin") {
      $("#credit-card, #paypal").hide();
      $("#bitcoin").show();
      //ccIsValid = true;
    }
  });
}

var zipIsValid = false;
var ccIsValid = false;
var ccvIsValid = false;
var nameIsValid = false;
var emailIsValid = false;
var activityIsValid = false;

ccIsValid = $("#cc-num").validateCreditCard().valid;

$("#credit-card").focusout(function(){
  ccIsValid = $("#cc-num").validateCreditCard().valid;
  if(ccIsValid){
    $("label[for=cc-num]").css("color", "black");
  } else {
    $("label[for=cc-num]").css("color", "red");
  }
});

$("#zip").focusout(function(){
  var zipLength = $("#zip").val().length;
  if(zipLength < 5){
    $("label[for=zip]").css("color", "red");
  } else if(zipLength >= 5){
    $("label[for=zip]").css("color", "black");
    zipIsValid = true;
  }
  return zipIsValid;
});

$("#name").focusout(function(){
  if($("#name").val() == ""){
    $("label[for=name]").css("color", "red");
    nameIsValid = false;
  } else {
    $("label[for=name]").css("color", "black");
    nameIsValid = true;
  }
});

$("#mail").focusout(function(){
  var email = $("#mail").val();
  if( /(.+)@(.+){2,}\.(.+){2,}/.test(email) ){
    // valid email
    $("label[for=mail]").css("color", "black");
    emailIsValid = true;
  } else {
    // invalid email
    $("label[for=mail]").css("color", "red");
    emailIsValid = false;
  }
});

var activitiesSelected = $(".activities input");
$("button[type='submit']").click(function(){
  activitiesSelected.each(function(){
    if($(this).prop("checked")){
      activityIsValid = true;
    };
  });
  console.log(activityIsValid);
});



//Function calls
customTitle();
tshirtColor();
eventSelector(frameworks,express);
eventSelector(libs,node);
eventSelector(express,frameworks);
eventSelector(node,libs);
totalCost();
payMethod();
