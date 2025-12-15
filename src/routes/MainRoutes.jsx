import {lazy} from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import Supplier from "../pages/supplier";
import Category from "../pages/category";
import Products from "../pages/products";
import AddProduct from "../sections/products/AddProducts";
import Modify from "../pages/modify";
import Purchase from "../pages/purchase";
import Sales from "../pages/sales";

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <DashboardLayout/>,
    children: [
        {
            path: '/',
            element: <DashboardDefault/>
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault/>
                }
            ]
        },
        {
            path: 'supplier',
            element: <Supplier/>
        },
        {
            path: 'category',
            element: <Category/>
        },
        {
            path: 'modify',
            element: <Modify/>
        },
        {
            path: 'products/add',
            element: <AddProduct/>
        },
        {
            path: 'products/update/:id',
            element: <AddProduct/>
        },
        {
            path: 'products',
            element: <Products/>
        },
        {
            path: 'purchase',
            element: <Purchase/>
        },
        {
            path: 'sales',
            element: <Sales/>
        },
        {
            path: 'typography',
            element: <Typography/>
        },
        {
            path: 'color',
            element: <Color/>
        },
        {
            path: 'shadow',
            element: <Shadow/>
        },
        {
            path: 'sample-page',
            element: <SamplePage/>
        }
    ]
};

export default MainRoutes;
