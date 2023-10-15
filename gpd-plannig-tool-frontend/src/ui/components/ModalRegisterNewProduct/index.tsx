import { ErroApiDTO } from "../../../data/dto/ErroApiDTO";
import { ApiService } from "../../../data/services/ApiService";
import { AlertasContext } from "../../contexts/alertas";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  Backdrop,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { AxiosError } from "axios";
import {
  forwardRef,
  Ref,
  useContext,
  useImperativeHandle,
  useState,
} from "react";

type ModalRegisterNewProductProps = {
  abrirModal: () => void;
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

const ModalRegisterNewProduct = forwardRef<ModalRegisterNewProductProps>(
  (_: unknown, ref: Ref<unknown>): JSX.Element => {
    const [nome, setNome] = useState<string>("");
    const [lider, setLider] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(null);
    const [template, setTemplate] = useState<string>("");

    const [open, setOpen] = useState<boolean>(false);

    const { adicionarAlerta } = useContext(AlertasContext);

    const salvarProduto = async () => {
      try {
        const produtoData = {
          nome: nome,
          lider_npi: lider,
          data_sa: date,
          template_type: template,
        };

        await ApiService.post(`${import.meta.env.VITE_API_BASE_URL_LOCAL}${import.meta.env.VITE_ROTA_PRODUTOS}`, produtoData);

        adicionarAlerta({
          textoAlerta: `Produto "${nome}" adicionado com sucesso!`,
          tipoAlerta: "success",
        });

        fecharModal();
      } catch (e: any) {
        console.log(e);
        const erro = e as AxiosError;
        adicionarAlerta({
          textoAlerta: `Falha o tentar inserir o produto: ${
            (erro.response.data as ErroApiDTO).mensagem
          }`,
          tipoAlerta: "error",
        });
      }
    };

    const handleChangeTemplate = (event: SelectChangeEvent) => {
      setTemplate(event.target.value as string);
    };

    const abrirModal = () => {
      setOpen(true);
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
              <form noValidate autoComplete="off">
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      New Product
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="name"
                      label="Product Name"
                      variant="outlined"
                      required
                      fullWidth
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="leader"
                      label="GPD Leader"
                      variant="outlined"
                      required
                      fullWidth
                      value={lider}
                      onChange={(e) => setLider(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl required fullWidth sx={{ minWidth: 100 }}>
                      <InputLabel id="demo-simple-select-required-label">
                        Template
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={template}
                        label="Template *"
                        defaultValue="low"
                        required
                        onChange={handleChangeTemplate}
                      >
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="mid">Mid</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      required
                      fullWidth
                      sx={{ minWidth: 100, marginTop: -1 }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DateField"]}>
                          <DateField
                            label="Date SA *"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            format="MM/YYYY"
                            required
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </FormControl>
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
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ height: 40 }}
                        onClick={salvarProduto}
                      >
                        Save
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }
);
export { ModalRegisterNewProduct, ModalRegisterNewProductProps };
