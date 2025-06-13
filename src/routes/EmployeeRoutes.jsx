import { EmployeeContextProvider } from "../contexts/EmployeeContext";
import EmployeeList from "../pages/employee/EmployeeList";
import EmployeeLayout from "../layouts/EmployeeLayout";
import EmployeeMonitoring from "../pages/employee/EmployeeMonitoring";
import EmployeeManage from "../pages/employee/EmployeeManage";

const employeeRoutes = {
     path: "employees",
     element: <EmployeeContextProvider />,
     children: [
          {
               element: <EmployeeLayout />,
               children: [
                    {
                         index: true,
                         element: <EmployeeList />
                    },
                    {
                         path: "list",
                         element: <EmployeeList />
                    },
                    {
                         path: "list",
                         element: <EmployeeList />
                    },
                    {
                         path: "monitor",
                         element: <EmployeeMonitoring />
                    },
                    {
                         path: "manage",
                         element: <EmployeeManage />
                    },

               ]
          }
     ]
}


export default employeeRoutes;