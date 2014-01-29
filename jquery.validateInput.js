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

				        var isDecimalPoint = charCode == 190 || charCode == 110;
				        if (isDecimalPoint) {
				            return $(this).val().indexOf(".") == -1;
				        }

				        var isMetaKeyPressed = ctrlDown || cmdDownLeft || cmdDownRight;
				        if (charCode == 0 && isMetaKeyPressed) // bag in mac safari
				            return true;
				        var isModificationChar = charCode == 86 || charCode == 88 || charCode == 90 || charCode == 67;
				        return (charCode > 32 && charCode < 57) ||           // navigation + main numbers
							   (charCode > 95 && charCode < 106) ||          // right numbers
							   charCode == 8 ||                              // backspace
							   (isModificationChar && isMetaKeyPressed);         // ctrl + c (copy)
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

				        return !isNaN(clipBoard);
				    }
				});
			}
		});
})
(jQuery);