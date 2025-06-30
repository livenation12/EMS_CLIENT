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

    const fromColumnIndex = columns.findIndex(col =>
      col.tasks.some(task => task.id === active.id)
    );

    const toColumnIndex = columns.findIndex(col =>
      col.tasks.some(task => task.id === over.id)
    );

    // Fallback in case 'over' is a column drop zone
    const fallbackToCol = columns.findIndex(col => col.id === over.id);
    const targetColumnIndex = toColumnIndex !== -1 ? toColumnIndex : fallbackToCol;

    if (fromColumnIndex === -1 || targetColumnIndex === -1) return;

    const fromColumn = columns[fromColumnIndex];
    const toColumn = columns[targetColumnIndex];

    const draggedTaskIndex = fromColumn.tasks.findIndex(task => task.id === active.id);
    const draggedTask = fromColumn.tasks[draggedTaskIndex];

    // Clone task arrays
    const newFromTasks = [...fromColumn.tasks];
    const newToTasks =
      fromColumnIndex === targetColumnIndex
        ? [...fromColumn.tasks]
        : [...toColumn.tasks];

    // Remove the dragged task from its original column
    newFromTasks.splice(draggedTaskIndex, 1);

    let newPosition = 0;

    if (fromColumnIndex === targetColumnIndex) {
      // Same column reordering
      newToTasks.splice(draggedTaskIndex, 1); // Remove first to prevent index shift
      const overIndex = newToTasks.findIndex(task => task.id === over.id);
      newToTasks.splice(overIndex, 0, draggedTask);

      const before = newToTasks[overIndex - 1];
      const after = newToTasks[overIndex + 1];
      const beforePos = before?.position ?? 0;
      const afterPos = after?.position ?? beforePos + 100;
      newPosition = (beforePos + afterPos) / 2;
    } else {
      // Cross-column move
      const overIndex = newToTasks.findIndex(task => task.id === over.id);

      if (overIndex >= 0) {
        newToTasks.splice(overIndex, 0, draggedTask);

        const before = newToTasks[overIndex - 1];
        const after = newToTasks[overIndex + 1];
        const beforePos = before?.position ?? 0;
        const afterPos = after?.position ?? beforePos + 100;
        newPosition = (beforePos + afterPos) / 2;
      } else {
        // Drop at end of column
        newToTasks.push(draggedTask);
        const lastTask = newToTasks[newToTasks.length - 2]; // before pushed one
        newPosition = lastTask ? lastTask.position + 100 : 100;
      }
    }

    // Update state
    const updatedColumns = [...columns];

    updatedColumns[fromColumnIndex] = {
      ...fromColumn,
      tasks: newFromTasks,
    };

    updatedColumns[targetColumnIndex] = {
      ...toColumn,
      tasks: newToTasks.map(task =>
        task.id === draggedTask.id
          ? { ...task, position: newPosition }
          : task
      ),
    };

    setColumns(updatedColumns);

    // Backend update
    update(draggedTask.id, {
      statusId: Number(toColumn.id),
      position: parseFloat(newPosition),
      id: Number(draggedTask.id),
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
              <Grid size={{ md: 4, xs: 12 }} key={column.id}>
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
