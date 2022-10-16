import React from "react";
import './Notification.css';

interface NotificationProps {
    status: string,
    title: string,
    message: string
}

const Notification: React.FC<NotificationProps> = props => {
    let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = "error";
  }
  if (props.status === 'success') {
    specialClasses = "success";
  }

  const cssClasses = `notification ${specialClasses}`;

    return  <section className={cssClasses}>
    <h2>{props.title}</h2>
    
    <p>{props.message}</p>
  </section>
}

export default Notification;