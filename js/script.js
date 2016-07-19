$("#name").focus();
$("#color").children().hide();

$("#title").on("change",function(){
  if($(this).val() === "other"){
    $(".basic-info").append("<input type='text' id='other-title' placeholder='Your Title'>");
    $("#other-title").focus();
  } else {
    $('#other-title').remove()
  }
});

$("#design").on("change", function(){
  $("#color").children().hide();
  if($(this).val() === "js puns"){
    $("option[value='cornflowerblue']").show();
    $("option[value='darkslategrey']").show();
    $("option[value='gold']").show();
    $("#color").first().attr("selected", "selected");
  } else if($(this).val() === "heart js") {
    $("option[value='tomato']").show();
    $("option[value='steelblue']").show();
    $("option[value='dimgrey']").show();
  } else {
    $("option[value='default']").show();
  }
});
