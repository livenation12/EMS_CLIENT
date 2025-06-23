import TaskLayout from "../layouts/TaskLayout";
import TaskKanban from "../pages/tasks/TaskKanban";
import TaskManage from "../pages/tasks/TaskManage";


const taskRoutes = {
     path: '/tasks',
     children: [
          {
               element: <TaskLayout />,
               children: [
                    {
                         index: true,
                         element: <TaskKanban />
                    },
                    {
                         path: 'kanban',
                         element: <TaskKanban />
                    },
                    {
                         path: 'manage',
                         element: <TaskManage />
                    }
               ]
          }
     ]

}

export default taskRoutes;