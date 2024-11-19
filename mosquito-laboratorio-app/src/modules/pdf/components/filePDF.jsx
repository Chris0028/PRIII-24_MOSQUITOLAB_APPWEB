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
import StepEight from "./steps/step08";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 15
    }
});

export default function FilePDF({ fileId }) {

    const [data, setData] = useState({
        case: {
            method: '',
            caseType: ''
        },
        child: {
            parent: ''
        },
        tests: [
            {
                result: '',
                observation: '',
                diagnosticMethod: ''
            }
        ],
        notifier: {
            role: '',
            userId: 0,
            username: '',
            name: '',
            email: '',
            phone: '',
            labo: '',
            hospital: '',
            hospitalNetwork: '',
            laboNetwork: '',
            state: '',
            municipality: ''
        },
        patient: {
            ci: '',
            name: '',
            phone: '',
            gender: '',
            lastName: '',
            birthDate: '',
            secondLastName: ''
        },
        samples: [
            {
                sampleType: '',
                sampleCollectionDate: ''
            }
        ],
        location: {
            city: '',
            state: '',
            latitude: '',
            longitude: '',
            municipality: '',
            neighborhood: ''
        },
        pregnant: {
            disease: '',
            childBirthDate: '',
            lastMenstruationDate: ''
        },
        symptoms: [{
            disease: 0,
            present: '',
            symptom: ''
        }],
        contagion: {
            city: '',
            state: '',
            country: '',
            municipality: '',
            neighborhood: ''
        },
        discharge: {
            dischargeType: null,
            dischargeDate: null
        },
        registerDate: '',
        symptomsDate: '',
        discoveryMethod: '',
        hospitalization: [
            {
                entryDate: null,
                hospitalName: '',
                type: 0
            }
        ],
        epidemiologicalWeek: '',
        fileCode: ''
    });

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
            <Page size={'LEGAL'} style={styles.page}>
                <Header code={data.fileCode} />
                <StepOne
                    discoveryMethod={data.discoveryMethod}
                    registerDate={data.registerDate}
                    placeNotifier={data.notifier.hospital || data.notifier.labo}
                    placeContact={data.notifier.contact}
                    placeMunicipality={data.notifier.municipality}
                    placeState={data.notifier.state}
                    placeNetwork={data.notifier.hospitalNetwork || data.notifier.laboNetwork} />
                <StepTwo
                    name={data.patient.name}
                    lastName={data.patient.lastName}
                    secondLastName={data.patient.secondLastName}
                    gender={data.patient.gender}
                    ci={data.patient.ci}
                    birthDate={data.patient.birthDate}
                    phone={data.patient.phone}
                    parent={data.child.parent}
                    state={data.location.state}
                    municipality={data.location.municipality}
                    city={data.location.city}
                    neighborhood={data.location.neighborhood}
                    diseasePregnant={data.pregnant.disease}
                    childBirthDate={data.pregnant.childBirthDate}
                    lastMenstruationDate={data.pregnant.lastMenstruationDate} />
                <StepThree
                    country={data.contagion.country}
                    state={data.contagion.state}
                    city={data.contagion.city}
                    municipality={data.contagion.municipality}
                    neighborhood={data.contagion.neighborhood} />
                <StepFour
                    symptomsDate={data.symptomsDate}
                    epidemiologicalWeek={data.epidemiologicalWeek}
                    symptoms={data.symptoms}
                    disease={data.symptoms[0].disease} />

                {data.discharge && (
                    <StepFive
                        type={data.hospitalization[0].type}
                        entryDate={data.hospitalization[0].entryDate}
                        hospital={data.hospitalization[0].hospitalName}
                        discharge={data.discharge.dischargeType}
                        dischargeDate={data.discharge.dischargeDate} />
                )}

                {!data.discharge && (
                    <StepFive
                        type={data.hospitalization[0].type}
                        entryDate={data.hospitalization[0].entryDate}
                        hospital={data.hospitalization[0].hospitalName} />
                )}

                <StepSix
                    disease={data.symptoms[0].disease}
                    method={data.case.method}
                    type={data.case.caseType} />
                <StepSeven
                    sampleCollectionDate={data.samples[0].sampleCollectionDate}
                    disease={data.symptoms[0].disease} />
                <StepEight
                    latitude={data.location.latitude}
                    longitude={data.location.longitude} />
                <StepFinal
                    username={data.notifier.username}
                    role={data.notifier.role}
                    notifierName={data.notifier.name}
                    phone={data.notifier.phone}
                    email={data.notifier.email}
                    workplace={data.notifier.hospital || data.notifier.labo} />
            </Page>
        </Document>
    );
}