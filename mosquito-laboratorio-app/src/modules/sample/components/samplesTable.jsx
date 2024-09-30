import { useEffect, useState } from "react";
import { Table } from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import Column from "rsuite/esm/Table/TableColumn";
import { getSamplesAsync } from "../services/sampleService"

export default function SamplesTable() {

    const [samples, setSamples] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getSamplesAsync()
            setSamples(data)
        }
        fetchData()
    }, [])

    return (
        <Table style={{ fontSize: 16 }} headerHeight={50} height={600} data={samples}>
            <Column width={150} align="center" fixed>
                <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Código</HeaderCell>
                <Cell dataKey="sampleId" />
            </Column>
            <Column width={150}>
                <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Hora de entrega</HeaderCell>
                <Cell dataKey="registerHour" />
            </Column>
            <Column flexGrow={1}>
                <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Fecha de entrega</HeaderCell>
                <Cell dataKey="registerDate" />
            </Column>
            <Column flexGrow={2}>
                <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Paciente</HeaderCell>
                <Cell dataKey="patientFullName" />
            </Column>
            <Column flexGrow={1}>
                <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Enfermedad</HeaderCell>
                <Cell dataKey="diseaseName" />
            </Column>
            <Column flexGrow={1}>
                <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Entregó la muestra</HeaderCell>
                <Cell dataKey="sampleManager" />
            </Column>
            <Column flexGrow={1}>
                <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Número de referencia</HeaderCell>
                <Cell dataKey="contact" />
            </Column>
        </Table>
    );
}   