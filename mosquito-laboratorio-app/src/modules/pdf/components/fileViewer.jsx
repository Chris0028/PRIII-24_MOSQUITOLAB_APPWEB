import { pdf } from '@react-pdf/renderer';
import { useEffect } from 'react';

export default function FileViewer({ pdfToView }) {
    useEffect(() => {
        let url;

        if (pdfToView) {
            async function handlePreview() {
                const blob = await pdf(pdfToView).toBlob();
                url = URL.createObjectURL(blob);
                window.open(url, '_blank');
            }

            handlePreview();
        }

        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [pdfToView]);

    return null;
}
