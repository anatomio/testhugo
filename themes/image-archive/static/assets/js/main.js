/*
	"Image Archive" is a gallery of galleries, an image oriented portfolio or photoblog theme for Hugo. It is a port of the [Phugo theme](http://github.com/aerohub/phugo), which by itself is a port of the [HTML5 UP Multiverse template](https://html5up.net/multiverse).
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper');

		// Hack: Enable IE workarounds.
			if (skel.vars.IEVersion < 12)
				$body.addClass('ie');

		// Touch?
			if (skel.vars.mobile)
				$body.addClass('touch');

		// Transitions supported?
			if (skel.canUse('transition')) {

				// Add (and later, on load, remove) "loading" class.
					$body.addClass('loading');

					$window.on('load', function() {
						window.setTimeout(function() {
							$body.removeClass('loading');
						}, 100);
					});

				// Prevent transitions/animations on resize.
					var resizeTimeout;

					$window.on('resize', function() {

						window.clearTimeout(resizeTimeout);

						$body.addClass('resizing');

						resizeTimeout = window.setTimeout(function() {
							$body.removeClass('resizing');
						}, 100);

					});

			}

		// Scroll back to top.
			$window.scrollTop(0);

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Panels.
			var $panels = $('.panel');

			$panels.each(function() {

				var $this = $(this),
					$toggles = $('[href="#' + $this.attr('id') + '"]'),
					$closer = $('<div class="closer" />').appendTo($this);

				// Closer.
					$closer
						.on('click', function(event) {
							$this.trigger('---hide');
						});

				// Events.
					$this
						.on('click', function(event) {
							event.stopPropagation();
						})
						.on('---toggle', function() {

							if ($this.hasClass('active'))
								$this.triggerHandler('---hide');
							else
								$this.triggerHandler('---show');

						})
						.on('---show', function() {

							// Hide other content.
								if ($body.hasClass('content-active'))
									$panels.trigger('---hide');

							// Activate content, toggles.
								$this.addClass('active');
								$toggles.addClass('active');

							// Activate body.
								$body.addClass('content-active');

						})
						.on('---hide', function() {

							// Deactivate content, toggles.
								$this.removeClass('active');
								$toggles.removeClass('active');

							// Deactivate body.
								$body.removeClass('content-active');

						});

				// Toggles.
					$toggles
						.removeAttr('href')
						.css('cursor', 'pointer')
						.on('click', function(event) {

							event.preventDefault();
							event.stopPropagation();

							$this.trigger('---toggle');

						});

			});

			// Global events.
				$body
					.on('click', function(event) {

						if ($body.hasClass('content-active')) {

							event.preventDefault();
							event.stopPropagation();

							$panels.trigger('---hide');

						}

					});

				$window
					.on('keyup', function(event) {

						if (event.keyCode == 27
						&&	$body.hasClass('content-active')) {

							event.preventDefault();
							event.stopPropagation();

							$panels.trigger('---hide');

						}

					});

		// Header.
			var $header = $('#header');

			// Links.
				$header.find('a').each(function() {

					var $this = $(this),
						href = $this.attr('href');

					// Internal link? Skip.
						if (!href
						||	href.charAt(0) == '#')
							return;

					// Redirect on click.
						$this
							.removeAttr('href')
							.css('cursor', 'pointer')
							.on('click', function(event) {

								event.preventDefault();
								event.stopPropagation();

								window.location.href = href;

							});

				});

		// Footer.
			var $footer = $('#footer');

			// Copyright.
			// This basically just moves the copyright line to the end of the *last* sibling of its current parent
			// when the "medium" breakpoint activates, and moves it back when it deactivates.
				$footer.find('.copyright').each(function() {

					var $this = $(this),
						$parent = $this.parent(),
						$lastParent = $parent.parent().children().last();

					skel
						.on('+medium', function() {
							$this.appendTo($lastParent);
						})
						.on('-medium', function() {
							$this.appendTo($parent);
						});

				});

		// Main.
			var $main = $('#main');

			// Thumbs.
				$main.children('.thumb').each(function() {

					var	$this = $(this),
						$image = $this.find('.image'), $image_img = $image.children('img'),
						x;

					// No image? Bail.
						if ($image.length == 0)
							return;

					// Image.
					// This sets the background of the "image" <span> to the image pointed to by its child
					// <img> (which is then hidden). Gives us way more flexibility.

						// Set background.
							$image.css('background-image', 'url(' + $image_img.attr('src') + ')');

						// Set background position.
							if (x = $image_img.data('position'))
								$image.css('background-position', x);

						// Hide original img.
							$image_img.hide();

					// Hack: IE<11 doesn't support pointer-events, which means clicks to our image never
					// land as they're blocked by the thumbnail's caption overlay gradient. This just forces
					// the click through to the image.
						if (skel.vars.IEVersion < 11)
							$this
								.css('cursor', 'pointer')
								.on('click', function() {
									$image.trigger('click');
								});

				});

			// Thumbs Index.
				$main.children('.thumb').each(function() {

					var	$this = $(this),
						$link = $this.find('.link'), $link_img = $link.children('img'),
						x;

					// No link? Bail.
						if ($link.length == 0)
							return;

					// link.
					// This sets the background of the "link" <span> to the link pointed to by its child
					// <img> (which is then hidden). Gives us way more flexibility.

						// Set background.
							$link.css('background-image', 'url(' + $link_img.attr('src') + ')');

						// Set background position.
							if (x = $link_img.data('position'))
								$link.css('background-position', x);

						// Hide original img.
							$link_img.hide();

					// Hack: IE<11 doesn't support pointer-events, which means clicks to our link never
					// land as they're blocked by the thumbnail's caption overlay gradient. This just forces
					// the click through to the link.
						if (skel.vars.IEVersion < 11)
							$this
								.css('cursor', 'pointer')
								.on('click', function() {
									$link.trigger('click');
								});

				});
			
			// Poptrox.
				$main.poptrox({
					baseZIndex: 20000,
					caption: function($a) {

						var s = '';

						$a.nextAll().each(function() {
							s += this.outerHTML;
						});

						return s;

					},
					fadeSpeed: 300,
					onPopupClose: function() { $body.removeClass('modal-active'); },
					onPopupOpen: function() { $body.addClass('modal-active'); },
					overlayOpacity: 0,
					popupCloserText: '',
					popupHeight: 150,
					popupLoaderText: '',
					popupSpeed: 300,
					popupWidth: 150,
					selector: '.thumb > a.image',
					usePopupCaption: true,
					usePopupCloser: true,
					usePopupDefaultStyling: false,
					usePopupForceClose: true,
					usePopupLoader: true,
					usePopupNav: true,
					windowMargin: 50
				});

				// Hack: Set margins to 0 when 'xsmall' activates.
					skel
						.on('-xsmall', function() {
							$main[0]._poptrox.windowMargin = 50;
						})
						.on('+xsmall', function() {
							$main[0]._poptrox.windowMargin = 0;
						});

	});

})(jQuery);











/*
	Masonry Layout with Flexbox by Jhey Tompkins
	https://codeburst.io/how-to-the-masonry-layout-56f0fe0b19df
	https://codepen.io/jh3y/pen/pLyVwo
*/
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Classname reference
var CLASSES = {
	MASONRY: 'masonry',
	PANEL: 'masonry-panel',
	PAD: 'masonry-pad'
};

