package com.talk2amareswaran.projects.tedtalksdemo.model;

import java.util.ArrayList;
import java.util.List;

public class TagsList {

	private List<String> tags = new ArrayList<>();

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}
	
	public void addTag(String tag) {
		this.tags.add(tag);
	}
}
