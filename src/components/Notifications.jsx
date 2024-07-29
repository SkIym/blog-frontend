import { useSelector } from "react-redux";

const Notification = () => {
  const { flag, message } = useSelector(state => state.notification)
  return <div className={flag}>{message}</div>;
};


export default Notification;
