import React, { useState } from 'react';
import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';

const HrmSpecificMonthModal = ({ monthLabel, onClose }) => {

  // Exemplo de dados para popular os dropdowns (que virão do backend, assim que estiver pronto)
  const rolesExample = [
    "Role 1",
    "Role 2",
    "Role 3",
    "Role 4",
  ];

  // State para controlar o valor selecionado para cada dropdown
  const [selectedRoles, setSelectedRoles] = useState({});

  // Função para atualizar o valor selecionado do dropdown
  const handleRoleChange = (event, role) => {
    setSelectedRoles({
      ...selectedRoles,
      [role]: event.target.value,
    });
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            Allocation on {monthLabel}
          </Typography>
        </Grid>
        <Grid container sx={{ marginTop: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={3} sx={{ marginBottom: 2 }}>
            <strong>Roles</strong>
          </Grid>
          <Grid item xs={5} sx={{ marginBottom: 2 }}>
            <strong>Collaborators</strong>
          </Grid>
          {rolesExample.map((role, index) => (
            <Grid container key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
              <Grid item xs={3} sx={{paddingLeft: '16px'}}>
                <span>{role}</span>
              </Grid>
              <Grid item xs={5}>
                <Select
                  value={selectedRoles[role] || ''}
                  fullWidth
                  onChange={(event) => handleRoleChange(event, role)}
                  sx={{height: 35}}
                >
                  <MenuItem disabled value="">
                    <em>Select a collaborator</em>
                  </MenuItem>
                  <MenuItem value="Option 1">Option 1</MenuItem>
                  <MenuItem value="Option 2">Option 2</MenuItem>
                  <MenuItem value="Option 3">Option 3</MenuItem>
                </Select>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <div style={{display: 'flex', justifyContent: 'flex-start', marginTop: '20px'}}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ height: 40, marginRight: 1}}
            onClick={onClose}
          >
            Return
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ height: 40, marginRight: 1}}
          >
            Save
          </Button>
        </div>
      </Box>
    </>
  );
};

export default HrmSpecificMonthModal;
