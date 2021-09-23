jQuery(document).ready(function($){

  /*==========================*/  
/* Countdown */ 
/*==========================*/

 $(".clock").countdown('2022/12/01', function(event) {
    $(this).html(event.strftime('<span>%D <b>days</b></span> <span>%H<b>hrs</b></span> <span>%M<b>mins</b></span> <span>%S<b>sec</b></span>'));
  });

$("#togglemenu,.sidebar-menu-head .navbar-toggler").click(function(){
  $('body').toggleClass("open-sidebar");
});

$("#mainMenu").click(function(){
  $('body').toggleClass("menu-open");  
});


 // PREVENT INSIDE MEGA DROPDOWN
 $('.custom-dropdown .dropdown-menu').on("click.bs.dropdown", function (e) {
     e.stopPropagation();
     e.preventDefault();                
 });


$(".custom-dropdown .dropdown-toggle").click(function () {
     $('body').toggleClass('modal-open');
 });

  $('.overlay, #closeDropdown').on('click', function(e) {
    if ($('body').hasClass('modal-open')) {
       $('body').removeClass('modal-open')
    }
 });
 $('#closeDropdown').on('click', function(e) {
    $('.custom-dropdown .dropdown-menu').removeClass('show')
 });

// Show Hide DIV with TextBox based on RadioButton selection (checked unchecked).
$("input[name$='haveMentor']").click(function() {
     var test = $(this).val();
     $(".desc").hide();
     $("#haveMentor" + test).show();
 });

// Change button text 
$('.viewmore-btn[data-toggle="collapse"]').click(function() {
  $(this).toggleClass( "active" );
  if ($(this).hasClass("active")) {
    $(this).text("View less");
  } else {
    $(this).text("View more");
  }
});

// Change button text2 
$('.viewmore-button[data-toggle="collapse"]').click(function() {
  $(this).toggleClass( "active" );
  if ($(this).hasClass("active")) {
    $(this).text("View more");
  } else {
    $(this).text("View less");
  }
});


$('body').on('click', function (e) {
  $('[data-toggle=popover]').each(function () {
      // hide any open popovers when the anywhere else in the body is clicked
      if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
          $(this).popover('hide');
      }
  });
});
// Tooltip init
$('[data-toggle="popover"]').popover();  

// password hide and show
$(".toggle-password").click(function() {

  $(this).toggleClass('toggle');

  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
      input.attr("type", "text");
  } else {
      input.attr("type", "password");
  }
});
// nice select init
$('select:not(.ignore)').niceSelect();

/*==========================*/ 
/* sliders */ 
/*==========================*/
if($('.card-block-slider').length > 0){
  jQuery('.card-block-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false, 
    infinite: true, 
    fade:true,
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 2000,
     
  });
}
 
/*==========================*/  
/* Mobile Slider */  
/*==========================*/ 
if($('.mobile-slider').length > 0){
jQuery('.mobile-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: false, 
  infinite: true, 
  centerMode: false, 
  responsive: [
    {
      breakpoint: 5000,
      settings: "unslick"
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,  
        adaptiveHeight: false
      }
    }
  ]
});
}
 

/*==========================*/  
/* Scroll on animate */  
/*==========================*/
function onScrollInit( items, trigger ) {
  items.each( function() {
    var osElement = $(this),
        osAnimationClass = osElement.attr('data-os-animation'),
        osAnimationDelay = osElement.attr('data-os-animation-delay');
        osElement.css({
          '-webkit-animation-delay':  osAnimationDelay,
          '-moz-animation-delay':     osAnimationDelay,
          'animation-delay':          osAnimationDelay
        });
        var osTrigger = ( trigger ) ? trigger : osElement;
        osTrigger.waypoint(function() {
          osElement.addClass('animated').addClass(osAnimationClass);
          },{
              triggerOnce: true,
              offset: '95%',
        });
// osElement.removeClass('fadeInUp');
  });
}
onScrollInit( $('.os-animation') );
onScrollInit( $('.staggered-animation'), $('.staggered-animation-container'));


/*==========================*/
/* Header fix */
/*==========================*/
var scroll = $(window).scrollTop();
if (scroll >= 10) {
    $("body").addClass("fixed");
} else {
    $("body").removeClass("fixed");
}


});


$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
        $("body").addClass("fixed");
    } else {
        $("body").removeClass("fixed");
    }
});