// jQuery plugin. Pinned Footer
// Footer always at the bottom of the page, not window.
(function($) {
	
	$.PinFooter = function(Container, Options) {
		var Self = this;
		var Configuration = {
			FixScroll: true,
			FixResize: true
		};
		Self.Settings = {};

		// Public methods.
		Self.IsVerticalScrollbar = function() {
			var root = document.compatMode == 'BackCompat' ? document.body : document.documentElement;
			return (root.scrollHeight > root.clientHeight);
		}

		var C = function(Name, Default) {
			if (typeof(Default) == 'undefined') Default = false;
			var Result = Default;
			if (Name in Self.Settings) Result = Self.Settings[Name];
			return Result;
		}
		
		// Private methods.
		var ExpandContainer = function() {
			// http://stackoverflow.com/questions/681087
			if (Self.IsVerticalScrollbar()) return;
			var $Content = $(this);
			$Content.css('position', 'relative');
			var DummyHeight = $Content.height() + $(window).height() - $("body").height() - 2; // S: -2 was added by me
			var Ruler = $("<div>").appendTo($Content);
			DummyHeight = Math.max(Ruler.position().top, DummyHeight);
			Ruler.remove();
			$Content.height(DummyHeight);
		}

		// Initialize.
		var $Container = $(Container).first();
		// TODO: FIX IF $.PinFooter("#Content, #Panel");
		Self.Settings = $.extend({ }, Configuration, Options);
		
		ExpandContainer.call($Container);
		
		if (C('FixScroll')) $(window).scroll(function(){
			ExpandContainer.call($Container);
		});
		
		if (C('FixResize')) $(window).resize(function(){
			ExpandContainer.call($Container);
		});

		return this;

	}
	
	$.fn.PinFooter = function(Options) {
		return $.PinFooter(this, Options);
	}

})(jQuery);