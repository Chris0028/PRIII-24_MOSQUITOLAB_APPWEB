import { DatePicker, FlexboxGrid, Input, InputGroup, InputPicker } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import SamplesTable from "./samplesTable";
import FormGroup from "rsuite/esm/FormGroup";
import { useEffect, useState } from "react";
import { getDiseasesAsync } from "../services/sampleService"

export default function SampleContainer() {

    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getDiseasesAsync();
            setDiseases(data);
        }
        fetchData();
    }, []);

    return (
        <>
            <FlexboxGrid>
                <FlexboxGridItem colspan={6} style={{ margin: 20 }}>
                    <FormGroup controlId="sampleId" style={{ padding: 10 }}>
                        <Input placeholder="Código de muestra" />
                    </FormGroup>
                    <FormGroup controlId="patient" style={{ padding: 10 }}>
                        <Input placeholder="Nombre del paciente" />
                    </FormGroup>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={6} style={{ margin: 20 }}>
                    <FormGroup style={{ padding: 10 }}>
                        <InputPicker placeholder="Enfermedad" data={diseases.map(d => ({ label: d.name, value: d.id }))} />
                    </FormGroup>
                    <FormGroup style={{ padding: 10 }}>
                        <DatePicker placeholder="Fecha de entrega" />
                    </FormGroup>
                </FlexboxGridItem>
            </FlexboxGrid>

            <SamplesTable />
        </>
    );
}