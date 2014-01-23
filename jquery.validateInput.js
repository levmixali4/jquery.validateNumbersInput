;
(function ($) {
	$.extend($.fn,
		{
			validateNumbersInput: function () {
				var ctrlDown = false;
				var cmdDownLeft = false;
				var cmdDownRight = false;
				var cmdLeftCode = 91;
				var cmdRightCode = 93;

				this.bind(
				{
					keydown: function (e) {
						var charCode = (e.which) ? e.which : e.keyCode;
						if (charCode == cmdLeftCode) {
						    cmdDownLeft = true;
						    return true;
						}
						if (charCode == cmdRightCode) {
						    cmdDownRight = true;
						    return true;
						}
						if (charCode == 17) {
						    ctrlDown = true;
						    return true;
						}
						var isMetaKeyPressed = ctrlDown || cmdDownLeft || cmdDownRight;
						if (charCode == 0 && isMetaKeyPressed) // bag in mac safari
                            return true;
						return (charCode > 32 && charCode < 57) ||           // navigation + main numbers
							   (charCode > 95 && charCode < 106) ||          // right numbers
							   charCode == 8 ||                              // backspace
							   charCode == 190 || charCode == 110 ||         // decimal point
							   (charCode == 86 && isMetaKeyPressed) ||       // ctrl + v (paste)
							   (charCode == 67 && isMetaKeyPressed);         // ctrl + c (copy)
						// more codes are here http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
					},
					keyup: function (e) {
						var charCode = (e.which) ? e.which : e.keyCode;
						if (charCode == cmdLeftCode) {
							cmdDownLeft = false;
						}
						if (charCode == cmdRightCode) {
							cmdDownRight = false;
						}
						if (charCode == 17) {
							ctrlDown = false;
						}
					},
					paste: function (e) {
						var clipBoard;
						try
						{
							clipBoard = e.originalEvent.clipboardData.getData('Text')
						}
						catch(exeption)
						{
							try
							{
								clipBoard = clipboardData.getData("text");
							}
							catch (subexeption) {
							}
						}

						if (!clipBoard) {
							return true;
						}

						var float = parseFloat(clipBoard);
						if (!float || isNaN(float))
							return false;
					}
				});
			}
		});
})
(jQuery);