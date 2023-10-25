import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

const HrmPerMonthForm = ({ data, updateFieldHandler }) => {
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
          { data.allocations.map((field, index) => {
              return (
                <>
                  <Grid item xs={3}>
                    <span>Month #{index + 1}</span>
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
                      value={field.allocation ||'0'}
                      onChange={(e) =>
                        updateFieldHandler(e, index)
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button color="secondary" sx={{ height: 40, marginRight: 1 }}>
                      Update
                    </Button>
                  </Grid>
                </>
              );
            }
          )
          }
        </Grid>
      </Box>
    </>
  );
};

export default HrmPerMonthForm;
