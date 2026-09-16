import { jsPDF } from 'jspdf';
import { ProductConfiguration, SurfaceCustomization } from '@shared/types/configuration.js';
import { PricingQuote } from '@shared/types/pricing.js';

export interface PDFGenerationPayload {
  configuration: ProductConfiguration;
  pricing: PricingQuote;
  previewImageBase64?: string;
  customerNote?: string;
}

export function buildProductionPdf(payload: PDFGenerationPayload): string {
  const { configuration, pricing, previewImageBase64, customerNote } = payload;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = 20;

  // 1. Editorial Header Bar (Deep Forest #183C34)
  doc.setFillColor(24, 60, 52); // #183C34
  doc.rect(margin, cursorY, contentWidth, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('INTERACTIVE PRODUCT CONFIGURATOR', margin + 6, cursorY + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('PRODUCTION SPECIFICATION & PROOF SHEET', margin + 6, cursorY + 16);

  doc.setFontSize(8);
  doc.text(`CFG: ${configuration.id}`, pageWidth - margin - 6, cursorY + 10, { align: 'right' });
  doc.text(`DATE: ${new Date().toLocaleDateString()}`, pageWidth - margin - 6, cursorY + 16, { align: 'right' });

  cursorY += 28;

  // 2. Product Title & Scope
  doc.setTextColor(23, 23, 23); // #171717
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(configuration.title || "10' × 10' Custom Logo Canopy Tent", margin, cursorY);
  cursorY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(98, 95, 88); // #625F58
  doc.text(`Production Lead Time: 3–5 Business Days | Ready for Shopify Order Sync`, margin, cursorY);
  cursorY += 8;

  // Divider
  doc.setDrawColor(229, 225, 216); // #E5E1D8
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 6;

  // 3. Hardware & Option Selections Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(24, 60, 52);
  doc.text('1. HARDWARE & CONSTRUCTION SELECTIONS', margin, cursorY);
  cursorY += 6;

  const specRows = [
    ['Canopy Size Footprint', `${configuration.size} Footprint`],
    ['Frame Hardware', configuration.includeFrame ? '50mm Commercial Hex Anodized Aluminum Frame + Wheel Bag' : 'Canopy Top Skin Only (No Frame Hardware)'],
    ['Full Wall Configuration', configuration.walls.replace('_', ' ').toUpperCase()],
    ['Half Wall Skirts', configuration.halfWalls.replace('_', ' ').toUpperCase()],
    ['Print Specification', configuration.printType === 'full_digital_dye_sub' ? 'Edge-to-Edge Full Digital Dye-Sublimation (UV50+ / Water-Resistant)' : 'Spot Color Thermal Transfer'],
  ];

  doc.setFontSize(8.5);
  for (const [key, val] of specRows) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(98, 95, 88);
    doc.text(key, margin + 2, cursorY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(23, 23, 23);
    doc.text(val, margin + 65, cursorY);
    cursorY += 5.5;
  }
  cursorY += 4;

  // 4. Custom Surface Breakdown
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(24, 60, 52);
  doc.text('2. CUSTOMIZED ARTWORK SURFACES', margin, cursorY);
  cursorY += 6;

  const surfaces = Object.values(configuration.surfaces || {}) as SurfaceCustomization[];
  const customizedSurfaces = surfaces.filter(s => s.elements?.length > 0 || (s.backgroundColor && s.backgroundColor !== '#FFFFFF' && s.backgroundColor !== '#183C34'));

  if (customizedSurfaces.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(138, 134, 126);
    doc.text('Standard base setup with default surface palette.', margin + 2, cursorY);
    cursorY += 6;
  } else {
    for (const surface of customizedSurfaces.slice(0, 4)) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(23, 23, 23);
      doc.text(`• Surface: ${surface.surfaceId.toUpperCase()} [Color: ${surface.backgroundColor}]`, margin + 2, cursorY);
      cursorY += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(98, 95, 88);
      for (const el of (surface.elements || []).slice(0, 3)) {
        if (el.type === 'text') {
          doc.text(`  - Text: "${el.text}" (Font: ${el.fontFamily}, Fill: ${el.fill})`, margin + 4, cursorY);
        } else {
          doc.text(`  - Graphic: ${el.fileName || 'Custom Logo'}`, margin + 4, cursorY);
        }
        cursorY += 4.5;
      }
    }
  }
  cursorY += 4;

  // 5. Preview Graphic if present
  if (previewImageBase64 && previewImageBase64.startsWith('data:image')) {
    try {
      const imgHeight = 45;
      const imgWidth = 75;
      doc.addImage(previewImageBase64, 'JPEG', margin + (contentWidth - imgWidth) / 2, cursorY, imgWidth, imgHeight);
      cursorY += imgHeight + 6;
    } catch {
      // Graceful fallback if image decoding issues
    }
  }

  // 6. Pricing Breakdown
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(24, 60, 52);
  doc.text('3. PRICING & QUOTATION SUMMARY', margin, cursorY);
  cursorY += 6;

  // Table header
  doc.setFillColor(246, 244, 239);
  doc.rect(margin, cursorY - 3.5, contentWidth, 6, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(98, 95, 88);
  doc.text('LINE ITEM', margin + 2, cursorY);
  doc.text('QTY', margin + 120, cursorY);
  doc.text('TOTAL (USD)', pageWidth - margin - 2, cursorY, { align: 'right' });
  cursorY += 6;

  for (const item of (pricing.lineItems || [])) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(23, 23, 23);
    doc.text(item.name, margin + 2, cursorY);
    doc.text(String(item.quantity), margin + 120, cursorY);
    doc.text(`$${item.total.toFixed(2)}`, pageWidth - margin - 2, cursorY, { align: 'right' });
    cursorY += 5;
  }

  // Divider
  doc.setDrawColor(24, 60, 52);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 6;

  // Grand Total
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(24, 60, 52);
  doc.text('ESTIMATED PRODUCTION TOTAL:', margin + 70, cursorY);
  doc.setFontSize(13);
  doc.text(`$${pricing.total.toFixed(2)} USD`, pageWidth - margin - 2, cursorY, { align: 'right' });
  cursorY += 12;

  // Customer Note if present
  if (customerNote) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(23, 23, 23);
    doc.text('Customer Notes:', margin, cursorY);
    cursorY += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(98, 95, 88);
    doc.text(customerNote, margin, cursorY, { maxWidth: contentWidth });
  }

  // Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(138, 134, 126);
  doc.text(
    'Interactive Product Configurator • Technical Test Submission • Seamlessly Integrated with Shopify & 3D WebGL Engine',
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 10,
    { align: 'center' }
  );

  return doc.output('datauristring');
}
