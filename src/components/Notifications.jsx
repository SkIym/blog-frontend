import PropTypes from "prop-types";

const Notification = ({ flag, message }) => {
  let className = "error";
  className = flag;
  return <div className={className}>{message}</div>;
};

Notification.propTypes = {
  flag: PropTypes.string,
  message: PropTypes.string,
};

export default Notification;
