import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(onClose, 500); // Wait for exit animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`toast-container ${isExiting ? 'exit' : ''}`}>
            <div className={`toast-content ${type}`}>
                <div className="toast-icon">
                    {type === 'success' ? '✓' : '✕'}
                </div>
                <div className="toast-message">{message}</div>
                <button className="toast-close" onClick={() => {
                    setIsExiting(true);
                    setTimeout(onClose, 500);
                }}>×</button>
            </div>
        </div>
    );
};

export default Toast;
