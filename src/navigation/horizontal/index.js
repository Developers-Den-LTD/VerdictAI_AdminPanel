const navigation = () => [
  {
    title: 'Admins',
    icon: 'tabler:smart-home',
    children: [
      {
        icon: 'tabler:smart-home',
        title: 'All Admins',
        path: '/dashboard/admins'
      },
      {
        title: 'Add New Admin',
        path: '/dashboard/admins/add-new-admin',
        icon: 'tabler:user'
      }
    ]
  },
  {
    title: 'Change Browsers',
    icon: 'tabler:home',
    path: '/dashboard/change-browsers'
  }
]

export default navigation
