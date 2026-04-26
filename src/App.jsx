import React, { useState } from 'react';
import { RITUALS } from './data/insights';
import { FAMILY_REFLECTIONS } from './data/reflection';

// Component Imports
import BioTooltip from './components/BioTooltip';
import MissionBriefing from './components/MissionBriefing';
import ReflectionItem from './components/ReflectionItem';

const ROLES = {
  PROVIDER: { name: "The Provider", duty: "Visionary. You provide the physical sanctuary and set the family's emotional frequency." },
  NURTURER: { name: "The Nurturer", duty: "Heart of the home. You manage the nutritional and emotional wellbeing of the collective." },
  LEARNER: { name: "The Learner", duty: "Legacy builder. You contribute energy and growth to the family unit's future." }
};

export default function UnitusApp() {
  // --- STATE MANAGEMENT ---
  const [tasks, setTasks] = useState({ refresh: false, blitz: false, connection: false });
  const [showInsight, setShowInsight] = useState(null);
  const [currentRole, setCurrentRole] = useState("PROVIDER");
  
  // Initialize reflection state from your data/reflection.js file
  const [reflectionState, setReflectionState] = useState(
    FAMILY_REFLECTIONS.flatMap(c => c.sections.flatMap(s => s.items)).map(i => ({...i, checked: false}))
  );

  // --- LOGIC HANDLERS ---
  const toggleRole = () => {
    const keys = Object.keys(ROLES);
    const nextIndex = (keys.indexOf(currentRole) + 1) % keys.length;
    setCurrentRole(keys[nextIndex]);
  };

  const toggleReflection = (id) => {
    setReflectionState(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  // Family Sanity Score Logic
  const identifiedStressors = reflectionState.filter(i => i.checked).length;
  const sanityScore = Math.max(0, 100 - (identifiedStressors * 7));

  const renderScienceText = (text) => {
    if (text.includes("Oxytocin")) {
      const parts = text.split("Oxytocin");
      return <>{parts[0]}<BioTooltip text="The 'Bonding Molecule'. It reduces social anxiety, increases trust, and creates emotional 'glue'.">Oxytocin</BioTooltip>{parts[1]}</>;
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-hpe-back text-hpe-text font-sans pb-20 selection:bg-hpe-brand/30">
      
      {/* HEADER SECTION */}
      <header className="bg-black border-b border-hpe-border p-10 text-center shadow-2xl mb-10">
        <h1 className="text-hpe-heading tracking-hpe-wide italic uppercase text-3xl font-black">Unitus</h1>
        <div className="mt-8">
          <div className={`text-7xl font-thin transition-all duration-1000 ${sanityScore > 70 ? 'text-hpe-brand' : 'text-hpe-alert'}`}>
            {sanityScore}%
          </div>
          <p className="text-[10px] uppercase font-black tracking-[0.5em] text-gray-600 mt-4">Family Sanity Level</p>
        </div>
      </header>

      <main className="p-6 max-w-lg mx-auto">
        
        <MissionBriefing />

        {/* ACTIVE ROLE CARD */}
        <div onClick={toggleRole} className="bg-hpe-front p-6 border-l-4 border-hpe-brand shadow-xl cursor-pointer hover:bg-[#2e3342] transition-all group mb-10">
          <h4 className="text-[10px] font-black uppercase text-hpe-brand tracking-hpe-wide mb-2">Active Role Identity (Tap to Switch)</h4>
          <p className="text-2xl font-bold text-white tracking-hpe-tight">{ROLES[currentRole].name}</p>
          <p className="text-xs text-hpe-text mt-3 leading-relaxed font-light italic">"{ROLES[currentRole].duty}"</p>
        </div>

        {/* SECTION I: PROTOCOLS (EXCELLENCE RITUALS) */}
        <div className="space-y-6 mb-16">
          <h3 className="text-[10px] font-black text-gray-700 uppercase tracking-hpe-wide ml-1">Excellence Protocols</h3>
          {Object.entries(RITUALS).map(([key, data]) => {
            const taskId = key.toLowerCase();
            const isOpen = showInsight === key;
            return (
              <div key={key} className="bg-hpe-card border border-hpe-border shadow-lg overflow-hidden">
                <div className="flex items-center p-6">
                  <div 
  onClick={() => setTasks({...tasks, [taskId]: !tasks[taskId]})}
  className={`w-12 h-12 border-2 mr-6 flex items-center justify-center cursor-pointer transition-all ${
    tasks[taskId] ? 'bg-hpe-brand border-hpe-brand' : 'border-hpe-border hover:border-hpe-brand/40'
  }`}
>
  {/* Explicitly set checkmark to black to pop against the green background */}
  {tasks[taskId] && <span className="text-white font-black text-xl">✓</span>}
</div>
                  <div className="flex-1" onClick={() => setShowInsight(isOpen ? null : key)}>
                    <h3 className={`font-bold text-lg tracking-tight uppercase ${tasks[taskId] ? 'text-hpe-brand' : 'text-hpe-heading'}`}>
                      {data.title}
                    </h3>
                    <button className="text-[9px] text-gray-500 font-black uppercase mt-1 tracking-widest">
                      {isOpen ? 'Collapse Science −' : 'View Science +'}
                    </button>
                  </div>
                </div>
                {isOpen && (
                  <div className="p-8 bg-black/40 border-t border-hpe-border animate-in fade-in zoom-in-95">
                    <p className="text-sm text-hpe-text leading-relaxed font-light mb-10">
                      {renderScienceText(data.why)}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#093d32]/20 p-4 border-t border-hpe-brand">
                        <span className="text-[9px] font-black text-hpe-brand uppercase italic">The Gain</span>
                        <p className="text-[11px] text-white mt-2 leading-tight">{data.gain}</p>
                      </div>
                      <div className="bg-[#3d1212]/20 p-4 border-t border-hpe-critical">
                        <span className="text-[9px] font-black text-hpe-critical uppercase italic">The Cost</span>
                        <p className="text-[11px] text-white mt-2 leading-tight">{data.cost}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SECTION II: FAMILY REFLECTION (YES/NO GROWTH AREAS) */}
        <div className="space-y-10">
          <h3 className="text-[10px] font-black text-gray-700 uppercase tracking-hpe-wide ml-1">Family Reflection: Area for Growth?</h3>
          {FAMILY_REFLECTIONS.map((category) => (
            <div key={category.category}>
              <h4 className="text-hpe-brand font-black text-xs tracking-widest uppercase mb-4">{category.category}</h4>
              {category.sections.map((section) => (
                <div key={section.title} className="mb-6">
                  <h5 className="text-[10px] text-gray-500 uppercase font-bold mb-3">{section.title}</h5>
                  {section.items.map((item) => (
                    <ReflectionItem 
                      key={item.id} 
                      item={reflectionState.find(i => i.id === item.id)} 
                      onToggle={toggleReflection} 
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* SECTION III: VOICE & COMMITMENT */}
        <section className="mt-16 bg-black border-t-4 border-hpe-brand p-8">
          <h3 className="text-hpe-heading tracking-widest uppercase text-xs font-black mb-6">III. The Voice Section</h3>
          <div className="space-y-6 mb-10">
            <div>
              <label className="text-[9px] text-hpe-brand uppercase font-black block mb-2 tracking-widest">What I need from the Family</label>
              <textarea 
                className="w-full bg-[#111] border border-hpe-border p-4 text-sm text-white focus:border-hpe-brand outline-none transition-colors" 
                rows="3" 
                placeholder="Be honest—this isn't about blame..."
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['Dad', 'Mom', 'Kids'].map(member => (
                <button 
                  key={member}
                  className="py-4 border border-hpe-border text-[10px] uppercase font-black 
                 text-white hover:bg-hpe-brand hover:text-white transition-all 
                 tracking-widest cursor-pointer"
                >
                  {member}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-20 mb-10 text-center px-10">
        <p className="text-[9px] text-gray-700 font-bold uppercase tracking-[0.6em]">
          Practice Excellence. Protect the Sanctuary.
        </p>
      </footer>
    </div>
  );
}