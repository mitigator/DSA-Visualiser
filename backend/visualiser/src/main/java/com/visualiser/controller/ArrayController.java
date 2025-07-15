package com.visualiser.controller;

import java.util.Arrays;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/array")
@CrossOrigin(origins = "http://localhost:5173")
public class ArrayController {

	private static final int MAX_SIZE = 5;

    private static class UserArray {
        int[] array = new int[MAX_SIZE];
        int size = 3;

        UserArray() {
            array[0] = 10;
            array[1] = 20;
            array[2] = 30;
        }
    }
    
    private UserArray getUserArray(HttpSession session) {
        UserArray userArray = (UserArray) session.getAttribute("array");
        if (userArray == null) {
            userArray = new UserArray();
            session.setAttribute("array", userArray);
        }
        return userArray;
    }

    @GetMapping
    public int[] getArray(HttpSession session) {
    	UserArray userArray = getUserArray(session);
        return Arrays.copyOf(userArray.array, userArray.size);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addElement(@RequestParam int value, HttpSession session) {
        UserArray userArray = getUserArray(session);
        if (userArray.size >= MAX_SIZE) {
            return ResponseEntity
                    .badRequest()
                    .body("Cannot add into array, max size reached.");
        } else {
            if (userArray.size >= userArray.array.length) {
                userArray.array = Arrays.copyOf(userArray.array, userArray.array.length * 2);
            }
            userArray.array[userArray.size] = value;
            userArray.size++;
            return ResponseEntity.ok(Arrays.copyOf(userArray.array, userArray.size));
        }
    }

    @DeleteMapping("/delete")
    public int[] deleteElement(@RequestParam int index, HttpSession session) {
        UserArray userArray = getUserArray(session);
        if (index >= 0 && index < userArray.size) {
            for (int i = index; i < userArray.size - 1; i++) {
                userArray.array[i] = userArray.array[i + 1];
            }
            userArray.size--;
        }
        return Arrays.copyOf(userArray.array, userArray.size);
    }

    @GetMapping("/search")
    public String search(@RequestParam int value, HttpSession session) {
        UserArray userArray = getUserArray(session);
        for (int i = 0; i < userArray.size; i++) {
            if (userArray.array[i] == value) {
                return "Found at index: " + i;
            }
        }
        return "Not found";
    }

    @GetMapping("/get")
    public String getByIndex(@RequestParam int index, HttpSession session) {
        UserArray userArray = getUserArray(session);
        if (index >= 0 && index < userArray.size) {
            return "Element at index " + index + ": " + userArray.array[index];
        }
        return "Invalid index";
    }

    @GetMapping("/info")
    public String getArrayInfo(HttpSession session) {
        UserArray userArray = getUserArray(session);
        return "Array size: " + userArray.size + ", Capacity: " + userArray.array.length;
    }
}