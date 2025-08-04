
import { Outlet } from 'react-router-dom'
import PageNav from '../components/PageNav'
import { Group, Lock, SupervisedUserCircle } from '@mui/icons-material'
import { Box } from '@mui/material';

export default function ManageLayout() {
     const links = [
          { label: 'Users', to: '/manage/users', icon: <Group /> },
          { label: 'Roles', to: '/manage/roles', icon: <SupervisedUserCircle /> },
          { label: 'Permissions', to: '/manage/permissions', icon: <Lock /> },
     ];
     return (
          <Box>
               <PageNav links={links} />
               <Outlet />
          </Box>
     )
}
