import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addEvents,
  completeEvents,
  removeEvents,
  updateEvents,
} from "../redux/reducer";
import EventItem from "./EventItem";
import { AnimatePresence, motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    events: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEvents: (obj) => dispatch(addEvents(obj)),
    removeEvents: (id) => dispatch(removeEvents(id)),
    updateEvents: (obj) => dispatch(updateEvents(obj)),
    completeEvents: (id) => dispatch(completeEvents(id)),
  };
};

const DisplayEvents = (props) => {
  const [sort, setSort] = useState("pending");

  return (
    <div className="displayevents">
      <div className="buttons">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("pending")}
        >
          Pending
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("ongoing")}
        >
          Ongoing
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("done")}
        >
          Done
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {props.events.length > 0 && sort === "pending"
            ? props.events.map((item) => {
                return (
                  item.item.status === "pending" && (
                    <EventItem
                      key={item.id}
                      item={item}
                      removeEvents={props.removeEvents}
                      updateEvents={props.updateEvents}
                      completeEvents={props.completeEvents}
                    />
                  )
                );
              })
            : null}
          {/* for completed items */}
          {props.events.length > 0 && sort === "ongoing"
            ? props.events.map((item) => {
                return (
                  item.item.status === "ongoing" && (
                    <EventItem
                      key={item.id}
                      item={item}
                      removeEvents={props.removeEvents}
                      updateEvents={props.updateEvents}
                      completeEvents={props.completeEvents}
                    />
                  )
                );
              })
            : null}
          {props.events.length > 0 && sort === "done"
            ? props.events.map((item) => {
                return (
                  item.completed === true &&
                  item.item.status === "done" && (
                    <EventItem
                      key={item.id}
                      item={item}
                      removeEvents={props.removeEvents}
                      updateEvents={props.updateEvents}
                      completeEvents={props.completeEvents}
                    />
                  )
                );
              })
            : null}
          {/* for all items */}

          {props.events.length > 0 && sort === "all"
            ? props.events.map((item) => {
                return (
                  <EventItem
                    key={item.id}
                    item={item}
                    removeEvents={props.removeEvents}
                    updateEvents={props.updateEvents}
                    completeEvents={props.completeEvents}
                  />
                );
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEvents);
