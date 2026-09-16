import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { Box, Layers, Columns2, RotateCcw } from 'lucide-react';

export function ConfiguratorHeader() {
  const { activeTab, setActiveTab, viewportMode, setViewportMode, resetConfiguration } = useConfigurator();

  const tabs = [
    { id: 'setup', step: '01', label: 'Setup & Specs' },
    { id: 'design', step: '02', label: 'Custom Branding' },
    { id: 'review', step: '03', label: 'Review & Proof' },
  ] as const;

  return (
    <header className="h-16 px-6 bg-white border-b border-[#E5E1D8] flex items-center justify-between sticky top-0 z-30">
      {/* Brand & Product Mark */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#183C34] flex items-center justify-center text-white font-bold text-xs tracking-wider">
          MVP
        </div>
        <div>
          <h1 className="text-sm font-bold text-[#171717] tracking-tight">10' × 10' Custom Logo Canopy Tent</h1>
          <span className="text-[11px] text-[#625F58] hidden sm:block">Interactive 3D / 2D Product Configurator</span>
        </div>
      </div>

      {/* Staged Flow (01 Setup ── 02 Design ── 03 Review) */}
      <nav className="hidden md:flex items-center gap-1 bg-[#F6F4EF] p-1 rounded-lg border border-[#E5E1D8]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-step-${tab.id}`}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'design') {
                  setViewportMode('split');
                } else if (tab.id === 'setup' || tab.id === 'review') {
                  setViewportMode('3d');
                }
              }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-white text-[#183C34] font-semibold shadow-xs'
                  : 'text-[#625F58] hover:text-[#171717]'
              }`}
            >
              <span className={`text-[10px] font-mono ${isActive ? 'text-[#183C34]' : 'text-[#8A867E]'}`}>
                {tab.step}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Viewport Mode Switcher & Reset */}
      <div className="flex items-center gap-2">
        <div className="inline-flex bg-[#F6F4EF] p-0.5 rounded-lg border border-[#E5E1D8]">
          <button
            id="view-mode-3d"
            onClick={() => setViewportMode('3d')}
            title="3D Photorealistic Preview"
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition flex items-center gap-1 ${
              viewportMode === '3d'
                ? 'bg-white text-[#183C34] shadow-xs font-semibold'
                : 'text-[#625F58] hover:text-[#171717]'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">3D View</span>
          </button>
          <button
            id="view-mode-2d"
            onClick={() => setViewportMode('2d')}
            title="2D Printable Surface Editor"
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition flex items-center gap-1 ${
              viewportMode === '2d'
                ? 'bg-white text-[#183C34] shadow-xs font-semibold'
                : 'text-[#625F58] hover:text-[#171717]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">2D Editor</span>
          </button>
          <button
            id="view-mode-split"
            onClick={() => setViewportMode('split')}
            title="Side-by-side 3D and 2D Synchronized View"
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition flex items-center gap-1 ${
              viewportMode === 'split'
                ? 'bg-white text-[#183C34] shadow-xs font-semibold'
                : 'text-[#625F58] hover:text-[#171717]'
            }`}
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Split</span>
          </button>
        </div>

        <button
          id="btn-reset-configuration"
          onClick={resetConfiguration}
          title="Reset to factory defaults"
          className="p-1.5 text-[#8A867E] hover:text-[#183C34] hover:bg-[#F6F4EF] rounded-md transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
