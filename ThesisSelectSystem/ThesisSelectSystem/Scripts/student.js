$(document).ready(function(){
	
	$("#selects").show();
	$("#applys").hide();
	$("#protocol-self").hide();
	$("#thesis").hide();
	
	$(".select-topic").click(function(){
		$("#selects").show();
		$("#applys").hide();
		$("#protocol-self").hide();
		$("#thesis").hide();
	});
	
	$(".apply-topic").click(function(){
		$("#applys").show();
		$("#selects").hide();
		$("#protocol-self").hide();
		$("#thesis").hide();
	});
	
	$(".Protocol-self").click(function(){
		$("#protocol-self").show();
		$("#selects").hide();
		$("#applys").hide();
		$("#thesis").hide();
	});
	
	$(".Thesis").click(function(){
		$("#thesis").show();
		$("#selects").hide();
		$("#applys").hide();
		$("#protocol-self").hide();
	})
});
	function openwin(){
		window.open("detail/select.html","_blank","height=400,width=700,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no")
	}