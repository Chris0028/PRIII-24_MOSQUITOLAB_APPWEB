import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 15,
    },
    sectionTitle: {
        backgroundColor: '#d3d3d3',
        fontSize: 10,
        fontWeight: 'bold',
        padding: 4,
        textAlign: 'left',
    },
    row: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        fontSize: 8,
        minHeight: 35,
        borderLeft: '1px solid #000'
    },
    column: {
        borderRight: '1px solid #000',
        padding: 3,
        flexGrow: 1,
    },
    smallText: {
        fontSize: 8,
    },
    verticalOptions: {
        marginTop: 3,
        flexDirection: 'column',
    },
    notificationDateContainer: {
        width: '12%', // Ajuste del ancho para asegurar el espacio
        borderRight: '1px solid #000',
    },
    notificationDateTitle: {
        padding: 1,
        fontSize: 6,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    notificationDateRow: {
        flexDirection: 'row',
        borderTop: '1px solid #000',
    },
    smallBox: {
        flex: 1,
        borderRight: '1px solid #000',
        padding: 3,
        alignItems: 'flex-start',
        minHeight: 25
    },
    reducedColumn: {
        borderRight: '1px solid #000',
        padding: 3,
        flexGrow: 1,
        width: '22%'
    },
});

export default function FilePDF() {
    return (
        <Document>
            <Page size="legal" style={styles.page}>
                <View style={styles.sectionTitle}>
                    <Text>1. DATOS GENERALES</Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.notificationDateContainer}>
                        <Text style={styles.notificationDateTitle}>Fecha de notificación</Text>
                        <View style={styles.notificationDateRow}>
                            <View style={styles.smallBox}>
                                <Text style={styles.smallText}>Día</Text>
                            </View>
                            <View style={styles.smallBox}>
                                <Text style={styles.smallText}>Mes</Text>
                            </View>
                            <View style={{ ...styles.smallBox, borderRight: 0 }}>
                                <Text style={styles.smallText}>Año</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.reducedColumn}>
                        <Text>Departamento:</Text>
                    </View>
                    <View style={styles.reducedColumn}>
                        <Text>Municipio:</Text>
                    </View>
                    <View style={styles.reducedColumn}>
                        <Text>Localidad/comunidad:</Text>
                    </View>
                    <View style={styles.reducedColumn}>
                        <Text>Red de Salud:</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={{ ...styles.column, flex: 1 }}>
                        <Text>Establecimiento de Salud notificante:</Text>
                    </View>
                    <View style={{ ...styles.column, flex: 0.5 }}>
                        <View style={styles.verticalOptions}>
                            <Text style={styles.smallText}>Público ( )</Text>
                            <Text style={styles.smallText}>Seguro salud ( )</Text>
                            <Text style={styles.smallText}>Privado ( )</Text>
                            <Text style={styles.smallText}>Otro ( )</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.column, flex: 1.2 }}>
                        <Text>Teléfono o correo electrónico del Establecimiento:</Text>
                    </View>
                    <View style={{ ...styles.column, flex: 1 }}>
                        <View style={styles.verticalOptions}>
                            <Text style={styles.smallText}>Caso captado en búsqueda activa ( )</Text>
                            <Text style={styles.smallText}>Atención en servicio de salud ( )</Text>
                            <Text style={styles.smallText}>Otro, especificar ( ) ______________________</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}