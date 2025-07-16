import { Dialog, DialogContent, DialogTitle, List, ListItem, Typography } from '@mui/material'
import { useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'
import { readEmployeeStatusList } from '../../../api/employee-status'

export default function EmployeeActivitiesDialog({ open, onClose, employeeId }) {
  const { trigger, data, loading } = useFetch(readEmployeeStatusList);

  useEffect(() => {
    if (!open || !employeeId) return;
    const payload = { params: { employeeId } };
    trigger(payload);
  }, [open, employeeId]);

  // console.log("dialog data:" + data);
  if(!data){
    return;
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Activities of {data?.[0]?.employeeName}</DialogTitle>
      <DialogContent>
        <List component={"ul"} sx={{ maxHeight: 300, width: 500, overflowY: "auto" }}>
          {loading ? "Loading..." :
            data?.length === 0 ? "No activities found" :
              data.map((activity) => (
                <ListItem key={activity.id} sx={{ position: 'relatove', borderBottom : "1px solid #e0e0e0"}}>
                  <Typography>
                    {activity.task}
                  </Typography>
                    <Typography component="span" variant='caption' sx={{
                      position: 'absolute',
                      right: 0
                    }}>{activity.timestamp}</Typography>
                </ListItem>
              )
              )}
        </List>
      </DialogContent>
    </Dialog>
  )
}
