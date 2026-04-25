import React from 'react';

export default function MissionBriefing() {
  return (
    <div className="bg-hpe-card border border-hpe-brand/20 p-8 mb-10 relative">
      <div className="absolute top-0 right-0 p-2 bg-hpe-brand text-black text-[8px] font-black uppercase tracking-widest">
        System Protocol v1.0
      </div>
      <h2 className="text-hpe-brand font-black text-xs tracking-hpe-wide mb-4 uppercase">Mission Objective</h2>
      <p className="text-sm text-white font-light leading-relaxed mb-4">
        Unitus is a <span className="text-hpe-turq font-bold">Family OS</span> designed to regulate the biological state of the home sanctuary.
      </p>
      <ul className="space-y-3">
        <li className="flex items-start text-[11px] text-hpe-text font-light italic">
          <span className="text-hpe-brand mr-2">▹</span>
          <span><strong className="text-white">State Shifts:</strong> Transitioning from high-alert survival to social safety.</span>
        </li>
      </ul>
    </div>
  );
}