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
        minHeight: 20,
        fontSize: 8,
    },
    caseLabelCell: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 1.3,
    },
    emptyCell: {
        borderRight: '1px solid #000',
        flex: 0.2,
    },
    caseCell: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 1.5
    },
    optionCell: {
        borderRight: '1px solid #000',
        padding: 3,
        flex: 0.8,
        textAlign: 'center'
    },
    extraEmptyCell: {
        borderRight: '1px solid #000',
        flex: 0.2,
    },
    rightEmptyCell: {
        borderRight: '1px solid #000',
        flex: 0.2,
    }
});


export default function StepSix({ method, type, disease }) {
    return (
        <>
            <View style={styles.sectionTitle}>
                <Text>6. DEFINICIÓN DE CASO</Text>
            </View>

            {disease === 1 ? (
                <>
                    <View style={styles.row}>
                        {type === 'Sospechoso' ? (
                            <>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Dengue</Text>
                                </View>
                                <View style={styles.emptyCell}>
                                    <Text>{'\n  X'}</Text>
                                </View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Dengue</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell}></View>
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}>
                                </View>
                            </>
                        ) : type === 'Confirmado' ? (
                            <>
                                {method === 'Por Nexo Epidemiológico' ? (
                                    <>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Dengue</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Dengue</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}></View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}>
                                            <Text>{'\n  X'}</Text>
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Dengue</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Dengue</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}>
                                            <Text>{'\n  X'}</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}></View>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Dengue</Text>
                                </View>
                                <View style={styles.emptyCell}></View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Dengue</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell}>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}></View>
                            </>
                        )}
                    </View>

                    <View style={styles.row}>
                        <View style={styles.caseLabelCell}>
                            <Text>Caso sospechoso de Chikungunya</Text>
                        </View>
                        <View style={styles.emptyCell}></View>
                        <View style={styles.caseCell}>
                            <Text>Caso confirmado de Chikungunya</Text>
                        </View>
                        <View style={styles.optionCell}>
                            <Text>Por Laboratorio</Text>
                        </View>
                        <View style={styles.extraEmptyCell}></View>
                        <View style={styles.optionCell}>
                            <Text>Por Nexo Epidemiológico</Text>
                        </View>
                        <View style={styles.rightEmptyCell}></View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.caseLabelCell}>
                            <Text>Caso sospechoso de Zika</Text>
                        </View>
                        <View style={styles.emptyCell}></View>
                        <View style={styles.caseCell}>
                            <Text>Caso confirmado de Zika</Text>
                        </View>
                        <View style={styles.optionCell}>
                            <Text>Por Laboratorio</Text>
                        </View>
                        <View style={styles.extraEmptyCell}></View>
                        <View style={styles.optionCell}>
                            <Text>Por Nexo Epidemiológico</Text>
                        </View>
                        <View style={styles.rightEmptyCell}></View>
                    </View>
                </>
            ) : disease === 2 ? (
                <>
                    {type === 'Sospechoso' ? (
                        <>
                            <View style={styles.row}>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Dengue</Text>
                                </View>
                                <View style={styles.emptyCell}></View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Dengue</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell}></View>
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}></View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Chikungunya</Text>
                                </View>
                                <View style={styles.emptyCell}>
                                    <Text>{'\n  X'}</Text>
                                </View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Chikungunya</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell}></View>
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}></View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Zika</Text>
                                </View>
                                <View style={styles.emptyCell}></View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Zika</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell}></View>
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}></View>
                            </View>
                        </>
                    ) : type === 'Confirmado' ? (
                        <>
                            {method === 'Por Nexo Epidemiológico' ? (
                                <>
                                    <View style={styles.row}>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Dengue</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Dengue</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}></View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}></View>
                                    </View>

                                    <View style={styles.row}>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Chikungunya</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Chikungunya</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}></View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}>
                                            <Text>{'\n  X'}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.row}>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Zika</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Zika</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}></View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}></View>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View style={styles.row}>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Dengue</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Dengue</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}></View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}></View>
                                    </View>

                                    <View style={styles.row}>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Chikungunya</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Chikungunya</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}>
                                            <Text>{'\n  X'}</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}></View>
                                    </View>

                                    <View style={styles.row}>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Zika</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Zika</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}></View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}></View>
                                    </View>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <View style={styles.row}>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Dengue</Text>
                                </View>
                                <View style={styles.emptyCell}></View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Dengue</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell}></View>
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}></View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Chikungunya</Text>
                                </View>
                                <View style={styles.emptyCell}></View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Chikungunya</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell} />
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}></View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Zika</Text>
                                </View>
                                <View style={styles.emptyCell}></View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Zika</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell}></View>
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}></View>
                            </View>
                        </>
                    )}
                </>
            ) : (
                <>
                    {type === 'Sospechoso' ? (
                        <>
                            <View style={styles.row}>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Dengue</Text>
                                </View>
                                <View style={styles.emptyCell}></View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Dengue</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell}></View>
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}></View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Chikungunya</Text>
                                </View>
                                <View style={styles.emptyCell}></View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Chikungunya</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell}></View>
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}></View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Zika</Text>
                                </View>
                                <View style={styles.emptyCell}>
                                    <Text>{'\n  X'}</Text>
                                </View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Zika</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell}></View>
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}></View>
                            </View>
                        </>
                    ) : type === 'Confirmado' ? (
                        <>
                            {method === 'Por Nexo Epidemiológico' ? (
                                <>
                                    <View style={styles.row}>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Dengue</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Dengue</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}></View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}></View>
                                    </View>

                                    <View style={styles.row}>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Chikungunya</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Chikungunya</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}></View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}></View>
                                    </View>

                                    <View style={styles.row}>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Zika</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Zika</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}></View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}>
                                            <Text>{'\n  X'}</Text>
                                        </View>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View style={styles.row}>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Dengue</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Dengue</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}></View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}></View>
                                    </View>

                                    <View style={styles.row}>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Chikungunya</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Chikungunya</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}></View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}></View>
                                    </View>

                                    <View style={styles.row}>
                                        <View style={styles.caseLabelCell}>
                                            <Text>Caso sospechoso de Zika</Text>
                                        </View>
                                        <View style={styles.emptyCell}></View>
                                        <View style={styles.caseCell}>
                                            <Text>Caso confirmado de Zika</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Laboratorio</Text>
                                        </View>
                                        <View style={styles.extraEmptyCell}>
                                            <Text>{'\n  X'}</Text>
                                        </View>
                                        <View style={styles.optionCell}>
                                            <Text>Por Nexo Epidemiológico</Text>
                                        </View>
                                        <View style={styles.rightEmptyCell}></View>
                                    </View>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <View style={styles.row}>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Dengue</Text>
                                </View>
                                <View style={styles.emptyCell}></View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Dengue</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell}></View>
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}></View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Chikungunya</Text>
                                </View>
                                <View style={styles.emptyCell}></View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Chikungunya</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell}></View>
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}></View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.caseLabelCell}>
                                    <Text>Caso sospechoso de Zika</Text>
                                </View>
                                <View style={styles.emptyCell}></View>
                                <View style={styles.caseCell}>
                                    <Text>Caso confirmado de Zika</Text>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Laboratorio</Text>
                                </View>
                                <View style={styles.extraEmptyCell}>
                                </View>
                                <View style={styles.optionCell}>
                                    <Text>Por Nexo Epidemiológico</Text>
                                </View>
                                <View style={styles.rightEmptyCell}></View>
                            </View>
                        </>
                    )}
                </>
            )}
        </>
    );
}