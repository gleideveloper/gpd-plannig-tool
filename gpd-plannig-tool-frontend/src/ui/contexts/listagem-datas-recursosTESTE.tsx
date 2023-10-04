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
  const VECTOR_SIZE = 9; // Tamanho pré-definido do vetor de datas para cada produto individualmente
  const columnNames: string[] = []; // Inicializando as colunas de datas com os cabeçalhos padrão
  const produtosTeste = Object.values(produtoList);

  // Convertendo as datas SA para objetos Date
  const datesSA = produtosTeste.map((produto) => {
    const [month, year] = produto.sa_date.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date;
  });

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
      console.log('Preenchendo colunas antes do SA');
      for (let i = saIndex - 1; i >= 0; i--) {
        const prevDate = new Date(datesSA[index]);
        prevDate.setMonth(datesSA[index].getMonth() - (saIndex - i));
        columnNames[i] = format(prevDate, 'MMM yyyy');
        console.log('columnNames[' + i + '] = ' + columnNames[i]);
      }

      // Preenchendo as colunas após o SA
      console.log('Preenchendo colunas depois do SA');
      for (let i = saIndex + 1; i < VECTOR_SIZE; i++) {
        const nextDate = new Date(datesSA[index]);
        nextDate.setMonth(datesSA[index].getMonth() + (i - saIndex));
        columnNames[i] = format(nextDate, 'MMM yyyy');
        console.log('columnNames[' + i + '] = ' + columnNames[i]);
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

      // Se a coluna com o dateSA já existir
      if (indexOfDateSa != -1) {
        const lowestPosition = indexOfDateSa - saIndex;
        const biggestPosition = indexOfDateSa + (VECTOR_SIZE - saIndex - 1);
        let numberOfAddColumns = 0; // número de colunas adicionadas no INÍCIO do vetor (quando tiver)

        // Preenchendo as colunas antes do SA
        for (let i = indexOfDateSa - 1; i >= lowestPosition; i--) {
          const prevDate = new Date(datesSA[index]);
          prevDate.setMonth(datesSA[index].getMonth() - (indexOfDateSa - i));

          // Verifica se i é menor que zero, se sim, adiciona no início da lista
          if (i < 0) {
            columnNames.splice(0, 0, format(prevDate, 'MMM yyyy')); // Adiciona a coluna no início do vetor, deslocando as outras colunas para a direita
            numberOfAddColumns++; // aumenta o número de colunas adicionadas no início do vetor
          } else {
            columnNames[i] = format(prevDate, 'MMM yyyy');
          }
        }

        indexOfDateSa += numberOfAddColumns; // atualiza o índice do dateSA de acordo com o número de colunas adicionadas no início

        // Preenchendo as colunas após o SA
        for (let i = indexOfDateSa + 1; i <= biggestPosition; i++) {
          const nextDate = new Date(datesSA[index]);
          nextDate.setMonth(datesSA[index].getMonth() + (i - indexOfDateSa));
          columnNames[i] = format(nextDate, 'MMM yyyy');
          console.log('columnNames[' + i + '] = ' + columnNames[i]);
        }

        console.log(columnNames);
      }
      // Se a coluna com o dateSA não existir
      else {
        // Se o dateSA for maior do que a última data da tabela
        if (formattedSaDate > columnNames[columnNames.length - 1]) {
          console.log('DATESA MAIOR');
        }
        // Se o dateSA for menor do que a última data da tabela
        else {
          console.log('DATESA MENOR');
        }
        const lowestPosition = indexOfDateSa - saIndex;
        const biggestPosition = indexOfDateSa + (VECTOR_SIZE - saIndex - 1);
      }
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
