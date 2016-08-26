//Breakpoint-variabler
var bpXsmall=0, bpSmall=544, bpMed=768, bpLarge=992, bpXlarge=1200;

options = undefined
/* globals jQuery */
/*!
 * TOGGLE elements with the same parent + add "open"-class
 */
; (function ($, undefined) {
    $(function () {
        $('.js-toggle').click(function () {
            var self = $(this);
            if (self.hasClass('open')) {
                self.parent().find('.js-hide').slideUp(300);
                self.removeClass('open');
            } else {
                self.addClass('open');
                self.parent().find('.js-hide').slideDown(300);
            }
            return false;
        })
    });
}(jQuery));


// Add dim class to panels

; (function ($, undefined) {
    $(function () {

        $('.index-heading').click(function () {
           if ($(this).hasClass('expanded')) {
               $(this).removeClass('expanded');
               if ($('.panel-heading.expanded').length === 0) {
                   $('.panel-heading').removeClass('dim');
               }
               else {
                   $(this).addClass('dim')
               }
           } else {
               $('.panel-heading').removeClass('expanded');
               $(this).addClass('expanded');
               $('.panel-heading').addClass('dim');
               $('.panel-heading.expanded').removeClass('dim');
           }
       });
    });
}(jQuery));

// Hide second level column menu when clicking on the active upper level item:
// (function ($) {
//   $(function () {
//     var upperLvlClicked = false; var stopPropagationNextClick = false
//     function handleClick (event) {
//       if (upperLvlClicked && !stopPropagationNextClick) {
//         stopPropagationNextClick = true
//         console.log($('.a-colnav.dropdown').children('li').eq(4).find('a'))
//         $('.a-colnav.dropdown').children('li').eq(4).find('a').click()
//       } else {
//         upperLvlClicked = true; stopPropagationNextClick = false
//       }
//     }
//     $('li.a-colnav').on('click', handleClick)
//     $('a.a-colnav-item').on('click', handleClick)
//   })
// }(jQuery))

(function ($) {
  // Handle theme toggle:
  $(function () {
    if (localStorage.getItem('theme') && localStorage.getItem('theme') === 'business') {
      $('body', $('iframe').contents()[0]).attr('class', 'business');
      $('#sg-switchtheme-blue', $('iframe').contents()[0]).prop('checked', true)
    } else {
      $('body', $('iframe').contents()[0]).attr('class', 'private-person');
      $('#sg-switchtheme-grey', $('iframe').contents()[1]).prop('checked', true)
    }
    $('#sg-switchtheme-blue',
      $('iframe').contents()[0]).change(function () {
      $('body', $('iframe').contents()[0]).toggleClass('business');
      $('body', $('iframe').contents()[0]).toggleClass('private-person');
      $('html', $('iframe').contents()[0]).toggleClass('business');
      $('html', $('iframe').contents()[0]).toggleClass('private-person');
      localStorage.setItem('theme', $('body', $('iframe').contents()[0]).attr('class'))
      $('body', '.ap-profile').attr('class', '')
    });
    $('#sg-switchtheme-grey',
      $('iframe').contents()[0]).change(function () {
      $('body', $('iframe').contents()[0]).toggleClass('business')
      $('body', $('iframe').contents()[0]).toggleClass('private-person')
      $('html', $('iframe').contents()[0]).toggleClass('business')
      $('html', $('iframe').contents()[0]).toggleClass('private-person')
      localStorage.setItem('theme', $('body', $('iframe').contents()[0]).attr('class'))
      $('body', '.ap-profile').attr('class', '')
    })
    $('body', '.ap-profile').attr('class', '')
  })
  // Handle filter toggle:
  $(function () {
    $('.a-collapseFilter').on('mouseup', function () {
      if (!$(this).hasClass('collapsed')) {
        $(this).addClass('collapsed')
      } else {
        $('.a-collapseContent').removeClass('in')
        $('.a-collapseFilter').addClass('collapsed')
        $(this).removeClass('collapsed')
      }
    })
  })
  // Adjust position of second level menu upon click:
  $(function () {
    $('#colnav').on('mouseup', function (event) {
      var target = $(event.target); var second = $('.a-colnav-secondLevel')
      second.css('margin-left', '-1px')
      var getThird = function (el) {
        if (el.attr('class') === '.a-colnav-thirdLevel') return el
        else return el.find('.a-colnav-thirdLevel')
      }
      var findOpenThird = function (el) {
        var bool = false
        el.find('.a-colnav-thirdLevel').each(function () {
          if ($(this).attr('data-ignore') === 'false') bool = true
        })
        return bool
      }
      var isOpen = function (el) {
        var x = 'expanded'
        return (el.closest('a').hasClass(x) || el.find('a').hasClass(x) ||
          el.hasClass(x))
      }
      var ul = target.closest('ul')
      if (ul.hasClass('a-colnav-secondLevel' || 'a-colnav-thirdLevel')) {
        if (!findOpenThird(ul)) {
            if($(window).width() >= bpLarge) {second.animate({ 'margin-left': '-78px' }, 125)}
        }
        else {
            if($(window).width() >= bpLarge) {second.css('margin-left', '-78px') }
        }
        getThird(ul).css('margin-left', '-1px').css('left', '100%')
          .attr('data-ignore', 'false')
        if (ul.hasClass('a-colnav-secondLevel') && $(window).width() >= bpLarge) {
          ul.children('li').children('a').addClass('dim-second')
          target.closest('a').removeClass('dim-second')
          target.children('a').removeClass('dim-second')
          target.removeClass('dim-second')
        }
      } else if (ul.hasClass('a-colnav') && isOpen(target)) {
        $('.dim').removeClass('dim'); second.css('margin-left', '-10000px')
        getThird(ul).css('margin-left', '-10000px')
          .attr('data-ignore', 'true')
        $('.col-md-3').removeClass('col-md-3').addClass('col-md-6')
          .removeClass('col-md-offset-4').addClass('col-md-offset-1')
      } else {
        second.each(function () {
          getThird($(this)).attr('data-ignore', 'true')
        })
        $('.dim-second').removeClass('dim-second')
        $('.col-md-6').removeClass('col-md-6').addClass('col-md-3')
          .removeClass('col-md-offset-1').addClass('col-md-offset-4')
      }
    })
  })
}(jQuery))

