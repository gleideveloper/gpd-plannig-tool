import { ErroApiDTO } from "../../../data/dto/ErroApiDTO";
import { ApiService } from "../../../data/services/ApiService";
import { AlertasContext } from "../../contexts/alertas";
import { useForm } from "../../../data/hooks/useForm";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  Backdrop,
  Fade,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { AxiosError } from "axios";
import {
  forwardRef,
  Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import HrmPerMonthForm from "../HrmPerMonth/HrmPerMonthForm";

type ModalEditProductProps = {
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

const ModalEditProduct = forwardRef<ModalEditProductProps>(
  (_: unknown, ref: Ref<unknown>): JSX.Element => {
    const [id, setId] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [lider, setLider] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(null);
    const [template, setTemplate] = useState<string>("");
    const [isSpecificMonth, setIsSpecificMonth] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    const { adicionarAlerta } = useContext(AlertasContext);
    const [allocations, setAllocations] = useState([]);
    const [hrJson, setHrJson] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [showHrmPerMonthForm, setShowHrmPerMonthForm] = useState(false);

    const formTemplate = {
      nome: nome,
      allocations: allocations,
      lider_npi: lider,
      template_type: template,
      data_sa: date,
      hr_json: hrJson,
      newData: templates,
    };

    const updateFieldHandler = (key, value) => {      
      setData({ ...data, [key]: value });  
    };

    const updateAllocationHandler = (e, index) => {
      const allocations = [...data.allocations]
      allocations[index].allocation = (e.target.value)
      setData((prev) => {
        return { ...prev, allocations  };
      });
    };

    const [data, setData] = useState(formTemplate);

    const abrirModal = async (produto_id: string) => {
      try {
        const response = await ApiService.get(
          `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ROTA_PRODUTOS}/${produto_id}`
        );

        const produtoData = response.data;
        const dataSa = dayjs(produtoData.data_sa);
        setId(produto_id);
        setNome(produtoData.nome);
        setLider(produtoData.lider_npi);
        setTemplate(produtoData.template_type);
        setDate(dataSa);
        setData(produtoData);
        setHrJson(produtoData.hr_json);

        const response_templates = await ApiService.get(
          `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ROTA_TEMPLATES}`
        );

        setTemplates(response_templates.data);

        const templateData = response_templates.data.find(item => item.template_type === produtoData.template_type);
        const numMonthsToShow = templateData.length;
        const allocations = [];
        for (let i = 1; i <= numMonthsToShow; i++) {
          allocations.push({ month: i, allocation: 0 });
        }

        setData({ ...produtoData, allocations: allocations, newData: response_templates.data });

        setOpen(true);
      } catch (e: any) {
        console.log(e);
        const erro = e as AxiosError;
        adicionarAlerta({
          textoAlerta: `Falha ao tentar visualizar o produto: ${
            (erro.response.data as ErroApiDTO).mensagem
          }`,
          tipoAlerta: "error",
        });
      }
    };

    const editarProduto = async (id: string) => {
      try {
        const produtoData = {
          nome: nome,
          lider_npi: lider,
          data_sa: date,
          template_type: template,
        };

        await ApiService.patch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ROTA_PRODUTOS}/${id}`, produtoData);

        handleClose();

        adicionarAlerta({
          textoAlerta: `Produto "${nome}" editado com sucesso!`,
          tipoAlerta: "success",
        });

      } catch (e: any) {
        console.log(e);
        const erro = e as AxiosError;
        adicionarAlerta({
          textoAlerta: `Falha o tentar editar o produto: ${
            (erro.response.data as ErroApiDTO).mensagem
          }`,
          tipoAlerta: "error",
        });
      }
    };

    const handleChangeTemplate = (event: SelectChangeEvent) => {
      setTemplate(event.target.value as string);
    };

    const fecharModal = (event, reason) => {
      if (event.keyCode == 27) 
        return;
      if (reason == "backdropClick") 
        return;
      setOpen(false);
    };
    
    const handleClose = () => {
      setShowHrmPerMonthForm(false)
      setIsSpecificMonth(false);
      setOpen(false);
    };

    useImperativeHandle(ref, () => ({
      abrirModal,
    }));

    console.log("DATA QUE TA INDO PRO MODAL");
    console.log(data)

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
              {showHrmPerMonthForm ? (
                <HrmPerMonthForm
                  data={data}
                  hrJson={hrJson}
                  updateFieldHandler={updateAllocationHandler}
                  setSpecificMonth={setIsSpecificMonth}
                  isEditProduct={true}
                  idProduct={id}
                  handleClose={handleClose}
                />
              ) : (
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      Edit Product
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
                        label="Template *"
                        defaultValue={template}
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
                      justifyContent="flex-start"
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ height: 40, marginRight: 1 }}
                        onClick={() => {
                          setShowHrmPerMonthForm(true);
                        }}
                      >
                        HRM
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={fecharModal}
                        sx={{
                          height: 40,
                          marginRight: 1,
                          marginLeft: "auto",
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ height: 40 }}
                        onClick={() => editarProduto(id)}
                      >
                        Save
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              )}
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }
);
export { ModalEditProduct, ModalEditProductProps };
