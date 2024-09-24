
import * as Styled from './styles';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import jsPDF from 'jspdf';
import { BiExport } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { listAllServices } from '../../service/servicos/servicos';
import { getFuncionarioById, getTipoServicoById } from '../../service';
import Pagination from '../Pagination';

// const data: any[] = [
//   { id: 1, col1: '2024-09-13', col2: 'Serviço 1', col3: 'João', col4: 500.00, col5: 'Concluído' },
//   { id: 2, col1: '2024-09-10', col2: 'Serviço 2', col3: 'Iza', col4: 750.00, col5: 'Pendente' },
//   { id: 3, col1: '2024-09-05', col2: 'Serviço 3', col3: 'Marcio', col4: 1200.00, col5: 'Em andamento' },
// ]
const columns = [
  { header: 'Data', accessor: 'dataAtividade', width: '100px' },
  { header: 'Serviço', accessor: 'tipo', width: '100px' },
  { header: 'Responsável pelo Serviço', accessor: 'nome', width: '150px' },
  { header: 'Valor do serviço', accessor: 'valorGasto', width: '50px' },
  { header: 'Status', accessor: 'status', width: '50px' },

]
const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


interface Funcionario {
  id: number;
  nome: string;
}

interface TipoServico {
  id: number;
  descricao: string;
}
interface Services {
  idServico: number;
  status: string;
  dataAtividade: Date;
  tipoServico: number;
  responsavel: number;
  valorGasto: number;
  createdAt: number;
  updatedAt: number;
}


export function ServicesList(): JSX.Element {
  
  const [listServices, setListServices] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([])
  const [currentData, setCurrentData] = useState<any[]>([])
  const [totalItems, setTotalItems] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    listAllServices()
      .then((resp) => {
        setListServices(resp.data);
      })
      .catch((error) => {
        console.error(error);
        //if (error.response.data.message) navigator('')
        console.log(error.response.data.message)
      });

  }, []);

let aux: any= []
useEffect(() => {

    listServices.map(async (service) => {
      const responsavel = await getFuncionarioById(service.responsavel)
      const tipoSer = await getTipoServicoById(service.tipoServico)
      
      aux.push({
        ...service,
        nome: responsavel.data.funcionario.nome,
        tipo : tipoSer.data.descricao
      })
      setList(aux)
    })
    
    
      
  }, [listServices]);

useEffect(()=> {
  // const totalItems = list.length;
  setTotalItems(listServices.length)

  const startIndex = (currentPage - 1) * itemsPerPage;
  setCurrentData(list.slice(startIndex, startIndex + itemsPerPage))
  console.log(currentData)
}, [list])



  

  const exportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = columns.map(col => col.header);
    const tableRows: (string | number | Date | undefined)[][] = list.map(service => [
      service.dataAtividade,
      service.tipo,
      service.nome,
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
        // value={searchTerm}
        // onChange={e => setSearchTerm(e.target.value)}
        />
        <Table columns={columns} data={currentData}/>
      </Styled.Content>
      <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

    </Styled.Container>

  )
}