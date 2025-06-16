import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Tooltip, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useFetch from '../../../hooks/useFetch';
import { readLatestStatus } from '../../../api/employee-status';
import { DateRange } from '@mui/icons-material';

export default function EmployeeStatusUpdateList() {
  const { trigger, data, loading } = useFetch(readLatestStatus, {})
  useEffect(() => {
    trigger();
  }, []);
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
        {data && data.map((item, index) => (
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
