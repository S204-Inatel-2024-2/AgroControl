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
  handleClick?: (objeto: any) => void
};


const Table = <T,>({ columns, data, handleClick }: TableProps<T>) => {
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
          <Styled.Tr key={rowIndex} onClick={() => handleClick && handleClick(row)}>
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
