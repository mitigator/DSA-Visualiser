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

@RestController
@RequestMapping("/api/array")
@CrossOrigin(origins = "http://localhost:5173")
public class ArrayController {

    private static final int MAX_SIZE = 5;
    private int[] array = new int[MAX_SIZE];
    {
        array[0] = 10;
        array[1] = 20;
        array[2] = 30;
    }
    private int size=3;

    @GetMapping
    public int[] getArray() {
        return Arrays.copyOf(array, size);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addElement(@RequestParam int value) {
        if (size >= MAX_SIZE) {
            return ResponseEntity
                    .badRequest()
                    .body("Cannot add into array, max size reached.");
        } else {
            if (size >= array.length) {
                array = Arrays.copyOf(array, array.length * 2);
            }
            array[size] = value;
            size++;
            return ResponseEntity.ok(Arrays.copyOf(array, size));
        }
    }


    @DeleteMapping("/delete")
    public int[] deleteElement(@RequestParam int index) {
        if (index >= 0 && index < size) {
            // Shift elements to the left
            for (int i = index; i < size - 1; i++) {
                array[i] = array[i + 1];
            }
            size--;
        }
        return Arrays.copyOf(array, size);
    }

    @GetMapping("/search")
    public String search(@RequestParam int value) {
        // Linear search through the array
        for (int i = 0; i < size; i++) {
            if (array[i] == value) {
                return "Found at index: " + i;
            }
        }
        return "Not found";
    }

    @GetMapping("/get")
    public String getByIndex(@RequestParam int index) {
        if (index >= 0 && index < size) {
            return "Element at index " + index + ": " + array[index];
        }
        return "Invalid index";
    }

    @GetMapping("/info")
    public String getArrayInfo() {
        return "Array size: " + size + ", Capacity: " + array.length;
    }
}