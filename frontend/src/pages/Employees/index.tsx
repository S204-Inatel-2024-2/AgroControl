import React, { useEffect, useState } from 'react';
import * as Styled from './styled';
import { Header } from '../../components/Header';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BiExport } from "react-icons/bi";
import { listAllFuncionarios } from '../../service';
import { useNavigate } from 'react-router-dom';

export function Employees(): JSX.Element {
  const navigate = useNavigate();
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  console.log(listEmployees)

  const columns = [
    { header: 'Nome do funcionário', accessor: 'nome', width: '100px' },
    { header: 'CPF', accessor: 'cpf', width: '100px' },
    { header: 'Função', accessor: 'funcao', width: '150px' },
    { header: 'Salário', accessor: 'salario', width: '50px' },
  ];

  useEffect(() => {
    listAllFuncionarios()
      .then((resp) => {
        setListEmployees(resp.data);
      })
      .catch((error) => {
        console.error(error);
        //if (error.response.data.message) navigator('')
        console.log(error.response.data.message)
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm]);

  const filteredData = listEmployees.filter(user => {
    const name = user.nome?.toLowerCase() || '';
    const service = user.funcao?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return name.includes(search) || service.includes(search);
  });

  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);


  const exportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = columns.map(col => col.header);
    const tableRows: (string | number)[][] = listEmployees.map(user => [
      user.nome,
      user.cpf,
      user.funcao,
      user.salario,
    ]);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
    });
    doc.save('table.pdf');
  };

  const handleClick = (objeto: any) => {
    navigate(`/employeedetails/${objeto.id}`);
  };

  return (
    <>
      <Styled.Container>
        <Header />
        <Styled.Content>
          <Styled.DivHeader>
            <Styled.Title>Gerenciamento de Funcionários:</Styled.Title>

            <Styled.DivButtonn>
              <Styled.Text onClick={exportPDF}>
                <BiExport />
                Exportar
              </Styled.Text>
              <Styled.Button onClick={() => navigate('/employeeregistration')}>
                Cadastrar
              </Styled.Button>
            </Styled.DivButtonn>

          </Styled.DivHeader>

          <Styled.Input
            type="text"
            placeholder="Buscar pelo nome do funcionário ou pela função"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Styled.DivTable>
            <Table columns={columns} data={currentData} handleClick={handleClick} />
          </Styled.DivTable>
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </Styled.Content>
      </Styled.Container>
    </>
  );
}
