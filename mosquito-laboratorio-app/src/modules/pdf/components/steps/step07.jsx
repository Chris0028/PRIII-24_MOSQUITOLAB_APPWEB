import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    sectionTitle: {
        backgroundColor: '#d3d3d3',
        fontSize: 10,
        fontWeight: 'bold',
        padding: 4,
        textAlign: 'left'
    },
    row: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        borderLeft: '1px solid #000',
        fontSize: 8,
        minHeight: 15,
    },
    labelCell: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 0.8,
        fontWeight: 'bold'
    },
    sampleCell: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 0.8
    },
    dateCell: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 0.3
    },
    typeCell: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 1.2
    },
    inputCell: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 0.8
    }
});

export default function StepSeven() {
    return (
        <>
            <View style={styles.sectionTitle}>
                <Text>7. EXÁMENES DE LABORATORIO</Text>
            </View>

            <View style={styles.row}>
                <View style={styles.sampleCell}>
                    <Text>Se tomó muestra: Si ( ) No ( )</Text>
                </View>
                <View style={styles.labelCell}>
                    <Text>Fecha de toma de muestra:</Text>
                </View>
                <View style={styles.dateCell}>
                    <Text>Día</Text>
                </View>
                <View style={styles.dateCell}>
                    <Text>Mes</Text>
                </View>
                <View style={styles.dateCell}>
                    <Text>Año</Text>
                </View>
                <View style={styles.typeCell}>
                    <Text>Tipo de muestra: Suero( ) Orina( ) Otro ( )</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.labelCell}>
                    <Text>Dengue:</Text>
                </View>
                <View style={styles.inputCell}>
                    <Text>RT-PCR en tiempo real +( ) -( )</Text>
                </View>
                <View style={styles.inputCell}>
                    <Text>Elisa NS1 +( ) -( )</Text>
                </View>
                <View style={styles.inputCell}>
                    <Text>Mac Elisa IgM +( ) -( )</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.labelCell}>
                    <Text>Chikungunya:</Text>
                </View>
                <View style={styles.inputCell}>
                    <Text>RT-PCR en tiempo real +( ) -( )</Text>
                </View>
                <View style={styles.inputCell}>
                    <Text>Elisa IgM +( ) -( )</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.labelCell}>
                    <Text>Zika:</Text>
                </View>
                <View style={styles.inputCell}>
                    <Text>RT-PCR en tiempo real +( ) -( )</Text>
                </View>
                <View style={styles.inputCell}>
                    <Text>Elisa IgM +( ) -( )</Text>
                </View>
            </View>
        </>
    );
}
