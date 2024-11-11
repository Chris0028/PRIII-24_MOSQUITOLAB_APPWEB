import { StyleSheet, View, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        fontSize: 8,
        minHeight: 35,
        borderLeft: '1px solid #000'
    },
    epidemTitle: {
        backgroundColor: '#d3d3d3',
        fontSize: 10,
        fontWeight: 'bold',
        padding: 4,
        textAlign: 'left'
    },
    epidemQuestion: {
        fontSize: 8,
        padding: 3,
        borderBottom: '1px solid #000',
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000'
    },
    epidemRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        borderLeft: '1px solid #000',
        fontSize: 8,
        minHeight: 25
    },
    epidemColumn: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 1
    },
    countryColumn: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 0.8
    }
});

export default function StepThree({ country, state, city, municipality, neighborhood }) {
    return (
        <>
            <View style={styles.epidemTitle}>
                <Text>3. ANTECEDENTES EPIDEMIOLÓGICOS</Text>
            </View>

            <View style={styles.epidemQuestion}>
                <Text>Lugar probable de Infección. ¿Visitó algún lugar endémico de Dengue, Chikungunya o Zika, en las últimas dos semanas?</Text>
            </View>

            <View style={styles.epidemRow}>
                <View style={styles.countryColumn}>
                    <Text style={styles.smallText}>País/Lugar:</Text>
                    <Text>{`\n${country}`}</Text>
                </View>
                <View style={styles.epidemColumn}>
                    <Text style={styles.smallText}>Departamento:</Text>
                    <Text>{`\n${state}`}</Text>
                </View>
                <View style={styles.epidemColumn}>
                    <Text style={styles.smallText}>Provincia/Municipio:</Text>
                    <Text>{`\n${municipality}`}</Text>
                </View>
                <View style={styles.epidemColumn}>
                    <Text style={styles.smallText}>Ciudad/Localidad/Comunidad:</Text>
                    <Text>{`\n${city}`}</Text>
                </View>
                <View style={styles.epidemColumn}>
                    <Text style={styles.smallText}>Barrio/Zona/U.V.:</Text>
                    <Text>{`\n${neighborhood}`}</Text>
                </View>
            </View>
        </>
    );
}