import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreVert } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material';

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
    height: 100
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardContent sx={{ position: 'relative' }}>
        <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} {...listeners}>
          <MoreVert />
        </IconButton>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1,
          pb: .5,
          borderBottom: '1px solid #e0e0e0',
        }}>
          <Typography variant="subtitle1" sx={{
            maxWidth: '75%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }} >
            {task.title}
          </Typography>
          <Tooltip title={`Assigned by ${task.assignedBy.fullName}`} placement="top">
            <Avatar sx={{
              marginLeft: 2,
              bgcolor: task.colorCode || 'primary.main',
              color: '#fff',
              width: 24,
              height: 24,
              fontSize: 14
            }}>
              {task.assignedBy.fullName.charAt(0).toUpperCase()}
            </Avatar>
          </Tooltip>
        </Box>

        <Typography variant='body2' sx={{
          color: 'text.secondary',
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2
        }}>
          {task.description}
        </Typography>

      </CardContent>
    </Card >
  );
};

export default TaskCard;
