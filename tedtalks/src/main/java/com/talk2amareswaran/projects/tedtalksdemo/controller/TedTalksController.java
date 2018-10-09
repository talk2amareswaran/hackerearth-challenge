package com.talk2amareswaran.projects.tedtalksdemo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class TedTalksController {

	@RequestMapping(value="/", method=RequestMethod.GET)
	public String indexPage() {
		return "index";
	}
	
	@RequestMapping(value="/talkspage", method=RequestMethod.GET)
	public String talksPage() {
		return "talkspage";
	}
}
