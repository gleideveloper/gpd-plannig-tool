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
      for (let i = saIndex + 1; i < VECTOR_SIZE; i++) {
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
        }
      }
      // Se a coluna com o dateSA não existir
      else {
        const lastDateInTable = new Date(columnNames[columnNames.length - 1]);
        const firstDateInTable = new Date(columnNames[0]);

        // Se o dateSA for maior do que a última data da tabela
        if (datesSA[index] > lastDateInTable) {
          // Calculando a diferença em meses entre o dateSA e a última data da tabela
          const differenceInMonths =
            (datesSA[index].getFullYear() - lastDateInTable.getFullYear()) *
              12 +
            (datesSA[index].getMonth() - lastDateInTable.getMonth());

          // Preenchendo o intervalo com os meses intermediários
          for (let i = 1; i <= differenceInMonths; i++) {
            const nextDate = new Date(lastDateInTable);
            nextDate.setMonth(lastDateInTable.getMonth() + i);
            columnNames.push(format(nextDate, 'MMM yyyy'));
          }

          const indexOfDateSa = columnNames.length - 1;
          const biggestPosition = indexOfDateSa + (VECTOR_SIZE - saIndex - 1);

          // Preenchendo as colunas após o SA
          for (let i = indexOfDateSa + 1; i <= biggestPosition; i++) {
            const nextDate = new Date(datesSA[index]);
            nextDate.setMonth(datesSA[index].getMonth() + (i - indexOfDateSa));
            columnNames[i] = format(nextDate, 'MMM yyyy');
          }
        }
        // Se o dateSA for menor do que a primeira data da tabela
        else {
          // Calculando a diferença em meses entre o dateSA e a primeira data da tabela
          const differenceInMonths =
            (firstDateInTable.getFullYear() - datesSA[index].getFullYear()) *
              12 +
            (firstDateInTable.getMonth() - datesSA[index].getMonth());

          // Preenchendo o intervalo com os meses intermediários
          for (let i = 1; i <= differenceInMonths; i++) {
            const prevDate = new Date(firstDateInTable);
            prevDate.setMonth(firstDateInTable.getMonth() - i);
            columnNames.splice(0, 0, format(prevDate, 'MMM yyyy'));
          }

          const indexOfDateSa = 0; // DateSA nesse caso vai estar sempre na primeira posição do vetor
          const lowestPosition = indexOfDateSa - saIndex;

          // Preenchendo as colunas antes do SA
          for (let i = indexOfDateSa - 1; i >= lowestPosition; i--) {
            const prevDate = new Date(datesSA[index]);
            prevDate.setMonth(datesSA[index].getMonth() - (indexOfDateSa - i));
            columnNames.splice(0, 0, format(prevDate, 'MMM yyyy'));
          }
        }
      }
    }
  });

  // Populando as colunas de Peak Amount (Recursos)
  const renderPeakAmountColumns = (produto: Produto, columnIndex: number) => {
    // columnIndex -> indica a posição do dateSA do produto na tabela
    // Obtém o valor do índice 'sa_idx' do produto
    const lowestPosition = columnIndex - produto.template.sa_idx; // posição do primeiro elemento do vetor peak_amount na tabela
    const peakAmountVector = produto.template.peak_amount;
    const peakAmountCells: JSX.Element[] = []; // Array para armazenar as células
    let cont = 0;

    for (let i = 0; i < columnNames.length; i++) {
      if (i >= lowestPosition && i < lowestPosition + VECTOR_SIZE) {
        // Mapeia os valores de 'peak_amount' e realoca-os nas colunas correspondentes, criando e adicionando as células ao array
        peakAmountCells.push(
          <TableCell align='center' key={`peak_amount_${cont}`}>
            {peakAmountVector[cont]}
          </TableCell>
        );
        cont++;
      } else {
        // Se não estiver na posição correta, adicione uma célula vazia
        peakAmountCells.push(
          <TableCell align='center' key={`empty_cell_${i}`}>
            {''}
          </TableCell>
        );
      }
    }

    return peakAmountCells; // Retorna o array de células
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
                    {renderPeakAmountColumns(
                      produto,
                      columnNames.indexOf(formattedSaDate)
                    )}
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
