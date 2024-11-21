import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import HeaderSampleResult from '../components/header';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { encryptId } from '../Utils/encrypter';
import { GetResult } from '../services/resultService';

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
        marginVertical: 5,
    }
});

// Componente para el cuerpo de la ficha de resultados
function ResultBody({ qrCodeData,
    labName, resultRegisterDate,
    patientName, patientAge,
    fileCode, sampleType,
    sampleCollectionDate, symptomsStartDate,
    diagnosticMethods, hospitalName,
    resultPerson, resultDetails
}) {

    return (
        <View style={styles.bodyContainer}>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Laboratorio</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{labName}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Fecha de Resultado</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{resultRegisterDate}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Nombre del Paciente</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{patientName}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Edad</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{patientAge}</Text>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Código</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{fileCode}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Tipo de Muestra</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{sampleType}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Fecha de Toma de Muestra</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{sampleCollectionDate}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Fecha de Inicio de Sintomas</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{symptomsStartDate}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Método de Diagnóstico</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{diagnosticMethods}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Centro de Notificación</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{hospitalName}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>RESULTADO</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{resultDetails}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Responsable Técnico</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>{resultPerson}</Text>
            </View>

            <View style={styles.spacer} />

            <View style={styles.resultQrContainer}>
                <Text style={styles.resultText}>{' '}</Text>

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
export default function ResultFilePDF({ resultId }) {
    const [qrCodeData, setQrCodeData] = useState('');
    const [resultData, setResultData] = useState({
        lab_name: '',
        result_register_date: '',
        patient_name: '',
        patient_age: '',
        file_code: '',
        sample_type: '',
        sample_collection_date: '',
        symptoms_start_date: '',
        diagnostic_methods: '',
        hospital_name: '',
        result_person: '',
        result_details: '',
    });

    useEffect(() => {
        // Genera el código QR para el ID encriptado
        const generateQR = async () => {
            try {
                const idEncrypted = encryptId(resultId);
                const dataUrl = await QRCode.toDataURL(idEncrypted, {
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
    }, [resultId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Obteniendo resultado para ID:', resultId);
                const res = await GetResult(resultId);
                setResultData(res);
            } catch (error) {
                console.error('Error al obtener el resultado:', error.message);
            }
        };

        fetchData();
    }, [resultId]);

    return (
        <Document>
            <Page size="LEGAL" style={styles.page}>
                <HeaderSampleResult resultId={resultData.file_code} />
                <ResultBody qrCodeData={qrCodeData}
                    labName={resultData.lab_name}
                    resultRegisterDate={resultData.result_register_date}
                    patientName={resultData.patient_name}
                    patientAge={resultData.patient_age}
                    fileCode={resultData.file_code}
                    sampleType={resultData.sample_type}
                    sampleCollectionDate={resultData.sample_collection_date}
                    symptomsStartDate={resultData.symptoms_start_date}
                    diagnosticMethods={resultData.diagnostic_methods}
                    hospitalName={resultData.hospital_name}
                    resultPerson={resultData.result_person}
                    resultDetails={resultData.result_details.toUpperCase()} />
            </Page>
        </Document>
    );
}