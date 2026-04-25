import React, { useState } from 'react';

export default function BioTooltip({ text, children }) {
  const [visible, setVisible] = useState(false);
  return (
    <span className="relative inline-block">
      <span 
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="cursor-help border-b border-dotted border-hpe-turq text-hpe-turq font-bold"
      >
        {children}
      </span>
      {visible && (
        <div className="absolute z-50 bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 p-4 bg-hpe-front border border-hpe-brand shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <p className="text-[10px] leading-relaxed text-white font-light">
            <span className="text-hpe-brand font-black block mb-1 uppercase tracking-widest">Neuro-Data</span>
            {text}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-hpe-brand"></div>
        </div>
      )}
    </span>
  );
}