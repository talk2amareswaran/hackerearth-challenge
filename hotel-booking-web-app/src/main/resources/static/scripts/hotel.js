$(document).ready(function() {

	var id = get("id");
	getSearchResults(id);
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


function constructDiv(ratingsDiv, objIdx) {
	 $("#searchContainerResultGrid").append("<div class=\"card\"><div class=\"card-header bg-danger searchResultHeader\">"+objIdx.name+
			 "</div><div class=\"card-body\"><div class=\"fontSize20\"><i class=\"material-icons location-icon\">location_on</i>"+objIdx.address+", "+objIdx.city+", "+objIdx.province+", "+objIdx.postalcode+"</div><div>" +
			 ratingsDiv +
			 		"<div class=\"bold\">Review(s)</div><div class=\"themeColor\">"+objIdx.reviewUsername+"</div><div>"+objIdx.reviewTitle+"</div><div>"+objIdx.reviewText+"</div><div class=\"bold\">Country</div><div>"+objIdx.country+"</div><div class=\"bold\">Categories:</div><div>"+objIdx.categories+"</div><div class=\"clearfix\"><BR/><div id=\"map\"></div></div></div> </div>");
	 
	 
	 
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