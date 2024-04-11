import React, { useState, useEffect } from 'react';

interface MessageModalProps {
  message: string;
  isSuccess: boolean;
}

const MessageModal: React.FC<MessageModalProps> = ({ message, isSuccess }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsModalActive(true);
      setIsModalVisible(true);

      const timer = setTimeout(() => {
        setIsModalActive(false);
        setIsModalVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={`modal ${isModalActive ? 'is-active' : ''} ${isModalVisible ? 'fade' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {isSuccess ? 'Success' : 'Error'}
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => setIsModalActive(false)}
          ></button>
        </header>
        <section className="modal-card-body">
          <p className={`has-text-${isSuccess ? 'success' : 'danger'}`}>
            {message}
          </p>
        </section>
      </div>
    </div>
  );
};

export default MessageModal;