(function($) {
  "use strict";
  $(window).on("load", function() { // makes sure the whole site is loaded
    //preloader
    $("#status").fadeOut(); // will first fade out the loading animation

    // if($("#preloader").attr('display') != 'none')
    // {
    //   $("#preloader").delay(450).fadeOut("slow"); // will fade out the white DIV that covers the website.  
    // }
  });


  $(document).ready(function(){  

    //active menu
    $(document).on("scroll", onScroll);

    //scroll js
    smoothScroll.init({
      selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
      selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
      speed: 500, // Integer. How fast to complete the scroll in milliseconds
      easing: 'easeInOutCubic', // Easing pattern to use
      updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
      offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
      callback: function ( toggle, anchor ) {} // Function to run after scrolling
    });

    //menu
    var bodyEl = document.body,
    content = document.querySelector( '.content-wrap' ),
    openbtn = document.getElementById( 'open-button' ),
    closebtn = document.getElementById( 'close-button' ),
    isOpen = false;

    function inits() {
      initEvents();
    }

    function initEvents() {
      openbtn.addEventListener( 'click', toggleMenu );
      if( closebtn ) {
        closebtn.addEventListener( 'click', toggleMenu );
      }

      // close the menu element if the target it´s not the menu element or one of its descendants..
      content.addEventListener( 'click', function(ev) {
        var target = ev.target;
        if( isOpen && target !== openbtn ) {
          toggleMenu();
        }
      } );
    }

    function toggleMenu() {
      if( isOpen ) {
        classie.remove( bodyEl, 'show-menu' );
      }
      else {
        classie.add( bodyEl, 'show-menu' );
      }
      isOpen = !isOpen;
    }

    inits();
    
    var interval = setInterval(function(){
      var li_length = $('.portfolio-image li').length;
      if(li_length > 2){
        clearInterval(interval);
        initPolyv();
      }
    }, 1000);

    if($("#preloader").attr('display') != 'none')
    {
      $("#preloader").delay(500).fadeOut("slow");
    }
    
  });

  function initPolyv(){
    $('.portfolio-image li').each(function(){
      var has_video = $(this).children('.has_video');
      var vUrl = has_video.text();

      $('#polyv-'+vUrl).empty();

      if(vUrl != '')
      {
        if( vUrl.substring(0,4) == 'live' )
        {
          //polyv live
          var has_image = $(this).children('.has_image');
          var image_url = 'images/bon_tv.jpg';
          if( has_image,length > 0 )
          {
            image_url = has_image.text();
          }
          var liveVid = vUrl.substring(4);
          $('#polyv-'+vUrl).append('<a href="http://live.polyv.cn/watch/'+liveVid+'" class="video-link"><img class="video-image" src="'+image_url+'"><img class="video-link-button" src="images/button-play.png"></a>');
        }
        else{
          var player = polyvObject('#polyv-'+vUrl).videoPlayer({
          'width':'315',
          'height':'185',
          'vid' : vUrl
          });
        }
      }
    });
  }
  
    
  //header
  function inits() {
    window.addEventListener('scroll', function(e){
      var distanceY = window.pageYOffset || document.documentElement.scrollTop,
          shrinkOn = 300,
          header = document.querySelector(".for-sticky");
      if (distanceY > shrinkOn) {
          classie.add(header,"opacity-nav");
      } else {
          if (classie.has(header,"opacity-nav")) {
              classie.remove(header,"opacity-nav");
          }
        }
    });
  }

  window.onload = inits();

  // nav-active
  function onScroll(event){
    var scrollPosition = $(document).scrollTop();
    $('.menu-list a').each(function () {
      var currentLink = $(this);
      var refElement = $(currentLink.attr("href"));
      // if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
      //   $('.menu-list a').removeClass("active");
      //   currentLink.addClass("active");
      // }
      // else{
      //   currentLink.removeClass("active");
      // }
    });
  }

})(jQuery);