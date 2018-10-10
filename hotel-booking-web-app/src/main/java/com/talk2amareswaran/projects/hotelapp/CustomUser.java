package com.talk2amareswaran.projects.hotelapp;

import org.springframework.security.core.userdetails.User;

public class CustomUser extends User {

	private static final long serialVersionUID = 1L;
	private String id;
	private String first_name;
	private String last_name;

	public CustomUser(UserEntity user) {
		super(user.getEmail_id(), user.getPasssword(), user.getGrantedAuthoritiesList());
		this.id = user.getId();
		this.first_name = user.getFirst_name();
		this.last_name = user.getLast_name();

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

}
