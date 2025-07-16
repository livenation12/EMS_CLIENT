import { useEffect } from "react"
import { readEmployeeList } from "../../api/employee"
import useFetch from "../../hooks/useFetch"
import { useEmployee } from "../../contexts/EmployeeContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmployeeFormDialog from "./list/EmployeeFormDialog";
import { Box, Input, Avatar, Card, CardContent, CardHeader, Grid, IconButton } from "@mui/material"
import { useState } from "react";

export default function EmployeeList() {
  const { state, dispatch } = useEmployee();
  const { data, loading, trigger } = useFetch(readEmployeeList, {});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  useEffect(() => {
    trigger();
  }, [dispatch, state.refresh]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Input placeholder="Search employees..." />
        </Box>
        <EmployeeFormDialog />
      </Box>
      <Grid container spacing={2}>
          {
            loading ? <Box sx={{ textAlign: "center", mt: 5 }}>Loading...</Box> :
              data && data.content.map((employee) => (
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
                      title={employee.fullName}
                      subheader={employee.email}
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                    />
                    <CardContent>
                    </CardContent>
                  </Card>
                </Grid>
              ))
          }
      </Grid>
    </Box>
  )
}