var Masonry = function Masonry(el, config) {
	_classCallCheck(this, Masonry);

	_initialiseProps.call(this);

	var layout = this.layout;

	this.container = el;
	this.panels = el.children;
	this.config = config;
	this.state = {
	heights: []
	};
	layout();
}

var _initialiseProps = function _initialiseProps() {
	var _this = this;

	/**
	 * Reset the layout by removing padding elements, resetting heights
	 * reference and removing the container inline style
	 */
	this.reset = function () {
	var container = _this.container;

	_this.state.heights = [];
	var fillers = container.querySelectorAll('.' + CLASSES.PAD);
	if (fillers.length) {
	  for (var f = 0; f < fillers.length; f++) {
		fillers[f].parentNode.removeChild(fillers[f]);
	  }
	}
	container.removeAttribute('style');
	};

	/**
	 * Iterate through panels and work out the height of the layout
	 */
	this.populateHeights = function () {
	var panels = _this.panels,
		state = _this.state;
	var heights = state.heights;

	for (var p = 0; p < panels.length; p++) {
	  var panel = panels[p];

	  var _getComputedStyle = getComputedStyle(panel),
		  cssOrder = _getComputedStyle.order,
		  msFlexOrder = _getComputedStyle.msFlexOrder,
		  height = _getComputedStyle.height;

	  var order = cssOrder || msFlexOrder;
	  if (!heights[order - 1]) heights[order - 1] = 0;
	  heights[order - 1] += parseFloat(height, 10);
	}
	};

	/**
	 * Set the layout height based on referencing the content cumulative height
	 * This probably doesn't need its own function but felt right to be nice
	 * and neat
	 */	
	this.setLayout = function () {
	var container = _this.container,
		state = _this.state;
	var heights = state.heights;

	_this.state.maxHeight = Math.max.apply(Math, _toConsumableArray(heights));
	container.style.height = _this.state.maxHeight + 'px';
	};

	this.getViewportCols = function () {
	var config = _this.config;

	var breakpoint = 0;
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
	  for (var _iterator = Object.keys(config.breakpoints)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var b = _step.value;

		if (window.innerWidth > config.breakpoints[b]) breakpoint = b;
	  }
	} catch (err) {
	  _didIteratorError = true;
	  _iteratorError = err;
	} finally {
	  try {
		if (!_iteratorNormalCompletion && _iterator.return) {
		  _iterator.return();
		}
	  } finally {
		if (_didIteratorError) {
		  throw _iteratorError;
		}
	  }
	}

	return config.cols[breakpoint];
	};

	/**
	 * JavaScript method for setting order of each panel based on panels.length and desired number of columns
	 */
	this.setPanelStyles = function () {
	var panels = _this.panels;

	var cols = _this.getViewportCols(); // There needs to be an internal reference here that checks how many cols for viewport size
	for (var p = 0; p < panels.length; p++) {
	  panels[p].style.order = (p + 1) % cols === 0 ? cols : (p + 1) % cols;
	  panels[p].style.width = 100 / cols + '%';
	}
	};

	/**
	 * Pad out layout "columns" with padding elements that make heights equal
	 */
	this.pad = function () {
	var container = _this.container;
	var _state = _this.state,
		heights = _state.heights,
		maxHeight = _state.maxHeight;

	heights.map(function (height, idx) {
	  if (height < maxHeight && height > 0) {
		var pad = document.createElement('div');
		pad.className = CLASSES.PAD;
		pad.style.height = maxHeight - height + 'px';
		pad.style.order = idx + 1;
		pad.style.msFlexOrder = idx + 1;
		container.appendChild(pad);
	  }
	});
  };

	/**
	 * Resets and lays out elements
	 */;
	this.layout = function () {
		_this.reset();
		_this.setPanelStyles();
		_this.populateHeights();
		_this.setLayout();
		_this.pad();
	};
};

var masonryConfig = {
  breakpoints: {
    sm: 430,
    md: 768,
    lg: 992,
    xl: 1500
  },
  cols: {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4
  }
};
window.myMasonry = new Masonry(document.querySelector('.' + CLASSES.MASONRY), masonryConfig);

/**
 * Here we can make optimizations for responding to loading images and
 * window resizing
 *
 * NOTE:: For better performance, please debounce this!
 */
window.addEventListener('resize', myMasonry.layout);
var load = imagesLoaded(myMasonry.container, function () {
  return myMasonry.layout();
});
load.on('progress', function (instance, image) {
  // This trick allows us to avoid any floating pixel sizes 👍
  image.img.style.height = image.img.height;
  image.img.setAttribute('height', image.img.height);
  image.img.classList.remove('loading');
  // NOTE: Not the cleanest thing to do here but this is a demo 😅
  var parentPanel = image.img.parentNode.parentNode;
  parentPanel.setAttribute('style', 'height: ' + image.img.height + 'px');
  parentPanel.classList.remove(CLASSES.PANEL + '--loading');
  myMasonry.layout();
});