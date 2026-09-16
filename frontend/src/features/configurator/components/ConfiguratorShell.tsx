import React from 'react';
import { ConfiguratorHeader } from './ConfiguratorHeader.js';
import { ConfiguratorWorkspace } from './ConfiguratorWorkspace.js';
import { ProductOptionsPanel } from '../../product-options/components/ProductOptionsPanel.js';
import { PricingSummary } from '../../pricing/components/PricingSummary.js';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { ShoppingCart } from 'lucide-react';

export function ConfiguratorShell() {
  const { activeTab, setActiveTab, pricing, notification, dismissNotification } = useConfigurator();

  return (
    <div className="min-h-screen bg-[#F6F4EF] flex flex-col text-[#171717]">
      {/* Toast Notification Banner */}
      {notification && (
        <div
          className={`px-4 py-2 text-xs font-medium text-center flex items-center justify-between transition-all ${
            notification.type === 'success'
              ? 'bg-[#183C34] text-white'
              : notification.type === 'error'
              ? 'bg-[#B5473C] text-white'
              : 'bg-[#365D70] text-white'
          }`}
        >
          <span className="mx-auto">{notification.message}</span>
          <button onClick={dismissNotification} className="text-white/80 hover:text-white font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      {/* Primary Editorial Header */}
      <ConfiguratorHeader />

      {/* Main 3-Column Responsive Grid */}
      <main className="flex-1 w-full max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-4 p-0 lg:p-4 pb-24 lg:pb-6">
        {/* Left Column: Product Options (280-320px equivalent ~ 3 cols) */}
        <div
          className={`lg:col-span-3 bg-white lg:rounded-xl border-y lg:border border-[#E5E1D8] p-4 lg:p-5 overflow-y-auto max-h-none lg:max-h-[calc(100vh-110px)] ${
            activeTab === 'setup' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="mb-3">
            <h2 className="text-xs font-bold text-[#183C34] uppercase tracking-wider">Specifications & Hardware</h2>
            <p className="text-[11px] text-[#625F58]">Select size footprint, walls, and hardware packages.</p>
          </div>
          <ProductOptionsPanel />
        </div>

        {/* Center Dominant Column: 2D & 3D Interactive Canvas Workspace (~ 6 cols) */}
        <div className="lg:col-span-6 flex flex-col min-h-[460px] lg:min-h-[640px]">
          <ConfiguratorWorkspace />
        </div>

        {/* Right Column: Pricing & Cart Summary (~ 3 cols) */}
        <div
          className={`lg:col-span-3 p-4 lg:p-0 overflow-y-auto max-h-none lg:max-h-[calc(100vh-110px)] ${
            activeTab === 'review' ? 'block' : 'hidden lg:block'
          }`}
        >
          <PricingSummary />
        </div>
      </main>

      {/* Mobile Sticky Bottom Action Bar (Section 41 of UI/UX design) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E1D8] p-3 px-4 flex items-center justify-between z-40 shadow-lg">
        <div>
          <span className="text-[10px] text-[#8A867E] block leading-none">Estimated Total</span>
          <span className="text-lg font-bold text-[#183C34]">
            {pricing ? `$${pricing.total.toFixed(2)}` : '$...'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {activeTab !== 'review' ? (
            <button
              onClick={() => setActiveTab(activeTab === 'setup' ? 'design' : 'review')}
              className="px-4 py-2 bg-[#183C34] text-white text-xs font-semibold rounded-md"
            >
              {activeTab === 'setup' ? 'Next: Branding →' : 'Next: Review →'}
            </button>
          ) : (
            <button
              onClick={() => document.getElementById('btn-add-to-cart')?.click()}
              className="px-4 py-2 bg-[#183C34] text-white text-xs font-semibold rounded-md flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
