package com.visualiser.service;

import org.springframework.stereotype.Service;

import com.visualiser.model.ArrayResponse;

import jakarta.servlet.http.HttpSession;

@Service
public class ArrayService {
	private static final String SESSION_ARRAY_KEY = "visualisationArray";
	
	public ArrayResponse initialiseArray(int size, HttpSession session) {
		int[] array= new int[size];
		for(int i=0;i<size;i++) {
			array[i]=(int) (Math.random()*100);
		}
		session.setAttribute(SESSION_ARRAY_KEY, array);
		return new ArrayResponse(array, "Array initialised with size "+size,"INIT");
	}
	
	private int[] getArrayFromSession(HttpSession session) {
        return (int[]) session.getAttribute(SESSION_ARRAY_KEY);
    }

    private void setArrayInSession(int[] array, HttpSession session) {
        session.setAttribute(SESSION_ARRAY_KEY, array);
    }
    
    public ArrayResponse getArray(HttpSession session) {
        int[] array = getArrayFromSession(session);
        if (array == null) {
            return new ArrayResponse(null, "Array not initialized. Please initialize first.", "ERROR");
        }
        return new ArrayResponse(array, "Current array state", "GET");
    }
    
    public ArrayResponse insertElement(int index, int value, HttpSession session) {
    	int array[]= getArrayFromSession(session);
    	if(array==null) {
    		return new ArrayResponse(null, "Array not initialized. Please initialize first.","ERROR");
    	}
    	if(index<0 || index>=array.length) {
    		return new ArrayResponse(null, "Index out of bounds","INSERT_ERROR");
    	}
    	
    	int[] newArray = new int[array.length+1];
    	System.arraycopy(array, 0, newArray, 0, index);
    	newArray[index] = value;
        System.arraycopy(array, index, newArray, index + 1, array.length - index);

        setArrayInSession(newArray, session);
        return new ArrayResponse(newArray, "Inserted " + value + " at index " + index, "INSERT");
    }
    
    public ArrayResponse deleteElement(int index, HttpSession session) {
    	int[] array = getArrayFromSession(session);
        if (array == null) {
            return new ArrayResponse(null, "Array not initialized. Please initialize first.", "ERROR");
        }

        if (index < 0 || index >= array.length) {
            return new ArrayResponse(array, "Index out of bounds", "DELETE_ERROR");
        }

        int[] newArray = new int[array.length - 1];
        System.arraycopy(array, 0, newArray, 0, index);
        System.arraycopy(array, index + 1, newArray, index, array.length - index - 1);

        int deletedValue = array[index];
        setArrayInSession(newArray, session);
        
        ArrayResponse response = new ArrayResponse(newArray, 
            "Deleted value " + deletedValue + " from index " + index, "DELETE");
        response.setAccessedIndex(index);
        response.setAccessedValue(deletedValue);
        return response;
    	
    }
    
    public ArrayResponse accessElement(int index, HttpSession session) {
        int[] array = getArrayFromSession(session);
        if (array == null) {
            return new ArrayResponse(null, "Array not initialized. Please initialize first.", "ERROR");
        }

        if (index < 0 || index >= array.length) {
            return new ArrayResponse(array, "Index out of bounds", "ACCESS_ERROR");
        }

        ArrayResponse response = new ArrayResponse(array, "Accessed index " + index, "ACCESS");
        response.setAccessedIndex(index);
        response.setAccessedValue(array[index]);
        return response;
    }
    
    public ArrayResponse updateElement(int index, int value, HttpSession session) {
        int[] array = getArrayFromSession(session);
        if (array == null) {
            return new ArrayResponse(null, "Array not initialized. Please initialize first.", "ERROR");
        }

        if (index < 0 || index >= array.length) {
            return new ArrayResponse(array, "Index out of bounds", "UPDATE_ERROR");
        }

        int oldValue = array[index];
        array[index] = value;
        setArrayInSession(array, session);
        
        ArrayResponse response = new ArrayResponse(array, 
            "Updated index " + index + " from " + oldValue + " to " + value, "UPDATE");
        response.setAccessedIndex(index);
        response.setAccessedValue(value);
        return response;
    }
    
    
    
}
