function searchTagAjax(value, sortcolumn, sorttype) {
	$.ajax({
		url : "http://localhost:8080/talks?tags_search_value="+value+"&sortcolumn="+sortcolumn+"&sorttype="+sorttype,
		success : function(result) {
			console.log(result);
			$("#results").html('<hr></hr>');
			for(var i=0;i<result.length;i++) {
			
			var htmlstr = "<div><h5>"+result[i].title+"</h5>";
			htmlstr += "<div class=\"clearfix\">" +
					"<div class=\"float-left\"><h6>"+result[i].main_speaker+"&nbsp;<span style=\"font-size:12px;\">"+result[i].speaker_occupation+"</span></h6></div>" +
							"<div class=\"float-right\"><div style=\"font-size:16px;\">"+toCommas(result[i].views)+" views &nbsp; &nbsp; "+result[i].event+" &nbsp; &nbsp; "+getDateString(result[i].published_date)+"</div></div>" +
									"</div>";
			htmlstr += "<div><a style=\"font-weight:bold;\" href=\""+result[i].url+"\" target=\"_blank\">"+result[i].url+"</a></div>";
			htmlstr += "<div>"+result[i].description+"</div>";
			htmlstr += "<div>"+result[i].tags+"</div>";
			htmlstr += "<div>Ratings: ";
			for(var j=0;j<result[i].ratingsList.length;j++) {
				if(j==6) {
					htmlstr += "</br>";
				}
				htmlstr += result[i].ratingsList[j].name+": "+result[i].ratingsList[j].count+"&nbsp;";
			}
			htmlstr += "</div>";
			htmlstr += "</div><hr></hr>";
			$("#results").append(htmlstr);
			}
		}
});
}

$(document).ready(function() {
	if(sessionStorage.getItem("selected_tags")!=null && document.location.href.indexOf("talkspage")!=-1) {
		searchTagAjax(sessionStorage.getItem("selected_tags"),"view","desc");
		} else if(sessionStorage.getItem("searchtag_event")!=null && document.location.href.indexOf("talkspage")!=-1) {
			searchAjax(sessionStorage.getItem("searchtag_event"));
		}
	 else {
		 sessionStorage.removeItem("selected_tags");
		 sessionStorage.removeItem("searchtag_event");
			$.ajax({
				url : "http://localhost:8080/tags",
				success : function(result) {
					var counter = 0;
					for(var i=0; i<result.tags.length;i++) {				
						if(counter==8 || result.tags[i]==="behavioral economics" || result.tags[i]==="mindfulness" || result.tags[i]==="Nobel prize" ) {
							counter =0;
							$(".buttons_group").append("<BR/><BR/>");
						}
						$(".buttons_group").append("&nbsp;&nbsp;&nbsp;<button type=\"button\" class=\"btn btn-outline-warning\" style=\"padding:12px;\">"+result.tags[i]+"</button>");
						counter++;
					}
					
					$(".buttons_group button").click(function() {
						if($(this).hasClass("btn-outline-warning")) {
							$(this).removeClass("btn-outline-warning")
							$(this).addClass("btn-warning");
						} else {
							$(this).addClass("btn-outline-warning")
							$(this).removeClass("btn-warning");
						}
					});
				}
		});
	}
	
	
	$('input[type=radio][name=optradio]').change(function() {
		if(sessionStorage.getItem("selected_tags")!=null) {
			var sortColumn = getSortColumn();
			var sortType = "asc";
			if(sortColumn=="published_date" || sortColumn=="view") {
				sortType = "desc";
			}
			searchTagAjax(sessionStorage.getItem("selected_tags"), sortColumn, sortType);
		} else if(sessionStorage.getItem("searchtag_event")!=null) {
			searchAjax(sessionStorage.getItem("searchtag_event"));
		}
	});

	
	$("button.btn-primary").click(function() {
		var searchStr = "";
		 $(".buttons_group button.btn-warning").each(function(){
			 searchStr = searchStr + $(this).text()+",";
	        });
		 searchStr = searchStr.substring(0,searchStr.length-1);
		 if(searchStr==="") {
			 $(".alert-danger").show();
			 return;
		 } 
		 sessionStorage.setItem("selected_tags", searchStr);
		 document.location.href="talkspage";
	});
	
	
	  $("#searchInput").keyup(function(){
	    //    if(event.which===13) {
	        //	if($.trim($("#searchInput").val())!="") {
	        		searchAjax($.trim($("#searchInput").val()));
	        	//}
	       // }
	    });

});


function getSortColumn() {
	return $("input[name='optradio']:checked").val();
}

function searchAjax(value) {
	
	
	var sortColumn = getSortColumn();
	var sortType = "asc";
	if(sortColumn=="published_date" || sortColumn=="view") {
		sortType = "desc";
	}
		
	
	$.ajax({
		url : "http://localhost:8080/talks?eventsTagSearch="+value+"&sortcolumn="+sortColumn+"&sorttype="+sortType,
		success : function(result) {
			sessionStorage.removeItem("selected_tags");
			sessionStorage.setItem("searchtag_event",value);
			
			$("#results").html('<hr></hr>');
			$("#results_data").html("results are showing based on your search criteria");
			for(var i=0;i<result.length;i++) {
			
			var htmlstr = "<div><h5>"+result[i].title+"</h5>";
			htmlstr += "<div class=\"clearfix\">" +
					"<div class=\"float-left\"><h6>"+result[i].main_speaker+"&nbsp;<span style=\"font-size:12px;\">"+result[i].speaker_occupation+"</span></h6></div>" +
							"<div class=\"float-right\"><div style=\"font-size:16px;\">"+toCommas(result[i].views)+" views &nbsp; &nbsp; "+result[i].event+" &nbsp; &nbsp; "+getDateString(result[i].published_date)+"</div></div>" +
									"</div>";
			htmlstr += "<div><a style=\"font-weight:bold;\" href=\""+result[i].url+"\" target=\"_blank\">"+result[i].url+"</a></div>";
			htmlstr += "<div>"+result[i].description+"</div>";
			htmlstr += "<div>"+result[i].tags+"</div></div><hr></hr>";
			$("#results").append(htmlstr);
			}
		}
});
}
function toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function getDateString(value) {
	var d = new Date(value*1000);
	return (d.getYear()+1900)+"/"+(d.getMonth()+1)+"/"+d.getDate();
}


