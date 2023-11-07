import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { theme } from "../../themes/index";
import HrmSpecificMonthModal from '../HrmSpecificMonth/HrmSpecificMonthForm';
import { useEffect, useState } from "react";
import { ApiService } from "../../../data/services/ApiService";

function somarValoresPorMes(template, indice_mes) {

  const peakAmmountJSONformat = JSON.parse(template.peak_ammount);

  const nome_mes = "month" + (indice_mes + 1);

  let somaDoMes = 0;

  for (const cargo in peakAmmountJSONformat[nome_mes]) {
    if (peakAmmountJSONformat[nome_mes].hasOwnProperty(cargo)) {
      const value = parseFloat(peakAmmountJSONformat[nome_mes][cargo]);
      somaDoMes += value;
    }
  }
  return somaDoMes.toFixed(1);
}


const HrmPerMonthForm = ({ data, updateFieldHandler, setSpecificMonth }) => {

  const colorHighlight = theme.palette.secondary.light;

  const generateMonthLabels = () => {
    const { data_sa, template_type, newData } = data;
    const monthLabels = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const saDate = dayjs(data_sa);
    const templateData = newData.find(item => item.template_type === template_type);

    if (!templateData) {
        return monthLabels;
    }

    const numMonthsToShow = templateData.length;
    const monthsBeforeSA = templateData.sa_idx;
    const monthsAfterSA = numMonthsToShow - monthsBeforeSA - 1;

    const saMonth = saDate.month();
    const saYear = saDate.year();

    for (let i = -monthsBeforeSA; i <= monthsAfterSA; i++) {
      const index = (saMonth + i + 12) % 12;
      const year = saYear + Math.floor((saMonth + i) / 12);
      const label = `${monthNames[index]} ${year}`;
      monthLabels.push({ label, isSAMonth: i === 0, template_type: template_type });
    }

    return monthLabels;
  };

  const monthLabels = generateMonthLabels();

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [template, setTemplate] = useState<any>({});
  const [maxAllocations, setMaxAllocations] = useState([]);

  const handleUpdateButtonClick = (label) => {
    setSelectedMonth(label);
    setSpecificMonth(true)
  };

  const handleCloseModal = () => {
    setSelectedMonth(null);
    setSpecificMonth(false)
  };

  const buscarTemplate = async (template_type: string) => {
    try {
      const response = await ApiService.get(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ROTA_TEMPLATES}/${template_type}`
      );
      setTemplate(response.data);
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    function fetchMaxAllocations() {
      const maxAllocations = monthLabels.map((labelData, index) => {
        return somarValoresPorMes(template, index);
      });

      setMaxAllocations(maxAllocations);
    }

    buscarTemplate(data.template_type);
    fetchMaxAllocations();
  }, []); 

  return (
    <>
      {selectedMonth ? (
          <HrmSpecificMonthModal monthLabel={selectedMonth} onClose={handleCloseModal} />
        ) : (
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
          <Grid item xs={3} sx={{ marginBottom: 4 }}>
            <strong>Months</strong>
          </Grid>
          <Grid item xs={3} sx={{ marginBottom: 4 }}>
            <strong>Current Allocation</strong>
          </Grid>
          <Grid item xs={3} sx={{ marginBottom: 4 }}>
            <strong>Maximum Allocation</strong>
          </Grid>
          <Grid item xs={3} sx={{ marginBottom: 4 }}>
            <strong>Actions</strong>
          </Grid>
          {monthLabels.map((labelData, index) => (
            <>
              <Grid container key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                <Grid item xs={3} sx={{paddingLeft: '24px'}}>
                  <span style={labelData.isSAMonth ? {color: colorHighlight, fontWeight: 'bold'} : {}}>{labelData.label}</span>
                </Grid>
                <Grid item xs={3} sx={{paddingLeft: '24px'}}>
                  <TextField
                    name={labelData.label} // aqui foi alterado para usar o label como nome
                    label="Current"
                    InputProps={{
                      readOnly: true,
                    }}
                    error
                    variant="outlined"
                    fullWidth
                    sx={{ input: { cursor: 'default', textAlign: 'center' }, width: '80%' }}
                    value={(data.allocations[index] && data.allocations[index].allocation) || "0"}
                    onChange={(e) => updateFieldHandler(e, index)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', paddingLeft: '24px' }}>
                  <TextField
                    label="Max"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    fullWidth
                    color="grey"
                    sx={{ input: { cursor: 'default', textAlign: 'center' }, width: '80%' }}
                    value={maxAllocations[index]} // Adicione a propriedade maxAllocation
                    size="small"
                  />
                </Grid>
                <Grid item xs={3} sx={{paddingLeft: '24px'}}>
                  <Button
                    color="secondary"
                    sx={{ height: 40}}
                    onClick={() => handleUpdateButtonClick(labelData.label)}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
      )}
    </>
  );
};

export default HrmPerMonthForm;
