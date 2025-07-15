import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import ArrayCell from "./ArrayCell";
import ArrayControls from "./ArrayControls";
import useArrayOperations from "../../hooks/useArrayOperations";
const ArrayVisualizer = () => {
  const {
    array,
    initializeArray,
    insertElement,
    deleteElement,
    accessElement,
    updateElement,
    operationHistory,
    currentOperation,
    error,
  } = useArrayOperations();

  const [size, setSize] = useState(5);
  const [insertIndex, setInsertIndex] = useState(0);
  const [insertValue, setInsertValue] = useState("");
  const [accessIndex, setAccessIndex] = useState(0);
  const [updateIndex, setUpdateIndex] = useState(0);
  const [updateValue, setUpdateValue] = useState("");

  useEffect(() => {
    initializeArray(size);
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Array Operations
        </h2>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Operation History
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            <AnimatePresence>
              {operationHistory.map((op, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-2 rounded text-sm ${
                    op.type === "ERROR"
                      ? "bg-red-50 text-red-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {op.message}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <AnimatePresence>
            {array.map((value, index) => (
              <ArrayCell
                key={`${index}-${value}`}
                value={value}
                index={index}
                isActive={
                  currentOperation?.accessedIndex === index ||
                  currentOperation?.operation?.includes("INIT")
                }
                operationType={currentOperation?.operation}
              />
            ))}
          </AnimatePresence>
        </div>

        <ArrayControls
          size={size}
          setSize={setSize}
          insertIndex={insertIndex}
          setInsertIndex={setInsertIndex}
          insertValue={insertValue}
          setInsertValue={setInsertValue}
          accessIndex={accessIndex}
          setAccessIndex={setAccessIndex}
          updateIndex={updateIndex}
          setUpdateIndex={setUpdateIndex}
          updateValue={updateValue}
          setUpdateValue={setUpdateValue}
          onInitialize={() => initializeArray(size)}
          onInsert={() => insertElement(insertIndex, parseInt(insertValue))}
          onDelete={(index) => deleteElement(index)}
          onAccess={() => accessElement(accessIndex)}
          onUpdate={() => updateElement(updateIndex, parseInt(updateValue))}
          currentOperation={currentOperation}
        />
      </div>
    </div>
  );
};

export default ArrayVisualizer;
