package com.talk2amareswaran.projects.hotelapp.model;

import java.util.ArrayList;
import java.util.List;

public class Category {

	private List<String> categories = new ArrayList<>();

	public List<String> getCategories() {
		return categories;
	}

	public void setCategories(List<String> categories) {
		this.categories = categories;
	}
	
	public void addCategory(String category) {
		this.categories.add(category);
	}
}
