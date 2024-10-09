
import * as Styled from './styles';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import jsPDF from 'jspdf';
import { BiExport } from 'react-icons/bi';

const data: any[] = [
    { id: 1, col1: '2024-09-13', col2: 'Serviço 1', col3: 'João', col4: 500.00, col5: 'Concluído' },
    { id: 2, col1: '2024-09-10', col2: 'Serviço 2', col3: 'Iza', col4: 750.00, col5: 'Pendente' },
    { id: 3, col1: '2024-09-05', col2: 'Serviço 3', col3: 'Marcio', col4: 1200.00, col5: 'Em andamento' },
]
const columns = [
    { header: 'Data', accessor: 'col1', width: '100px' },
    { header: 'Serviço', accessor: 'col2', width: '100px' },
    { header: 'Responsável pelo Serviço', accessor: 'col3', width: '150px' },
    { header: 'Valo do serviço', accessor: 'col4', width: '50px' },
    { header: 'Status', accessor: 'col5', width: '50px' },
    
]
const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

const formattedData = data.map(item => ({
    ...item,
    col4: formatCurrency(item.col4)
}))

export function ServicesList(): JSX.Element {

    const exportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = columns.map(col => col.header);
    const tableRows: (string | number)[][] = data.map(service => [
      service.col1,
      service.col2,
      service.col3,
      service.col4,
      service.col5,
    ]);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
    });
    doc.save('table_services.pdf');
  };

    const navigate = useNavigate();

    return (

        <Styled.Container>
            <Styled.TitleDiv>
                <Styled.Title>Gerenciamento de Serviços</Styled.Title>
                <Styled.ButtonDiv>
                    <Styled.Text onClick={exportPDF}><BiExport />Exportar</Styled.Text>
                    <Styled.Button onClick={() => navigate('/registerFinances')}>Cadastrar</Styled.Button>
                </Styled.ButtonDiv>
            </Styled.TitleDiv>
            <Styled.Content>
            
            <Styled.Input
            type="text"
            placeholder="Buscar pelo nome do funcionário ou pelo serviço"
            // value={searchTerm}
            // onChange={e => setSearchTerm(e.target.value)}
          />
            <Table columns={columns} data={formattedData} />
            </Styled.Content>   
            
        </Styled.Container>

    )
}