export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',

      },

      {
        _name: 'CSidebarNavItem',
        name: 'Directory',
        to: '/directory',
        badge: {
          color: 'primary',
          text: 'NEW'
        },
      },
    ]
  }
]