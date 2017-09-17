$("#color1").colpick({

	colorScheme:'dark',

	layout:'rgbhex',

	color:'ff8800',

	onSubmit:function(hsb,hex,rgb,el) {

		$(el).css('background-color', '#'+hex);

		$(el).colpickHide();

	}

}).css('background-color', '#00ff00');

$("#color2").colpick({

	colorScheme:'dark',

	layout:'rgbhex',

	color:'ff8800',

	onSubmit:function(hsb,hex,rgb,el) {

		$(el).css('background-color', '#'+hex);

		$(el).colpickHide();

	}

}).css('background-color', '#0000ff');

$("#color3").colpick({

	colorScheme:'dark',

	layout:'rgbhex',

	color:'ff8800',

	onSubmit:function(hsb,hex,rgb,el) {

		$(el).css('background-color', '#'+hex);

		$(el).colpickHide();

	}

}).css('background-color', '#ff0000');

$("#rang1-2").change(function(){
	$("#rang2-1").val($("#rang1-2").val());
});

$("#rang2-2").change(function(){
	$("#rang3-1").val($("#rang2-2").val());
});
