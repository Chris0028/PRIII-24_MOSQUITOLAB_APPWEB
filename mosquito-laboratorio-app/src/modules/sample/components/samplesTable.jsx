import { Pagination, Table } from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import Column from "rsuite/esm/Table/TableColumn";

export default function SamplesTable({ args, page, limit, total, handlePage, handleLimit }) {

    function handleChangeLimit(dataKey) {
        console.log(dataKey);
        handlePage(1);
        handleLimit(dataKey);
    }

    return (
        <>
            <Table style={{ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }} headerHeight={50} height={600} data={args}>
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
                {false && (
                    <Column flexGrow={1}>
                        <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Enfermedad</HeaderCell>
                        <Cell dataKey="diseaseId" />
                    </Column>
                )}
                <Column flexGrow={1}>
                    <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Enfermedad</HeaderCell>
                    <Cell dataKey="diseaseName" />
                </Column>
            </Table>
            <div>
                <Pagination prev next first last ellipsis boundaryLinks
                    size="sm"
                    maxButtons={5}
                    layout={['-', 'pager']}
                    total={total}
                    limit={limit}
                    activePage={page}
                    onChangePage={handlePage}
                    onChangeLimit={(handleChangeLimit)} />
            </div>
        </>
    );
}   