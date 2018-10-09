package com.talk2amareswaran.projects.tedtalksdemo.dao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.talk2amareswaran.projects.tedtalksdemo.model.Ratings;
import com.talk2amareswaran.projects.tedtalksdemo.model.TagsList;
import com.talk2amareswaran.projects.tedtalksdemo.model.Talks;
import com.talk2amareswaran.projects.tedtalksdemo.service.TedTalksService;

@Repository
public class TedTalksDAO implements TedTalksService {

	@Autowired
	JdbcTemplate jdbcTemplate;
	private static final String TAGS_SELECT_QUERY = "select tags from talks";
	private static final String TAG_METADATA_NAME = "tags";

	@Override
	public TagsList getTags() {
		TagsList tagsList = new TagsList();
		Collection<Map<String, Object>> rows = jdbcTemplate.queryForList(TAGS_SELECT_QUERY);
		rows.stream().map((row) -> {
			String str = (String) row.get(TAG_METADATA_NAME);
			if (str != null)
				str = str.replaceAll("\"", "").replaceAll("\'", "").replaceAll("\\[", "").replaceAll("\\]", "");
			return str;
		}).forEach((ss) -> {
			if(ss!=null) {
				String[] strArray = ss.split(",");
				for(String str: strArray) {
					if (!tagsList.getTags().contains(str.trim()))
						tagsList.addTag(str.trim());		
				}
			}
		});
		return tagsList;
	}
	
	@Override
	public List<Talks> getTalks(String sorttype, String limit, String offset, String sort_column, String tags_search_value, String eventsTagSearch) {
		StringBuilder tagsWhereClause = new StringBuilder("");
		tagsWhereClause.append(" where title is not null and ");
		if(tags_search_value!=null && tags_search_value.trim().length()>0) {
			String[] str = tags_search_value.split(",");
			
			for(int i=0;i<str.length;i++) {
				if(i==0 && str.length>1)
					tagsWhereClause.append("(tags like '%"+str[i]+"%'");
				else if(str.length==1) {
					tagsWhereClause.append("tags like '%"+str[i]+"%'");
				}
				else if(i==(str.length-1)) {
					tagsWhereClause.append(" or tags like '%"+str[i]+"%') ");
				}
				else { 
					tagsWhereClause.append(" or tags like '%"+str[i]+"%' ");
				}
			}
		}
		
		
		if(eventsTagSearch!=null && eventsTagSearch.trim().length()>0) {
			if(tags_search_value!=null && tags_search_value.trim().length()>0) {
				tagsWhereClause.append(" and (event like '%"+eventsTagSearch+"%'");
			} else {
				tagsWhereClause.append("(event like '%"+eventsTagSearch+"%'");
			}
			
			tagsWhereClause.append(" or name like '%"+eventsTagSearch+"%' ");
			tagsWhereClause.append(" or speaker_occupation like '%"+eventsTagSearch+"%' ");
			tagsWhereClause.append(" or event like '%"+eventsTagSearch+"%' ");
			tagsWhereClause.append(" or title like '%"+eventsTagSearch+"%' ");
					tagsWhereClause.append(" or tags like '%"+eventsTagSearch+"%') ");
		}
		
		
		if((tags_search_value==null || tags_search_value.trim().length()<=0) && (eventsTagSearch==null || eventsTagSearch.trim().length()<=0)) {
			tagsWhereClause = new StringBuilder();
		}
		
		
		List<Talks> talksList = new ArrayList<>();
		String query = "select * from talks "+tagsWhereClause.toString()+" order by "+sort_column+" "+sorttype+" limit "+offset+","+limit;
		System.out.println("query:"+query);
		Collection<Map<String, Object>> rows = jdbcTemplate.queryForList(query);
		rows.stream().map((row) -> {
			Talks talks = new Talks();
			talks.setDescription((String)row.get("description"));
			talks.setEvent((String) row.get("event"));
			talks.setMain_speaker((String) row.get("main_speaker"));
			talks.setName((String) row.get("name"));
			talks.setPublished_date(String.valueOf(row.get("published_date")));
			talks.setRatings((String) row.get("ratings"));
			talks.setRelated_talks((String) row.get("related_talks"));
			talks.setSpeaker_occupation((String)row.get("speaker_occupation"));
			talks.setTags((String) row.get("tags"));
			talks.setTitle((String) row.get("title"));
			talks.setUrl((String) row.get("url"));
			talks.setViews(String.valueOf(row.get("view")));
			return talks;
		}).forEach((ss) -> {
				talksList.add(ss);
		});
		
		
		for(Talks talks:talksList) {
			List<Ratings> ratingsList = new ArrayList<>();
			String[] strArray = talks.getRatings().split("},");
			for(int i=0;i<strArray.length;i++) {
				Ratings ratings = new Ratings();
				ratings.setName(strArray[i].substring(strArray[i].indexOf("'name':")+8,strArray[i].indexOf(", 'count':")).replaceAll("\'", ""));
				if(i==(strArray.length-1)) {
					ratings.setCount(strArray[i].substring(strArray[i].indexOf("'count':")+9,strArray[i].length()-2));
				} else {
					ratings.setCount(strArray[i].substring(strArray[i].indexOf("'count':")+9,strArray[i].length()));
				}
				ratingsList.add(ratings);
			}
			talks.setRatingsList(ratingsList);
		}

		return talksList;
	}
}