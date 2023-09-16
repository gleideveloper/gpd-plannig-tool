import { ErroApiDTO } from '../../data/dto/ErroApiDTO';
import { LivroDTO } from '../../data/dto/LivroDTO';
import { ApiService } from '../../data/services/ApiService';
import { adicionarMascaraIsbn } from '../../data/utils';
import {
  ModalDeletarLivro,
  ModalDeletarLivroRefProps,
} from '../components/ModalDeletarLivro';
import { AlertasContext } from './alertas';

import { Delete, Edit, Visibility } from '@mui/icons-material';
import {
  Avatar,
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

type ListagemLivrosContextData = {
  removerLivro: (isbn: string) => void;
  adicionarLivro: (novoLivro: LivroDTO) => void;
};

const ListagemLivrosContext = createContext({} as ListagemLivrosContextData);

const ListagemLivrosProvider: FC = (): JSX.Element => {
  const [livros, setLivros] = useState<LivroDTO[]>([]);
  const modalDeletarLivroRef = useRef<ModalDeletarLivroRefProps>(null);
  const { adicionarAlerta } = useContext(AlertasContext);
  const navigate = useNavigate();

  const adicionarLivro = (novoLivro: LivroDTO) => {
    setLivros((livrosAtuais) => [...livrosAtuais, novoLivro]);
  };
  const removerLivro = (isbn: string) => {
    setLivros((livrosAtuais) =>
      livrosAtuais.filter((livro) => livro.isbn !== isbn)
    );
  };
  const buscarLivros = async () => {
    try {
      const resposta = await ApiService.get<LivroDTO[]>(
        import.meta.env.VITE_ROTA_LIVROS
      );
      const livrosBuscados = resposta.data as LivroDTO[];
      setLivros(livrosBuscados);
    } catch (e: any) {
      const erro = e as AxiosError;
      adicionarAlerta({
        textoAlerta: `Falha ao tentar buscar livros: ${
          (erro.response.data as ErroApiDTO).mensagem
        }`,
        tipoAlerta: 'warning',
      });
    }
  };

  useEffect(() => {
    buscarLivros();
  }, []);

  return (
    <ListagemLivrosContext.Provider value={{ adicionarLivro, removerLivro }}>
      <Box sx={{ my: 2 }}>
        <ModalDeletarLivro ref={modalDeletarLivroRef} />

        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Name</TableCell>
                <TableCell align='center'>Date SA</TableCell>
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
              {livros.length > 0 ? (
                livros.map((produto) => (
                  <TableRow key={produto.isbn}>
                    <TableCell align='center'>
                      <Avatar
                        variant='rounded'
                        src={produto.urlImagem}
                        alt={produto.nome}
                      />
                    </TableCell>
                    <TableCell align='center'>{produto.nome}</TableCell>
                    <TableCell align='center'>
                      {adicionarMascaraIsbn(produto.isbn)}
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton
                        onClick={() => navigate(`/visualizar/${produto.isbn}`)}
                      >
                        <Visibility color='secondary' />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          navigate(`/editar-livro/${produto.isbn}`)
                        }
                      >
                        <Edit color='secondary' />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          modalDeletarLivroRef.current.abrirModal(
                            produto.nome,
                            produto.isbn
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
                    Nenhum livro cadastrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ListagemLivrosContext.Provider>
  );
};

export { ListagemLivrosContext, ListagemLivrosProvider };
