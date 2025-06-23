import { Box } from '@mui/material';
import TaskKanbanBoard from './kanban/TaskKanbanBoard';
import TaskFormDialog from './kanban/TaskFormDialog';
import TaskStatusFormDialog from './manage/TaskStatusFormDialog';
export default function TaskIndex() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <TaskFormDialog />  
      </Box>
      <TaskKanbanBoard />
      <TaskStatusFormDialog />
    </Box>
  )
}
