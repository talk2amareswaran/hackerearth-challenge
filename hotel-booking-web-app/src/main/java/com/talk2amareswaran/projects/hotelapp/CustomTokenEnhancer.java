package com.talk2amareswaran.projects.hotelapp;


import java.util.LinkedHashMap;

import java.util.Map;

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

public class CustomTokenEnhancer extends JwtAccessTokenConverter {

	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		CustomUser user = (CustomUser) authentication.getPrincipal();
		Map<String, Object> info = new LinkedHashMap<>(accessToken.getAdditionalInformation());
		if (user.getId() != null)
			info.put("id", user.getId());
		if (user.getFirst_name() != null)
			info.put("first_name", user.getFirst_name());
		if (user.getLast_name() != null)
			info.put("last_name", user.getLast_name());
		DefaultOAuth2AccessToken customAccessToken = new DefaultOAuth2AccessToken(accessToken);
		customAccessToken.setAdditionalInformation(info);
		return super.enhance(customAccessToken, authentication);
	}	
	
	@Override
	public OAuth2Authentication extractAuthentication(Map<String, ?> map) {
		OAuth2Authentication auth = super.extractAuthentication(map);
		AccessTokenMapper details = new AccessTokenMapper();
		if (map.get("id") != null)
			details.setId((String) map.get("id"));
		if (map.get("first_name") != null)
			details.setFirst_name((String) map.get("first_name"));
		if (map.get("last_name") != null)
			details.setLast_name((String) map.get("last_name"));
		auth.setDetails(details);
		return auth;
	}
}