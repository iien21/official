import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import success from "./img/success.svg";
import error from "./img/error.svg";
import warn from "./img/warn.svg";
const img = { success, error, warn };

class MessageWrapper extends React.Component {
  state = {
    list: [],
  };
  add = (params = { content: "", type: "info", key: "" }) => {
    this.setState({ list: this.state.list.concat([params]) });
  };
  handleHide = (msg) => {
    this.setState({ list: this.state.list.filter((item) => item != msg) });
  };
  render() {
    return (
      <div className="message-wrapper">
        {this.state.list.map((item) => (
          <Message
            onHide={this.handleHide.bind(this, item)}
            {...item}
          ></Message>
        ))}
      </div>
    );
  }
}

const getUniqueKey = () => {
  return new Date().getTime();
};

function Message(props) {
  return (
    <div className="message">
      <div className="message_content" onAnimationEnd={props.onHide}>
        {/* <span className={`message__icon ${props.type}`}></span> */}
        <div className="message_box">
          <img src={`${img[props.type]}`} />
          <span>{props.content}</span>
        </div>
      </div>
    </div>
  );
}

const message = (function () {
  let container = document.getElementById("message-container");
  if (!container) {
    container = document.createElement("div");
    container.setAttribute("id", "message-container");
    document.body.appendChild(container);
  }
  const messageWrapper = ReactDOM.render(<MessageWrapper />, container);
  return {
    warn: (content) => {
      messageWrapper.add({
        key: getUniqueKey(),
        content,
        type: "warn",
      });
    },
    error: (content) => {
      messageWrapper.add({
        key: getUniqueKey(),
        content,
        type: "error",
      });
    },
    success: (content) => {
      messageWrapper.add({
        key: getUniqueKey(),
        content,
        type: "success",
      });
    },
  };
})();

export default message;
