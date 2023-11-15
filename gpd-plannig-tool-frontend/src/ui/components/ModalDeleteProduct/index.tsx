import { ErroApiDTO } from "../../../data/dto/ErroApiDTO";
import { ApiService } from "../../../data/services/ApiService";
import { AlertasContext } from "../../contexts/alertas";
import { ListagemProdutosContext } from "../../contexts/listagem-produtos";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  Backdrop,
  Fade,
  Typography,
  Grid,
} from "@mui/material";
import { AxiosError } from "axios";
import {
  forwardRef,
  Ref,
  useContext,
  useImperativeHandle,
  useState,
} from "react";

type ModalDeleteProductProps = {
  abrirModal: (produto_id: string, produto_nome: string) => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

const ModalDeleteProduct = forwardRef<ModalDeleteProductProps>(
  (_: unknown, ref: Ref<unknown>): JSX.Element => {
    const [nome, setNome] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const { removerProduto } = useContext(ListagemProdutosContext);

    const { adicionarAlerta } = useContext(AlertasContext);

    const deletarProduto = async (produto_id: string) => {
      try {
        await ApiService.delete(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ROTA_PRODUTOS}/${produto_id}`);
        removerProduto(produto_id);
        adicionarAlerta({
          textoAlerta: `Product ${nome} successfully deleted!`,
          tipoAlerta: "success",
        });
        fecharModal();
      } catch (e: any) {
        console.log(e);
        const erro = e as AxiosError;
        adicionarAlerta({
          textoAlerta: `Failed when trying to delete the product: ${nome}: ${
            (erro.response.data as ErroApiDTO).mensagem
          }`,
          tipoAlerta: "error",
        });
      }
    };

    const abrirModal = (id: string, nome: string) => {
      setNome(nome);
      setId(id);
      setOpen(true);
    };

    const fecharModal = () => {
      setNome("");
      setId("");
      setOpen(false);
    };

    useImperativeHandle(ref, () => ({
      abrirModal,
    }));

    return (
      <div>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          onClose={fecharModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              TransitionComponent: Fade,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={12}>
                  <Typography variant="h5" component="h2">
                    Delete Product
                  </Typography>
                </Grid>            
                <Grid item xs={12}>
                  <Typography variant="body1" component="h4">
                    Are you sure you want to delete the product <b>{nome}</b>?
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ marginLeft: "auto" }}>
                  <Box
                    m={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={fecharModal}
                        sx={{ height: 40, marginRight: 1 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ height: 40 }}
                        onClick={() => deletarProduto(id)}
                      >
                        Delete
                      </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }
);
export { ModalDeleteProduct, ModalDeleteProductProps };
