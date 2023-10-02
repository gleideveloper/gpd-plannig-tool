import { ErroApiDTO } from '../../data/dto/ErroApiDTO';
import { ProdutoDTO } from '../../data/dto/ProdutoDTO';
import { ApiService } from '../../data/services/ApiService';
import { AlertasContext } from './alertas';
import produtoList from '../../../ProdutoTemplate'; // pegando do produtoTemplate

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
import { AxiosError } from 'axios';
import { createContext, FC, JSX, useContext, useEffect, useState } from 'react';

type ListagemDatasRecursosContextData = {
  removerProduto: (nome: string) => void;
  adicionarProduto: (novoProduto: ProdutoDTO) => void;
};

const ListagemDatasRecursosContext = createContext(
  {} as ListagemDatasRecursosContextData
);

const ListagemDatasRecursosProvider: FC = (): JSX.Element => {
  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
  const { adicionarAlerta } = useContext(AlertasContext);

  const produtosTeste = Object.values(produtoList); // produtosTeste -> objeto teste de produtos

  const buscarProdutos = async () => {
    try {
      const resposta = await ApiService.get<ProdutoDTO[]>(
        import.meta.env.VITE_ROTA_PRODUTOS // busca os produtos cadastrados na rota /produtos
      );
      const produtosBuscados = resposta.data as ProdutoDTO[];
      setProdutos(produtosBuscados);
    } catch (e: any) {
      const erro = e as AxiosError;
      adicionarAlerta({
        textoAlerta: `Falha ao tentar buscar produtos: ${
          (erro.response.data as ErroApiDTO).mensagem
        }`,
        tipoAlerta: 'warning',
      });
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <Box sx={{ my: 2 }}>
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Product Name</TableCell>
              <TableCell align='center'>Date SA</TableCell>
              <TableCell align='center'>Template</TableCell>
              <TableCell align='center'>DateSA-6</TableCell>
              <TableCell align='center'>DateSA-5</TableCell>
              <TableCell align='center'>DateSA-4</TableCell>
              <TableCell align='center'>DateSA-3</TableCell>
              <TableCell align='center'>DateSA-2</TableCell>
              <TableCell align='center'>DateSA-1</TableCell>
              <TableCell align='center'>DateSA</TableCell>
              <TableCell align='center'>DateSA+1</TableCell>
              <TableCell align='center'>DateSA+2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtosTeste.length > 0 ? (
              produtosTeste.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell align='center'>{produto.name}</TableCell>
                  <TableCell align='center'>{produto.sa_date}</TableCell>
                  <TableCell align='center'>{produto.template.type}</TableCell>
                </TableRow>
              ))
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

export { ListagemDatasRecursosContext, ListagemDatasRecursosProvider };