// INPUT Focus style
// If state on input is "focus", add class to a-input : "a-input-focus"

; (function ($, undefined) {
    $(function () {

        $("input.form-control").focus(function(){
        $(this).parent().addClass("a-input-focus");

        }).blur(function(){
               $(this).parent().removeClass("a-input-focus");
        })
    });
}(jQuery));

// TOOLTIP AND POPOVERS

; (function ($, undefined) {
    $(function () {

      $('[data-toggle="tooltip"]').tooltip();

      $('[data-toggle="popover"]').popover();

      $('#example').popover(options);

    })
}(jQuery));


/*!
 * COLAPSE "Mobile navigation" + add "open"-class
 */
; (function ($, undefined) {

    $(function () {

        $('.ap-sideNav-mobilebar').click(function () {
            var self = $(this);
            var searchButton = $('.a-toggle-search').hasClass('open');

            if (self.hasClass('open')) {
                $('.ap-sideNav-collapse').slideUp(300);
                self.removeClass('open');
            } else {
                if (searchButton === true) {
                    $('.a-search').slideUp(300);
                    $('.a-toggle-search').removeClass('open');

                }
                self.addClass('open');
                $('.ap-sideNav-collapse').slideDown(300);
            }

            return false;
        })
    });

}(jQuery));



// Add dim class to colnav FIRST LEVEL (The panels that is not active)
// TODO: Combine first and second level javascript. On second level, make the items not DIM when menu is closed and another 2-level is opened (Reset)

; (function ($, undefined) {
    $(function () {

        $('.a-colnav-item').click(function () {
           if ($(this).hasClass('expanded')) {
               $(this).removeClass('expanded');
               if ($('.a-colnav-item.expanded').length === 0) {
                   $('.a-colnav-item').removeClass('dim-second-no');
               }
               else {
                   $(this).addClass('dim')
               }
           } else {
               $('.a-colnav-item').removeClass('expanded');
               $(this).addClass('expanded');
               $('.a-colnav-item').addClass('dim');
               $('.a-colnav-item.expanded').removeClass('dim');
           }
       });
    });
}(jQuery));

// Add dim class to colnav SECOND LEVEL

; (function ($, undefined) {
    $(function () {

        $('.a-colnav-item-second').click(function () {
           if ($(this).hasClass('expanded-second')) {
               $(this).removeClass('expanded-second');
               if ($('.a-colnav-item-second.expanded-second').length === 0) {
                   $('.a-colnav-item-second').removeClass('dim-second-no');
               }
               else {
                   $(this).addClass('dim-second')
               }
           } else {
               $('.a-colnav-item-second').removeClass('expanded-second');
               $(this).addClass('expanded-second');
               $('.a-colnav-item-second').addClass('dim-second');
               $('.a-colnav-item-second.expanded-second').removeClass('dim-second');
           }
       });
    });
}(jQuery));


/**
 * SmoothState
 */
$(function() {
  $('#main').smoothState();
});


/**
 * Anchor js
 * Add anchors to all h1s, h2s, h3s and h4s inside of .ap-content.
 */
anchors.options.placement = 'left';
anchors.options.class = 'a-anchor';
anchors.add('.ap-content h1, .ap-content h2, .ap-content h3, .ap-content h4');
