export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      flag: '0',
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
      name: 'All Anomalies',
      url: '',
      flag: 'allanomalies',
      icon: ''
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
      ]
    },
    {
      name: 'Anomalies',
      flag: 'anomalies',
      url: '',
      icon: 'icon-pie-chart'
    },
    {
      name: 'Errors',
      flag: 'errors',
      url: '',
      icon: 'icon-pie-chart'
    }
  ],
  logs: [
  ],
  currenturl: ''

}
