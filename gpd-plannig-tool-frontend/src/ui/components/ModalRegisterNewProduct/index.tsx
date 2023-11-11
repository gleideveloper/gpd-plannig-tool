import { ErroApiDTO } from "../../../data/dto/ErroApiDTO";
import { ApiService } from "../../../data/services/ApiService";
import { AlertasContext } from "../../contexts/alertas";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Backdrop, Fade, Grid } from "@mui/material";

import { useForm } from "../../../data/hooks/useForm";

import { AxiosError } from "axios";
import {
  forwardRef,
  Ref,
  useContext,
  useImperativeHandle,
  useState,
} from "react";

import NewProductForm from "../NewProductForm/NewProductForm";
import HrmPerMonthForm from "../HrmPerMonth/HrmPerMonthForm";

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

// Função para substituir os números por strings vazias
function replaceNumbersWithEmptyStrings(hr_jsonAux, template_length) {
  for (let i=0; i < template_length; i++) {
    const nome_mes = "month" + (i+1);
    for (const cargo in hr_jsonAux[nome_mes]) {
      hr_jsonAux[nome_mes][cargo] = "";
    }
  }
}

const ModalRegisterNewProduct = forwardRef<ModalRegisterNewProductProps>(
  (_: unknown, ref: Ref<unknown>): JSX.Element => {
    
    let defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate() + 3)

    const [open, setOpen] = useState<boolean>(false);
    const { adicionarAlerta } = useContext(AlertasContext);

    const [allocations, setAllocations] = useState([]);

    const formTemplate = {
      nome: "",
      allocations: allocations,
      lider_npi: "",
      template_type: "",
      data_sa: "",
      hr_json: "{}",
    };

    const [data, setData] = useState(formTemplate);
    const [hrJson, setHrJson] = useState(false);
    const [isSpecificMonth, setIsSpecificMonth] = useState(false)

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
    
    const formComponents = [
      <NewProductForm
        data={data}
        updateFieldHandler={updateFieldHandler}
        setData={setData}
      />,
      <HrmPerMonthForm data={data} hrJson={hrJson} updateFieldHandler={updateAllocationHandler} setSpecificMonth={setIsSpecificMonth} isEditProduct={false} idProduct={""}/>,
    ];
    const { currentStep, currentComponent, changeStep, isHrmForm } = useForm(formComponents, setIsSpecificMonth);

    const repassarHrJsonParaModalHRMSpecificMonth = async () => {
      try {
        const response = await ApiService.get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ROTA_TEMPLATES}/${data.template_type}`);
        const peak_ammountFounded = response.data.peak_ammount;
        const hr_jsonAux = JSON.parse(peak_ammountFounded);
  
        replaceNumbersWithEmptyStrings(hr_jsonAux, response.data.length);
  
        setHrJson(hr_jsonAux); 
      } catch (e: any) {
        console.log(e);
      }
    }

    const salvarProduto = async () => {
      try {
        const response = await ApiService.get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ROTA_TEMPLATES}/${data.template_type}`);
        const peak_ammountFounded = response.data.peak_ammount;
        const hr_jsonAux = JSON.parse(peak_ammountFounded); // Converte a string em um objeto JSON

        replaceNumbersWithEmptyStrings(hr_jsonAux, response.data.length);

        data.hr_json = JSON.stringify(hr_jsonAux); // hr_json possui os mesmos meses e roles que o peak_ammount do respectivo template

        await ApiService.post(
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_ROTA_PRODUTOS
          }`,
          data
        );

        adicionarAlerta({
          textoAlerta: `Produto "${data.nome}" adicionado com sucesso!`,
          tipoAlerta: "success",
        });

        fecharModalAndResetValues();
      } catch (e: any) {
        console.log(e);
        const erro = e as AxiosError;
        if(erro.code != 'ERR_NETWORK') {
          adicionarAlerta({
            textoAlerta: `Falha o tentar inserir o produto: ${
              (erro.response.data as ErroApiDTO).mensagem
            }`,
            tipoAlerta: "error",
          });
        } else {
          adicionarAlerta({
            textoAlerta: "Sem conexão com a internet!",
            tipoAlerta: "error",
          });
        }
        
      }
    };

    const abrirModal = () => {
      setOpen(true);
    };
    const fecharModalAndResetValues = () => {
      setOpen(false);
      resetState();
    };
    const fecharModal = (event, reason) => {
      if (event.keyCode == 27) 
        return;
      if (reason == "backdropClick") 
        return;
      setOpen(false);
      setOpen(false);
    };

    const resetState = () => {
      const defaultData = {
        nome: "",
        allocations: [],
        lider_npi: "",
        template_type: "",
        data_sa: "",
        hr_json: "{}",
      };
      setData(defaultData);
      setIsSpecificMonth(false);
    };

    useImperativeHandle(ref, () => ({
      abrirModal,
    }));

    return (
      <>
        <div>
          <Modal
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
                  <div className="inputs-container">{currentComponent}</div>
                  <div className="actions">
                    <Grid
                      item
                      xs={12}
                      sx={{ marginLeft: "auto", marginTop: 2 }}
                    >
                      <Box m={1} display="flex" justifyContent="flex-start">
                        {!isHrmForm ? (
                          <>
                            <Button
                              variant="outlined"
                              disabled={ data.nome.length == 0 || data.lider_npi.length == 0 || data.data_sa.length == 0 || data.template_type.length == 0 }
                              color="primary"
                              sx={{ height: 40, marginRight: 1 }}
                              onClick={() => {
                                repassarHrJsonParaModalHRMSpecificMonth();
                                changeStep(currentStep + 1);
                              }}
                            >
                              HRM
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={fecharModalAndResetValues}
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
                              onClick={salvarProduto}
                            >
                              Save
                            </Button>
                          </>
                        ) : !isSpecificMonth ? (
                          <>
                          </>
                        ) : <></>}
                      </Box>
                    </Grid>
                  </div>
                </form>
              </Box>
            </Fade>
          </Modal>
        </div>
      </>
    );
  }
);
export { ModalRegisterNewProduct, ModalRegisterNewProductProps };