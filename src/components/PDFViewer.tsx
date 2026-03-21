import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { LazyMotion, domAnimation, m as motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Upload } from 'lucide-react';
import { toast } from 'sonner';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  title?: string;
  initialFile?: string;
  onFileUpload?: (file: File) => void;
}

export function PDFViewer({ title = "PDF Viewer", initialFile, onFileUpload }: PDFViewerProps) {
  const [file, setFile] = useState<string | File | null>(initialFile || null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(false);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    toast.success(`PDF loaded successfully! ${numPages} pages`);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setLoading(false);
    toast.error('Failed to load PDF. Please try again.');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      setPageNumber(1);
      setLoading(true);
      onFileUpload?.(uploadedFile);
      toast.success('PDF uploaded successfully!');
    } else {
      toast.error('Please select a valid PDF file.');
    }
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const downloadPDF = () => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <LazyMotion features={domAnimation} strict>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          
          {/* Upload Button */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload">
              <Button
                variant="outline"
                className="gap-2 cursor-pointer"
                asChild
              >
                <span>
                  <Upload className="w-4 h-4" />
                  Upload PDF
                </span>
              </Button>
            </label>
            
            {file && (
              <Button
                variant="outline"
                onClick={downloadPDF}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            )}
          </div>
        </div>

        {/* PDF Controls */}
        {file && (
          <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <span className="text-sm font-medium">
                Page {pageNumber} of {numPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={zoomOut}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              
              <span className="text-sm font-medium min-w-16 text-center">
                {Math.round(scale * 100)}%
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={zoomIn}
                disabled={scale >= 3.0}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* PDF Display */}
        <div className="flex justify-center">
          {file ? (
            <div className="border border-border rounded-lg overflow-hidden shadow-lg">
              {loading && (
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              )}
              
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Upload className="w-16 h-16 text-muted-foreground mb-4" />
              <h4 className="text-lg font-medium mb-2">No PDF uploaded</h4>
              <p className="text-muted-foreground mb-4">
                Upload a PDF file to view it here
              </p>
              <label htmlFor="pdf-upload">
                <Button className="gap-2 cursor-pointer" asChild>
                  <span>
                    <Upload className="w-4 h-4" />
                    Choose PDF File
                  </span>
                </Button>
              </label>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
    </LazyMotion>
  );
}