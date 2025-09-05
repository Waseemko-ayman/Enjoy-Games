import { FaGamepad } from 'react-icons/fa';
import { useMemo } from 'react';

const GamepadBackground = () => {
  const iconSize = '6rem';

  const icons = useMemo(() => {
    return Array.from({ length: 10 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      rotate: `${Math.random() * 360}deg`,
      opacity: 0.05 + Math.random() * 0.15,
    }));
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {icons.map((icon, idx) => (
        <FaGamepad
          key={idx}
          className="absolute text-gray-500"
          style={{
            top: icon.top,
            left: icon.left,
            width: iconSize,
            height: iconSize,
            transform: `rotate(${icon.rotate})`,
            opacity: icon.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default GamepadBackground;
