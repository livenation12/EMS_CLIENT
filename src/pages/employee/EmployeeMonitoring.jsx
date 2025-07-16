
import { Box, Avatar, Card, CardContent, CardHeader, Grid, FormGroup, FormControlLabel, Checkbox, Typography, Button, Chip, Tooltip, IconButton, } from "@mui/material"
import { readEmployeeList } from "../../api/employee";
import { useCallback, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useEmployeeStatusSocket from "../../hooks/useEmployeeStatusSocket";
import MonitorUpdateDialog from "./monitor/MonitorUpdateDialog";
import EmployeeStatusUpdateList from "./monitor/EmployeeStatusUpdateList"
import { useEmployee } from "../../contexts/EmployeeContext";
import { Circle, Timeline } from "@mui/icons-material";
import EmployeeActivitiesDialog from "./monitor/EmployeeActivitiesDialog";
export default function EmployeeMonitoring() {
  const [activityDialog, setActivityDialog] = useState({
    open: false,
    activeId: null
  });
  const { state, dispatch } = useEmployee();
  const [employees, setEmployees] = useState([]);
  const { loading, trigger } = useFetch(readEmployeeList, {
    onSuccess: (res) => {
      setEmployees(res.data.content);
    }
  });

  const handleStatusUpdate = useCallback((updates) => {
    setEmployees(prev => {
      const employeeMap = new Map(prev.map(emp => [emp.id, emp]));
      updates.forEach(update => {
        const emp = employeeMap.get(update.employeeId);
        if (emp) {
          employeeMap.set(update.employeeId, {
            ...emp,
            status: update.status,
            task: update.task,
          });
        }
      });
      return Array.from(employeeMap.values());
    });
  }, [setEmployees]);

  useEmployeeStatusSocket(handleStatusUpdate);

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      dispatch({ type: 'SET_CHECKED_EMPLOYEES', payload: employees.map(emp => Number(emp.id)) });
    } else {
      dispatch({ type: 'RESET_CHECKED_EMPLOYEES' });
    }
  }
  const handleCbChange = (e) => {
    const employeeId = Number(e.target.value);
    dispatch({ type: 'TOGGLE_CHECKED_EMPLOYEE', payload: employeeId });
  }


  /* Activities Dialog functions */
  const handleClose = () => {
    setActivityDialog({ open: false, activeId: null });
  }

  const handleOpenDialog = (employeeId) => {
    setActivityDialog({ open: true, activeId: employeeId });
  }


  useEffect(() => {
    trigger()
  }, []);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "", width: "100%", mb: 2 }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={new Set(state.checkedEmployees).size === employees.length} />}
            onChange={handleSelectAllChange}
            label="Select All"
          />
        </FormGroup>
        <Box>
          <MonitorUpdateDialog />
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid container size={{ xs: 12, lg: 8 }} spacing={2}>
          {
            loading ? <Box sx={{ textAlign: "center" }}>Loading...</Box> :
              employees.length > 0 && employees.map((employee) => (
                <Grid size={{
                  sm: 12,
                  md: 4,
                }} key={employee.id}>
                  <Card sx={{ width: "100%" }}>
                    <CardHeader
                      avatar={
                        <Tooltip title={employee.fullName}>
                          <Avatar>
                            {employee.firstName.charAt(0).toUpperCase() + employee.lastName.charAt(0).toUpperCase()}
                          </Avatar>
                        </Tooltip>
                      }
                      action={
                        <Checkbox value={employee.id} onChange={handleCbChange} checked={new Set(state.checkedEmployees).has(employee.id)} />
                      }
                      title={
                        // <Typography sx={{
                        //   display: 'inline-flex',
                        //   overflow: 'hidden',
                        //   textOverflow: 'ellipsis',
                        //   whiteSpace: 'nowrap',
                        // }}>
                        //   {
                          employee.fullName
                        //   }
                        // </Typography>
                      }
                      subheader={employee.email}
                    />
                    <CardContent>
                      <Typography
                        component="div"
                        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 0.5 }}
                        variant="body2"
                        color="text.secondary"
                      >
                        <Typography variant="caption" sx={{ textTransform: "capitalize", display: "inline-flex", gap: 1, alignItems: "center" }}>
                          <Circle sx={{ color: employee?.status?.colorCode }} />
                          {employee?.status?.label}
                        </Typography>

                        <Tooltip title="Activities">
                          <IconButton onClick={() => handleOpenDialog(employee.id)}>
                            <Timeline />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
          }
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <EmployeeStatusUpdateList />
        </Grid>
      </Grid>
      <EmployeeActivitiesDialog employeeId={activityDialog.activeId} open={activityDialog.open} onClose={handleClose} />
    </Box>
  )
}
