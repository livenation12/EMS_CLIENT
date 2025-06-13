
import { Box, Avatar, Card, CardContent, CardHeader, Grid, IconButton, FormGroup, FormControlLabel, Checkbox, Typography, Button, Snackbar } from "@mui/material"
import { readEmployees } from "../../api/employee";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useEmployeeStatusSocket from "../../hooks/useEmployeeStatusSocket";
import { Circle } from "@mui/icons-material";
import { updateEmployeeStatus } from "../../api/employee-status";
import { useSnackbar } from "../../contexts/SnackbarContext";

export default function EmployeeMonitoring() {
  const [employees, setEmployees] = useState([]);
  const [checkedEmployees, setCheckedEmployees] = useState([]);
  const snackBar = useSnackbar();
  const { loading, trigger } = useFetch(readEmployees, {
    onSuccess: (res) => {
      setEmployees(res.data.content);
    }
  });
  const { trigger: update } = useFetch(updateEmployeeStatus, {
    onSuccess: (res) => {
      snackBar(res.message || 'Successfully updated.');
      setCheckedEmployees([]);
    }
  })

  useEffect(() => {
    trigger()
  }, []);

  useEmployeeStatusSocket((updates) => {
    setEmployees(prev => {
      const employeeMap = new Map(prev.map(emp => [emp.id, emp]));
      updates.forEach(update => {
        const emp = employeeMap.get(update.employeeId);
        if (emp) {
          employeeMap.set(update.employeeId, {
            ...emp,
            currentStatus: update.status,
            task: update.task,
          });
        }
      });
      return Array.from(employeeMap.values());
    });
  });


  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedEmployees(employees.map((emp) => emp.id));
    } else {
      setCheckedEmployees([]);
    }
  }

  const handleCbChange = (e) => {
    const isChecked = e.target.checked;
    const employeeId = Number(e.target.value);
    if (isChecked) {
      setCheckedEmployees([...checkedEmployees, employeeId]);
    } else {
      setCheckedEmployees(checkedEmployees.filter((id) => id !== employeeId));
    }
  }

  const handleUpdate = () => {
    update({ employeeIds: checkedEmployees, status: "TesT", task: "Idle" });
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={checkedEmployees.length === employees.length} />} onChange={handleSelectAllChange} label="Select All" />
        </FormGroup>
        <Button variant="contained" onClick={handleUpdate}>Update</Button>
      </Box>
      <Grid container spacing={2}>
        {
          loading ? <Box sx={{ textAlign: "center", mt: 5 }}>Loading...</Box> :
            employees.length > 0 && employees.map((employee) => (
              <Grid size={{
                xs: 12,
                md: 6,
                lg: 3,
              }} key={employee.id}>
                <Card sx={{ width: "100%" }}>
                  <CardHeader
                    avatar={
                      <Avatar>
                        {employee.firstName.charAt(0).toUpperCase() + employee.lastName.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    action={
                      <Checkbox value={employee.id} onChange={handleCbChange} checked={checkedEmployees.includes(employee.id)} />
                    }
                    title={employee.fullName}
                    subheader={employee.email}
                  />
                  <CardContent>
                    <Typography sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: .5
                    }} variant="body2" color="text.secondary">
                      <Circle /> {employee.currentStatus}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
        }
      </Grid>
    </Box>
  )
}
