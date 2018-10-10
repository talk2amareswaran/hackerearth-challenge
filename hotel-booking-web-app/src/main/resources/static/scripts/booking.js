$(document).ready(function() {

	 var token = getCookie("access_token");
	 if(token!=null && token!="") {
			var id = get("id");
			getSearchResults(id);
	 } else {
		 document.location.href="login";
	 }
});

function get(name){
	   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(name[1]);
	}


function getSearchResults(id) {
	
	var uri = "/search/hotels/"+id;

	
	 $.ajax({url : api_url + uri, success: function(result){
		 

			 $("#searchContainerResultGrid").html('');
		 
		 
		 
		 if(result.searchResults!=null && result.searchResults!==undefined) {
			 
			 for(var i=0;i<result.searchResults.length;i++) {
				 
				 if(result.searchResults[i].reviewUsername==="write a review")
					 {
						 result.searchResults[i].reviewTitle="";
						 result.searchResults[i].reviewText="";
						 result.searchResults[i].reviewUsername="";
					 }
					 
				 var ratingsDiv = "<span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span>";
				 if(result.searchResults[i].ratings!=null && result.searchResults[i].ratings!=undefined && result.searchResults[i].ratings!=="") {
					
						if(Math.round(result.searchResults[i].ratings)>=5) {
							ratingsDiv= "<span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span>";
						}
						if(Math.round(result.searchResults[i].ratings)<=4) {
							
							ratingsDiv= "<span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star\"></span>";
						}
						if(Math.round(result.searchResults[i].ratings)<=3) {
							ratingsDiv= "<span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span>";
						}
						if(Math.round(result.searchResults[i].ratings)<=2) {
							ratingsDiv= "<span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span>";
						}
						if(Math.round(result.searchResults[i].ratings)<=1) {
							ratingsDiv= "<span class=\"fa fa-star checked\"></span><span class=\"fa fa-star \"></span><span class=\"fa fa-star \"></span><span class=\"fa fa-star \"></span><span class=\"fa fa-star \"></span>";
						}
				 }
				
				 constructDiv(ratingsDiv, result.searchResults[i]);
				 
				
			 }
		 } 
	    }
	 });
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1);
        if (c.indexOf(name) === 0)
            return c.substring(name.length, c.length);
    }
    return "";
}


function constructDiv(ratingsDiv, objIdx) {
	 $("#searchContainerResultGrid").append("<div class=\"card\"><div class=\"card-header bg-danger searchResultHeader\">"+objIdx.name+
			 "</div><div class=\"card-body\"><div class=\"fontSize20\"><i class=\"material-icons location-icon\">location_on</i>"+objIdx.address+", "+objIdx.city+", "+objIdx.province+", "+objIdx.postalcode+"</div><div>" +
			 ratingsDiv +
			 		"<div class=\"bold\">Review(s)</div><div class=\"themeColor\">"+objIdx.reviewUsername+"</div><div>"+objIdx.reviewTitle+"</div><div>"+objIdx.reviewText+"</div><div class=\"bold\">Country</div><div>"+objIdx.country+"</div><div class=\"bold\">Categories:</div><div>"+objIdx.categories+"</div>" +
			 				"<div class=\"form-group\"><label for=\"sel1\">Rooms: </label><select style=\"width: 20%;\" class=\"form-control\" id=\"sel1\" name=\"sellist1\"><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option></select></div>" +
			 				" <div>Date:<br/><input type=\"date\" id=\"bday\"> </div><BR/> <button type=\"button\" class=\"btn btn-success float-left\" onclick=\"booksuccess("+objIdx.id+")\">Book Now</button><BR/>" +
			 						"<div class=\"clearfix\"><BR/><div id=\"map\"></div></div></div> </div>");
	 
	 
	 
	 $("#searchContainerResultGrid").append("<div class=\"clearfix\">&nbsp;&nbsp</div>");
	 console.log(objIdx.latitude);
	 console.log(objIdx.longitude);
	 initMap(objIdx.latitude, objIdx.longitude);
	 
}



function initMap(latVal,longVal) {
	  // The location of Uluru
	  var uluru = {lat: parseFloat(latVal), lng: parseFloat(longVal)};
	  // The map, centered at Uluru
	  var map = new google.maps.Map(
	      document.getElementById('map'), {zoom: 18, center: uluru});
	  // The marker, positioned at Uluru
	  var marker = new google.maps.Marker({position: uluru, map: map});
	}

function booksuccess(id) {
	var selectedVal = $("#sel1").val();
	var bday = $("#bday").val();
	  if(bday==null || bday=="")
		  {
		  $(".alert-danger").html("Please choose Date");
			$(".alert-danger").show();
			return;
		  }
	    var formData = {
	            'id'              : id,
	            'rooms'             : selectedVal,
	            'date'             : bday
	        };
	  $.ajax({
	        type: "GET",
	        url: api_url+"/book/confirm",
	        data        : formData,
	        contentType: 'application/x-www-form-urlencoded',
	        beforeSend: function(request) {
	            request.setRequestHeader("Authorization", "Bearer "+ getCookie("access_token"));
	          },
	        success: function (data) {
	        	$(".alert-success").html("Room(s) are booked successfully");
				$(".alert-success").show();
				$(".alert-danger").hide();
	        	},
	        error: function (data) {
	        	$(".alert-danger").html("Booking failed. Please try once again");
				$(".alert-danger").show();
				$(".alert-success").hide();
	        }
	    });
	
	
}