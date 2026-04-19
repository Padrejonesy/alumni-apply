import React, { useEffect } from "react";

export const pdfjs = {
  version: "test",
  GlobalWorkerOptions: {
    workerSrc: "",
  },
};

export function Document({
  children,
  file,
  onLoadSuccess,
}: {
  children?: React.ReactNode;
  file?: unknown;
  onLoadSuccess?: (value: { numPages: number }) => void;
}) {
  useEffect(() => {
    if (file && onLoadSuccess) {
      onLoadSuccess({ numPages: 1 });
    }
  }, [file, onLoadSuccess]);

  return <div data-testid="mock-pdf-document">{children}</div>;
}

export function Page({ pageNumber }: { pageNumber?: number }) {
  return <div data-testid="mock-pdf-page">Mock PDF page {pageNumber ?? 1}</div>;
}
