import React from 'react';
import * as Styled from './styles';

type TableColumn<T> = {
  header: string;
  accessor: keyof T;
  width?: string;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
};


const Table = <T,>({ columns, data }: TableProps<T>) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <Styled.Th
              key={index}
            >
              {column.header}
            </Styled.Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <Styled.Tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <Styled.Td
                key={colIndex}
              >
                {row[column.accessor] as React.ReactNode}
              </Styled.Td>
            ))}
          </Styled.Tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
