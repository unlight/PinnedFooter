// jQuery plugin
// Name: Pinned Footer
// Description: Footer always at the bottom of the page, not window.
// URL: https://github.com/search?q=PinnedFooter
// Version: 1.04

(function(){
	
	$.PinFooter = function(Container, Options) {
		var Self = this;
		var Configuration = {
			FixOnScroll: true,		// Add handler on window scroll event
			FixOnResize: true,		// Add handler on window resize event
			FixOnLoad: true,		// Add handler on window load event
			Method: 'ExpandBody', 	// Method to set footer at the bottom (ExpandBody, ExpandContainer)
			HeightAddition: 0,	// Addition value which will be added to Height of $Content (only for method 'ExpandContainer')
			Timer: null, 			// Run timer (only for method 'ExpandContainer')
			BodySelector: null
		};
		
		Self.Settings = $.extend({ }, Configuration, Options);

		// Public methods.
		// http://stackoverflow.com/questions/681087
		Self.IsVerticalScrollbar = function() {
			var root = document.compatMode == 'BackCompat' ? document.body : document.documentElement;
			return (root.scrollHeight > root.clientHeight);
		}

		// Private methods.
		var C = function(Name, Default) {
			if (typeof Default == 'undefined') Default = false;
			var Result = Default;
			if (Name in Self.Settings) Result = Self.Settings[Name];
			return Result;
		};
	
		var ExpandContainer = function() {
			if (Self.IsVerticalScrollbar()) return;
			// http://habrahabr.ru/blogs/webdev/116267/
			var $Content = $(this).css('position', 'relative');
			var DummyHeight = $Content.height() + $(window).height() - $("body").height() + C('HeightAddition', 0);
			var Ruler = $("<div>").appendTo($Content);
			DummyHeight = Math.max(Ruler.position().top, DummyHeight);
			Ruler.remove();
			if ($Content.height() < DummyHeight) {
				$Content.height(DummyHeight);
			}
		};
		
		var ExpandBody = function() {
			if (Self.IsVerticalScrollbar()) return;
			var WindowHeight = $(window).height();
			var BodyHeight = $("body").outerHeight(true);
			var Margin = WindowHeight - BodyHeight;
			var MaxHeight = 0;
			$Body.children().each(function(Index, Child){
				var H = $(Child).height();
				if (H > MaxHeight) MaxHeight = H;
			});
			if (MaxHeight > $Body.height()) $Body.height(MaxHeight);
			$Body.height($Body.height() + Margin);
		};
		
		// Initialize.
		var HandlerFunction;
		var $Container = $(Container).first();
		var $Body = $(Container).prev();
		var BodySelector = C('BodySelector');
		if (BodySelector) $Body = $(BodySelector).first();
		
		switch(C('Method')) {
			case 'ExpandContainer': {
				HandlerFunction = function() {
					ExpandContainer.call($Container);
				};
			} break;
			default:
			HandlerFunction = ExpandBody;
		}
		
		if (C('FixOnScroll')) $(window).scroll(HandlerFunction);
		if (C('FixOnResize')) $(window).resize(HandlerFunction);
		if (C('FixOnLoad')) $(window).load(HandlerFunction);
		
		HandlerFunction();
		
		var Timer = parseInt(C('Timer'), 10);
		if (Timer > 0) setInterval(HandlerFunction, Timer);

		return this;
	}
	
	$.fn.PinFooter = function(Options) {
		return $.PinFooter(this, Options);
	}

})();