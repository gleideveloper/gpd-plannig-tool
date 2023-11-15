import { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const NewProductForm = ({
  data,
  updateFieldHandler,
  setData,
  setTemplateInfo,
}) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}${
        import.meta.env.VITE_ROTA_TEMPLATES
      }`
    )
      .then((response) => response.json())
      .then((newData) => {
        setTemplates(newData);
        setData({ ...data, newData });
      })
      .catch((error) => console.error('Erro ao obter os templates:', error));
  }, []);

  const options = templates.map((template) => ({
    label: template.template_type,
    value: template.template_type,
    months: template.length,
  }));

  const handleChangeTemplate = (templateType) => {
    updateFieldHandler('template_type', templateType);

    const selectedTemplate = templates.find(
      (template) => template.template_type === templateType
    );

    if (selectedTemplate) {
      const numMonthsToShow = selectedTemplate.length;
      const allocations = [];
      for (let i = 1; i <= numMonthsToShow; i++) {
        allocations.push({ month: i, allocation: 0 });
      }

      setData((prev) => ({
        ...prev,
        allocations,
      }));

      if (typeof setTemplateInfo === 'function') {
        setTemplateInfo(selectedTemplate);
      } else {
        console.error(
          'setTemplateInfo is not a function. Please check if it is passed as a prop.'
        );
      }
    }
  };

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12}>
          <Typography variant='h5' component='h2'>
            New Product
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='nome'
            label='Product Name'
            variant='outlined'
            required
            fullWidth
            value={data.nome}
            onChange={(e) => updateFieldHandler('nome', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='leader'
            label='GPD Leader'
            variant='outlined'
            required
            fullWidth
            value={data.lider_npi}
            onChange={(e) => updateFieldHandler('lider_npi', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ minWidth: 100 }}>
            <InputLabel id='template-label'>Template</InputLabel>
            <Select
              labelId='template-label'
              id='template-select'
              value={data.template_type}
              label='Template'
              defaultValue='Low'
              required
              onChange={(e) => handleChangeTemplate(e.target.value)}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl required fullWidth sx={{ minWidth: 100 }}>
            <InputLabel
              htmlFor='date-sa-field'
              shrink
              style={{ visibility: 'hidden' }}
            >
              Date SA
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                id='date-sa-field'
                label='Date SA'
                value={data.data_sa}
                onChange={(e) => updateFieldHandler('data_sa', e)}
                format='MM/YYYY'
                required
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default NewProductForm;
