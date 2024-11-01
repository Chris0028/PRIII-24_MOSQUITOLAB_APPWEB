import { pdf } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

// Componente para visualizar el PDF
export default function ResultViewer({ pdfToView }) {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (pdfToView) {
            const generatePdf = async () => {
                try {
                    const blob = await pdf(pdfToView).toBlob();
                    const pdfUrl = URL.createObjectURL(blob);
                    setUrl(pdfUrl);
                    window.open(pdfUrl, '_blank');
                } catch (error) {
                    console.error('Error generando PDF:', error);
                }
            };

            generatePdf();
        }

        return () => {
            if (url) {
                URL.revokeObjectURL(url);
            }
        };
    }, [pdfToView]);
};