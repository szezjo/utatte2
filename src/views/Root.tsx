import React, { useRef, useEffect } from 'react';
import { Outlet } from 'react-router';
import autoAnimate from '@formkit/auto-animate';

const Root = () => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="min-h-screen bg-slate-800" ref={parent}>
      <Outlet />
    </div>
  );
};

export default Root;
