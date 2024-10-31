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


export default function StepFour() {
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
                    <Text style={styles.smallText}>Semana epidemiológica</Text>
                </View>
            </View>

            <View style={styles.symptomsSection}>
                <Text>SOSPECHA DE DENGUE SIN SIGNOS DE ALARMA</Text>
            </View>
            <View style={styles.symptomsRow}>
                <View style={styles.symptomBox}>
                    <Text>Fiebre Aguda</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Nauseas/Vómitos</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Cefalea</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Dolor Retro-Orbitario</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Mialgias</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Petequias Prueba Torniquete +</Text>
                </View>
                <View style={styles.lastSymptomBox}>
                    <Text>Otro (especificar):</Text>
                </View>
            </View>

            <View style={styles.symptomsSection}>
                <Text>SOSPECHA DE DENGUE CON SIGNOS DE ALARMA</Text>
            </View>
            <View style={styles.symptomsRow}>
                <View style={styles.symptomBox}>
                    <Text>Dolor Abdominal</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Vómitos Persistentes</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Letargia o Irritabilidad</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Sangrado de Mucosas</Text>
                </View>
                <View style={styles.lastSymptomBox}>
                    <Text>Otro (especificar):</Text>
                </View>
            </View>

            <View style={styles.symptomsSection}>
                <Text>SOSPECHA DE DENGUE GRAVE</Text>
            </View>
            <View style={styles.symptomsRow}>
                <View style={styles.symptomBox}>
                    <Text>Distres Respiratorio</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Choque</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Sangrado Grave</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Compromiso Grave de Órganos</Text>
                </View>
                <View style={styles.lastSymptomBox}>
                    <Text>Otro (especificar):</Text>
                </View>
            </View>

            <View style={styles.symptomsSection}>
                <Text>SOSPECHA DE CHIKUNGUNYA</Text>
            </View>
            <View style={styles.symptomsRow}>
                <View style={styles.symptomBox}>
                    <Text>Fiebre</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Poliartralgias</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Poliartritis</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Mialgias</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Exantema</Text>
                </View>
                <View style={styles.lastSymptomBox}>
                    <Text>Otro (especificar):</Text>
                </View>
            </View>

            <View style={styles.symptomsSection}>
                <Text>SOSPECHA DE ZIKA</Text>
            </View>
            <View style={styles.symptomsRow}>
                <View style={styles.symptomBox}>
                    <Text>Exantema Maculopapular</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Conjuntivitis no Purulenta</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Fiebre</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Mialgia/Artralgia</Text>
                </View>
                <View style={styles.symptomBox}>
                    <Text>Edema Periarticular</Text>
                </View>
                <View style={styles.lastSymptomBox}>
                    <Text>Otro (especificar):</Text>
                </View>
            </View>
        </>
    );
}