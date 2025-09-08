const steps = [
  {
    element: '#hamburger-container',
    popover: {
      title: '侧边栏',
      description: '打开 && 关闭  侧边栏',
      position: 'bottom'
    }
  },
  {
    element: '#breadcrumb-container',
    popover: {
      title: '网页标题',
      description: '网页标题展示',
      position: 'bottom'
    }
  },
  {
    element: '#header-search',
    popover: {
      title: '网页搜索',
      description: '支持中文和拼音搜索',
      position: 'left'
    }
  },
  {
    element: '#screenfull',
    popover: {
      title: '全屏模式',
      description: '设置网页全屏模式',
      position: 'left'
    }
  },
  {
    element: '#tags-view-container',
    popover: {
      title: '标签页视图',
      description: '使用方式同浏览器标签页',
      position: 'bottom'
    },
    padding: 0
  }
];

export default steps;
