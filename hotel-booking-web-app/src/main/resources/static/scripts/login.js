$(document).ready(function() {
	
	 var token = getCookie("access_token");
	 if(token!=null && token!="") {
			document.location.href="index";
	 } 
	
	
	$("#loginBtn").click(function() {
		if($("#emailTxt").val()!="" && $("#pwd").val()!="") {
			getToken();
		} else {
			$(".alert-danger").html("Please provide Email address and Password");
			$(".alert-danger").show();
			$("#emailTxt").focus();
		}
	});
});


function getToken() {
   
    var username = $("#emailTxt").val();
    var password = $('#pwd').val();
    var formData = {
            'username'              : username,
            'password'             : password,
            'grant_type'    : "password"
        };
    $.ajax({
        type: "POST",
        url: api_url+"/oauth/token",
        data        : formData,
        contentType: 'application/x-www-form-urlencoded',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Basic "+window.btoa("talk2amareswaran:talk@amareswaran"));
          },
        success: function (data) {
        	var access_token = data['access_token'];
            var refresh_token = data['refresh_token'];
        	  setCookie("access_token", access_token, 25);
              setCookie("refresh_token", refresh_token, 30);
              document.location.href="index";
        	},
        error: function (data) {
        	$(".alert-danger").html("Invalid Email address/Password");
			$(".alert-danger").show();
			("#emailTxt").focus();
        }
    });

}


function setCookie(cname, cvalue, mins) {
    var d = new Date();
    d.setTime(d.getTime() + (mins * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";path=/; " + expires;
}
