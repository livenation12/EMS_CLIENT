import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, Typography } from '@mui/material';

const TaskCard = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardContent>
        <Typography variant="subtitle1">{task.title}</Typography>
        <Typography variant="body2">{task.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
