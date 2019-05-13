import React, { useCallback, useState } from 'react';
import useEventListener from './use-event-listener';

function MouseMove() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const handler = useCallback(
    ({ clientX, clientY }) => {
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );

  // Add event listener using our hook
  useEventListener('mousemove', handler);

  return (
    <h1>
      The mouse position is ({coords.x}, {coords.y})
    </h1>
  );
}

export default function HookApp() {
  return <div>
    <MouseMove />
  </div>
}