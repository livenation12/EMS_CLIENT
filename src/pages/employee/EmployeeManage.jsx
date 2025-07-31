import { Box } from '@mui/material'
import EmployeeStatusTypeDialog from './manage/EmployeeStatusTypeDialog'
import { useAuth } from '../../contexts/AuthContext'
export default function EmployeeManage() {
  const { state} = useAuth();
  return (
    <Box>
      <EmployeeStatusTypeDialog />
    </Box>
  )
}
