
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

console.log(today);

$(document).ready(function(){
  
  var rsvp="yes";
  $('#today').val(today);
  $("#select_friday, #select_saturday").val("yes");

  
  var $form = $('form#rsvp');
  var url = 'https://script.google.com/macros/s/AKfycbxHONBE6j7oaRaZr4oZMtQqpgcPXdsAsBbrAuU8DDRDBDKGxVU/exec';

  $('.select-field').click(function(){
    $(this).toggleClass('open');
    $('li').click(function(){
      $(this).siblings().removeClass('selected');
      $(this).addClass('selected');
    });
  })
  $('.option').click(function(){
      selection = $(this).attr('value');
      field_id = $(this).parent().attr('id').replace("list", "select");
      $("#"+field_id).val(selection);
      console.log(field_id, selection)
  });
  

  $('#submit-form').on("click", function(e) {
    e.preventDefault();

    var valid = $form[0].checkValidity()
    console.log(valid)

    if( valid ){
      var friday = $('#select_friday').val();
      var saturday = $('#select_saturday').val();
      console.log(friday, saturday);

      var jqxhr = $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: $form.serializeObject()
      }).done(function(){
          $('form').fadeOut(500);

          if ((friday == "yes") || (saturday == "yes")){
             $('.yes').fadeIn(500);
          }else{
             $('.no').fadeIn(500);
          }

          $("html, body").animate({ scrollTop: $('#form').offset().top }, 500);
         
        });
    }else {
      // fake submit to trigger validation
      $('<input type="submit">').hide().appendTo($form).click().remove();
    }

  

    // $('input[required]').each(function(){
    //   if $(this).val() ==
    // });
    

  });

  $(document).ajaxStart(function(){
    $('#submit-form').css('background', 'rgb(255,110,0)').html('<img src="spinner.svg">');
  });



  $( "a.anchor" ).click(function( event ) {
       event.preventDefault();
       $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
  });



  // $.fn.isInViewport = function() {
  //   var elementTop = $(this).offset().top;
  //   var elementBottom = elementTop + $(this).outerHeight();

  //   var viewportTop = $(window).scrollTop();
  //   var viewportBottom = viewportTop + $(window).height();

  //   return elementBottom-500 > viewportTop && elementTop < viewportBottom-500;
  // };

  // $(window).on('resize scroll', function() {
  //   if ($('.form').isInViewport()){
  //          $('[name=name]').focus();
  //   }
  // });


});



