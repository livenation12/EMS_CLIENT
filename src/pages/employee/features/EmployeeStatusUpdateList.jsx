import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Tooltip, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import { readLatestStatus } from '../../../api/employee-status';
import { DateRange } from '@mui/icons-material';
import useEmployeeStatusSocket from '../../../hooks/useEmployeeStatusSocket';
export default function EmployeeStatusUpdateList() {
  const [list, setList] = useState([]);
  const { trigger, loading } = useFetch(readLatestStatus, {
    onSuccess: (res) => {      
      setList(res.data);
    }
  })
  useEffect(() => {
    trigger();
  }, []);

  const handleStatusUpdate = useCallback((updates) => {
    setList(prev => [...updates, ...prev]);
  });

  useEmployeeStatusSocket(handleStatusUpdate);

  if (loading) {
    return <Box sx={{ textAlign: "center", mt: 5 }}>Loading...</Box>
  }

  return (
    <>
      <List sx={{ width: '100%', height: 450, overflowY: 'auto', bgcolor: 'background.paper' }}
        subheader={
          <ListSubheader sx={{ bgcolor: 'background.paper' }}>
            <Typography variant="h6">Live Updates</Typography>
          </ListSubheader>
        }
      >
        {list && list.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Tooltip title={item.employeeName}>
                  <Avatar>
                    {item.employeeName?.charAt(0).toUpperCase()}
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    sx={{ display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, width: '100%' }}
                    component="h6"
                    variant="subtitle1"
                  >
                    {item.status.label}
                    <Typography component="span" variant="caption" sx={{ display: 'inline-flex', alignItems: 'center', gap: .5 }}>
                      <DateRange fontSize='small' /> {item.timestamp}
                    </Typography>
                  </Typography>
                }
                secondary={
                  item.task
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>

    </>
  )
}
