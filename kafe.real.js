/*jshint -W089 */
(function($)
{
	var pluginName = 'moneyBehavior',
		defaults = {
			debug: false,
			selectOnFocus: true
		};

	var KEY_0 = 48;
	var KEY_1 = 49;
	var KEY_2 = 50;
	var KEY_3 = 51;
	var KEY_4 = 52;
	var KEY_5 = 53;
	var KEY_6 = 54;
	var KEY_7 = 55;
	var KEY_8 = 56;
	var KEY_9 = 57;

	var KEY_NUMPAD_0 = 96;
	var KEY_NUMPAD_1 = 97;
	var KEY_NUMPAD_2 = 98;
	var KEY_NUMPAD_3 = 99;
	var KEY_NUMPAD_4 = 100;
	var KEY_NUMPAD_5 = 101;
	var KEY_NUMPAD_6 = 102;
	var KEY_NUMPAD_7 = 103;
	var KEY_NUMPAD_8 = 104;
	var KEY_NUMPAD_9 = 105;

	var KEY_ENTER     = 13;
	var KEY_SHIFT     = 16;
	var KEY_CTRL      = 17;
	var KEY_ALT       = 18;
	var KEY_BACKSPACE = 8;
	var KEY_TAB       = 9;

	var KEY_ALPHA_NUMERIC_A = 65;
	var KEY_ALPHA_NUMERIC_C = 67;
	var KEY_ALPHA_NUMERIC_V = 86;
	var KEY_ALPHA_NUMERIC_X = 88;

	var numberKeys           = [KEY_0, KEY_1, KEY_2, KEY_3, KEY_4, KEY_5, KEY_6, KEY_7, KEY_8, KEY_9];
	var numericPadKeys       = [KEY_NUMPAD_0 , KEY_NUMPAD_1, KEY_NUMPAD_2, KEY_NUMPAD_3, KEY_NUMPAD_4, KEY_NUMPAD_5, KEY_NUMPAD_6, KEY_NUMPAD_7, KEY_NUMPAD_8, KEY_NUMPAD_9];
	var non_digit_valid_keys = [KEY_TAB, KEY_ENTER, KEY_SHIFT, KEY_CTRL, KEY_ALT];

	var numbers = numberKeys.concat(numericPadKeys);

	var control_keys = [KEY_ALPHA_NUMERIC_A, KEY_ALPHA_NUMERIC_C, KEY_ALPHA_NUMERIC_V, KEY_ALPHA_NUMERIC_X];

	function Plugin( element, options )
	{
		this.$element   = $(element);
		this.element    = element;
		this.options    = $.extend({}, defaults, options, this.$element.data()) ;
		this._defaults  = defaults;
		this._name      = pluginName;
		this.can_render = false;

		this.value = [];

		if (this.$element.attr("value") && this.$element.attr("value").length > 0) {
			this.value = this.$element.val().replace(/[^0-9]/g, "").split("");
		} else {
			this.$element.val("0,00");
		}

		init.call(this);
	}

	function init()
	{
		var self = this;

		if (this.options.selectOnFocus)
		{
			this.$element.on("click", function()
			{
				self.$element.select();
			});
		}

		this.$element.on("paste", function(event)
		{
			var pastedData = event.originalEvent.clipboardData.getData('text');
			var cleaned = pastedData.replace(/[^0-9]/g, "");

			if (cleaned.length > 0)
			{
				self.value = cleaned.split("");
				self.can_render = true;
				render.call(self);
			}

			event.preventDefault();
			return true;
		});

		this.$element.on("keydown", function(event)
		{
			var value = event.which;
			var meta = event.metaKey || event.ctrlKey;

			if (window.getSelection().toString() === self.$element.val()) {
				self.value = [];
			}

			if (is_digit(value))
			{
				_push.call(self, value);
			}
			else if (value === KEY_BACKSPACE)
			{
				_pop.call(self);
			}

			if (self.value === undefined)
			{
				self.value = [];
			}

			render.call(self);

			// prevent default action... but allow paste
			if(meta && control_keys.indexOf(value) !== -1) {
				return true;
			}
			else if (non_digit_valid_keys.indexOf( value ) !== -1) {
				return true;
			}
			else
			{
				event.preventDefault();
				return false;
			}
		});

		this.$element.on("blur", function()
		{
			self.can_render = true;
			render.call(self);
		});
	}

	function is_digit( value )
	{
		return numbers.indexOf( value ) !== -1;
	}

	function _pop()
	{
		this.can_render = true;

		return this.value.pop();
	}

	function _push( digit )
	{
		this.can_render = true;

		var ascii_math = 0;

		if (numberKeys.indexOf(digit) !== -1) {
			ascii_math = 48;
		}
		else if (numericPadKeys.indexOf(digit) !== -1) {
			ascii_math = 96;
		}

		this.value.push( digit - ascii_math );
	}

	function render()
	{
		if (!this.can_render) {
			return;
		}

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

		// after render, reset.
		this.can_render = false;
	}

	// http://blog.tompawlak.org/number-currency-formatting-javascript
	function _format(num)
	{
		return num
		   .toFixed(2)
		   .replace(".", ",")
		   .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
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

})(jQuery);
