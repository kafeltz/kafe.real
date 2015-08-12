/*jshint -W089 */
(function($, window)
{
	var pluginName = 'moneyBehavior',
		defaults = {
			debug: false,
			selectOnFocus: false
		};
	var numberKeys     = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
	var numericPadKeys = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
	var carretKeys     = [33, 34, 35, 36, 37, 39];
	var validKeys      = [8, 9, 16, 17, 18, 91 ].concat(numberKeys).concat(numericPadKeys);

	function Plugin( element, options )
	{
		this.$element  = $(element);
		this.element   = element;
		this.options   = $.extend({}, defaults, options) ;
		this._defaults = defaults;
		this._name     = pluginName;

		this.value = [];

		if (this.$element.attr("value") && this.$element.attr("value").length !== 0) {
			this.value = this.$element.val().replace(/[^0-9]/g, "").split("");
		}

		init.call(this);
	}

	function init()
	{
		var self = this;

		this.$element.on("paste", function(event)
		{
			var pastedData = event.originalEvent.clipboardData.getData('text');
			var cleaned = pastedData.replace(/[^0-9]/g, "");

			if (cleaned.length)
			{
				self.value = cleaned.split("");
				render.call(self);
			}

			event.preventDefault();
			return true;
		});

		this.$element.on("keydown", function(event)
		{
			var value = event.which;

			// carret at the end of the string, appends the chars, otherwise, it insert at carret position
			var append = true;

			console.info( getPos(self.$element), self.$element.val().length );

			append = getPos(self.$element) === self.$element.val().length;

			if (window.getSelection().toString() === self.$element.val()) {
				self.value = [];
			}

			if (numberKeys.indexOf(value) !== -1) {
				if (append) {
					self.value.push( value - 48 );
				} else {
					self.value.splice(getPos(self.$element) - 1, 0, value - 48 );
				}
			}
			else if (numericPadKeys.indexOf(value) !== -1) {
				if (append) {
					self.value.push( value - 96 );
				} else {
					self.value.splice(getPos(self.$element), 0, value - 96 );
				}
			}
			else if (value === 8) {
				self.value.pop();
			}


			if (self.value === undefined) {
				self.value = [];
			}


			if (checkValidKeys.call(self, event)) {
				render.call(self);
			}


			// prevent rendering...
			// allow paste
			if(event.metaKey&& value == 86 || carretKeys.indexOf( value ) !== -1)
			{
				return true;
			}
			else
			{
				event.preventDefault();
				return false;
			}
		});
	}

	function checkValidKeys( event )
	{
	   return validKeys.indexOf( event.which ) !== -1;
	}

	function render()
	{
		var v = 0.0;

		if (this.value.length > 0)
		{
			v = parseFloat(this.value.join(""));

			v = v / 100;

			v = _format( v );

			this.$element.val( v );
		}
		else
		{
			this.$element.val( "0,00" );
		}
	}

	// http://blog.tompawlak.org/number-currency-formatting-javascript
	function _format(num)
	{
		return num
		   .toFixed(2)
		   .replace(".", ",")
		   .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
	}

	// copied and changed from jquery.mask.js source
	function getPos($element)
	{
		var sel;
		var	pos = 0;
		var	ctrl = $element.get(0);
		var	dSel = document.selection;
		var	cSelStart = ctrl.selectionStart;

		// IE Support
		if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1)
		{
			sel = dSel.createRange();
			sel.moveStart('character', el.is('input') ? -el.val().length : -el.text().length);
			pos = sel.text.length;
		}
		// Firefox support
		else if (cSelStart || cSelStart === '0')
		{
			pos = cSelStart;
		}

		return pos;
	}

	$.fn[pluginName] = function( options )
	{
		return this.each(function()
		{
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	};

})(jQuery, window);