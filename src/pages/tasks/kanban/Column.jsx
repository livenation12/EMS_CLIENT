import { Paper, Typography, Stack } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import { Circle } from '@mui/icons-material';

const Column = ({ column }) => {
  const { setNodeRef } = useDroppable({ id: column.id });
  const sortedTasks = column.tasks.sort((a, b) => a.position - b.position);
  console.log('sortedTasks', sortedTasks);
  
  return (
    <Paper
      ref={setNodeRef}
      elevation={3}
      sx={{
        padding: 2,
        height: 'calc(100vh - 260px)',
        minWidth: 400,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <Circle sx={{ mr: 1, color: column.colorCode }} /> {column.label}
      </Typography>
      <Stack spacing={1}>
        {sortedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Stack>
    </Paper>
  );
};

export default Column;
