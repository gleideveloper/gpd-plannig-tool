import { Alert, AlertColor, Snackbar } from "@mui/material";
import { FC, JSX, useEffect, useState } from "react";

type AlertaProps = {
  textoAlerta: string;
  tempoExibicaoAlerta?: number;
  tipoAlerta: AlertColor;
};

const Alerta: FC<AlertaProps> = ({
  textoAlerta,
  tempoExibicaoAlerta,
  tipoAlerta,
}): JSX.Element => {
  const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);

  useEffect(() => {
    setMostrarAlerta(true);
  }, []);

  return (
    <Snackbar
      open={mostrarAlerta}
      autoHideDuration={tempoExibicaoAlerta}
      onClose={() => setMostrarAlerta(false)}
    >
      <Alert
        onClose={() => setMostrarAlerta(false)}
        severity={tipoAlerta}
        sx={{ width: "100%" }}
      >
        {textoAlerta}
      </Alert>
    </Snackbar>
  );
};

export { Alerta, AlertaProps };
