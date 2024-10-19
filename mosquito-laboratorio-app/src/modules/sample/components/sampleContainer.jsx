import { Button, DatePicker, FlexboxGrid, Input, InputPicker } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import SamplesTable from "./samplesTable";
import FormGroup from "rsuite/esm/FormGroup";
import { useEffect, useState } from "react";
import { getDiseasesAsync, getSamplesAsync } from "../services/sampleService";

export default function SampleContainer() {

    const [diseases, setDiseases] = useState([]);
    const [args, setArgs] = useState({});
    const [samples, setSamples] = useState([]);

    useEffect(() => {
        async function fetchDiseases() {
            const data = await getDiseasesAsync();
            setDiseases(data);
        }

        async function fetchData() {
            const data = await getSamplesAsync(null);
            setSamples(data);
        }

        fetchDiseases();
        fetchData();
    }, []);

    async function filter() {
        let filteredArgs = { ...args };
        Object.keys(filteredArgs).forEach(key => {
            if (filteredArgs[key] === '' || filteredArgs[key] == null) {
                delete filteredArgs[key];
            }
        });

        if (filteredArgs.registerDate != null) {
            let date = filteredArgs.registerDate.toISOString();
            filteredArgs.registerDate = date;
        }

        console.log(filteredArgs);

        const data = await getSamplesAsync(filteredArgs);
        setSamples(data);
    }

    function handleChange(value, name) {
        if (value) {
            setArgs({
                ...args,
                [name]: value
            });
        } else {
            const newArgs = { ...args };
            delete newArgs[name];
            setArgs(newArgs);
        }
    }

    return (
        <>
            <FlexboxGrid>
                <FlexboxGridItem colspan={6} style={{ margin: 20 }}>
                    <FormGroup controlId="sampleId" style={{ padding: 10 }}>
                        <Input
                            onChange={(value) => {
                                if (!isNaN(value) && value !== '') {
                                    handleChange(parseInt(value), 'sampleId');
                                } else {
                                    handleChange('', 'sampleId');
                                }
                            }}
                            placeholder="Código de muestra"
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                    <FormGroup controlId="patient" style={{ padding: 10 }}>
                        <Input
                            onChange={(value) => handleChange(value, 'patient')}
                            placeholder="Nombre del paciente"
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={6} style={{ margin: 20 }}>
                    <FormGroup style={{ padding: 10 }}>
                        <InputPicker
                            onChange={(value) => handleChange(parseInt(value), 'diseaseId')}
                            style={{ width: '100%' }}
                            placeholder="Enfermedad"
                            data={diseases.map(d => ({ label: d.name, value: d.id }))}
                        />
                    </FormGroup>
                    <FormGroup style={{ padding: 10 }}>
                        <DatePicker
                            onChange={(value) => handleChange(value, 'registerDate')}
                            style={{ width: '100%' }}
                            placeholder="Fecha de entrega"
                        />
                    </FormGroup>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={6}>
                    <Button
                        onClick={() => { filter(); }}
                        appearance="primary"
                        style={{ marginTop: 30, width: '50%' }}
                    >
                        Buscar
                    </Button>
                </FlexboxGridItem>
            </FlexboxGrid>

            <SamplesTable args={samples} />
        </>
    );
}
