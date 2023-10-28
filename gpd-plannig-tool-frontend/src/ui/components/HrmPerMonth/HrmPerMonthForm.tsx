import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";

const HrmPerMonthForm = ({ data, updateFieldHandler }) => {
  // Função para gerar rótulos de meses de acordo com as regras
  const generateMonthLabels = () => {
    const { data_sa, template_type } = data;
    const monthLabels = [];
    const monthNames = [
      "jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"
    ];

    const saDate = dayjs(data_sa); // Converter a data de SA para o formato dayjs

    let numMonthsToShow;
    let monthsBeforeSA;
    let monthsAfterSA;

    if (template_type === "high") {
      numMonthsToShow = 10;
      monthsBeforeSA = 6;
      monthsAfterSA = 3;
    } else if (template_type === "mid") {
      numMonthsToShow = 4;
      monthsBeforeSA = 4;
      monthsAfterSA = 3;
    } else {
      numMonthsToShow = 2;
      monthsBeforeSA = 2;
      monthsAfterSA = 3;
    }

    const saMonth = saDate.month(); // Mês de SA
    const saYear = saDate.year(); // Ano de SA

    for (let i = -monthsBeforeSA; i <= monthsAfterSA; i++) {
      const index = (saMonth + i + 12) % 12; // Calcula o índice do mês corrigido para valores negativos
      const year = saYear + Math.floor((saMonth + i) / 12); // Calcula o ano

      if (i === 0) {
        monthLabels.push(`${monthNames[index]}`);
      } else {
        monthLabels.push(`${monthNames[index]}`);
      }
    }

    return monthLabels;
  };

  const monthLabels = generateMonthLabels();

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            HRM Per Month
          </Typography>
        </Grid>
        <Grid
          container
          sx={{ marginTop: 2 }}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {data.allocations.map((field, index) => {
            if (monthLabels[index]) {
              return (
                <>
                  <Grid item xs={3}>
                    <span>{monthLabels[index]}</span>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      name={field.month}
                      label="Allocation"
                      InputProps={{
                        readOnly: true,
                      }}
                      error
                      variant="outlined"
                      fullWidth
                      value={field.allocation || "0"}
                      onChange={(e) => updateFieldHandler(e, index)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      color="secondary"
                      sx={{ height: 40, marginRight: 1 }}
                    >
                      Update
                    </Button>
                  </Grid>
                </>
              );
            }
          })}
        </Grid>
      </Box>
    </>
  );
};

export default HrmPerMonthForm;
