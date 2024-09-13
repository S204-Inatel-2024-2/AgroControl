import React, { useState } from 'react';
import * as Styled from './styled';
import { Header } from '../../components/Header';
import Table from '../../components/Table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BiExport } from "react-icons/bi";

export function Employees(): JSX.Element {
  const columns = [
    { header: 'Responsável pelo serviço', accessor: 'nome', width: '100px' },
    { header: 'CPF', accessor: 'cpf', width: '100px' },
    { header: 'Serviço', accessor: 'funcao', width: '150px' },
    { header: 'Valor do serviço', accessor: 'salario', width: '50px' },
  ];

  const data: any[] = [
    { nome: 'John', cpf: '122.443.322.10', funcao: 'Capina', salario: '1200' },
    { nome: 'Rodorfo', cpf: '122.443.322.10', funcao: 'Plantio', salario: '2000' },
    { nome: 'Jose', cpf: '122.443.322.10', funcao: 'Plantio', salario: '4000' },
    { nome: 'Keitin', cpf: '122.443.322.10', funcao: 'Controle de pragas', salario: '1600' },
    { nome: 'dona kleusa', cpf: '122.443.322.10', funcao: 'Capina', salario: '100' }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(user => {
    const name = user.nome?.toLowerCase() || '';
    const service = user.funcao?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();

    return name.includes(search) || service.includes(search);
  })

  const exportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = columns.map(col => col.header);
    const tableRows: (string | number)[][] = data.map(user => [
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

  return (
    <>
      <Styled.Container>
        <Header />
        <Styled.Content>
          <Styled.DivHeader>
            <Styled.Title>Gerenciamento de Serviços</Styled.Title>

            <Styled.Text
              onClick={exportPDF}
            >
              <BiExport />
              Exportar
            </Styled.Text>
            <Styled.Button>
              Cadastrar
            </Styled.Button>
          </Styled.DivHeader>
          <Styled.Input
            type="text"
            placeholder="Buscar pelo nome do funcionário ou pelo serviço"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Table columns={columns} data={filteredData} />
        </Styled.Content>
      </Styled.Container>
    </>

  );
};