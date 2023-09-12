import { ErroApiDTO } from "../data/dto/ErroApiDTO";
import { LivroDTO } from "../data/dto/LivroDTO";
import { ApiService } from "../data/services/ApiService";
import { removerMascaraIsbn } from "../data/utils";
import { ContainerColuna } from "../ui/components/Container";
import { TextFieldMask } from "../ui/components/TextFieldMask";
import { AlertasContext } from "../ui/contexts/alertas";

import { Button, FormControl, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { ChangeEvent, FC, JSX, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormularioLivroPage: FC = (): JSX.Element => {
  const [nome, setNome] = useState<string>("");
  const [isbn, setISBN] = useState<string>("");
  const [sinopse, setSinopse] = useState<string>("");
  const [urlImagem, setURLImagem] = useState<string>("");
  const [autores, setAutores] = useState<string>("");
  const [tituloPagina, setTituloPagina] = useState<string>("Adicionar Livro");
  const { adicionarAlerta, limparAlertas } = useContext(AlertasContext);
  const { isbnLivroSelecionado } = useParams();
  const navigate = useNavigate();

  const buscarLivroSelecionado = async () => {
    try {
      const resposta = await ApiService.get<LivroDTO>(
        `${import.meta.env.VITE_ROTA_LIVROS}/${isbnLivroSelecionado}`
      );
      const livroSelecionado = resposta.data as LivroDTO;
      setNome(livroSelecionado.nome);
      setISBN(isbnLivroSelecionado);
      setSinopse(livroSelecionado.sinopse);
      setURLImagem(livroSelecionado.urlImagem);
      setAutores(livroSelecionado.autores.join(";"));
      setTituloPagina("Editar Livro");
    } catch (e: any) {
      const erro = e as AxiosError;
      mostrarErros(erro.response.data as ErroApiDTO);
      navigate("/");
    }
  };
  const finalizar = (mensagem: string) => {
    adicionarAlerta({
      textoAlerta: mensagem,
      tipoAlerta: "success",
    });
    navigate("/");
  };
  const mostrarErros = (erro: ErroApiDTO) => {
    if (erro.extras)
      for (let extra of Object.values(erro.extras))
        adicionarAlerta({
          textoAlerta: `${erro.mensagem}: ${extra}`,
          tipoAlerta: "error",
        });
    else
      adicionarAlerta({
        textoAlerta: erro.mensagem,
        tipoAlerta: "error",
      });
  };
  const preencherModelo = (): LivroDTO => {
    return {
      nome: nome,
      isbn: removerMascaraIsbn(isbn),
      sinopse: sinopse,
      urlImagem: urlImagem,
      autores: autores.split(";"),
    };
  };
  const inserirLivro = async () => {
    const novoLivro = preencherModelo();

    try {
      await ApiService.post<LivroDTO>(
        import.meta.env.VITE_ROTA_LIVROS,
        novoLivro
      );
      finalizar("Livro salvo com sucesso!");
    } catch (e: any) {
      const erro = e as AxiosError;
      mostrarErros(erro.response.data as ErroApiDTO);
    }
  };
  const atualizarLivro = async () => {
    const dadosLivro = preencherModelo();

    try {
      await ApiService.patch<LivroDTO>(
        `${import.meta.env.VITE_ROTA_LIVROS}/${isbnLivroSelecionado}`,
        dadosLivro
      );
      finalizar("Dados do livro atualizados com sucesso!");
    } catch (e: any) {
      const erro = e as AxiosError;
      mostrarErros(erro.response.data as ErroApiDTO);
    }
  };
  const salvarLivro = async () => {
    if (!!isbnLivroSelecionado) atualizarLivro();
    else inserirLivro();
  };

  useEffect(() => {
    limparAlertas();

    if (!!isbnLivroSelecionado) buscarLivroSelecionado();
  }, []);

  return (
    <ContainerColuna>
      <Typography component="h5" variant="h3" sx={{ mt: 2 }}>
        {tituloPagina}
      </Typography>

      <FormControl sx={{ mt: 1, minWidth: 600 }}>
        <TextField
          id="nome"
          label="Nome"
          variant="outlined"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNome(e.target.value)
          }
          value={nome}
        />
      </FormControl>

      <FormControl sx={{ mt: 1, minWidth: 600 }}>
        <TextFieldMask
          id="isbn"
          label="Código ISBN"
          variant="outlined"
          disabled={!!isbnLivroSelecionado}
          mask="999-99-9999-999-9"
          value={isbn}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setISBN(e.target.value)
          }
          required
        />
      </FormControl>

      <FormControl sx={{ mt: 1, minWidth: 600 }}>
        <TextField
          id="sinopse"
          label="Sinopse"
          variant="outlined"
          multiline
          rows={4}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSinopse(e.target.value)
          }
          value={sinopse}
        />
      </FormControl>

      <FormControl sx={{ mt: 1, minWidth: 600 }}>
        <TextField
          id="urlImagem"
          label="URL da imagem da capa"
          variant="outlined"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setURLImagem(e.target.value)
          }
          value={urlImagem}
        />
      </FormControl>

      <FormControl sx={{ mt: 1, minWidth: 600 }}>
        <TextField
          id="autores"
          label="Nomes dos autores"
          placeholder="Nomes separados por ;"
          variant="outlined"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAutores(e.target.value)
          }
          value={autores}
        />
      </FormControl>

      <Button variant="contained" sx={{ mt: 1, mb: 2 }} onClick={salvarLivro}>
        Salvar
      </Button>
    </ContainerColuna>
  );
};

export { FormularioLivroPage };
