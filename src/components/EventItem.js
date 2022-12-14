import { motion } from "framer-motion";
import React, { useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";

const EventItem = (props) => {
  const { item, updateEvents, removeEvents, completeEvents } = props;
  console.log(item);

  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    if (e.which === 13) {
      //here 13 is key code for enter key
      updateEvents({ id, item: value });
      inputRef.current.disabled = true;
    }
  };
  return (
    <motion.li
      //   initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      //   animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      //   whileHover={{
      //     scale: 0.9,
      //     transition: { type: "spring", duration: 0.1 },
      //   }}
      initial={{ y: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ y: 0, transition: { type: "spring", duration: 2 } }}
      transition={{ type: "spring", duration: 1 }}
      whileHover={{ scale: 1.1 }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item.id}
      className="card"
    >
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item.title}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
        className="title"
      />
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item.date}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
        className="date"
      />
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item.status}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
        className="status"
      />

      <div className="btns">
        {/* <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeFocus()}
        >
          {" "}
          <AiFillEdit />{" "}
        </motion.button> */}
        {item.completed === false && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={() => completeEvents(item.id)}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => removeEvents(item.id)}
        >
          <IoClose />
        </motion.button>{" "}
      </div>
      {item.completed && <span className="completed">Done</span>}
    </motion.li>
  );
};

export default EventItem;
