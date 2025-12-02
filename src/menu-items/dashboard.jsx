// assets
import { DashboardOutlined,ProductOutlined,BlockOutlined,UserOutlined,ShoppingCartOutlined ,ShopOutlined} from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,ProductOutlined,BlockOutlined,UserOutlined,ShoppingCartOutlined,ShopOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //
const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'supplier',
      title: "Ta'minotchi",
      type: 'item',
      url: '/supplier',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'category',
      title: "Kategoriya",
      type: 'item',
      url: '/category',
      icon: icons.BlockOutlined,
      breadcrumbs: false
    },
    {
      id: 'modify',
      title: "Modifiyer",
      type: 'item',
      url: '/modify',
      icon: icons.BlockOutlined,
      breadcrumbs: false
    },
    {
      id: 'products',
      title: "Mahsulotlar",
      type: 'item',
      url: '/products',
      icon: icons.ProductOutlined,
      breadcrumbs: false
    },
    {
      id: 'purchase',
      title: "Xarid qilish",
      type: 'item',
      url: '/purchase',
      icon: icons.ShoppingCartOutlined,
      breadcrumbs: false
    },
    {
      id: 'sales',
      title: "Savdo",
      type: 'item',
      url: '/sales',
      icon: icons.ShopOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
