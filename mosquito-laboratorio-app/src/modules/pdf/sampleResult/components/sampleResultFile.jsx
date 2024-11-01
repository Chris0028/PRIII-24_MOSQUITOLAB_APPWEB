import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import HeaderSampleResult from '../components/header';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

// Estilos generales para el PDF
const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 50,
        paddingVertical: 20,
    },
    bodyContainer: {
        borderBottom: 1,
        borderTop: 1,
        borderLeft: 1,
        borderRight: 1,
        borderColor: '#000000',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        width: '100%',
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '38%',
    },
    separator: {
        width: '7%',
        textAlign: 'center',
        fontSize: 11,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 11,
        width: '55%',
        textAlign: 'left',
    },
    resultQrContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    resultText: {
        fontSize: 12,
        textAlign: 'left',
        width: '60%',
    },
    qrImage: {
        width: 80,
        height: 80,
    },
    spacer: {
        marginVertical: 20,
    }
});

// Componente para el cuerpo de la ficha de resultados
function ResultBody({ qrCodeData }) {
    return (
        <View style={styles.bodyContainer}>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Laboratorio</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{'Campo Laboratorio' || ''}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Fecha de Resultado</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{'Campo Fecha Resultado' || ''}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Nombre del Paciente</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{'Campo Nombre Paciente' || ''}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Edad</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{'Campo Edad' || ''}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Código</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{'Campo Codigo' || ''}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Tipo de Muestra</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{'Campo Tipo de Muestra' || ''}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Fecha de Toma de Muestra</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{'Campo Fecha Toma de Muestra' || ''}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Método de Diagnóstico</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{'Campo Metodo Diagnostico' || ''}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Centro de Notificación</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{'Campo Centro de Notificacion' || ''}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Responsable Técnico</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{'Campo Responsable Tecnico' || ''}</Text>
            </View>

            <View style={styles.spacer} />

            <View style={styles.resultQrContainer}>
                <Text style={styles.resultText}>{'Resultado del laboratorio'}</Text>
                {qrCodeData && (
                    <Image
                        style={styles.qrImage}
                        src={qrCodeData}
                    />
                )}
            </View>
        </View>
    );
}

// Componente principal del documento PDF
export default function ResultFilePDF() {
    const [qrCodeData, setQrCodeData] = useState('');

    useEffect(() => {
        // Esta función se ejecutará en cada renderizado del componente
        const generateQR = async () => {
            try {
                const qrCodeValue = "HOLA DESDE EL QR"; // Valor estático para pruebas
                const dataUrl = await QRCode.toDataURL(qrCodeValue, {
                    width: 80,
                    margin: 0,
                    color: {
                        dark: '#000000',
                        light: '#ffffff'
                    }
                });
                setQrCodeData(dataUrl);
            } catch (err) {
                console.error('Error generando QR:', err);
            }
        };

        generateQR();
    }, []); // [] se puede quitar si necesitas que se ejecute en cada render

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <HeaderSampleResult />
                <ResultBody qrCodeData={qrCodeData} />
            </Page>
        </Document>
    );
}
