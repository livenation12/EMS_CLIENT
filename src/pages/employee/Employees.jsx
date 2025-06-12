import { useEffect } from "react"
import { readEmployees } from "../../api/employee"
import useFetch from "../../hooks/useFetch"
import { Box, Grid } from "@mui/material"
import EmployeeFormDialog from "./features/EmployeeFormDialog";

export default function Employees() {
  const { loading, error, data, trigger } = useFetch(readEmployees, {});

  useEffect(() => {
    trigger();
  }, [])
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
        <EmployeeFormDialog />
      </Box>
      <Grid container spacing={2}>


      </Grid>
    </Box>
  )
}
