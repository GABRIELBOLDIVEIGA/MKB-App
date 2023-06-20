import { IonItem, IonSearchbar } from "@ionic/react";
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import DarkBlobLoader from "components/DarkBlobLoader";
import { useGetUsuarios } from "graphQL/usuario/hook";
import { Usuario } from "interface/Usuario";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { styled } from '@mui/material/styles';
import { useGetPedidosTabela } from "graphQL/pedidos/hooks";

interface PedidosTabela {
  cliente: string,
  colaborador: string,
  total: number,
  id: string
}

interface Column {
  id: 'cliente' | 'colaborador' | 'total' | 'id';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: 'cliente',
    label: 'Cliente',
    minWidth: 120,
  },
  {
    id: 'colaborador',
    label: 'Colaborador',
    minWidth: 120
  },
  {
    id: 'total',
    label: 'Total',
    minWidth: 200,
  },
  {
    id: 'id',
    label: 'ID',
    minWidth: 120,
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

export default function TabelaPedidos() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [rows, setRows] = useState<PedidosTabela[] | undefined>();
  const { data, loading } = useGetPedidosTabela();
  const history = useHistory();

  useEffect(() => {
    if (data) {
      setRows(data)
    }
  }, [loading])

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

    const result: PedidosTabela[] = data?.filter((pedido: PedidosTabela) => {
      if (
        pedido.cliente.toLowerCase().includes(query) ||
        pedido.colaborador.toLowerCase().includes(query)

      )
        return true;
    });

    setPage(0);
    setRows(result);
  };

  return (
    <section>
      <IonItem>
        <IonSearchbar placeholder='Digite aqui o nome...' onIonChange={(ev) => handleSearch(ev)} color="light" showCancelButton="focus" animated={true} />
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
                            key={row.id}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              history.push(`/pedidoDetalhado/${row.id}`)
                            }}
                          >
                            {columns?.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell title='Click para ver mais detalhes...' key={column.id} align={column.align}>
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
