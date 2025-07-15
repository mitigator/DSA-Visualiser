import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/array";

const ArrayVisualizer = () => {
  const [array, setArray] = useState([]);
  const [newValue, setNewValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [accessIndex, setAccessIndex] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [animatingIndex, setAnimatingIndex] = useState(null);
  const [operation, setOperation] = useState(null);
  const [searchProgress, setSearchProgress] = useState([]);
  const [message, setMessage] = useState("");
  const [arrayInfo, setArrayInfo] = useState("");

  useEffect(() => {
    fetchArray();
    fetchArrayInfo();
  }, []);

  const fetchArray = async () => {
    try {
      const res = await axios.get(API_BASE);
      setArray(res.data);
      setHighlightIndex(null);
      setSearchProgress([]);
      setOperation(null);
    } catch (error) {
      showMessage("Error fetching array", "error");
    }
  };

  const fetchArrayInfo = async () => {
    try {
      const res = await axios.get(`${API_BASE}/info`);
      setArrayInfo(res.data);
    } catch (error) {
      console.error("Error fetching array info");
    }
  };

  const showMessage = (msg, type = "info") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(""), 3000);
  };

  const addElement = async () => {
    if (newValue.trim() === "") return;
    
    setOperation("adding");
    setAnimatingIndex(array.length);
    
    try {
      const res = await axios.post(`${API_BASE}/add?value=${newValue}`);
      
      setTimeout(() => {
        setArray(res.data);
        setNewValue("");
        setOperation(null);
        setAnimatingIndex(null);
        showMessage(`Added ${newValue} to array`, "success");
        fetchArrayInfo();
      }, 500);
    } catch (error) {
      setOperation(null);
      setAnimatingIndex(null);
      showMessage("Error adding element", "error");
    }
  };

  const deleteElement = async (index) => {
    setOperation("deleting");
    setAnimatingIndex(index);
    
    try {
      setTimeout(async () => {
        const res = await axios.delete(`${API_BASE}/delete?index=${index}`);
        setArray(res.data);
        setOperation(null);
        setAnimatingIndex(null);
        showMessage(`Deleted element at index ${index}`, "success");
        fetchArrayInfo();
      }, 500);
    } catch (error) {
      setOperation(null);
      setAnimatingIndex(null);
      showMessage("Error deleting element", "error");
    }
  };

  const searchElement = async () => {
    if (searchValue.trim() === "") return;
    
    setOperation("searching");
    setSearchProgress([]);
    setHighlightIndex(null);
    
    try {
      // Simulate linear search animation step by step
      for (let i = 0; i < array.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 600));
        setSearchProgress(prev => [...prev, i]);
        setHighlightIndex(i);
        
        // Check if current element matches search value
        if (array[i] === parseInt(searchValue)) {
          break;
        }
      }
      
      // Get actual result from backend
      const res = await axios.get(`${API_BASE}/search?value=${searchValue}`);
      
      setTimeout(() => {
        setOperation(null);
        if (res.data.includes("Found at index:")) {
          const match = res.data.match(/index: (\d+)/);
          if (match) {
            const foundIndex = parseInt(match[1]);
            setHighlightIndex(foundIndex);
            showMessage(res.data, "success");
          }
        } else {
          setHighlightIndex(null);
          setSearchProgress([]);
          showMessage(res.data, "error");
        }
      }, 500);
    } catch (error) {
      setOperation(null);
      setHighlightIndex(null);
      setSearchProgress([]);
      showMessage("Error searching element", "error");
    }
  };

  const accessByIndex = async () => {
    const index = parseInt(accessIndex);
    if (isNaN(index)) {
      showMessage("Please enter a valid index", "error");
      return;
    }
    
    setOperation("accessing");
    setHighlightIndex(index);
    
    try {
      const res = await axios.get(`${API_BASE}/get?index=${index}`);
      
      setTimeout(() => {
        setOperation(null);
        if (res.data.includes("Invalid index")) {
          showMessage(res.data, "error");
          setHighlightIndex(null);
        } else {
          showMessage(res.data, "info");
        }
        setAccessIndex("");
      }, 1000);
    } catch (error) {
      setOperation(null);
      setHighlightIndex(null);
      showMessage("Error accessing element", "error");
      setAccessIndex("");
    }
  };

  const getElementStyle = (index) => {
    if (operation === "searching") {
      if (searchProgress.includes(index)) {
        return highlightIndex === index ? "bg-yellow-400 border-yellow-600 shadow-lg" : "bg-red-100 border-red-300";
      }
      return "bg-gray-100 border-gray-300";
    }
    
    if (highlightIndex === index) {
      return "bg-blue-400 border-blue-600 text-white shadow-lg";
    }
    
    if (animatingIndex === index) {
      if (operation === "deleting") {
        return "bg-red-400 border-red-600 text-white shadow-lg";
      }
      if (operation === "adding") {
        return "bg-green-400 border-green-600 text-white shadow-lg";
      }
    }
    
    return "bg-white border-gray-300 hover:border-gray-400 hover:shadow-md";
  };

  const getElementAnimation = (index) => {
    if (operation === "searching" && highlightIndex === index) {
      return {
        scale: [1, 1.3, 1],
        boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 0 rgba(59, 130, 246, 0)"],
        transition: { duration: 0.4 }
      };
    }
    
    if (animatingIndex === index) {
      if (operation === "deleting") {
        return {
          scale: [1, 1.2, 0],
          rotate: [0, 15, -15, 0],
          opacity: [1, 1, 0],
          transition: { duration: 0.5 }
        };
      }
      if (operation === "adding") {
        return {
          scale: [0, 1.3, 1],
          rotate: [0, 360],
          transition: { duration: 0.5 }
        };
      }
    }
    
    return {};
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Array Data Structure Visualizer
          </h1>
          <p className="text-gray-600">
            Interactive visualization of array operations with step-by-step animations
          </p>
        </div>

        {/* Array Info */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="text-center">
            <span className="text-sm font-medium text-gray-600">
              {arrayInfo} | Elements: {array.length}
            </span>
          </div>
        </div>

        {/* Message Display */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-4 rounded-lg text-center font-medium ${
                message.type === "success" 
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : message.type === "error"
                  ? "bg-red-100 text-red-800 border border-red-200"
                  : "bg-blue-100 text-blue-800 border border-blue-200"
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Add Element */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Add Element
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Value"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && addElement()}
                  disabled={operation !== null}
                />
                <button
                  onClick={addElement}
                  disabled={operation !== null}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Search Element */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Linear Search
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Value"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && searchElement()}
                  disabled={operation !== null}
                />
                <button
                  onClick={searchElement}
                  disabled={operation !== null}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Access by Index */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Access by Index
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Index"
                  value={accessIndex}
                  onChange={(e) => setAccessIndex(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && accessByIndex()}
                  disabled={operation !== null}
                />
                <button
                  onClick={accessByIndex}
                  disabled={operation !== null}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Access
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Array Visualization */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Array Memory Layout
            </h2>
            <div className="text-sm text-gray-600">
              Current Length: {array.length} | 
              {operation && (
                <span className="ml-2 font-medium text-blue-600">
                  Operation: {operation}...
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex gap-1 flex-wrap max-w-full">
              <AnimatePresence mode="popLayout">
                {array.map((item, index) => (
                  <motion.div
                    key={`${item}-${index}`}
                    layout
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      ...getElementAnimation(index)
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      y: -20,
                      transition: { duration: 0.3 }
                    }}
                    transition={{
                      layout: { duration: 0.3 },
                      default: { duration: 0.3 }
                    }}
                    className="relative"
                  >
                    <div
                      className={`w-20 h-20 flex flex-col items-center justify-center border-2 rounded-lg transition-all duration-300 ${getElementStyle(index)}`}
                    >
                      <div className="text-lg font-bold">
                        {item}
                      </div>
                      <div className="text-xs opacity-60 mt-1">
                        [{index}]
                      </div>
                      <button
                        onClick={() => deleteElement(index)}
                        disabled={operation !== null}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                    
                    {/* Memory address visualization */}
                    <div className="text-xs text-gray-500 text-center mt-1">
                      0x{(1000 + index * 4).toString(16).padStart(4, '0')}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {array.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-xl mb-2">Empty Array</div>
              <div className="text-sm">Add elements to see the array visualization</div>
            </div>
          )}
        </div>

        {/* Operation Legend */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Operation Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 border border-blue-600 rounded"></div>
              <span>Currently Accessed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 border border-yellow-600 rounded"></div>
              <span>Search Match</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span>Already Searched</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-400 border border-green-600 rounded"></div>
              <span>Being Added</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 border border-red-600 rounded"></div>
              <span>Being Deleted</span>
            </div>
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Array Operations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium text-green-600">Add: O(1)</div>
              <div className="text-gray-600">Insert at end of array</div>
            </div>
            <div>
              <div className="font-medium text-blue-600">Search: O(n)</div>
              <div className="text-gray-600">Linear search through elements</div>
            </div>
            <div>
              <div className="font-medium text-purple-600">Access: O(1)</div>
              <div className="text-gray-600">Direct index access</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer;