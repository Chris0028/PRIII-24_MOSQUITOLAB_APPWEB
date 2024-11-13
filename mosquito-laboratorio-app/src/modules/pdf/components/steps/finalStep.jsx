import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    sectionTitle: {
        backgroundColor: '#d3d3d3',
        fontSize: 10,
        fontWeight: 'bold',
        padding: 4,
        textAlign: 'left'
    },
    mainRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
        fontSize: 8,
    },
    leftColumn: {
        flex: 4,
    },
    rightColumn: {
        flex: 1,
        borderLeft: '1px solid #000',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        minHeight: 20,
        alignItems: 'center',
    },
    labelCell: {
        padding: 3,
        flex: 1.8,
    },
    dottedCell: {
        flexDirection: 'row',
        flex: 2,
    },
    signatureText: {
        fontSize: 7,
        paddingTop: 10
    }
});

export default function StepFinal({ info, username, role }) {
    return (
        <>
            <View style={styles.sectionTitle}>
                <Text>DATOS DE LA PERSONA QUE NOTIFICA</Text>
            </View>

            <View style={styles.mainRow}>
                <View style={styles.leftColumn}>
                    <View style={styles.row}>
                        <View style={styles.labelCell}>
                            <Text>Nombre y cargo: {role}</Text>
                        </View>
                        <View style={styles.dottedCell}></View>
                        <View style={styles.labelCell}>
                            <Text>Establecimiento de Salud:</Text>
                        </View>
                        <View style={styles.dottedCell}>
                            <Text>{info.hospital}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.labelCell}>
                            <Text>Teléfono/celular:</Text>
                        </View>
                        <View style={styles.dottedCell}></View>
                        <View style={styles.labelCell}>
                            <Text>Correo electrónico:</Text>
                        </View>
                        <View style={styles.dottedCell}></View>
                        <View style={styles.labelCell}>
                            <Text>SEDES:</Text>
                        </View>
                        <View style={styles.dottedCell}>
                            <Text>Cochabamba</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.rightColumn}>
                    <Text style={styles.signatureText}>{username}</Text>
                    <Text style={styles.signatureText}>FIRMA Y SELLO DEL RESPONSABLE DEL LLENADO DE LA FICHA</Text>
                </View>
            </View>
        </>
    );
}
