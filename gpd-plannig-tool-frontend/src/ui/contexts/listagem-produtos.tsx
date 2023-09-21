import { ErroApiDTO } from '../../data/dto/ErroApiDTO';
import { ProdutoDTO } from '../../data/dto/ProdutoDTO';
import { ApiService } from '../../data/services/ApiService';
import {
  ModalDeletarLivro,
  ModalDeletarLivroRefProps,
} from '../components/ModalDeletarLivro';
import { AlertasContext } from './alertas';

import { Delete, Edit, Visibility } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { AxiosError } from 'axios';
import {
  createContext,
  FC,
  JSX,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

type ListagemProdutosContextData = {
  removerProduto: (nome: string) => void;
  adicionarProduto: (novoProduto: ProdutoDTO) => void;
};

const ListagemProdutosContext = createContext({} as ListagemProdutosContextData);

const ListagemProdutosProvider: FC = (): JSX.Element => {
  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
  const modalDeletarProdutoRef = useRef<ModalDeletarLivroRefProps>(null);
  const { adicionarAlerta } = useContext(AlertasContext);
  const navigate = useNavigate();

  const adicionarProduto = (novoProduto: ProdutoDTO) => {
    setProdutos((produtosAtuais) => [...produtosAtuais, novoProduto]);
  };
  const removerProduto = (nome: string) => {
    setProdutos((produtosAtuais) =>
      produtosAtuais.filter((produto) => produto.nome !== nome)
    );
  };
  const buscarProdutos = async () => {
    try {
      const resposta = await ApiService.get<ProdutoDTO[]>(
        import.meta.env.VITE_ROTA_LIVROS
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
    <ListagemProdutosContext.Provider value={{ adicionarProduto, removerProduto }}>
      <Box sx={{ my: 2 }}>
        <ModalDeletarLivro ref={modalDeletarProdutoRef} />

        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Name</TableCell>
                {/* <TableCell align='center'>Date SA</TableCell> */}
                <TableCell align='center'>Lead NPI</TableCell>
                <TableCell align='center'>Family</TableCell>
                <TableCell align='center'>Chipset</TableCell>
                <TableCell align='center'>Scope Simplified</TableCell>
                <TableCell align='center'>Frequency Band</TableCell>
                <TableCell align='center'>ODM</TableCell>
                <TableCell align='center'>Carrier</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.length > 0 ? (
                produtos.map((produto) => (
                  <TableRow key={produto.nome}>
                    <TableCell align='center'>{produto.nome}</TableCell>
                    {/* <TableCell align='center'>{produto.dataSa.toString()}</TableCell> */}
                    <TableCell align='center'>{produto.lider}</TableCell>
                    <TableCell align='center'>{produto.familia}</TableCell>
                    <TableCell align='center'>{produto.chipset}</TableCell>
                    <TableCell align='center'>{produto.escopo}</TableCell>
                    <TableCell align='center'>{produto.band}</TableCell>
                    <TableCell align='center'>{produto.odm}</TableCell>
                    <TableCell align='center'>{produto.operadora}</TableCell>
                    <TableCell align='center'>
                      <IconButton
                        onClick={() => navigate(`/visualizar/${produto.nome}`)}
                      >
                        <Visibility color='secondary' />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          navigate(`/editar-produto/${produto.nome}`)
                        }
                      >
                        <Edit color='secondary' />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          // modalDeletarProdutoRef.current.abrirModal(
                          //   produto.nome,
                          //   produto.isbn
                          // );
                        }}
                      >
                        <Delete color='secondary' />
                      </IconButton>
                    </TableCell>
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
    </ListagemProdutosContext.Provider>
  );
};

export { ListagemProdutosContext, ListagemProdutosProvider };
