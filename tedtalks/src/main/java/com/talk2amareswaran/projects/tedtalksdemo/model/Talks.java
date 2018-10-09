package com.talk2amareswaran.projects.tedtalksdemo.model;

import java.util.ArrayList;
import java.util.List;

public class Talks {

	private String description;
	private String event;
	private String main_speaker;
	private String name;
	private String published_date;
	private String ratings;
	private String related_talks;
	private String speaker_occupation;
	private String tags;
	private String title;
	private String url;
	private String views;
	private List<Ratings> ratingsList = new ArrayList<>();

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getEvent() {
		return event;
	}

	public void setEvent(String event) {
		this.event = event;
	}

	public String getMain_speaker() {
		return main_speaker;
	}

	public void setMain_speaker(String main_speaker) {
		this.main_speaker = main_speaker;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPublished_date() {
		return published_date;
	}

	public void setPublished_date(String published_date) {
		this.published_date = published_date;
	}

	public String getRatings() {
		return ratings;
	}

	public void setRatings(String ratings) {
		this.ratings = ratings;
	}

	public String getRelated_talks() {
		return related_talks;
	}

	public void setRelated_talks(String related_talks) {
		this.related_talks = related_talks;
	}

	public String getSpeaker_occupation() {
		return speaker_occupation;
	}

	public void setSpeaker_occupation(String speaker_occupation) {
		this.speaker_occupation = speaker_occupation;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getViews() {
		return views;
	}

	public void setViews(String views) {
		this.views = views;
	}

	public List<Ratings> getRatingsList() {
		return ratingsList;
	}

	public void setRatingsList(List<Ratings> ratingsList) {
		this.ratingsList = ratingsList;
	}

}
