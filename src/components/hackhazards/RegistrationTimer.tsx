import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export const RegistrationTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set registration opening date (example: March 1, 2024)
    const registrationDate = new Date("2025-11-01T00:00:00");

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = registrationDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-col justify-items-center gap-2 text-sm font-medium">
      <div className="flex items-center gap-1 mb-1">
        <Clock className="h-4 w-4 text-primary" />
        <span className="text-muted-foreground">Registrations open in:</span>
      </div>
      <div className="flex items-center gap-1 text-primary font-mono">
        <span className="bg-primary/10 px-2 py-1 rounded text-xs">
          {timeLeft.days}d
        </span>
        <span className="bg-primary/10 px-2 py-1 rounded text-xs">
          {timeLeft.hours}h
        </span>
        <span className="bg-primary/10 px-2 py-1 rounded text-xs">
          {timeLeft.minutes}m
        </span>
        <span className="bg-primary/10 px-2 py-1 rounded text-xs">
          {timeLeft.seconds}s
        </span>
      </div>
    </div>
  );
};
