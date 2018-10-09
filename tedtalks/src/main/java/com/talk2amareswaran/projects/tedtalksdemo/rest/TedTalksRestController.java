package com.talk2amareswaran.projects.tedtalksdemo.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.talk2amareswaran.projects.tedtalksdemo.model.Talks;
import com.talk2amareswaran.projects.tedtalksdemo.service.TedTalksService;

@RestController
public class TedTalksRestController {

	@Autowired
	TedTalksService tedTalksService;

	@RequestMapping(value = "/tags", method = RequestMethod.GET)
	public ResponseEntity<Object> getTags() {		
		return new ResponseEntity<>(tedTalksService.getTags(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/talks", method = RequestMethod.GET)
	public ResponseEntity<Object> getTalks(@RequestParam(value = "sorttype", required = false, defaultValue = "asc") String sorttype,
    @RequestParam(value = "limit", required = false, defaultValue = "50") String limit,
    @RequestParam(value = "offset", required = false, defaultValue = "0") String offset,
    @RequestParam(value = "sortcolumn", required = false, defaultValue = "event") String sortcolumn,
    @RequestParam(value = "tags_search_value", required = false, defaultValue = "") String tags_search_value,
    @RequestParam(value = "eventsTagSearch", required = false, defaultValue = "") String eventsTagSearch,
    @RequestParam(value = "filterSearch", required = false, defaultValue = "") String filterSearch) {
		List<Talks> talksList = tedTalksService.getTalks(sorttype, limit, offset, sortcolumn, tags_search_value, eventsTagSearch);
		return new ResponseEntity<>(talksList, HttpStatus.OK);
		
	}
}
