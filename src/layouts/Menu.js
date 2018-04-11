export const menuList = [
  {
    name: '用户管理',
    icon: 'icon-tuandui',
    level: 0,
    children: [
      {
        name: '医生用户',
        path: '/UserMgr/DoctorUsers',
        level: 1,
      },
      {
        name: '患者用户',
        path: '/UserMgr/PatientUsers',
        level: 1,
      },
    ],
  },
  {
    name: '临床研究管理',
    icon: 'icon-tuandui',
    level: 0,
    children: [
      {
        name: '临床研究采集库',
        path: '/InvMgr/CollectionLibrary',
        level: 1,
      },
      {
        name: '临床研究实施库',
        path: '/InvMgr/ImplementLibrary',
        level: 1,
      },
      {
        name: '轮播设置',
        path: '/InvMgr/CarouselSetting',
        level: 1,
      },
    ],
  },
  {
    name: '学术文章管理',
    icon: 'icon-tuandui',
    path: '/ArticleMgr/WorkShopArticle',
    level: 0,
    show: true,
  },
  {
    name: '科普文章管理',
    icon: 'icon-tuandui',
    path: '/ArticleMgr/ScienceArticle',
    level: 0,
    show: true,
  },
  {
    name: '账户管理',
    icon: 'icon-tuandui',
    level: 0,
    children: [
      {
        name: '账户查询',
        path: '/AccountMgr/AccountQuery',
        level: 1,
      },
      {
        name: '积分明细',
        path: '/AccountMgr/IntegralDetail',
        level: 1,
      },
      {
        name: '提现明细',
        path: '/AccountMgr/WithDrawalDetail',
        level: 1,
      },
    ],
  },
  {
    name: '留言管理',
    icon: 'icon-tuandui',
    path: '/MessageMgr/MessageMgr',
    level: 0,
    show: true,
  },
  {
    name: '疾病管理',
    icon: 'icon-tuandui',
    level: 0,
    children: [
      {
        name: '疾病大类',
        path: '/DiseaseMgr/DiseaseCategories',
        level: 1,
      },
      {
        name: '疾病名',
        path: '/DiseaseMgr/DiseaseName',
        level: 1,
      },
    ],
  },
  {
    name: '患者库',
    icon: 'icon-tuandui',
    path: '/PatientLibs/PatientLibs',
    level: 0,
    show: true,
  },
  {
    name: '团队管理',
    icon: 'icon-tuandui',
    level: 0,
    children: [
      {
        name: '职位角色',
        path: '/TeamMgr/PositionRole',
        level: 1,
      },
      {
        name: '人员记录',
        path: '/TeamMgr/StaffRecords',
        level: 1,
      },
      {
        name: '分管区域',
        path: '/TeamMgr/ManageArea',
        level: 1,
      },
      {
        name: '汇报线',
        path: '/TeamMgr/ReportLine',
        level: 1,
      },
    ],
  },
  {
    name: '管理员管理',
    icon: 'icon-tuandui',
    path: '/AdminMgr/AdminMgr',
    level: 0,
    show: true,
  },
];
