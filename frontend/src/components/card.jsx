import React from 'react';
import clsx from 'clsx';

export const Card = ({ children, className = '' }) => {
  return (
    <div
      className={clsx(
        "rounded-2xl shadow-xl p-5 transition-all duration-300",
        "bg-white/90 backdrop-blur-sm dark:bg-zinc-800/80",
        "hover:shadow-2xl border border-zinc-200 dark:border-zinc-700",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return <div className={clsx("space-y-3", className)}>{children}</div>;
};
