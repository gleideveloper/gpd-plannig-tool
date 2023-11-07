import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { theme } from "../../themes/index";
import HrmSpecificMonthModal from '../HrmSpecificMonth/HrmSpecificMonthForm';
import { useState } from "react";

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
      monthLabels.push({ label, isSAMonth: i === 0 });
    }

    return monthLabels;
  };

  const monthLabels = generateMonthLabels();

  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleUpdateButtonClick = (label) => {
    setSelectedMonth(label);
    setSpecificMonth(true)
  };

  const handleCloseModal = () => {
    setSelectedMonth(null);
    setSpecificMonth(false)
  };

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
                    value={(data.allocations[index] && data.allocations[index].maxAllocation) || "0"} // Adicione a propriedade maxAllocation
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
