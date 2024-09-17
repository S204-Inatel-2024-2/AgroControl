
import * as Styled from './styles';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridColTypeDef, GridRowsProp, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

function CustomToolbar() {
    return (
      <GridToolbarContainer 
      
      >
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  
  const brlPrice: GridColTypeDef = {
    type: 'number',
    width: 130,
    valueFormatter: (value) => currencyFormatter.format(value),
    cellClassName: 'font-tabular-nums',
  };
 
const rows: GridRowsProp = [
    { id: 1, col1: '2024-09-13', col2: 'Serviço 1', col3: 'John Doe', col4: 500.00, col5: 'Concluído' },
    { id: 2, col1: '2024-09-10', col2: 'Serviço 2', col3: 'Jane Doe', col4: 750.00, col5: 'Pendente' },
    { id: 3, col1: '2024-09-05', col2: 'Serviço 3', col3: 'Alice', col4: 1200.00, col5: 'Em andamento' },
];
const columns: GridColDef[] = [
    { field: 'col1',headerClassName: 'super-app-theme--header', headerName: 'Data', flex: 0.3, type: 'date', valueGetter: (params) => new Date(params) },
    { field: 'col2',headerClassName: 'super-app-theme--header', headerName: 'Serviço',flex: 0.3 },
    { field: 'col3',headerClassName: 'super-app-theme--header', headerName: 'Responsável pelo serviço', flex: 0.6},
    { field: 'col4',headerClassName: 'super-app-theme--header', headerName: 'Valor do serviço',flex: 0.2, ...brlPrice },
    { field: 'col5',headerClassName: 'super-app-theme--header', headerName: 'Status do serviço', flex: 0.4}
];

export function ServicesList(): JSX.Element {

    const navigate = useNavigate();
    return (

        <Styled.Container>
            <Styled.TitleDiv>
                <Styled.Title>Gerenciamento de Serviços</Styled.Title>
                <Styled.ButtonDiv>
                    <Styled.Button onClick={() => navigate('/registerfinances')}>Cadastrar</Styled.Button>
                </Styled.ButtonDiv>
            </Styled.TitleDiv>
            
                <Box
                sx={{
                    height: 300,
                    width: '100%',
                    
                    '& .super-app-theme--header': {
                      backgroundColor: '#ffd699',
                      borderRight:'1px solid #d3d3d3',
                      
                    },
                    '& .MuiDataGrid-row': {
                        backgroundColor: '#fff0cc', 
                    },
                    '& .MuiDataGrid-cell': {
                        borderRight: '1px solid #d3d3d3',
                    },
                    '& .MuiDataGrid-columnSeparator': {
                        display: 'none', 
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#ffeb99', 
                    },
                  }}>
                  <DataGrid 
                //   autoHeight {...data} //define o tamanho pelo tamanho de data
                slots={{ toolbar: CustomToolbar }}
                rows={rows} columns={columns} />  
                </Box>
                
            
        </Styled.Container>

    )
}