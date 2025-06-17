import { Paper, Typography, Stack } from '@mui/material';
import TaskCard from './TaskCard';

const Column = ({ title, tasks, columnId }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, minHeight: 400, minWidth: 300, maxHeight: 550, overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Stack spacing={1}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Stack>
    </Paper>
  );
};

export default Column;
