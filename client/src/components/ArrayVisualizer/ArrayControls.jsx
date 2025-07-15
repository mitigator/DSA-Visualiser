/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const ArrayControls = ({
  size,
  setSize,
  insertIndex,
  setInsertIndex,
  insertValue,
  setInsertValue,
  accessIndex,
  setAccessIndex,
  updateIndex,
  setUpdateIndex,
  updateValue,
  setUpdateValue,
  onInitialize,
  onInsert,
  onDelete,
  onAccess,
  onUpdate,
  currentOperation,
}) => {
  const controlGroups = [
    {
      title: "Initialize Array",
      inputs: [
        {
          type: "number",
          min: 1,
          max: 20,
          value: size,
          onChange: (e) => setSize(parseInt(e.target.value)),
          placeholder: "Size",
        },
      ],
      action: onInitialize,
      buttonText: "Initialize",
      buttonColor: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      title: "Insert Element",
      inputs: [
        {
          type: "number",
          value: insertIndex,
          onChange: (e) => setInsertIndex(parseInt(e.target.value)),
          placeholder: "Index",
        },
        {
          type: "number",
          value: insertValue,
          onChange: (e) => setInsertValue(e.target.value),
          placeholder: "Value",
        },
      ],
      action: onInsert,
      buttonText: "Insert",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Delete Element",
      inputs: [
        {
          type: "number",
          value: accessIndex,
          onChange: (e) => setAccessIndex(parseInt(e.target.value)),
          placeholder: "Index",
        },
      ],
      action: () => onDelete(accessIndex),
      buttonText: "Delete",
      buttonColor: "bg-red-600 hover:bg-red-700",
    },
    {
      title: "Access Element",
      inputs: [
        {
          type: "number",
          value: accessIndex,
          onChange: (e) => setAccessIndex(parseInt(e.target.value)),
          placeholder: "Index",
        },
      ],
      action: onAccess,
      buttonText: "Access",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Update Element",
      inputs: [
        {
          type: "number",
          value: updateIndex,
          onChange: (e) => setUpdateIndex(parseInt(e.target.value)),
          placeholder: "Index",
        },
        {
          type: "number",
          value: updateValue,
          onChange: (e) => setUpdateValue(e.target.value),
          placeholder: "New Value",
        },
      ],
      action: onUpdate,
      buttonText: "Update",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {controlGroups.map((group, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-4 rounded-lg shadow border border-gray-100"
        >
          <h3 className="font-medium text-gray-800 mb-3">{group.title}</h3>
          <div className="space-y-3">
            {group.inputs.map((input, i) => (
              <input
                key={i}
                type={input.type}
                min={input.min}
                max={input.max}
                value={input.value}
                onChange={input.onChange}
                placeholder={input.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={group.action}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${group.buttonColor}`}
            >
              {group.buttonText}
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ArrayControls;
