import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

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
        minHeight: 15
    }
});

export default function StepEight({ latitude, longitude }) {

    const [mapUrl, setMapUrl] = useState('');

    function getLocationPatient(latitude, longitude) {
        const apiKey = 'AIzaSyCD8MD7fq-0KJ37AzF9IbS3phIUCID7o1E';
        const url = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=300x200&markers=color:red%7Clabel:C%7C${latitude},${longitude}&key=${apiKey}`;
        return url;
    }

    useEffect(() => {
        console.log(latitude);
        console.log(longitude);
        let url = getLocationPatient(latitude, longitude);
        setMapUrl(url);
    }, [latitude, longitude]);

    return (
        <>
            <View style={styles.sectionTitle}>
                <Text>8. UBICACIÓN DE DOMICILIO DE PACIENTE</Text>
            </View>
            <View style={styles.row}>
                <Image src={mapUrl} style={{ width: '100%', height: 120 }} />
            </View>
        </>
    );
}