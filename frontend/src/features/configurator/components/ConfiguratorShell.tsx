import React, { useState } from 'react';
import { ConfiguratorHeader } from './ConfiguratorHeader.js';
import { ConfiguratorWorkspace } from './ConfiguratorWorkspace.js';
import { ProductOptionsPanel } from '../../product-options/components/ProductOptionsPanel.js';
import { PricingSummary } from '../../pricing/components/PricingSummary.js';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { ChevronLeft, ChevronRight, ExternalLink, ShoppingCart, X } from 'lucide-react';

export function ConfiguratorShell() {
  const { activeTab, setActiveTab, pricing, notification, dismissNotification, cart, isCartOpen, setCartOpen } = useConfigurator();
  const [isOptionsCollapsed, setIsOptionsCollapsed] = useState(false);
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(false);

  const isBrandingView = activeTab === 'design';
  const brandingColumns = `${isOptionsCollapsed ? '40px' : 'minmax(280px, 3fr)'} minmax(0, 6fr) ${isSummaryCollapsed ? '40px' : 'minmax(300px, 3fr)'}`;

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#171717]">
      {notification && (
        <div
          className={`flex items-center justify-between px-4 py-2 text-center text-[12px] font-medium transition-all ${
            notification.type === 'success'
              ? 'bg-[#183C34] text-white'
              : notification.type === 'error'
              ? 'bg-[#B5473C] text-white'
              : 'bg-[#365D70] text-white'
          }`}
        >
          <span className="mx-auto">{notification.message}</span>
          <button onClick={dismissNotification} className="ml-2 font-bold text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      <ConfiguratorHeader />

      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-[#171717]/20"
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[380px] flex-col border-l border-[#E5E1D8] bg-white shadow-[-8px_0_24px_rgba(23,23,23,0.12)]">
            <div className="flex items-center justify-between border-b border-[#E5E1D8] px-5 py-4">
              <div>
                <h2 className="text-[18px] font-semibold text-[#171717]">Your Cart</h2>
                <p className="mt-1 text-[12px] text-[#625F58]">{cart?.item?.quantity || 0} customized item</p>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={() => setCartOpen(false)}
                className="rounded-[8px] p-2 text-[#625F58] hover:bg-[#F6F4EF] hover:text-[#183C34]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 p-5">
              {cart?.item ? (
                <div className="border-b border-[#E5E1D8] pb-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#171717]">{cart.item.title || 'Customized canopy kit'}</h3>
                      <p className="mt-1 text-[12px] text-[#625F58]">Quantity: {cart.item.quantity}</p>
                      <p className="mt-2 text-[12px] text-[#8A867E]">Configuration: {cart.item.configurationId || 'Saved configuration'}</p>
                    </div>
                    <span className="shrink-0 text-[16px] font-semibold text-[#183C34]">
                      ${Number(cart.item.price || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-[13px] text-[#625F58]">Your cart is empty.</p>
              )}
            </div>
            {cart?.checkoutUrl && (
              <div className="border-t border-[#E5E1D8] p-5">
                <a
                  href={cart.checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#183C34] px-4 py-3 text-[14px] font-semibold text-white hover:bg-[#112B25]"
                >
                  Continue to Checkout
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </aside>
        </div>
      )}

      <main
        className="mx-auto grid w-full max-w-[1700px] grid-cols-1 gap-0 p-0 pb-24 xl:grid-cols-12 xl:gap-4 xl:p-4 xl:pb-6"
        style={isBrandingView ? { gridTemplateColumns: brandingColumns } : undefined}
      >
        <div
          className={`${isOptionsCollapsed ? 'xl:w-10 xl:p-2' : 'xl:p-4'} ${isBrandingView ? '' : 'xl:col-span-3'} min-w-0 overflow-y-auto border-y border-[#E5E1D8] bg-white xl:max-h-[calc(100vh-110px)] xl:rounded-[12px] xl:border ${
            activeTab === 'setup' ? 'block' : 'hidden xl:block'
          }`}
        >
          {isBrandingView && (
            <button
              type="button"
              onClick={() => setIsOptionsCollapsed((collapsed) => !collapsed)}
              title={isOptionsCollapsed ? 'Expand product options' : 'Minimize product options'}
              aria-label={isOptionsCollapsed ? 'Expand product options' : 'Minimize product options'}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#E5E1D8] text-[#625F58] transition hover:border-[#183C34] hover:text-[#183C34]"
            >
              {isOptionsCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          )}
          {!isOptionsCollapsed && <div className="mb-4">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#183C34]">
              Specifications & Hardware
            </h2>
            <p className="mt-1 text-[12px] leading-[18px] text-[#625F58]">
              Select size footprint, walls, and hardware packages.
            </p>
          </div>}
          {!isOptionsCollapsed && <ProductOptionsPanel />}
        </div>

        <div className={`min-w-0 min-h-[460px] ${isBrandingView ? '' : 'xl:col-span-6'} xl:min-h-[640px]`}>
          <ConfiguratorWorkspace />
        </div>

        <div
          className={`${isSummaryCollapsed ? 'xl:w-10' : ''} ${isBrandingView ? '' : 'xl:col-span-3'} min-w-0 overflow-y-auto xl:max-h-[calc(100vh-110px)] ${
            activeTab === 'review' ? 'block' : 'hidden xl:block'
          }`}
        >
          {isBrandingView && (
            <button
              type="button"
              onClick={() => setIsSummaryCollapsed((collapsed) => !collapsed)}
              title={isSummaryCollapsed ? 'Expand configuration summary' : 'Minimize configuration summary'}
              aria-label={isSummaryCollapsed ? 'Expand configuration summary' : 'Minimize configuration summary'}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#E5E1D8] text-[#625F58] transition hover:border-[#183C34] hover:text-[#183C34]"
            >
              {isSummaryCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          )}
          {!isSummaryCollapsed && <PricingSummary />}
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5E1D8] bg-white p-3 px-4 shadow-[0_-6px_18px_rgba(23,23,23,0.08)] xl:hidden">
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-medium uppercase tracking-[0.08em] text-[#8A867E]">
              Estimated Total
            </span>
            <span className="text-[20px] font-bold leading-6 text-[#183C34]">
              {pricing ? `$${pricing.total.toFixed(2)}` : '$...'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {activeTab !== 'review' ? (
              <button
                onClick={() => setActiveTab(activeTab === 'setup' ? 'design' : 'review')}
                className="rounded-[8px] bg-[#183C34] px-4 py-2.5 text-[12px] font-semibold text-white"
              >
                {activeTab === 'setup' ? 'Next: Branding →' : 'Next: Review →'}
              </button>
            ) : (
              <button
                onClick={() => document.getElementById('btn-add-to-cart')?.click()}
                className="flex items-center gap-1.5 rounded-[8px] bg-[#183C34] px-4 py-2.5 text-[12px] font-semibold text-white"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>Add to Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
