import { ErroApiDTO } from "../../../data/dto/ErroApiDTO";
import { ApiService } from "../../../data/services/ApiService";
import { AlertasContext } from "../../contexts/alertas";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  Backdrop,
  Fade,
  TextField,
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

type ModalReadProductProps = {
  abrirModal: (produto_id: string) => void;
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

function formatDataSa(dataSa) {
  const data = new Date(dataSa); // Converte a data para um objeto Date

  // Formate a data no formato "MMM YYYY"
  const mesAbreviado = data.toLocaleDateString('en-US', { month: 'short' });
  const ano = data.getFullYear();

  return `${mesAbreviado} ${ano}`;
}

const ModalReadProduct = forwardRef<ModalReadProductProps>(
  (_: unknown, ref: Ref<unknown>): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);
    const [produto, setProduto] = useState<any>({});

    const { adicionarAlerta } = useContext(AlertasContext);

    const abrirModal = async (produto_id: string) => {
      try {
        const response = await ApiService.get(
          `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ROTA_PRODUTOS}/${produto_id}`
        );
        setProduto(response.data);
        setOpen(true);
      } catch (e: any) {
        console.log(e);
        const erro = e as AxiosError;
        adicionarAlerta({
          textoAlerta: `Failed to view the product: ${
            (erro.response.data as ErroApiDTO).mensagem
          }`,
          tipoAlerta: "error",
        });
      }
    };

    const fecharModal = () => {
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
                    Product Details
                  </Typography>
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    label="Product Name"
                    variant="standard"
                    fullWidth
                    value={produto.nome}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="GPD Leader"
                    variant="standard"
                    fullWidth
                    value={produto.lider_npi}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Date SA"
                    variant="standard"
                    fullWidth
                    value={formatDataSa(produto.data_sa)}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Template"
                    variant="standard"
                    fullWidth
                    value={produto.template_type}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginLeft: "auto" }}>
                  <Box
                    m={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={fecharModal}
                      sx={{ height: 40, marginRight: 1 }}
                    >
                      Cancel
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
export { ModalReadProduct, ModalReadProductProps };
