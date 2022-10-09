/*..Swapping the div ID with that of the Divi footer ID..*/
(function($){
	$(document).ready(function() {
	var newVal = $('#footer-editor-info');
	$('p#footer-info').html( newVal );
});
})(jQuery)