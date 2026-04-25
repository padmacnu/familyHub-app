import React from 'react';

export default function ReflectionItem({ item, onToggle }) {
  return (
    <label className="flex items-start p-4 bg-hpe-card border border-hpe-border hover:border-hpe-alert/50 transition-all cursor-pointer group mb-2">
      <div className="relative flex items-center mt-1">
        <input 
          type="checkbox" 
          checked={item?.checked || false} 
          onChange={() => onToggle(item.id)}
          className="w-5 h-5 border-2 border-hpe-border bg-transparent appearance-none checked:bg-hpe-alert transition-all"
        />
        {item?.checked && <span className="absolute left-1 text-[10px] text-black font-black">!</span>}
      </div>
      <div className="ml-4">
        <p className={`text-sm leading-tight ${item?.checked ? 'text-hpe-alert font-bold' : 'text-hpe-text font-light'}`}>
          {item?.label}
        </p>
      </div>
    </label>
  );
}