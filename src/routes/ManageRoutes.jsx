import ManageLayout from "../layouts/ManageLayout";
import ManageUsers from "../pages/manage/ManageUsers";
import ManageRoles from "../pages/manage/ManageRoles";
import ManagePermissions from "../pages/manage/ManagePermissions";
import { ManageContextProvider } from "../contexts/ManageContext";

const manageRoutes = {
     path: "manage",
     element: <ManageContextProvider />,
     children: [
          {
               element: <ManageLayout />,
               children: [
                    {
                         index: true,
                         element: <ManageUsers />,
                    },
                    {
                         path: "users",
                         element: <ManageUsers />,
                    },
                    {
                         path: "roles",
                         element: <ManageRoles />,
                    },
                    {
                         path: "permissions",
                         element: <ManagePermissions />,
                    },
               ]
          }

     ]


}
export default manageRoutes;