package com.talk2amareswaran.projects.tedtalksdemo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.talk2amareswaran.projects.tedtalksdemo.model.TagsList;
import com.talk2amareswaran.projects.tedtalksdemo.model.Talks;


@Service
@Transactional
public interface TedTalksService {

	public TagsList getTags();

	public List<Talks> getTalks(String sorttype, String limit, String offset, String sortcolumn,
			String tags_search_value, String eventsTagSearch);
}
