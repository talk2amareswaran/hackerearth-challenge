package com.talk2amareswaran.projects.hotelapp.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.talk2amareswaran.projects.hotelapp.model.ApiResponse;
import com.talk2amareswaran.projects.hotelapp.model.Category;
import com.talk2amareswaran.projects.hotelapp.service.HotelServiceDAO;
import com.talk2amareswaran.projects.hotelapp.util.HotelAppErrorCodes;
import com.talk2amareswaran.projects.hotelapp.util.HotelAppErrorMessage;

@RestController
public class CategoriesController {

	@Autowired
	HotelServiceDAO hotelServiceDAO;

	@RequestMapping(value = "/categories", method = RequestMethod.GET)
	public ResponseEntity<Object> getCategories() {
		Category category = hotelServiceDAO.getCategories();
		if (category == null || category.getCategories().isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(HotelAppErrorCodes.NOT_FOUND, HotelAppErrorMessage.NOT_FOUND), HttpStatus.OK);
		}
		return new ResponseEntity<>(category, HttpStatus.OK);
	}
}
