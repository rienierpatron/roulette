var machine = $("#machine").slotMachine({
	active	: 0,
	delay	: 500
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
		}, 3000);
		
	}
	
});
$('#slotMachineButtonAgain').click(function(){
	$('html, body').animate({ scrollTop: 0 }, 'slow');
	setTimeout(function(){
		window.location.replace("http://localhost/spin/");
}, 900);
});