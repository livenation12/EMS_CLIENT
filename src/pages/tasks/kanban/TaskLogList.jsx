import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import { readLatestTaskLogList } from '../../../api/task-log';

export default function TaskLogList() {
     const [logs, setLogs] = useState([]);
     const { trigger, loading } = useFetch(readLatestTaskLogList, {
          onSuccess: (res) => {
               setLogs(res.data.content);
          }
     });
     useEffect(() => {
          const params = {
               pageNumber: 0
          }
          trigger(params);
     }, []);

     return (
          <Box>
               <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Task Logs
               </Typography>
               <List sx={{ height: 300, overflowY: 'auto', }} dense>
                    {
                         loading ? <Box sx={{ textAlign: "center", mt: 5 }}>Loading...</Box> :
                              logs.map((log) => (
                                   <React.Fragment key={log.id}>
                                        <ListItem>
                                             <ListItemText primary={log.type} secondary={
                                                  <Box component={'span'} sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 1, pt: 2 }}>
                                                       <Typography
                                                            component="span"
                                                            variant="body2"
                                                            sx={{ color: 'text.primary', display: 'inline-flex', width: '90%' }}

                                                       >
                                                            You {log.type.toLowerCase()} the task "{log.task.title}"
                                                       </Typography>
                                                       <Typography
                                                            component="span"
                                                            variant="caption"
                                                            sx={{ color: 'text.secondary', display: 'inline', position: 'absolute', right: 0, top: 0 }}
                                                       >
                                                            {log.createdAt}
                                                       </Typography>
                                                  </Box>
                                             } />
                                        </ListItem>
                                        <Divider component="li" />
                                   </React.Fragment>
                              ))
                    }
               </List>
          </Box>
     )
}
