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

export default function StepSeven({ disease, sampleCollectionDate, testresult, sampleType, diagnosticMehtod }) {
    return (
        <>
            <View style={styles.sectionTitle}>
                <Text>7. EXÁMENES DE LABORATORIO</Text>
            </View>

            <View style={styles.row}>
                <View style={styles.sampleCell}>
                    <Text>{sampleCollectionDate ? 'Se tomó muestra: Si (X) No ( )' : 'Se tomó muestra: Si ( ) No (X)'}</Text>
                </View>
                <View style={styles.labelCell}>
                    <Text>Fecha de toma de muestra: {sampleCollectionDate}</Text>
                </View>
                <View style={styles.typeCell}>
                    <Text>
                        {sampleType === 'Orina' ? 'Tipo de muestra: Suero( ) Orina(X)' : 'Tipo de muestra: Suero(X) Orina( )'}
                    </Text>
                </View>
            </View>
            {disease === 1 ? (
                <>
                    {diagnosticMehtod === 'Mac Elisa IgM' ? (
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
                                <Text>{testresult === 'Positivo' ? 'Mac Elisa IgM +(X) -( )' : 'Mac Elisa IgM +( ) -(X)'}</Text>
                            </View>
                        </View>
                    ) : diagnosticMehtod === 'RT-PCR en tiempo real' ? (
                        <View style={styles.row}>
                            <View style={styles.labelCell}>
                                <Text>Dengue:</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>{testresult === 'Positivo' ? 'RT-PCR en tiempo real +(X) -( )' : 'RT-PCR en tiempo real +( ) -(X)'}</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>Elisa NS1 +( ) -( )</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>Mac Elisa IgM +( ) -( )</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.row}>
                            <View style={styles.labelCell}>
                                <Text>Dengue:</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>RT-PCR en tiempo real +( ) -( )</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>{testresult === 'Positivo' ? 'Elisa NS1 +(X) -( )' : 'Elisa NS1 +( ) -(X)'}</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>Mac Elisa IgM +( ) -( )</Text>
                            </View>
                        </View>
                    )}
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
            ) : disease === 2 ? (
                <>
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
                    {diagnosticMehtod === 'RT-PCR en tiempo real' ? (
                        <View style={styles.row}>
                            <View style={styles.labelCell}>
                                <Text>Chikungunya:</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>{testresult === 'Positivo' ? 'RT-PCR en tiempo real +(X) -( )' : 'RT-PCR en tiempo real +( ) -(X)'}</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>Elisa IgM +( ) -( )</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.row}>
                            <View style={styles.labelCell}>
                                <Text>Chikungunya:</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>RT-PCR en tiempo real +( ) -( )</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>{testresult === 'Positivo' ? 'Elisa IgM +(X) -( )' : 'Elisa IgM +( ) -(X)'}</Text>
                            </View>
                        </View>
                    )}
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
            ) : (
                <>
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
                    {diagnosticMehtod === 'RT-PCR en tiempo real' ? (
                        <View style={styles.row}>
                            <View style={styles.labelCell}>
                                <Text>Zika:</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>{testresult === 'Positivo' ? 'RT-PCR en tiempo real +(X) -( )' : 'RT-PCR en tiempo real +( ) -(X)'}</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>Elisa IgM +( ) -( )</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.row}>
                            <View style={styles.labelCell}>
                                <Text>Zika:</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>RT-PCR en tiempo real +( ) -( )</Text>
                            </View>
                            <View style={styles.inputCell}>
                                <Text>{testresult === 'Positivo' ? 'Elisa IgM +(X) -( )' : 'Elisa IgM +( ) -(X)'}</Text>
                            </View>
                        </View>
                    )}
                </>
            )}
        </>
    );
}
