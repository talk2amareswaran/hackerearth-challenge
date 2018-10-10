package com.talk2amareswaran.projects.hotelapp.model;

import java.util.ArrayList;
import java.util.List;

public class SearchResults {

	private List<Hotel> searchResults = new ArrayList<>();
	private int totalCount;

	public List<Hotel> getSearchResults() {
		return searchResults;
	}

	public void setSearchResults(List<Hotel> searchResults) {
		this.searchResults = searchResults;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

}
