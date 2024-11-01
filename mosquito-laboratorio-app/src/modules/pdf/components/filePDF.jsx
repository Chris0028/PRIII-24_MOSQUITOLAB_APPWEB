import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import StepOne from "./steps/step01";
import StepTwo from "./steps/step02";
import StepThree from "./steps/step03";
import StepFour from "./steps/step04";
import StepFive from "./steps/step05";
import StepSix from "./steps/step06";
import { useEffect, useState } from "react";
import { getFileWithResultAsync } from "../services/pdfService"
import StepSeven from "./steps/step07";
import StepFinal from "./steps/finalStep";
import Header from "./header";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 15
    }
});

export default function FilePDF({ fileId, info }) {

    const [data, setData] = useState({});

    useEffect(() => {
        async function getFile(id) {
            const fileData = await getFileWithResultAsync(id);
            setData(fileData)
            console.log(fileData);
        }
        getFile(fileId);
    }, [fileId]);

    return (
        <Document>
            <Page size="legal" style={styles.page}>
                <Header />
                <StepOne discoveryMethod={data.discoveryMethod} info={info} />
                <StepTwo patient={data.patient} />
                <StepThree />
                <StepFour />
                <StepFive />
                <StepSix />
                <StepSeven />
                <StepFinal />
            </Page>
        </Document>
    );
}