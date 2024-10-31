import { StyleSheet, View, Text } from "@react-pdf/renderer";

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
        fontSize: 8,
        minHeight: 35,
        borderLeft: '1px solid #000'
    },
    nameColumn: {
        width: '17%',
        borderRight: '1px solid #000',
        padding: 3
    },
    surnameColumn: {
        width: '17%',
        borderRight: '1px solid #000',
        padding: 3
    },
    maternalColumn: {
        width: '17%',
        borderRight: '1px solid #000',
        padding: 3
    },
    genderAgeSection: {
        width: '15%',
        borderRight: '1px solid #000',
        padding: 3
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2
    },
    genderColumn: {
        width: '48%',
        alignItems: 'center'
    },
    checkbox: {
        border: '1px solid #000',
        width: 8,
        height: 8,
        marginTop: 2
    },
    idSection: {
        width: '17%',
        borderRight: '1px solid #000',
        padding: 3
    },
    dateSection: {
        width: '17%',
        borderRight: '1px solid #000',
        padding: 3
    },
    guardianRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        fontSize: 8,
        minHeight: 25,
        borderLeft: '1px solid #000'
    },
    guardianSection: {
        flex: 1,
        borderRight: '1px solid #000',
        padding: 3
    },
    phoneSection: {
        width: '20%',
        borderRight: '1px solid #000',
        padding: 3
    },
    smallText: {
        fontSize: 8
    },
    residenceTitle: {
        backgroundColor: '#d3d3d3',
        fontSize: 10,
        fontWeight: 'bold',
        padding: 4,
        textAlign: 'left'
    },
    residenceRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        borderLeft: '1px solid #000',
        fontSize: 8,
        minHeight: 25
    },
    residenceColumn: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 1
    },
    pregnancyRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        borderLeft: '1px solid #000',
        fontSize: 8,
        minHeight: 25
    },
    pregnancySection: {
        flex: 1,
        flexDirection: 'row',
        borderRight: '1px solid #000',
        padding: 3
    },
    checkboxGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5
    },
    fumSection: {
        flex: 1,
        borderRight: '1px solid #000',
        padding: 3
    },
    dueDateSection: {
        flex: 1,
        borderRight: '1px solid #000',
        padding: 3
    },
    comorbidityRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        borderLeft: '1px solid #000',
        fontSize: 8,
        minHeight: 25
    },
})

export default function StepTwo() {
    return (
        <>
            <View style={styles.sectionTitle}>
                <Text>2. DATOS Y ANTECEDENTES DEL PACIENTE</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.nameColumn}>
                    <Text style={styles.smallText}>Nombres:</Text>
                </View>
                <View style={styles.surnameColumn}>
                    <Text style={styles.smallText}>Apellido Paterno:</Text>
                </View>
                <View style={styles.maternalColumn}>
                    <Text style={styles.smallText}>Apellido Materno:</Text>
                </View>
                <View style={styles.genderAgeSection}>
                    <Text style={styles.smallText}>Edad</Text>
                    <View style={styles.genderContainer}>
                        <View style={styles.genderColumn}>
                            <Text style={styles.smallText}>Masculino</Text>
                            <View style={styles.checkbox} />
                        </View>
                        <View style={styles.genderColumn}>
                            <Text style={styles.smallText}>Femenino</Text>
                            <View style={styles.checkbox} />
                        </View>
                    </View>
                </View>
                <View style={styles.idSection}>
                    <Text style={styles.smallText}>Carnet de identidad</Text>
                </View>
                <View style={styles.dateSection}>
                    <Text style={styles.smallText}>Fecha de nacimiento</Text>
                </View>
            </View>

            <View style={styles.guardianRow}>
                <View style={styles.guardianSection}>
                    <Text style={styles.smallText}>En caso de menor de edad registrar el nombre de los padres o apoderado:</Text>
                </View>
                <View style={styles.phoneSection}>
                    <Text style={styles.smallText}>Teléfono</Text>
                </View>
            </View>

            <View style={styles.residenceTitle}>
                <Text>Residencia del Paciente</Text>
            </View>
            <View style={styles.residenceRow}>
                <View style={styles.residenceColumn}>
                    <Text style={styles.smallText}>Departamento:</Text>
                </View>
                <View style={styles.residenceColumn}>
                    <Text style={styles.smallText}>Municipio:</Text>
                </View>
                <View style={styles.residenceColumn}>
                    <Text style={styles.smallText}>Ciudad/Localidad/Comunidad:</Text>
                </View>
                <View style={styles.residenceColumn}>
                    <Text style={styles.smallText}>Barrio/Zona/U.V.:</Text>
                </View>
            </View>

            <View style={styles.pregnancyRow}>
                <View style={styles.pregnancySection}>
                    <Text style={styles.smallText}>Si es mujer, está embarazada:</Text>
                    <View style={styles.checkboxGroup}>
                        <Text style={styles.smallText}>Si ( )</Text>
                        <Text style={styles.smallText}>No ( )</Text>
                    </View>
                </View>
                <View style={styles.fumSection}>
                    <Text style={styles.smallText}>FUM:</Text>
                </View>
                <View style={styles.dueDateSection}>
                    <Text style={styles.smallText}>Fecha probable parto:</Text>
                </View>
            </View>

            <View style={styles.comorbidityRow}>
                <View style={styles.pregnancySection}>
                    <Text style={styles.smallText}>Comorbilidad:</Text>
                    <View style={styles.checkboxGroup}>
                        <Text style={styles.smallText}>Si ( )</Text>
                        <Text style={styles.smallText}>No ( )</Text>
                    </View>
                </View>
                <View style={{ ...styles.fumSection, flex: 2 }}>
                    <Text style={styles.smallText}>Especificar:</Text>
                </View>
            </View>
        </>
    );
}