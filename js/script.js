$("#name").focus();
$("#colors-js-puns").hide();

var hideChildren = function(e){
  $(e).children().hide();
}

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

var tshirtColor = function(){
  $("#design").on("change", function(){
    $("#colors-js-puns").show();
    if($(this).val() === "js puns"){
      hideChildren("#color");
      $("option[value='cornflowerblue']").show();
      $("option[value='darkslategrey']").show();
      $("option[value='gold']").show();
      $("#color").val('cornflowerblue').show();
    } else if($(this).val() === "heart js") {
      hideChildren("#color");
      $("option[value='tomato']").show();
      $("option[value='steelblue']").show();
      $("option[value='dimgrey']").show();
      $("#color").val('tomato').show();
    } else {
      hideChildren("#color");
      $("#color").val('default');
    }
  });
}

customTitle();
tshirtColor();
