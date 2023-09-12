import { Alerta, AlertaProps } from "../components/Alerta";

import { createContext, FC, JSX, ReactNode, useState } from "react";

type AlertasProviderProps = {
  children: ReactNode;
};
type AlertasContextData = {
  adicionarAlerta: (alerta: AlertaProps) => void;
  limparAlertas: () => void;
};

const AlertasContext = createContext({} as AlertasContextData);

const AlertasProvider: FC<AlertasProviderProps> = ({
  children,
}): JSX.Element => {
  const [alertas, setAlertas] = useState<AlertaProps[]>([]);

  const adicionarAlerta = (alerta: AlertaProps) => {
    setAlertas((alertas) => [...alertas, alerta]);
  };
  const limparAlertas = () => {
    setAlertas([]);
  };

  return (
    <AlertasContext.Provider value={{ adicionarAlerta, limparAlertas }}>
      {alertas &&
        alertas.map((alerta, i) => (
          <Alerta
            key={i}
            textoAlerta={alerta.textoAlerta}
            tipoAlerta={alerta.tipoAlerta}
            tempoExibicaoAlerta={alerta.tempoExibicaoAlerta}
          />
        ))}

      {children}
    </AlertasContext.Provider>
  );
};

export { AlertasContext, AlertasProvider };
