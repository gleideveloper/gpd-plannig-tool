import { useEffect, useState } from 'react';
import { Box, Button, Grid, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import { theme } from '../../themes/index';

const HrmSpecificMonthModal = ({ monthLabel, monthIndex, monthLabelInfo, peakAmmountJson, hrJson, onClose }) => {
  
  const colorHighlight = theme.palette.secondary.light;

  const generateRolesForThisMonth = () => {
    const rolesLabels = [];
    const mes_atual = "month" + (monthIndex + 1);
    
    const monthValue = peakAmmountJson[mes_atual];
    for (const role in monthValue) {
      const formattedRole = role.replace(/_/g, ' ');
      rolesLabels.push(formattedRole)
    }

    return rolesLabels;
  };

  const rolesLabels = generateRolesForThisMonth();

  const [selectedRoles, setSelectedRoles] = useState({});
  const [collaboratorsByRole, setCollaboratorsByRole] = useState({});

  const fetchCollaboratorsAndSet = async (role) => {
    try {
      const formattedRole = role.replace(' ', '_');
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ROTA_COLABORADORES}/tipo/${formattedRole}`);
      const collaborators = response.data;
      setCollaboratorsByRole((prevCollaboratorsByRole) => ({
        ...prevCollaboratorsByRole,
        [role]: collaborators,
      }));
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
    }
  };

  const saveCollaborators = () => {
    const updatedHrJson = { ...hrJson };
  
    rolesLabels.forEach((role) => {
      const formattedRole = role.replace(' ', '_');
      if (selectedRoles[role] === undefined) {
        selectedRoles[role] = '';
      }
      updatedHrJson[`month${monthIndex + 1}`][formattedRole] = selectedRoles[role];
    });

    hrJson = updatedHrJson;
  };

  const handleRoleChange = (event, role, month) => {
    const selectedRole = event.target.value;
    
    setSelectedRoles({
      ...selectedRoles,
      [role]: selectedRole,
    });

    const formattedRole = role.replace(' ', '_');
    const updatedHrJson = { ...hrJson };
    updatedHrJson[`month${month}`][formattedRole] = selectedRole;
    hrJson = updatedHrJson;
  };

  const clearSelectedRole = (role, month) => {
    setSelectedRoles({
      ...selectedRoles,
      [role]: '',
    });

    const formattedRole = role.replace(' ', '_');
    const updatedHrJson = { ...hrJson };
    updatedHrJson[`month${month}`][formattedRole] = "";
    hrJson = updatedHrJson;
  };    

  useEffect(() => {
    rolesLabels.forEach((role) => {
      fetchCollaboratorsAndSet(role);
    });
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid item xs={12}>
         <Typography variant="h5" component="h2">
            Allocation on <span style={monthLabelInfo.isSAMonth ? {color: colorHighlight, fontWeight: 'bold'} : {}}>{monthLabel}</span>
          </Typography>
        </Grid>
        <Grid container sx={{ marginTop: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={3} sx={{ marginBottom: 2 }}>
            <strong>Roles</strong>
          </Grid>
          <Grid item xs={6} sx={{ marginBottom: 2 }}>
            <strong>Collaborators</strong>
          </Grid>
          <Grid item xs={2} sx={{ marginBottom: 4 }}>
            <strong>Actions</strong>
          </Grid>
          {rolesLabels.map((role, index) => (
            <Grid container key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
              <Grid item xs={3} sx={{paddingLeft: '16px'}}>
                <span>{role}</span>
              </Grid>
              <Grid item xs={5} sx={{ marginLeft: 2 }}>
              <Select
                value={selectedRoles[role] || hrJson[`month${monthIndex + 1}`][role.replace(' ', '_')] || ''}
                fullWidth
                onChange={(event) => handleRoleChange(event, role, monthIndex + 1)}
                sx={{height: 35}}
              >
                <MenuItem disabled value="">
                  <em>Select a collaborator</em>
                </MenuItem>
                {collaboratorsByRole[role] && collaboratorsByRole[role].map((colaborador, index) => (
                  <MenuItem key={index} value={colaborador.nome}>
                    {colaborador.nome}
                  </MenuItem>
                ))}
              </Select>
              </Grid>
              <Grid item xs={3} sx={{paddingLeft: '24px'}}>
                  <Button
                    color="error"
                    sx={{ height: 40, marginLeft: '10px'}}
                    onClick={() => clearSelectedRole(role, monthIndex + 1)}
                  >
                    Clear
                  </Button>
                </Grid>
            </Grid>
          ))}
        </Grid>
        <div style={{display: 'flex', justifyContent: 'flex-start', marginTop: '20px'}}>
          <Button
            variant="outlined"
            color="success"
            sx={{ height: 40, marginRight: 1}}
            onClick={onClose}
          >
            Save
          </Button>
        </div>
      </Box>
    </>
  );
};

export default HrmSpecificMonthModal;
