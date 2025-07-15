package com.visualiser.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.visualiser.model.ArrayResponse;
import com.visualiser.service.ArrayService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/array")
@CrossOrigin(origins = "http://localhost:5173")
public class ArrayController {
	
	@Autowired
	private ArrayService arrayService;
	
	@PostMapping("/init")
    public ArrayResponse initializeArray(@RequestParam int size, HttpSession session) {
        return arrayService.initialiseArray(size, session);
    }

    @GetMapping
    public ArrayResponse getArray(HttpSession session) {
        return arrayService.getArray(session);
    }

    @PostMapping("/insert")
    public ArrayResponse insertElement(
            @RequestParam int index, 
            @RequestParam int value, 
            HttpSession session) {
        return arrayService.insertElement(index, value, session);
    }

    @DeleteMapping("/delete")
    public ArrayResponse deleteElement(
    		@RequestParam int index, 
            HttpSession session) {
        return arrayService.deleteElement(index, session);
    }

    @GetMapping("/access")
    public ArrayResponse accessElement(
            @RequestParam int index, 
            HttpSession session) {
        return arrayService.accessElement(index, session);
    }

    @PutMapping("/update")
    public ArrayResponse updateElement(
            @RequestParam int index, 
            @RequestParam int value, 
            HttpSession session) {
        return arrayService.updateElement(index, value, session);
    }
}
