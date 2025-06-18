import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
    <Card ref={setNodeRef} sx={{ ...style }} {...attributes} {...listeners}>
      <CardContent>
        <Typography variant="body1">{task.title}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
