import produtoList from '../../../ProdutoTemplate';
import { Produto } from '../../../ProdutoTemplate';
import { format } from 'date-fns';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FC, JSX } from 'react';

const ListagemDatasRecursosProvider: FC = (): JSX.Element => {
  const produtosTeste = Object.values(produtoList);

  // Convertendo as datas SA para objetos Date
  const datesSA = produtosTeste.map((produto) => {
    const [month, year] = produto.sa_date.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date;
  });

  // Inicializando as colunas de datas com os cabeçalhos padrão
  const columnNames: string[] = [];

  // Verificando se já existe uma coluna com a data SA e atualizando as colunas conforme necessário
  produtosTeste.forEach((produto, index) => {
    const saIndex = produto.template.sa_idx;

    console.log('SAindex = ' + saIndex);
    console.log(columnNames);

    // Formatando a data SA como "Mmm yyyy" (por exemplo, "Feb 2023")
    const formattedSaDate = format(datesSA[index], 'MMM yyyy');

    // Se for o primeiro produto a ser inserido na tabela
    if (index == 0) {
      // Nomeando a coluna SA com base no sa_index
      columnNames[saIndex] = formattedSaDate;

      // Preenchendo as colunas antes do SA
      for (let i = saIndex - 1; i >= 0; i--) {
        const prevDate = new Date(datesSA[index]);
        prevDate.setMonth(datesSA[index].getMonth() - (saIndex - i));
        columnNames[i] = format(prevDate, 'MMM yyyy');
      }

      // Preenchendo as colunas após o SA
      for (let i = saIndex + 1; i < 9; i++) {
        const nextDate = new Date(datesSA[index]);
        nextDate.setMonth(datesSA[index].getMonth() + (i - saIndex));
        columnNames[i] = format(nextDate, 'MMM yyyy');
      }
      // Se não for o primeiro produto a ser inserido na tabela
    } else {
      let indexOfDateSa = -1; // variável que guardará o índice do dateSA, caso ele já exista nas colunas da tabela

      // Verificando se a coluna com a data SA já existe, se sim, guarda a posição dela em indexOfDateSa
      columnNames.forEach((column, index) => {
        if (column == formattedSaDate) {
          indexOfDateSa = index;
        }
      });

      console.log('indexOfDateSa = ' + indexOfDateSa);

      // Se a coluna com o dateSA já existir
      if (indexOfDateSa > -1) {
        // Preenchendo as colunas antes do SA
        for (let i = indexOfDateSa - 1; i >= 0; i--) {
          const prevDate = new Date(datesSA[index]);
          prevDate.setMonth(datesSA[index].getMonth() - (indexOfDateSa - i));
          columnNames[i] = format(prevDate, 'MMM yyyy');
        }

        // Preenchendo as colunas após o SA
        for (let i = indexOfDateSa + 1; i < 9; i++) {
          const nextDate = new Date(datesSA[index]);
          nextDate.setMonth(datesSA[index].getMonth() + (i - indexOfDateSa));
          columnNames[i] = format(nextDate, 'MMM yyyy');
        }
      }

      // if (columnNames[saIndex] === formattedSaDate) {
      //   console.log(
      //     'IF\ncolumnNames[saIndex - 1] = ' +
      //       columnNames[saIndex] +
      //       '\nformattedSaDate = ' +
      //       formattedSaDate
      //   );
      //   // Não é necessário adicionar uma nova coluna
      // } else {
      //   console.log(
      //     'ELSE\ncolumnNames[saIndex - 1] = ' +
      //       columnNames[saIndex] +
      //       '\nformattedSaDate = ' +
      //       formattedSaDate
      //   );
      //   // Adicionando colunas antes do SA
      //   for (let i = saIndex - 1; i >= 0; i--) {
      //     const prevDate = new Date(datesSA[index]);
      //     prevDate.setMonth(datesSA[index].getMonth() - (saIndex - i));
      //     columnNames.splice(i, 0, format(prevDate, 'MMM yyyy'));
      //   }

      //   // Adicionando colunas após o SA
      //   for (let i = saIndex; i < 9; i++) {
      //     const nextDate = new Date(datesSA[index]);
      //     nextDate.setMonth(datesSA[index].getMonth() + (i - saIndex));
      //     columnNames.splice(i + 1, 0, format(nextDate, 'MMM yyyy'));
      //   }

      //   // Atualizando a coluna SA
      //   columnNames[saIndex] = formattedSaDate;
      // }
    }
  });

  // Populando as colunas de Peak Amount (Recursos)
  const renderPeakAmountColumns = (produto: Produto) => {
    return produto.template.peak_amount.map((value, index) => (
      <TableCell align='center' key={`peak_amount_${index}`}>
        {value}
      </TableCell>
    ));
  };

  return (
    <Box sx={{ my: 2 }}>
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            {produtosTeste.length > 0 ? (
              <TableRow>
                <TableCell align='center'>Product Name</TableCell>
                <TableCell align='center'>Date SA</TableCell>
                <TableCell align='center'>Template</TableCell>
                {columnNames.map((columnName, index) => (
                  <TableCell align='center' key={`column_${index}`}>
                    {columnName}
                  </TableCell>
                ))}
              </TableRow>
            ) : (
              <TableRow>
                <TableCell align='center'>Product Name</TableCell>
                <TableCell align='center'>Date SA</TableCell>
                <TableCell align='center'>Template</TableCell>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                  <TableCell align='center' key={`date_${index}`}>
                    Date {index}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {produtosTeste.length > 0 ? (
              produtosTeste.map((produto, index) => {
                // Formatando a data SA como "Mmm yyyy" (por exemplo, "Feb 2023")
                const formattedSaDate = format(datesSA[index], 'MMM yyyy');

                return (
                  <TableRow key={produto.id}>
                    <TableCell align='center'>{produto.name}</TableCell>
                    <TableCell align='center'>{formattedSaDate}</TableCell>
                    <TableCell align='center'>
                      {produto.template.type}
                    </TableCell>
                    {renderPeakAmountColumns(produto)}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} align='center'>
                  Nenhum produto cadastrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export { ListagemDatasRecursosProvider };
