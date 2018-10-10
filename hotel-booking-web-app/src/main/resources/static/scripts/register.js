$(document).ready(function() {
	
	 var token = getCookie("access_token");
	 if(token!=null && token!="") {
			document.location.href="index";
	 } 
	
	
	$("#registeBtn").click(function() {
		if($("#fname").val()!="" && $("#lname").val()!="" && $("#emailTxt").val()!="" && $("#pwd").val()!="") {
			register();
		} else {
			$(".alert-danger").html("Please provide the values in all the fields");
			$(".alert-danger").show();
			$("#fname").focus();
		}
	});
});


function register() {
   
	
	if(!isEmail($("#emailTxt").val())) {
		$(".alert-danger").html("Invalid Email address");
		$(".alert-danger").show();
		$(".alert-success").hide();
		return ;
	}
		
	
	
    var fname = $("#fname").val();
    var lname = $('#lname').val();
    var emailTxt = $("#emailTxt").val();
    var pwd = $('#pwd').val();
    var formData = {
            'fname'              : fname,
            'lname'             : lname,
            'emailTxt'    : emailTxt,
            'pwd'    : pwd
        };
    $.ajax({
        type: "POST",
        url: api_url+"/newuser",
        data        : formData,
        contentType: 'application/x-www-form-urlencoded',
      
        success: function (data) {
        	$(".alert-success").html("User Registered successfully");
			$(".alert-success").show();
			$(".alert-danger").hide();
        	},
        error: function (data) {
        	$(".alert-danger").html("Registration Failed/Email address already exists");
			$(".alert-danger").show();
			$(".alert-success").hide();
        }
    });

}


function isEmail(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
	}

