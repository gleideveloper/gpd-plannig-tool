import { ErroApiDTO } from '../../data/dto/ErroApiDTO';
import { ProdutoDTO } from '../../data/dto/ProdutoDTO';
import { ApiService } from '../../data/services/ApiService';
import { AlertasContext } from './alertas';

import {
  ModalReadProduct,
  ModalReadProductProps,
} from '../components/ModalReadProduct';
import {
  ModalDeleteProduct,
  ModalDeleteProductProps,
} from '../components/ModalDeleteProduct';

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

function formatDataSa(dataSa) {
  // Divide a string em mês e ano
  const [mes, ano] = dataSa.split('/');

  // Converte o mês para nome abreviado
  const mesAbreviado = new Date(`${mes}/01/${ano}`).toLocaleDateString(
    'en-US',
    { month: 'short' }
  );

  // Retorna a data formatada
  return `${mesAbreviado} ${ano}`;
}

type ListagemProdutosContextData = {
  removerProduto: (id: string) => void;
  adicionarProduto: (novoProduto: ProdutoDTO) => void;
};

const ListagemProdutosContext = createContext(
  {} as ListagemProdutosContextData
);

const ListagemProdutosProvider: FC = (): JSX.Element => {
  const ModalReadProductRef = useRef<ModalReadProductProps>(null);
  const ModalDeletarProdutoRef = useRef<ModalDeleteProductProps>(null);

  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
  const { adicionarAlerta } = useContext(AlertasContext);
  const navigate = useNavigate();

  const adicionarProduto = (novoProduto: ProdutoDTO) => {
    setProdutos((produtosAtuais) => [...produtosAtuais, novoProduto]);
  };
  const removerProduto = (id: string) => {
    setProdutos((produtosAtuais) =>
      produtosAtuais.filter((produto) => produto.id !== id)
    );
  };
  const buscarProdutos = async () => {
    try {
      const resposta = await ApiService.get<ProdutoDTO[]>(
        import.meta.env.VITE_ROTA_PRODUTOS // busca os produtos cadastrados na rota /produtos
      );
      const produtosBuscados = resposta.data as ProdutoDTO[];
      setProdutos(produtosBuscados);
      console.log(produtosBuscados);
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
    <ListagemProdutosContext.Provider
      value={{ adicionarProduto, removerProduto }}
    >
      <Box sx={{ my: 2 }}>
        <ModalDeleteProduct ref={ModalDeletarProdutoRef} />
        <ModalReadProduct ref={ModalReadProductRef} />

        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Name</TableCell>
                <TableCell align='center'>Date SA</TableCell>
                <TableCell align='center'>GPD Lead</TableCell>
                <TableCell align='center'>Template</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.length > 0 ? (
                produtos.map((produto) => (
                  <TableRow key={produto.id}>
                    <TableCell align='center'>{produto.nome}</TableCell>
                    <TableCell align='center'>
                      {formatDataSa(produto.data_sa)}
                    </TableCell>
                    <TableCell align='center'>{produto.lider_npi}</TableCell>
                    <TableCell align='center'>
                      {produto.template.template_type}
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton
                        onClick={() => {
                          ModalReadProductRef.current.abrirModal(produto.id);
                        }}
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
                          ModalDeletarProdutoRef.current.abrirModal(
                            produto.id,
                            produto.nome
                          );
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
