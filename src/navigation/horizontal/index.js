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
        path: '/dashboard/add-new-admin',
        icon: 'tabler:user'
      }
    ]
  }
]

export default navigation
