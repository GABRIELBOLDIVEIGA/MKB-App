import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { IonItem, IonSearchbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { useGetAllClientes } from 'graphQL/clientes/hooks';
import { Cliente } from 'interface/Cliente';
import DarkBlobLoader from "components/DarkBlobLoader"

interface Column {
  id: "cod" | "nome" | "cnpj" | "endereco" | "bairro" | "cidade" | "cep" | "uf" | "email" | "ddd" | "fone1" | "fone2" | "celular" | "fax" | "fantasia" | "numero";
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: 'cnpj',
    label: 'CNPJ',
    minWidth: 120,
  },
  {
    id: 'nome',
    label: 'Nome',
    minWidth: 120
  },
  {
    id: 'email',
    label: 'E-mail',
    minWidth: 200,
  },
  {
    id: 'fone1',
    label: 'Telefone 1',
    minWidth: 120,
  },
  {
    id: 'fone2',
    label: 'Telefone 2',
    minWidth: 100,
  },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: "#989aa2",
  },
  '&:nth-of-type(even)': {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: "#d7d8da",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function TabelaClientes() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const [rows, setRows] = useState<Cliente[] | undefined>();
  const { data, loading, refetch } = useGetAllClientes();
  const history = useHistory();

  useEffect(() => {
    if (data) {
      setRows(data)
    }
  }, [loading])

  useEffect(() => {
    refetch();
  }, [])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    const result: Cliente[] | undefined = data?.filter((prod) => {
      if (
        prod.nome.toLowerCase().includes(query) ||
        prod.email?.toLowerCase().includes(query) ||
        prod.cnpj?.toLowerCase().includes(query)
      )
        return true;
    });

    setPage(0);
    setRows(result);
  };

  return (
    <section>
      <IonItem>
        <IonSearchbar placeholder='Nome, E-mail ou CNPJ' onIonChange={(ev) => handleSearch(ev)} color="light" showCancelButton="focus" animated={true} />
      </IonItem>

      <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
        {!data ?
          <DarkBlobLoader /> :
          (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ height: "90%", }} >
                <Table stickyHeader aria-label="sticky table" >
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth, backgroundColor: "#383a3e", color: "#d7d8da" }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <StyledTableRow
                            title='Dois clicks para ver mais detalhes...'
                            key={row._id}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              history.push(`/cliente/${row._id}`)
                            }}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                style={{ backgroundColor: "#383a3e", color: "#d7d8da" }}
                rowsPerPageOptions={[15, 25, 100]}
                component="div"
                count={rows?.length ? rows.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          )}
      </ div>
    </section>
  )
}
