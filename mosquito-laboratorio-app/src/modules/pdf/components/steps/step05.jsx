import { StyleSheet, View, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        fontSize: 8,
        minHeight: 35,
        borderLeft: '1px solid #000'
    },
    hospitalizationTitle: {
        backgroundColor: '#d3d3d3',
        fontSize: 10,
        fontWeight: 'bold',
        padding: 4,
        textAlign: 'left'
    },
    hospitalizationRow: {
        flexDirection: 'row',
        borderLeft: '1px solid #000',
        borderBottom: '1px solid #000',
        minHeight: 20
    },
    hospitalCell: {
        borderRight: '1px solid #000',
        padding: 3,
        fontSize: 8,
        flex: 1.5
    },
    establishmentCell: {
        borderRight: '1px solid #000',
        padding: 3,
        fontSize: 8,
        flex: 2
    },
    dateCell: {
        borderRight: '1px solid #000',
        padding: 3,
        fontSize: 8,
        flex: 0.5
    },
    dischargeTypeRow: {
        flexDirection: 'row',
        borderLeft: '1px solid #000',
        borderBottom: '1px solid #000',
        minHeight: 20
    },
    dischargeMedicaCell: {
        borderRight: '1px solid #000',
        padding: 3,
        fontSize: 8,
        flex: 1.5
    },
    dischargeCell: {
        borderRight: '1px solid #000',
        padding: 3,
        fontSize: 8,
        flex: 0.8
    },
    defunctionDateCell: {
        borderRight: '1px solid #000',
        padding: 3,
        fontSize: 8,
        flex: 1.2
    }
});

export default function StepFive() {
    return (
        <>
            <View style={styles.hospitalizationTitle}>
                <Text>5. HOSPITALIZACIÓN</Text>
            </View>
            <View style={styles.hospitalizationRow}>
                <View style={styles.hospitalCell}>
                    <Text style={styles.smallText}>Fue hospitalizado (a) ? Si (    ) No (    )</Text>
                </View>
                <View style={styles.dateCell}>
                    <Text style={styles.smallText}>Día</Text>
                </View>
                <View style={styles.dateCell}>
                    <Text style={styles.smallText}>Mes</Text>
                </View>
                <View style={styles.dateCell}>
                    <Text style={styles.smallText}>Año</Text>
                </View>
                <View style={styles.establishmentCell}>
                    <Text style={styles.smallText}>Establecimiento de Salud:</Text>
                </View>
            </View>

            <View style={styles.hospitalizationRow}>
                <View style={styles.hospitalCell}>
                    <Text style={styles.smallText}>Hospitalizado (a) UTI Si (    ) No (    )</Text>
                </View>
                <View style={styles.dateCell}>
                    <Text style={styles.smallText}>Día</Text>
                </View>
                <View style={styles.dateCell}>
                    <Text style={styles.smallText}>Mes</Text>
                </View>
                <View style={styles.dateCell}>
                    <Text style={styles.smallText}>Año</Text>
                </View>
                <View style={styles.establishmentCell}>
                    <Text style={styles.smallText}>Establecimiento de Salud:</Text>
                </View>
            </View>

            <View style={styles.dischargeTypeRow}>
                <View style={styles.dischargeMedicaCell}>
                    <Text style={styles.smallText}>Tipo de Alta: Médica (    )</Text>
                </View>
                <View style={styles.dischargeCell}>
                    <Text style={styles.smallText}>Solicitada (    )</Text>
                </View>
                <View style={styles.dischargeCell}>
                    <Text style={styles.smallText}>Fuga (    )</Text>
                </View>
                <View style={styles.dischargeCell}>
                    <Text style={styles.smallText}>Defunción (    )</Text>
                </View>
                <View style={styles.defunctionDateCell}>
                    <Text style={styles.smallText}>Fecha Defunción</Text>
                </View>
                <View style={styles.dateCell}>
                    <Text style={styles.smallText}>Día:</Text>
                </View>
                <View style={styles.dateCell}>
                    <Text style={styles.smallText}>Mes:</Text>
                </View>
                <View style={styles.dateCell}>
                    <Text style={styles.smallText}>Año:</Text>
                </View>
            </View>
        </>
    );
}