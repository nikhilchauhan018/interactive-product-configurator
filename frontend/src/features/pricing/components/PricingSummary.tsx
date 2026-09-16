import React, { useState } from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { addConfigurationToShopifyCart } from '../../../services/shopify/shopifyService.js';
import { requestProductionPdf } from '../../../services/pdf/pdfService.js';
import { ShoppingCart, FileDown, BookmarkCheck, Loader2, ShieldCheck, CheckCircle } from 'lucide-react';

export function PricingSummary() {
  const {
    configuration,
    pricing,
    isPricingLoading,
    pricingError,
    saveCurrentConfiguration,
    isSaving,
    lastSavedAt,
    setNotification,
  } = useConfigurator();

  const [isAddingCart, setIsAddingCart] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [cartSuccess, setCartSuccess] = useState<string | null>(null);

  const handleAddToCart = async () => {
    if (!pricing || pricing.total <= 0) return;
    setIsAddingCart(true);
    setCartSuccess(null);

    try {
      // 1. Ensure configuration is saved
      const configId = await saveCurrentConfiguration();

      // 2. Dispatch to Shopify Cart Service
      const res = await addConfigurationToShopifyCart({
        configurationId: configId,
        quantity: 1,
        pricing,
        customerNotes: 'Production ready custom proof.',
      });

      setCartSuccess(res.message);
      setNotification('success', 'Custom canopy kit added to Shopify cart!');
    } catch (err: any) {
      setNotification('error', err.message || 'Failed to add item to Shopify cart.');
    } finally {
      setIsAddingCart(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!pricing) return;
    setIsDownloadingPdf(true);

    try {
      const res = await requestProductionPdf({
        configuration,
        pricing,
        customerNote: 'Production specification sheet generated from Interactive Product Configurator.',
      });

      // Trigger browser download
      const link = document.createElement('a');
      link.href = res.dataUrl;
      link.download = res.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setNotification('success', `Production PDF downloaded: ${res.fileName}`);
    } catch (err: any) {
      setNotification('error', err.message || 'Failed to generate production PDF.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="bg-white border border-[#E5E1D8] rounded-xl p-5 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
        <div>
          <h2 className="text-sm font-bold text-[#171717]">Configuration Summary</h2>
          <span className="text-[11px] text-[#625F58]">
            {configuration.size} Footprint • {configuration.includeFrame ? 'Hardware Kit' : 'Canopy Top'}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2F6B4F] bg-[#2F6B4F]/10 px-2 py-0.5 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" /> 3–5 Day Lead
        </span>
      </div>

      {/* Itemized Line Items */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-[#8A867E] uppercase tracking-wider block">Quotation Details</span>

        {isPricingLoading ? (
          <div className="py-4 flex items-center justify-center gap-2 text-xs text-[#625F58]">
            <Loader2 className="w-4 h-4 animate-spin text-[#183C34]" />
            Updating quotation...
          </div>
        ) : (
          <div className="space-y-1.5 text-xs">
            {pricing?.lineItems?.map((item) => (
              <div key={item.id} className="flex items-start justify-between text-[#171717]">
                <div className="pr-2">
                  <span className="font-medium">{item.name}</span>
                  {item.description && (
                    <span className="block text-[10px] text-[#8A867E] leading-tight">{item.description}</span>
                  )}
                </div>
                <span className="font-medium shrink-0">
                  {item.total < 0 ? `-$${Math.abs(item.total).toFixed(2)}` : `$${item.total.toFixed(2)}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing Error Alert */}
      {pricingError && (
        <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-800">
          {pricingError}
        </div>
      )}

      {/* Total Section */}
      <div className="pt-3 border-t border-[#E5E1D8] flex items-baseline justify-between">
        <div>
          <span className="text-xs font-semibold text-[#625F58] block">Estimated Total</span>
          <span className="text-[10px] text-[#8A867E]">Taxes & freight calculated at checkout</span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-[#183C34]">
            {pricing ? `$${pricing.total.toFixed(2)}` : '$...'}
          </span>
          <span className="text-[10px] text-[#8A867E] block uppercase font-mono">USD</span>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="space-y-2 pt-1">
        {/* Add To Cart Button */}
        <button
          id="btn-add-to-cart"
          onClick={handleAddToCart}
          disabled={isAddingCart || isPricingLoading}
          className="w-full py-3 px-4 bg-[#183C34] hover:bg-[#112B25] active:scale-[0.99] text-white font-semibold text-xs rounded-md shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isAddingCart ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ShoppingCart className="w-4 h-4" />
          )}
          <span>{isAddingCart ? 'Preparing Shopify Cart...' : 'Add to Cart / Request Proof'}</span>
        </button>

        {/* Secondary Actions: Save & PDF */}
        <div className="grid grid-cols-2 gap-2">
          <button
            id="btn-save-configuration"
            onClick={() => saveCurrentConfiguration()}
            disabled={isSaving}
            className="py-2 px-3 bg-white border border-[#D6D0C5] hover:border-[#183C34] hover:bg-[#FBFAF7] text-[#171717] text-xs font-medium rounded-md transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <BookmarkCheck className="w-3.5 h-3.5" />}
            <span>Save Config</span>
          </button>

          <button
            id="btn-download-pdf-summary"
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className="py-2 px-3 bg-white border border-[#D6D0C5] hover:border-[#183C34] hover:bg-[#FBFAF7] text-[#171717] text-xs font-medium rounded-md transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            {isDownloadingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
            <span>PDF Proof</span>
          </button>
        </div>
      </div>

      {/* Cart Confirmation Notice */}
      {cartSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Item Ready in Cart</span>
            <span className="text-[11px] text-emerald-800">{cartSuccess}</span>
          </div>
        </div>
      )}

      {/* Save metadata */}
      {lastSavedAt && (
        <div className="text-center text-[10px] text-[#8A867E]">
          Configuration ID: <span className="font-mono text-[#625F58]">{configuration.id}</span> • Saved at {lastSavedAt}
        </div>
      )}
    </div>
  );
}
