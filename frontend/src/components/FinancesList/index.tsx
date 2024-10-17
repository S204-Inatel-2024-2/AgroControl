
import * as Styled from './styles';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import jsPDF from 'jspdf';
import { BiExport } from 'react-icons/bi';
import { useEffect, useState } from 'react';

import Pagination from '../Pagination';
import { listAllReceitas } from '../../service/receita/receitaService';

const columns: {header: string; accessor: keyof Receitas; width: string }[] = [
  { header: 'Data', accessor: 'createdAt', width: '100px' },
  { header: 'Descrição', accessor: 'observacao', width: '200px' },
  { header: 'Categoria', accessor: 'categoria', width: '100px' },
  { header: 'Valor', accessor: 'valorReceita', width: '50px' },
]

const formatCurrency = (value: number | string) => {
  try{
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }catch(error){
    return null
  }
  
}



interface Receitas {
  idReceita: number;
  lucro: boolean;
  valorReceita: number;
  observacao: string;
  categoria: string;
  createdAt: string;
  updatedAt: string;
}



export function FinancesList(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("")
  const [listReceitas, setListReceitas] = useState<Receitas[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(()=> {
    listAllReceitas()
      .then((resp)=> {
        setListReceitas(resp.data)
      })
      .catch((error)=> {
        console.error(error)
      })
  }, [])

  const formattedReceitas = listReceitas.map(receita => ({
  ...receita,
  createdAt: receita.createdAt.substring(0, 10),
  valorReceita: formatCurrency(receita.valorReceita), // Formatar o valor em BRL

  }));


  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm]);

    const filteredData = formattedReceitas.reverse().filter(receita => {
    const categoria = receita.categoria?.toLowerCase() || '';
    const observacao = receita.observacao?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return categoria.includes(search) || observacao.includes(search);
  });

  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);


  const exportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = columns.map(col => col.header);
    const tableRows: (string | number | Date | null )[][] = formattedReceitas.reverse().map(receita => [
      receita.createdAt,
      receita.observacao,
      receita.categoria,
      receita.valorReceita,
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
        <Styled.Title>Controle de Receitas</Styled.Title>

        <Styled.ButtonDiv>
          <Styled.Text onClick={exportPDF}>
            <BiExport />
            Exportar
          </Styled.Text>
          <Styled.Button onClick={() => {navigate('/RegistrarReceitas')}}>Cadastrar</Styled.Button>
        </Styled.ButtonDiv>
      </Styled.TitleDiv>
      <Styled.Content>


        <Styled.Input
          type="text"
          placeholder="Buscar pela descrição ou pela categoria"
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