import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import logo from '../../../../../public/static/estado-plurinacional-de-bolivia-logo.png'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        borderTop: '1px solid #000',
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 120,
        height: 60,
        marginRight: 5,
        marginLeft: 10
    },
    ministryText: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleContainer: {
        flex: 3,
        textAlign: 'center'
    },
    titleText: {
        fontSize: 13,
        fontWeight: 'black',
    },
    subTitleText: {
        fontSize: 10,
        fontWeight: 'black',
    },
    numberContainer: {
        flex: 1,
        textAlign: 'left',
        fontSize: 10,
        color: 'red',
    }
});
//{ code }
export default function HeaderSampleResult({resultId}) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} src={logo} />
                <Text style={styles.ministryText}>MINISTERIO DE SALUD Y DEPORTES</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>RESULTADO DE LABORATORIO</Text>
                <Text style={styles.subTitleText}>PARA LA VIGILANCIA DE</Text>
                <Text style={styles.subTitleText}>DENGUE - CHIKUNGUNYA - ZIKA</Text>
            </View>
            <View style={styles.numberContainer}>
                <Text>{resultId}</Text>
            </View>
        </View>
    );
}
