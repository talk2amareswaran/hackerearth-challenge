var api_url = "http://localhost:8080";


function getLength(obj) {
	if(obj!=null && obj.length!==undefined) {
		if(obj.length>16) {
			return 15;
		}
		return obj.length;
	}
	return 0;
}



