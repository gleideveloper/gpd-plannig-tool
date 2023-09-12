import { ErroApiDTO } from "../../../data/dto/ErroApiDTO";
import { ApiService } from "../../../data/services/ApiService";
import { adicionarMascaraIsbn, removerMascaraIsbn } from "../../../data/utils";
import { AlertasContext } from "../../contexts/alertas";
import { ListagemLivrosContext } from "../../contexts/listagem-livros";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { AxiosError } from "axios";
import {
  forwardRef,
  ReactElement,
  Ref,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ModalTransitionProps = TransitionProps & {
  children: ReactElement<any, any>;
};
const Transition = forwardRef(
  (props: ModalTransitionProps, ref: Ref<unknown>): JSX.Element => (
    <Slide direction="up" ref={ref} {...props} />
  )
);

type ModalDeletarLivroRefProps = {
  abrirModal: (nome: string, isbn: string) => void;
};
const ModalDeletarLivro = forwardRef<ModalDeletarLivroRefProps>(
  (_: unknown, ref: Ref<unknown>): JSX.Element => {
    const [nome, setNome] = useState<string>("");
    const [isbn, setIsbn] = useState<string>("");
    const [mostrar, setMostrar] = useState<boolean>(false);
    const { adicionarAlerta } = useContext(AlertasContext);
    const { removerLivro } = useContext(ListagemLivrosContext);
    const navigate = useNavigate();
    const location = useLocation();

    const deletarLivro = async () => {
      try {
        await ApiService.delete(`${import.meta.env.VITE_ROTA_LIVROS}/${isbn}`);
        removerLivro(isbn);
        adicionarAlerta({
          textoAlerta: `Livro ${nome} deletado com sucesso!`,
          tipoAlerta: "success",
        });
        fecharModal();

        if (location.pathname.includes("/visualizar")) navigate("/");
      } catch (e: any) {
        console.log(e);
        const erro = e as AxiosError;
        adicionarAlerta({
          textoAlerta: `Falha o tentar deletar o livro ${nome}: ${
            (erro.response.data as ErroApiDTO).mensagem
          }`,
          tipoAlerta: "error",
        });
      }
    };
    const abrirModal = (nome: string, isbn: string) => {
      setNome(nome);
      setIsbn(removerMascaraIsbn(isbn));
      setMostrar(true);
    };
    const fecharModal = () => {
      setNome("");
      setIsbn("");
      setMostrar(false);
    };

    useImperativeHandle(ref, () => ({
      abrirModal,
    }));

    return (
      <Dialog
        open={mostrar}
        TransitionComponent={Transition}
        keepMounted={true}
        maxWidth="xl"
      >
        <DialogTitle>Deletar Livro</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Você deseja deletar o livro <b>{nome}</b> (Código ISBN{" "}
            <b>{adicionarMascaraIsbn(isbn)}</b>)?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={fecharModal} color="warning">
            Cancelar
          </Button>
          <Button onClick={deletarLivro} color="success">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export { ModalDeletarLivro, ModalDeletarLivroRefProps };
