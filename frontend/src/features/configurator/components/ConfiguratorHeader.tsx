import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { Box, Layers, Columns2, RotateCcw, ShoppingCart, Bookmark, Save } from 'lucide-react';

export function ConfiguratorHeader() {
  const {
    activeTab,
    setActiveTab,
    viewportMode,
    setViewportMode,
    resetConfiguration,
    saveCurrentConfiguration,
    isSaving,
    cart,
    setCartOpen,
  } = useConfigurator();

  const tabs = [
    { id: 'setup', step: '01', label: 'Setup & Specs' },
    { id: 'design', step: '02', label: 'Custom Branding' },
    { id: 'review', step: '03', label: 'Review & Proof' },
  ] as const;

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-4 border-b border-[#E5E1D8] bg-white px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-4">
        <div className="shrink-0 leading-none">
          <div className="text-[18px] font-bold tracking-[0.16em] text-[#171717]">MVP</div>
          <div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#8A867E]">Visuals</div>
        </div>
        <div className="hidden h-8 w-px bg-[#E5E1D8] sm:block" />
        <div className="min-w-0">
          <h1 className="truncate text-[15px] font-semibold leading-5 tracking-[-0.02em] text-[#171717] sm:text-[16px]">
            10' × 10' Custom Logo Canopy Tent
          </h1>
          <span className="hidden text-[11px] font-medium text-[#625F58] sm:block">Build your custom branded canopy</span>
        </div>
      </div>

      <nav className="hidden items-center gap-2 md:flex">
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
              className={`flex items-center gap-2 border-b-2 px-2 py-3 text-[12px] font-medium transition-all ${
                isActive
                  ? 'border-[#183C34] text-[#183C34]'
                  : 'border-transparent text-[#8A867E] hover:text-[#171717]'
              }`}
            >
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold ${isActive ? 'bg-[#183C34] text-white' : 'bg-[#E5E1D8] text-[#8A867E]'}`}>
                {tab.step}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <button
          type="button"
          title="Cart"
          aria-label="Cart"
          onClick={() => {
            if (cart) {
              setCartOpen(true);
            } else {
              document.getElementById('btn-add-to-cart')?.click();
            }
          }}
          className="relative hidden rounded-[8px] p-2 text-[#625F58] transition hover:bg-[#F6F4EF] hover:text-[#183C34] sm:block"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#183C34] text-[9px] font-semibold text-white">{cart?.item?.quantity || 0}</span>
        </button>
        <button
          type="button"
          onClick={() => void saveCurrentConfiguration()}
          disabled={isSaving}
          className="hidden items-center gap-2 rounded-[8px] border border-[#D6D0C5] bg-[#FBFAF7] px-3 py-2 text-[12px] font-semibold text-[#625F58] transition hover:border-[#183C34] hover:text-[#183C34] disabled:opacity-60 sm:flex"
        >
          <Bookmark className="h-3.5 w-3.5" />
          <span>{isSaving ? 'Saving...' : 'Save Configuration'}</span>
        </button>
        <div className="inline-flex rounded-[10px] border border-[#E5E1D8] bg-[#F6F4EF] p-0.5">
          <button
            id="view-mode-3d"
            onClick={() => setViewportMode('3d')}
            title="3D Photorealistic Preview"
            className={`flex items-center gap-1 rounded-[8px] px-2.5 py-1.5 text-[12px] font-medium transition ${
              viewportMode === '3d'
                ? 'bg-white text-[#183C34] shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-[#E5E1D8]'
                : 'text-[#625F58] hover:text-[#171717]'
            }`}
          >
            <Box className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">3D View</span>
          </button>
          <button
            id="view-mode-2d"
            onClick={() => setViewportMode('2d')}
            title="2D Printable Surface Editor"
            className={`flex items-center gap-1 rounded-[8px] px-2.5 py-1.5 text-[12px] font-medium transition ${
              viewportMode === '2d'
                ? 'bg-white text-[#183C34] shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-[#E5E1D8]'
                : 'text-[#625F58] hover:text-[#171717]'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">2D Editor</span>
          </button>
          <button
            id="view-mode-split"
            onClick={() => setViewportMode('split')}
            title="Side-by-side 3D and 2D Synchronized View"
            className={`flex items-center gap-1 rounded-[8px] px-2.5 py-1.5 text-[12px] font-medium transition ${
              viewportMode === 'split'
                ? 'bg-white text-[#183C34] shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-[#E5E1D8]'
                : 'text-[#625F58] hover:text-[#171717]'
            }`}
          >
            <Columns2 className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Split</span>
          </button>
        </div>

        <button
          id="btn-reset-configuration"
          onClick={resetConfiguration}
          title="Reset to factory defaults"
          className="rounded-[8px] p-1.5 text-[#8A867E] transition hover:bg-[#F6F4EF] hover:text-[#183C34]"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
