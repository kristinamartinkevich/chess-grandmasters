import { useState, useEffect } from 'react';

export const useTimer = (lastOnlineTimestamp) => {
  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(() => {
    if (!lastOnlineTimestamp) return;

    const updateTimer = () => {
      const now = Date.now();
      const lastOnline = lastOnlineTimestamp * 1000; // Convert to milliseconds
      const diff = now - lastOnline;

      if (diff < 0) {
        setTimeElapsed('Currently online');
        return;
      }

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      const remainingHours = hours % 24;
      const remainingMinutes = minutes % 60;
      const remainingSeconds = seconds % 60;

      if (days > 0) {
        if (remainingHours > 0) {
          setTimeElapsed(`${days} day${days > 1 ? 's' : ''} ${remainingHours} hour${remainingHours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} ago`);
        } else if (remainingMinutes > 0) {
          setTimeElapsed(`${days} day${days > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} ago`);
        } else {
          setTimeElapsed(`${days} day${days > 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} ago`);
        }
      } else if (hours > 0) {
        if (remainingMinutes > 0) {
          setTimeElapsed(`${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} ago`);
        } else {
          setTimeElapsed(`${hours} hour${hours > 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} ago`);
        }
      } else if (minutes > 0) {
        setTimeElapsed(`${minutes} minute${minutes > 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} ago`);
      } else {
        setTimeElapsed(`${seconds} second${seconds > 1 ? 's' : ''} ago`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [lastOnlineTimestamp]);

  return timeElapsed;
};