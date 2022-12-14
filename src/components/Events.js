import React, { useState } from "react";
import { connect } from "react-redux";
import { addEvents } from "../redux/reducer";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    events: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: (obj) => dispatch(addEvents(obj)),
  };
};

const Events = (props) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const add = () => {
    if (title && date && status === "") {
      alert("Input is Empty");
    } else {
      props.addEvent({
        id: Math.floor(Math.random() * 1000),
        item: { title, date, status },
        completed: false,
      });
      setTitle("");
      setDate("");
      setStatus("");
    }
  };
  //console.log("props from store", props);
  return (
    <div className="addEvents">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="event-input"
        value={title}
        placeholder="Title"
      />
      <input
        type="text"
        onChange={(e) => handleChangeDate(e)}
        className="event-input"
        value={date}
        placeholder="Date"
      />

      <select
        name="status"
        id="status"
        onChange={(e) => handleChangeStatus(e)}
        className="event-input"
      >
        <option value="">Choose a status</option>
        <option value="pending">Pending</option>
        <option value="ongoing">Ongoing</option>
        <option value="done">Done</option>
      </select>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={() => add()}
      >
        <GoPlus />
      </motion.button>
      <br />
    </div>
  );
};
//we can use connect method to connect this component with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Events);
