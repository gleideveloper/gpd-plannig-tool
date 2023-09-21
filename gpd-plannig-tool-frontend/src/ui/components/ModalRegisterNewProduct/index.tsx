import { ErroApiDTO } from "../../../data/dto/ErroApiDTO";
import { ApiService } from "../../../data/services/ApiService";
import { AlertasContext } from "../../contexts/alertas";

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'

import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AxiosError } from "axios";
import {
    ChangeEvent,
    forwardRef,
    ReactElement,
    Ref,
    useContext,
    useImperativeHandle,
    useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";


type ModalRegisterNewProductProps = {
    abrirModal: () => void;
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
  };

const ModalRegisterNewProduct = forwardRef<ModalRegisterNewProductProps>(
  (_: unknown, ref: Ref<unknown>): JSX.Element => {
    const [nome, setNome] = useState<string>("");
    const [lider, setLider] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(null);

    const [open, setOpen] = useState<boolean>(false);
    
    const { adicionarAlerta } = useContext(AlertasContext);
    const navigate = useNavigate();
    const location = useLocation();

    const salvarProduto = async () => {
        try {
            console.log("envia form")
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
                    <Typography variant="h5" component="h2">
                        Novo produto
                    </Typography>
                    <Stack spacing={2}>
                        <form noValidate autoComplete="off">
                            <Item>
                                <TextField id="nome"
                                    label="Nome"
                                    variant="standard"
                                    required
                                    fullWidth 
                                    value={nome}
                                />         
                            </Item>
                            <Item>
                                <TextField id="lider"
                                    label="Líder"
                                    variant="standard"
                                    required
                                    fullWidth 
                                    value={lider}
                                />         
                            </Item>
                            <Item>
                                <RadioGroup row aria-labelledby="template-group" name="row-radio-buttons-group" >
                                    <FormControlLabel value="low" control={<Radio />} label="Low" />
                                    <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                                    <FormControlLabel value="high" control={<Radio />} label="High" />
                                </RadioGroup>
                            </Item>
                            <Item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker value={date} label="Selecionar Data" />
                                </DemoContainer>
                            </LocalizationProvider>
                            </Item>   
                        </form>
                    </Stack>
                    <Button variant="contained" color="success" sx={{ mt: 1, mb: 2 }} onClick={salvarProduto}>
                        Salvar
                    </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
    });
export { ModalRegisterNewProduct, ModalRegisterNewProductProps };
