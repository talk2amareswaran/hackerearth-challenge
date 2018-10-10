$(document).ready(
		function() {
		
			
			  $('#searchTxt').autocomplete({
			      source: api_url + "/search/term",
			      select: function (event, ui) {
			    	  var val = ui.item.value; 
			    	  
			    	  val = val.split(",")[0];
			    	  
			    	  $("#searchTxtHidden").val(val); 
			    	}
			    });
			
			  $('button').click(function(){
				  
				  var searchTxt = $("#searchTxtHidden").val();
				  if($("#searchTxt").val().split(",").length==5) {
					  sessionStorage.setItem("searchTerm",searchTxt);  
				  } else {
					  searchTxt = $("#searchTxt").val();
					  sessionStorage.setItem("searchTerm",searchTxt);  
				  }
				  $("#searchTxt").val("");
				  $("#searchTxtHidden").val("");
				  document.location.href="search";
				  
			    });
			
			  
			  
		});