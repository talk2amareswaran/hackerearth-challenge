package com.talk2amareswaran.projects.hotelapp;

import java.sql.ResultSet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.stereotype.Repository;

@Repository
public class OAuthDAOService {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	public UserEntity getUserDetails(String username) {
		String userSQLQuery = "select * from users where email_id=?";
		List<UserEntity> list = jdbcTemplate.query(userSQLQuery, new String[] { username },
				(ResultSet rs, int rowNum) -> {
					UserEntity user = new UserEntity();
					user.setEmail_id(username);
					user.setFirst_name(rs.getString("first_name"));
					user.setId(rs.getString("id"));
					user.setLast_name(rs.getString("last_name"));
					user.setPasssword(rs.getString("password"));
					return user;
				});

		if (!list.isEmpty()) {
			return list.get(0);
		}
		return null;
	}
	
}
