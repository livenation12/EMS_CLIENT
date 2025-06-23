import { Paper, Typography, Stack } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import { Circle } from '@mui/icons-material';

const Column = ({ column }) => {
  const { setNodeRef } = useDroppable({ id: column.id });
  console.log('Column:', column);
  
  return (
    <Paper
      ref={setNodeRef}
      elevation={3}
      sx={{
        padding: 2,
        minHeight: 400,
        minWidth: 400,
        maxHeight: 600,
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <Circle sx={{ mr: 1, color: column.colorCode }} /> {column.label}
      </Typography>
      <Stack spacing={1}>
        {column?.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Stack>
    </Paper>
  );
};

export default Column;
