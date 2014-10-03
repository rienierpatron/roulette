var machine = $("#machine").slotMachine({
	active	: 0,
	delay	: 700
});
$('#slotMachineButtonShuffle').click(function(){
	$(this).hide();
	$('#slotMachineButtonStop').show();
	machine.shuffle();
});

$("#slotMachineButtonStop").click(function(){
	if( machine.isRunning()){
		$(this).hide();
		$("#slotMachineButtonWaiting").show();
		setTimeout(function(){
			machine.stop(1);
		}, 1000);
		setTimeout(function(){
			$("#slotMachineButtonWaiting").hide();
			$("#slotMachineMessage").show();
			$("#slotMachineButtonAgain").show();
		}, 2900);
		
	}
	
});
$('#slotMachineButtonAgain').click(function(){
	$('html, body').animate({ scrollTop: 0 }, 'slow');
	setTimeout(function(){
		window.location.replace("http://rienierpatron.github.io/roulette/");
}, 900);
});