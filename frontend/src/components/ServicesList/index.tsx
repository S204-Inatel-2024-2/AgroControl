
import * as Styled from './styles';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import jsPDF from 'jspdf';
import { BiExport } from 'react-icons/bi';
import { useEffect, useState } from 'react';

import Pagination from '../Pagination';
import { listAllServices } from '../../service/servicos/servicos';

const columns: {header: string; accessor: keyof Services; width: string }[] = [
  { header: 'Data', accessor: 'dataAtividade', width: '100px' },
  { header: 'Serviço', accessor: 'tipoServico', width: '100px' },
  { header: 'Responsável pelo Serviço', accessor: 'responsavel', width: '150px' },
  { header: 'Valor do serviço', accessor: 'valorGasto', width: '50px' },
  { header: 'Status', accessor: 'status', width: '50px' },
]
const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


interface Services {
  idServico: number;
  status: string;
  dataAtividade: Date;
  tipoServico: string;
  responsavel: string;
  valorGasto: number;
  createdAt: number;
  updatedAt: number;
}



export function ServicesList(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("")
  const [listServices, setListServices] = useState<Services[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(()=> {
    listAllServices()
      .then((resp)=> {
        setListServices(resp.data)
      })
      .catch((error)=> {
        console.error(error)
      })
  }, [])

  const formattedServices = listServices.map(service => ({
  ...service,
  valorGasto: formatCurrency(service.valorGasto), // Formatar o valor em BRL

  }));


  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm]);

    const filteredData = formattedServices.filter(service => {
    const name = service.responsavel?.toLowerCase() || '';
    const tipo = service.tipoServico?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return name.includes(search) || tipo.includes(search);
  });

  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);


  const exportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = columns.map(col => col.header);
    const tableRows: (string | number | Date )[][] = formattedServices.map(service => [
      service.dataAtividade,
      service.tipoServico,
      service.responsavel,
      service.valorGasto,
      service.status,
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
          <Styled.Text onClick={exportPDF}>
            <BiExport />
            Exportar
          </Styled.Text>
          <Styled.Button onClick={() => { }}>Cadastrar</Styled.Button>
        </Styled.ButtonDiv>
      </Styled.TitleDiv>
      <Styled.Content>


        <Styled.Input
          type="text"
          placeholder="Buscar pelo nome do funcionário ou pelo serviço"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Table columns={columns} data={currentData}/>
        <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
      </Styled.Content>
      

    </Styled.Container>

  )
}