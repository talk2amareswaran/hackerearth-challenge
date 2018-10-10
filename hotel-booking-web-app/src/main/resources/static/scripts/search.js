var firstPage =1;
var maxRowsPerPage = 5;
var pageNo = 1;
var offset = 0;
var currentPage = 1;
var totalRecords = 0; 
$(document).ready(function(){   
	var searchTerm = sessionStorage.getItem("searchTerm");
	if(searchTerm==null)
		searchTerm = "";
	getSearchResults("", searchTerm, maxRowsPerPage, "0", "ratings", "desc", "true");
	
	showCategoriesCheckBox();
	
	
});

function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
 
function replaceAll(str, term, replacement) {
  return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}

function showCategoriesCheckBox() {
	
	$("#categoriesCheckBox").html('');
	$.ajax({
		url : api_url + "/categories",
		success : function(result) {
			for (var i = 0; i < result.categories.length; i++) {
				
				var myStr =  result.categories[i];
			    var newStr = replaceAll(myStr, ' ', '$');
			    var newStr1 = replaceAll(newStr, '&', '!');
			    
				
				$("#categoriesCheckBox").append('<div class="form-check-inline"> <label class="form-check-label"><input type="checkbox" name="category" class="form-check-input checkboxText" value='+newStr1+'>'+result.categories[i]+'</label></div>');
			}
		
			 $(".checkboxText").click(function(){
		         var categoryArray = "";
		         $.each($("input[name='category']:checked"), function(){       
		        	var test = $(this).val();
		        	 var newStr = replaceAll(test, '$', ' ');
		        	 categoryArray = categoryArray+","+newStr;
		         });
		         firstPage =1;
		         maxRowsPerPage = 5;
		         pageNo = 1;
		         offset = 0;
		         currentPage = 1;
		         totalRecords = 0; 
		         getSearchResults(categoryArray.substring(1), "", maxRowsPerPage, "0", "ratings", "desc", "true");
		         sessionStorage.removeItem("searchTerm");
		     });
			
		}
	});

}


function gotoPage(id) {
	
	
	var pageNoVal = $("#"+id).attr("data-attr");
	
	var callMake = false;
	
	var offsetQueryValue = (pageNoVal-1)*maxRowsPerPage;
	pageNo = pageNoVal;
	offset = parseInt(offsetQueryValue);
	currentPage =parseInt(pageNoVal);
	
	
	if(sessionStorage.getItem("searchTerm")!=null) {
		callMake = true;
		 getSearchResults("", sessionStorage.getItem("searchTerm"), maxRowsPerPage, offsetQueryValue, "ratings", "desc", "true");
	} else {
		
		 
	         var categoryArray = "";
	         $.each($("input[name='category']:checked"), function(){       
	        	var test = $(this).val();
	        	 var newStr = replaceAll(test, '$', ' ');
	        	 categoryArray = categoryArray+","+newStr;
	         });
	         
	         if(categoryArray!=="")
	        	 getSearchResults(categoryArray.substring(1), "", maxRowsPerPage, offsetQueryValue, "ratings", "desc", "true");
	         else
	        	 getSearchResults("", "", maxRowsPerPage, offsetQueryValue, "ratings", "desc", "true");
	}

	//	window.location.href="index.html?page="+pageNo+"&offset="+offsetQueryValue;
}



function getSearchResults(categorylist, term, limit, offset, sort, sorttype, isFresh) {
	
	var uri = "/search/hotels?limit="+limit+"&offset="+offset+"&sort="+sort+"&sorttype="+sorttype+"&term="+term;
	if(categorylist!=null && categorylist!=="") {
		uri = "/search/hotels/category?limit="+limit+"&offset="+offset+"&sort="+sort+"&sorttype="+sorttype+"&categorylist="+categorylist;
	}
	
	
	
	 $.ajax({url : api_url + uri, success: function(result){
		 
		 if(isFresh=="true") {
			 $("#searchContainerResultGrid").html('');
		 }
		 
		 
		 if(result.searchResults!=null && result.searchResults!==undefined) {
			 
			 if(result.totalCount!=null && result.totalCount!==undefined)
				 totalRecords = result.totalCount;
			 else
				 totalRecords = 0;
			 
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
		 } else {
			 $("#searchContainerResultGrid").append("<div class=\"alert alert-danger\">Matching record(s) not found. Try the below hotels</div>");
			 firstPage =1;
	         maxRowsPerPage = 5;
	         pageNo = 1;
	         offset = 0;
	         currentPage = 1;
	         totalRecords = 0; 
	         sessionStorage.removeItem("searchTerm");
			 	getSearchResults("","", maxRowsPerPage, "0", "ratings", "desc", "false");
		 }
	    }
	 });
}

