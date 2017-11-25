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
      flag: 'ALL_ANOMALIES',
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
      flag: 'ANOMALIES',
      url: '',
      icon: 'icon-pie-chart'
    },
    {
      name: 'Errors',
      flag: 'ERRORS',
      url: '',
      icon: 'icon-pie-chart'
    }
  ],
  logs: [
  ],
  currenturl: '',
  logstosave: []

}
