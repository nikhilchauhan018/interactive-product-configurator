import { PDFGenerationPayload, buildProductionPdf } from './pdfDocumentBuilder.js';

export class PdfService {
  async generatePdf(payload: PDFGenerationPayload): Promise<{ dataUrl: string; fileName: string; sizeBytes: number }> {
    if (!payload.configuration || !payload.pricing) {
      throw new Error('Both configuration data and pricing quote are required to generate the production PDF.');
    }

    const dataUrl = buildProductionPdf(payload);
    const fileName = `Production_Spec_${payload.configuration.id || 'draft'}.pdf`;

    return {
      dataUrl,
      fileName,
      sizeBytes: Math.round((dataUrl.length * 3) / 4),
    };
  }
}

export const pdfService = new PdfService();
