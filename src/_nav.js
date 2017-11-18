export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'UI elements'
    },
    {
      name: 'Logs',
      url: '/components',
      icon: '',
      children: [
      ]
    },
    {
      name: 'Filters',
      url: '/icons',
      icon: '',
      children: [
        // {
        //   name: 'Font Awesome',
        //   url: '/icons/font-awesome',
        //   icon: 'icon-star'
        // },
        // {
        //   name: 'Simple Line Icons',
        //   url: '/icons/simple-line-icons',
        //   icon: 'icon-star'
        // }
      ]
    },
    // {
    //   name: 'Widgets',
    //   url: '/',
    //   icon: 'icon-calculator',
    //   badge: {
    //     variant: 'danger',
    //     text: 'NEW'
    //   }
    // },
    {
      name: 'All Anomalies',
      url: '/charts',
      icon: 'icon-pie-chart'
    }
    // {
    //   divider: true
    // },
    // {
    //   title: false,
    //   name: 'Extras'
    // },
    // {
    //   name: 'Pages',
    //   url: '/pages',
    //   icon: 'icon-star',
    //   children: [
    //     {
    //       name: 'Login',
    //       url: '/pages/login',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Register',
    //       url: '/pages/register',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Error 404',
    //       url: '/pages/404',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Error 500',
    //       url: '/pages/500',
    //       icon: 'icon-star'
    //     }
    //   ]
    // }
  ]

}
