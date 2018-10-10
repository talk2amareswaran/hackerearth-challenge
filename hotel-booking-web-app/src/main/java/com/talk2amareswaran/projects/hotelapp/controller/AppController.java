package com.talk2amareswaran.projects.hotelapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AppController {

	@RequestMapping(value = {"/","/index","/welcome"}, method = RequestMethod.GET)
	public String indexPage() {
		return "index";
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public String searchPage() {
		return "search";
	}
	
	@RequestMapping(value = "/hotel", method = RequestMethod.GET)
	public String hotel() {
		return "hotel";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {
		return "login";
	}
	
	@RequestMapping(value = "/bookingpage", method = RequestMethod.GET)
	public String bookingpage() {
		return "bookingpage";
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout() {
		return "logout";
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String register() {
		return "register";
	}
	
	
	
}
