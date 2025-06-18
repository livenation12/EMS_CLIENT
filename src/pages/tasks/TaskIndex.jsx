import { Box } from '@mui/material';
import KanbanBoard from './features/KanbanBoard';
import TaskFormDialog from './features/TaskFormDialog';
import TaskStatusFormDialog from './features/TaskStatusFormDialog';
export default function TaskIndex() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <TaskFormDialog />  
      </Box>
      <KanbanBoard />
      <TaskStatusFormDialog />
    </Box>
  )
}
