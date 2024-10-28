import React, { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import FilePDF from './filePDF'
import { Button } from 'rsuite';

const FileViewer = () => {
    const handlePreview = async () => {
        const blob = await pdf(<FilePDF />).toBlob();

        const url = URL.createObjectURL(blob);

        window.open(url, '_blank');

        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <Button onClick={handlePreview}>Generar PDF</Button>
        </div>
    );
};

export default FileViewer;
