import { Box } from '@mui/material'
import TaskKanbanBoard from './kanban/TaskKanbanBoard'
import TaskFormDialog from './kanban/TaskFormDialog'
import TaskLogList from './kanban/TaskLogList'

export default function TaskKanban() {
     return (
          <Box>
               <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 2,
               }}>
                    <TaskFormDialog />
               </Box>
               <TaskKanbanBoard />
               <TaskLogList />
          </Box>
     )
}
