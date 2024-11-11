import { StyleSheet, View, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        fontSize: 8,
        minHeight: 35,
        borderLeft: '1px solid #000'
    },
    clinicalTitle: {
        backgroundColor: '#d3d3d3',
        fontSize: 10,
        fontWeight: 'bold',
        padding: 4,
        textAlign: 'left'
    },
    subtitle: {
        backgroundColor: '#d3d3d3',
        fontSize: 8,
        padding: 3,
        fontStyle: 'italic'
    },
    dateRow: {
        flexDirection: 'row',
        borderLeft: '1px solid #000',
        borderBottom: '1px solid #000',
        minHeight: 20
    },
    dateColumn: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 1
    },
    symptomsSection: {
        backgroundColor: '#e8e8e8',
        fontSize: 8,
        padding: 3,
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
        borderBottom: '1px solid #000'
    },
    symptomsRow: {
        flexDirection: 'row',
        borderLeft: '1px solid #000',
        borderBottom: '1px solid #000',
        minHeight: 20
    },
    symptomBox: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 1,
        fontSize: 7
    },
    lastSymptomBox: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 1.5,
        fontSize: 7
    },
    smallText: {
        fontSize: 8
    }
});


export default function StepFour({ epidemiologicalWeek, symptomsDate, symptoms, disease }) {
    return (
        <>
            <View style={styles.clinicalTitle}>
                <Text>4. DATOS CLÍNICOS</Text>
            </View>
            <View style={styles.subtitle}>
                <Text>(Marque con una X los signos y síntomas que presenta el paciente)</Text>
            </View>

            <View style={styles.dateRow}>
                <View style={{ ...styles.dateColumn, flex: 1.5 }}>
                    <Text style={styles.smallText}>Fecha inicio de Síntomas</Text>
                </View>
                <View style={styles.dateColumn}>
                    <Text style={styles.smallText}>Día</Text>
                </View>
                <View style={styles.dateColumn}>
                    <Text style={styles.smallText}>Mes</Text>
                </View>
                <View style={styles.dateColumn}>
                    <Text style={styles.smallText}>Año</Text>
                </View>
                <View style={styles.dateColumn}>
                    <Text style={styles.smallText}>Semana epidemiológica {epidemiologicalWeek}</Text>
                </View>
            </View>

            {disease === 1 ? ( //dengue
                <>
                    <View style={styles.symptomsSection}>
                        <Text>SOSPECHA DE DENGUE</Text>
                    </View>
                    <View style={styles.symptomsRow}>
                        {symptoms.map(symptom => {
                            return (<View style={styles.symptomBox}>
                                <Text>{symptom.symptom} (X)</Text>
                            </View>)
                        })}
                    </View>
                </>
            ) : disease === 2 ? ( //chikungunya
                <>
                    <View style={styles.symptomsSection}>
                        <Text>SOSPECHA DE CHIKUNGUNYA</Text>
                    </View>
                    <View style={styles.symptomsRow}>
                        {symptoms.map(symptom => {
                            return (<View style={styles.symptomBox}>
                                <Text>{symptom.symptom} (X)</Text>
                            </View>)
                        })}
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.symptomsSection}>
                        <Text>SOSPECHA DE ZIKA</Text>
                    </View>
                    <View style={styles.symptomsRow}>
                        {symptoms.map(symptom => {
                            return (<View style={styles.symptomBox}>
                                <Text>{symptom.symptom} (X)</Text>
                            </View>)
                        })}
                    </View>
                </>
            )}
        </>
    );
}