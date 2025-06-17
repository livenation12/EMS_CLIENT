import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Grid } from '@mui/material';
import Column from './Column';

const initialData = {
  todo: [
    { id: '1', title: 'Set up project' },
    { id: '2', title: 'Create models' },
  ],
  doing: [
    { id: '3', title: 'Build frontend' }
  ],
  done: [
    { id: '4', title: 'Install dependencies' }
  ]
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialData);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const fromColumn = Object.keys(columns).find(col =>
      columns[col].some(task => task.id === active.id)
    );
    const toColumn = Object.keys(columns).find(col =>
      col === over.id || columns[col].some(task => task.id === over.id)
    );

    if (!fromColumn || !toColumn) return;

    const fromTasks = [...columns[fromColumn]];
    const toTasks = [...columns[toColumn]];
    const draggedTask = fromTasks.find(task => task.id === active.id);

    fromTasks.splice(fromTasks.indexOf(draggedTask), 1);
    if (fromColumn === toColumn) {
      toTasks.splice(
        toTasks.findIndex(task => task.id === over.id),
        0,
        draggedTask
      );
    } else {
      toTasks.push(draggedTask);
    }

    setColumns({
      ...columns,
      [fromColumn]: fromTasks,
      [toColumn]: toTasks
    });
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Grid container spacing={2} padding={2}>
        {Object.entries(columns).map(([columnId, tasks]) => (
          <Grid item size={{ xs: 12, md: 4 }} key={columnId}>
            <SortableContext
              items={tasks.map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <Column columnId={columnId} title={columnId.toUpperCase()} tasks={tasks} />
            </SortableContext>
          </Grid>
        ))}
      </Grid>
    </DndContext >
  );
};

export default KanbanBoard;
