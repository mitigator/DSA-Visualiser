import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ArrayCell = ({ value, index, isActive, operationType }) => {
  const getAnimationProps = () => {
    const baseProps = {
      initial: { scale: 1, y: 0, opacity: 1 },
      animate: { scale: 1, y: 0, opacity: 1 },
      transition: { type: "spring", stiffness: 300, damping: 20 },
    };
    if (!isActive) return baseProps;
    switch (operationType) {
      case "INSERT":
        return {
          ...baseProps,
          initial: { scale: 0.5, y: -20, opacity: 0 },
          animate: { scale: 1.1, y: 0, opacity: 1 },
          transition: { type: "spring", stiffness: 500 },
        };
      case "DELETE":
        return {
          ...baseProps,
          exit: { scale: 0, opacity: 0, transition: { duration: 0.3 } },
        };
      case "ACCESS":
        return {
          ...baseProps,
          animate: {
            scale: [1, 1.2, 1],
            backgroundColor: ["#fff", "#e0e7ff", "#fff"],
            transition: { duration: 0.6 },
          },
        };
      case "UPDATE":
        return {
          ...baseProps,
          animate: {
            scale: [1, 1.2, 1],
            backgroundColor: ["#fff", "#d1fae5", "#fff"],
            transition: { duration: 0.6 },
          },
        };
      case "INIT":
        return {
          ...baseProps,
          initial: { scale: 0.8, opacity: 0 },
          transition: { delay: index * 0.1 },
        };
      default:
        return baseProps;
    }
  };

  return (
    <motion.div
      {...getAnimationProps()}
      className={`
        w-16 h-16 flex flex-col items-center justify-center
        border-2 rounded-lg shadow-sm
        ${
          isActive
            ? "border-indigo-500 bg-indigo-50"
            : "border-gray-200 bg-white"
        }
      `}
    >
      <div className="text-xs text-gray-500">{index}</div>
      <div className="text-lg font-medium text-gray-800">{value}</div>
    </motion.div>
  );
};

export default ArrayCell;
