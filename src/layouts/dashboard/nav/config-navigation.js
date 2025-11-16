// component
import Iconify from '../../../components/iconify/Iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Iconify icon="eva:home-fill" />,
  },
  {
    title: 'Products',
    path: '/products',
    icon: <Iconify icon="eva:cube-fill" />,
    children: [
      {
        title: 'Add Product',
        path: '/products/add',
      },
      {
        title: 'Manage Products',
        path: '/products/manage',
      },
    ],
  },
  {
    title: 'Recipes',
    path: '/recipes',
    icon: <Iconify icon="eva:file-text-fill" />,
    children: [
      {
        title: 'Create Recipe',
        path: '/recipes/create',
      },
      {
        title: 'Manage Recipes',
        path: '/recipes/manage',
      },
    ],
  },
];

export default navConfig;
