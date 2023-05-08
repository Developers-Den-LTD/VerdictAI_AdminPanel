const navigation = () => [
  {
    title: 'Dashboard',
    icon: 'tabler:dashboard',
    path: '/dashboard/home'
  },
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
    icon: 'tabler:browser',
    path: '/dashboard/change-browsers'
  },
  {
    title: 'Query Limits',
    icon: 'tabler:adjustments-horizontal',
    path: '/dashboard/query-limits'
  },
  {
    title: 'Results Per Query',
    icon: 'tabler:report-analytics',
    path: '/dashboard/results-per-query'
  }
]

export default navigation
