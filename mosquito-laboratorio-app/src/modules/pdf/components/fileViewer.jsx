import { pdf } from '@react-pdf/renderer';
import { useEffect } from 'react';

export default function FileViewer({ pdfToView }) {
    useEffect(() => {
        if (pdfToView) {
            async function handlePreview() {
                const blob = await pdf(pdfToView).toBlob();
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
                URL.revokeObjectURL(url);
            }
            handlePreview();
        }
    }, [pdfToView]);
    return null;
}