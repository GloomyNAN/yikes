( function() {
	var isWebkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    isOpera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    isIe     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( isWebkit || isOpera || isIe ) && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
})();
( function() {
	var container, button, menu, links, subMenus, i, len;

	container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button ) {
		return;
	}

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			container.className = container.className.replace( ' toggled', '' );
			button.setAttribute( 'aria-expanded', 'false' );
			menu.setAttribute( 'aria-expanded', 'false' );
		} else {
			container.className += ' toggled';
			button.setAttribute( 'aria-expanded', 'true' );
			menu.setAttribute( 'aria-expanded', 'true' );
		}
	};

	// Get all the link elements within the menu.
	links    = menu.getElementsByTagName( 'a' );
	subMenus = menu.getElementsByTagName( 'ul' );

	// Set menu items with submenus to aria-haspopup="true".
	for ( i = 0, len = subMenus.length; i < len; i++ ) {
		subMenus[i].parentNode.setAttribute( 'aria-haspopup', 'true' );
	}

	// Each time a menu link is focused or blurred, toggle focus.
	for ( i = 0, len = links.length; i < len; i++ ) {
		links[i].addEventListener( 'focus', toggleFocus, true );
		links[i].addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

	/**
	 * Toggles `focus` class to allow submenu access on tablets.
	 */
	( function( container ) {
		var touchStartFn, i,
			parentLink = container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

		if ( 'ontouchstart' in window ) {
			touchStartFn = function( e ) {
				var menuItem = this.parentNode, i;

				if ( ! menuItem.classList.contains( 'focus' ) ) {
					e.preventDefault();
					for ( i = 0; i < menuItem.parentNode.children.length; ++i ) {
						if ( menuItem === menuItem.parentNode.children[i] ) {
							continue;
						}
						menuItem.parentNode.children[i].classList.remove( 'focus' );
					}
					menuItem.classList.add( 'focus' );
				} else {
					menuItem.classList.remove( 'focus' );
				}
			};

			for ( i = 0; i < parentLink.length; ++i ) {
				parentLink[i].addEventListener( 'touchstart', touchStartFn, false );
			}
		}
	}( container ) );
} )();

// Call owl carousel for featured content.
jQuery( document ).ready( function( $ ){

    var slider_autoplay = false;
    if ( boston.slider.autoplay == 1 ) {
        slider_autoplay = parseInt( boston.slider.delay );
        if ( isNaN( slider_autoplay ) ) {
            slider_autoplay = 5000;
        }
    }

    var slider_speed = parseInt( boston.slider.speed );
    if ( isNaN( slider_speed ) ) {
        slider_autoplay = 200;
    }

	jQuery('.featured_posts').owlCarousel( {
		autoPlay: slider_autoplay,
        slideSpeed: slider_speed,
		items : 3,
		itemsDesktop: 2,
		itemsDesktopSmall: [979,2],
		paginationNumbers: false,
        stopOnHover: true,
	} );
	$('.featured_posts .owl-item').height($('.featured_posts .owl-item').width()*3/5);
    jQuery('.featured_posts_slider').owlCarousel( {
        autoPlay: slider_autoplay,
        slideSpeed: slider_speed,
        items : 1,
        itemsDesktop: 1,
        itemsDesktopSmall :1,
        itemsTablet : 1,
        itemsTabletSmall : 1,
        itemsMobile : 1,
        singleItem : 1,
        autoHeight : true,

        paginationNumbers: false,
        pagination: false,
        navigation: true,
        stopOnHover: true,
        navigationText : ['<span class="genericon genericon-previous"></span>', '<span class="genericon genericon-next"></span>'],
    } );
    jQuery('.footer-instagram-feed .instagram-pics').each( function(){
		var c = $( this );
        var ni = c.attr( 'data-number' ) || 8;
        var n, dmn = 6, mn = 5;
        // Responsive mobile
        if ( ni > 8 ) {
            n = 8;
        } else {
            n = ni;
        }
        // Responsive tablet
        if( n > 6 ) {
            dmn = 6;
        } else {
            dmn = n;
        }
        // Responsive mobile
        if( mn > 5 ) {
            mn = 5;
        } else {
            mn = n;
        }
        c.owlCarousel( {
            autoPlay: false,
            items : n,
            itemsDesktop: [1199, n],
            itemsDesktopSmall: [979, dmn],
            itemsTablet : [768, dmn],
            itemsTabletSmall : false,
            itemsMobile : [479, mn],
            paginationNumbers: false,
            pagination : false,
        } );
        $('.widget .instagram-pics .owl-item').height($('.widget .instagram-pics .owl-item').width()*3/4);
    } );
    // Sticky header
    if ( boston.header_fixed == 1 ) {
        var top_bar = $('.site-topbar');
        top_bar.wrap('<div class="site-topbar-wrap">');
        var top_bar_wrap = top_bar.parent();
        top_bar_wrap.css({
            height: top_bar.outerHeight() + 'px',
            display: 'block',
        });
        $( window ).on('resize', function () {
            top_bar_wrap.removeAttr('style');
            top_bar_wrap.css({
                height: top_bar.outerHeight() + 'px',
                display: 'block',
            });
        });
        $( window ).on("scroll", function () {
            var fromTop = $(document).scrollTop();
            var _top = 0;
            var is_fixed_admin = false;
            if ( $('#wpadminbar').length > 0 ) {
                _top = $('#wpadminbar').outerHeight();
                if ('fixed' == $('#wpadminbar').css('position')) {
                    is_fixed_admin = true;
                }
            }
            if ( fromTop > _top ) {
                top_bar_wrap.addClass('fixed');
                if (is_fixed_admin) {
                    top_bar.css('top', _top + 'px');
                } else {
                    top_bar.css('top', '0px');
                }
            } else {
                top_bar_wrap.removeClass('fixed');
                top_bar.css('top', '0');
            }
        });
    }
} );
