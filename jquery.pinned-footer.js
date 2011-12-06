// jQuery plugin
// Name: Pinned Footer
// Description: Footer always at the bottom of the page, not window.
// URL: https://github.com/search?q=PinnedFooter
// Version: 1.01

(function($){
	
	$.PinFooter = function(Container, Options) {
		var Self = this;
		var Configuration = {
			FixScroll: true,
			FixResize: true,
			HeightAddition: 0,
			Timer: null
		};
		Self.Settings = {};

		// Public methods.
		Self.IsVerticalScrollbar = function() {
			var root = document.compatMode == 'BackCompat' ? document.body : document.documentElement;
			return (root.scrollHeight > root.clientHeight);
		}

		// Private methods.
		var C = function(Name, Default) {
			if (typeof(Default) == 'undefined') Default = false;
			var Result = Default;
			if (Name in Self.Settings) Result = Self.Settings[Name];
			return Result;
		};
		
		var ExpandContainer = function() {
			// http://stackoverflow.com/questions/681087
			if (Self.IsVerticalScrollbar()) return;
			var $Content = $(this);
			$Content.css('position', 'relative');
			var DummyHeight = $Content.height() + $(window).height() - $("body").height() + C('HeightAddition', 0);
			var Ruler = $("<div>").appendTo($Content);
			DummyHeight = Math.max(Ruler.position().top, DummyHeight);
			Ruler.remove();
			if ($Content.height() < DummyHeight) {
				$Content.height(DummyHeight);
			}
		};

		// Initialize.
		var $Container = $(Container).first();
		Self.Settings = $.extend({ }, Configuration, Options);
		
		var ExpandContainerHandler = function() {
			ExpandContainer.call($Container);
		};
		
		ExpandContainerHandler();
		
		if (C('FixScroll')) $(window).scroll(ExpandContainerHandler);
		if (C('FixResize')) $(window).resize(ExpandContainerHandler);
		
		var Timer = parseInt(C('Timer'), 10);
		if (Timer > 0) setInterval(ExpandContainerHandler, Timer);

		return this;
	}
	
	$.fn.PinFooter = function(Options) {
		return $.PinFooter(this, Options);
	}

})(jQuery);