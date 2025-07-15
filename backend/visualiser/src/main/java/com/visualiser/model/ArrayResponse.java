package com.visualiser.model;

import java.util.Arrays;

public class ArrayResponse {
	
	private int[] array;
	private String message;
	private String operation;
	private int accessedIndex;
	private int accessedValue;
	
	public ArrayResponse() {
		
	}
	
	public ArrayResponse(int[] array, String message, String operation) {
		this.array=array;
		this.message=message;
		this.operation=operation;
	}

	public int[] getArray() {
		return array;
	}

	public void setArray(int[] array) {
		this.array = array;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public int getAccessedIndex() {
		return accessedIndex;
	}

	public void setAccessedIndex(int accessedIndex) {
		this.accessedIndex = accessedIndex;
	}

	public int getAccessedValue() {
		return accessedValue;
	}

	public void setAccessedValue(int accessedValue) {
		this.accessedValue = accessedValue;
	}

	@Override
	public String toString() {
		return "ArrayResponse [array=" + Arrays.toString(array) + ", message=" + message + ", operation=" + operation
				+ ", accessedIndex=" + accessedIndex + ", accessedValue=" + accessedValue + "]";
	}
	
	

}
