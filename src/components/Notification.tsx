import React, { useEffect, useState, useCallback } from 'react';

interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 3000
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for animation to complete
  }, [onClose]);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, duration, handleClose]);

  const getNotificationStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      top: '20px',
      right: '20px',
      minWidth: '300px',
      maxWidth: '500px',
      padding: '16px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 1000,
      transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
      opacity: isAnimating ? 1 : 0,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontSize: '14px',
      fontWeight: '500' as const,
      animation: isAnimating && type === 'success' ? 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : undefined
    };

    const typeStyles = {
      success: {
        backgroundColor: '#d1f2eb',
        border: '1px solid #a3e9d0',
        color: '#0f5132'
      },
      error: {
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        color: '#721c24'
      },
      warning: {
        backgroundColor: '#fff3cd',
        border: '1px solid #ffecb5',
        color: '#856404'
      },
      info: {
        backgroundColor: '#d1ecf1',
        border: '1px solid #bee5eb',
        color: '#0c5460'
      }
    };

    return { ...baseStyles, ...typeStyles[type] };
  };

  const getIcon = () => {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type];
  };

  if (!isVisible && !isAnimating) {
    return null;
  }

  return (
    <div style={getNotificationStyles()}>
      <span style={{ fontSize: '16px' }}>
        {getIcon()}
      </span>
      <span style={{ flex: 1 }}>
        {message}
      </span>
      <button
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          opacity: 0.7,
          padding: '0',
          lineHeight: 1,
          color: 'inherit'
        }}
        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.opacity = '1'}
        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.opacity = '0.7'}
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
