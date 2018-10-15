(function ($) {
 "use strict";
		// Masking form
		$('#postcode').mask('9999', {placeholder:'X'});
		$('#year').mask('9999', {placeholder:'X'});
		$('#cvv').mask('999', {placeholder:'X'});
		$('#card').mask('9999-9999-9999-9999', {placeholder:'X'});
		$("#phone").mask('(999) 999-9999', {placeholder:'X'});
		$("#date").mask('99/99/9999', {placeholder:'X'});
		$("#serial").mask('***-***-***-***-***-***', {placeholder:'_'});
		$("#tax").mask('99-9999999', {placeholder:'X'});
 
})(jQuery); 