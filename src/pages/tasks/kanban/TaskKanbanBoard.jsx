import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import Column from './Column';
import useFetch from '../../../hooks/useFetch';
import { readTaskKanban, updateTask } from '../../../api/task';


const TaskKanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const sensors = useSensors(useSensor(PointerSensor));
  const { trigger, loading } = useFetch(readTaskKanban, {
    onSuccess: (res) => {
      // Ensure IDs are strings
      const normalized = res.data.map(col => ({
        ...col,
        id: col.id.toString(),
        tasks: col.tasks.map(task => ({ ...task, id: task.id.toString() }))
      }));
      const sorted = normalized.sort((a, b) => a.position - b.position);
      setColumns(sorted);
    }
  });
  const { trigger: update } = useFetch(updateTask);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    // 1. Find the source column
    const fromColumnIndex = columns.findIndex(col =>
      col.tasks.some(task => task.id === active.id)
    );

    // 2. Find the target column (task or empty drop)
    const toColumnIndex = columns.findIndex(col =>
      col.tasks.some(task => task.id === over.id)
    );
    const fallbackToCol = columns.findIndex(col => col.id === over.id);
    const targetColumnIndex = toColumnIndex !== -1 ? toColumnIndex : fallbackToCol;

    if (fromColumnIndex === -1 || targetColumnIndex === -1) return;

    // 3. Get dragged task
    const fromColumn = columns[fromColumnIndex];
    const toColumn = columns[targetColumnIndex];
    const draggedTaskIndex = fromColumn.tasks.findIndex(task => task.id === active.id);
    const draggedTask = fromColumn.tasks[draggedTaskIndex];

    // 4. Clone the task lists
    const newFromTasks = [...fromColumn.tasks];
    const newToTasks =
      fromColumnIndex === targetColumnIndex
        ? [...fromColumn.tasks]
        : [...toColumn.tasks];

    // 5. Remove dragged task from original location
    newFromTasks.splice(draggedTaskIndex, 1);

    if (fromColumnIndex === targetColumnIndex) {
      // Reordering within the same column
      const overIndex = newToTasks.findIndex(task => task.id === over.id);
      const insertIndex = draggedTaskIndex < overIndex ? overIndex - 1 : overIndex;

      // Remove from toTasks too (same array!) to prevent duplication
      newToTasks.splice(draggedTaskIndex, 1);
      newToTasks.splice(insertIndex, 0, draggedTask);
    } else {
      // Moving to another column
      newToTasks.push(draggedTask);
    }

    // 6. Update the columns
    const updatedColumns = [...columns];
    updatedColumns[fromColumnIndex] = {
      ...fromColumn,
      tasks: newFromTasks,
    };
    updatedColumns[targetColumnIndex] = {
      ...toColumn,
      tasks: newToTasks,
    };

    // 7. Apply the new state
    setColumns(updatedColumns);
    console.log(toColumn);

    // 8. Update the backend
    update(draggedTask.id, {
      statusId: toColumn.id,
      position: newToTasks.findIndex(task => task.id === draggedTask.id)
    });
  };


  useEffect(() => {
    // Fetch initial data
    trigger();
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Grid container spacing={2}>
        {
          columns.length <= 0 ? <Typography variant="h6" sx={{ width: '100%', textAlign: 'center' }}>Add task status to start</Typography>
            :
            columns.map((column) => (
              <Grid size={{ lg: 4, xs: 12 }} key={column.id}>
                <SortableContext
                  items={column.tasks.map((task) => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Column
                    column={column}
                  />
                </SortableContext>
              </Grid>
            ))}
      </Grid>
    </DndContext >
  );
};

export default TaskKanbanBoard;