function constructDiv(ratingsDiv, objIdx) {
	 $("#searchContainerResultGrid").append("<div class=\"card\"><div class=\"card-header bg-danger searchResultHeader\">"+objIdx.name+
			 "</div><div class=\"card-body\"><div class=\"fontSize20\"><i class=\"material-icons location-icon\">location_on</i>"+objIdx.address+", "+objIdx.city+", "+objIdx.province+", "+objIdx.postalcode+"</div><div>" +
			 ratingsDiv +
			 		"<div class=\"bold\">Review(s)</div><div class=\"themeColor\">"+objIdx.reviewUsername+"</div><div>"+objIdx.reviewTitle+"</div><div>"+objIdx.reviewText+"</div><div class=\"clearfix\"><a class=\"float-left padding-top-15\" target=\"_blank\" href=\"hotel?id="+objIdx.id+"\">Google Map</a><button type=\"button\" class=\"btn btn-success float-right\" onclick=\"booknow("+objIdx.id+")\">Book Now</button></div></div> </div>");
	 
	 $("#searchContainerResultGrid").append("<div class=\"clearfix\">&nbsp;&nbsp</div>");
	 
	 
	 if(totalRecords>maxRowsPerPage) {
		 var difference = totalRecords/maxRowsPerPage;
		 var lastPage;

		 if((difference%maxRowsPerPage)!=0) {
		 lastPage = Math.floor(difference)+1;
		 	} else {
		 lastPage = Math.floor(difference);
		 		}



		 	if(currentPage<=0)
		 	currentPage=1;

		 if(currentPage>lastPage) 
		 	currentPage = lastPage;

		 // First Page
		 if(currentPage==firstPage) {
		 		//document.getElementById("firstPage").disabled=true;
		 	//document.getElementById("firstPage").value=firstPage;
			 
			 if(!$("#firstPage").hasClass("disabled"))
				 $("#firstPage").addClass("disabled");
			 
		 	} else {
		 		 if($("#firstPage").hasClass("disabled"))
					 $("#firstPage").removeClass("disabled");
		 		 $("#first").attr('data-attr',firstPage);
		 		 
		 		 
		 		//document.getElementById("firstPage").disabled=false;
		 	//document.getElementById("firstPage").value=firstPage;
		 		}

		 		
		 	


		 // previous Page
		 console.log("previo currentPage:"+currentPage);
		 if((currentPage-1)>0) {
			 
			 if($("#previousPage").hasClass("disabled"))
				 $("#previousPage").removeClass("disabled");
			 $("#previous").attr('data-attr',(currentPage-1));
			 
		// 	document.getElementById("previousPage").disabled=false;
		// 	document.getElementById("previousPage").value=currentPage-1;
		 	} else {
		 		
		 		 if(!$("#previousPage").hasClass("disabled"))
					 $("#previousPage").addClass("disabled");
		 		// $("#previousPage").attr('data-attr',1);
		 			//document.getElementById("previousPage").disabled=true;
		// 	document.getElementById("previousPage").value=1;
		 		}


		 // Next Page
		 if( (currentPage+1) < lastPage) {
		 	
			 if($("#nextPage").hasClass("disabled"))
				 $("#nextPage").removeClass("disabled");
			 $("#next").attr('data-attr',(currentPage+1));
		// 	document.getElementById("nextPage").disabled=false;
		 //	document.getElementById("nextPage").value=currentPage+1;
		 	
		 	
		 	} else if( (currentPage+1) == lastPage) {
		 		 if($("#nextPage").hasClass("disabled"))
					 $("#nextPage").removeClass("disabled");
		 	//document.getElementById("nextPage").disabled=false;
		 		 $("#next").attr('data-attr',lastPage);
		// 	document.getElementById("nextPage").value=lastPage;
		 } else 
		 	
		 	
		 	{
			 if(!$("#nextPage").hasClass("disabled"))
				 $("#nextPage").addClass("disabled");
		 			//document.getElementById("nextPage").disabled=true;
		 //	document.getElementById("nextPage").value=lastPage;
		 		}


		 	

		 // Last Page
		 if(currentPage==lastPage) {

			 if(!$("#lastPage").hasClass("disabled"))
				 $("#lastPage").addClass("disabled");
			 
		// document.getElementById("lastPage").disabled=true;
		// 	document.getElementById("lastPage").value=lastPage;

		 	} else {
		 		 if($("#lastPage").hasClass("disabled"))
					 $("#lastPage").removeClass("disabled");
		 document.getElementById("lastPage").disabled=false;
		 $("#last").attr('data-attr',lastPage);
		 	//document.getElementById("lastPage").value=lastPage;

		 		}
		 			
		 	

		 	} else {
		 		 if(!$("#lastPage").hasClass("disabled"))
					 $("#lastPage").addClass("disabled");
		 		 
		 		 if(!$("#nextPage").hasClass("disabled"))
					 $("#nextPage").addClass("disabled");
		 		 
		 		 if(!$("#previousPage").hasClass("disabled"))
					 $("#previousPage").addClass("disabled");
		 		 
		 		 if(!$("#firstPage").hasClass("disabled"))
					 $("#firstPage").addClass("disabled");
		 			
		 			
		 		}
	 
	 
	 
	 
	 
}

function booknow(id) {

	 var token = getCookie("access_token");
	 if(token!=null && token!="") {
		 window.open("bookingpage?id="+id);
		// window.location.href="bookingpage?id="+id;
	 } else {
		 document.location.href="login";
	 }
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