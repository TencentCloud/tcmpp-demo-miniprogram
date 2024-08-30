const packageRouters = {
  authPage: 'pages/auth/index',
  homePage: 'pages/mixHome/index',
  schedulePage: 'pages/schedule/index',
  collaborationTableListPage: 'pages/collaborationTableList/index',
  extendPage: 'pages/extend/index',
};

const packageARouters = {
  homeStatisticsPage: 'packageA/pages/homeStatistics/index',
  attendanceEditPage: 'packageA/pages/home/edit/index',
  attendanceListPage: 'packageA/pages/home/list/index',
  homePlanEditPage: 'packageA/pages/home/planListEdit/index',
  timelinePage: 'packageA/pages/home/timeline/index',
};

export const packageBRouters = {
  managerPage: 'packageB/pages/manager/index',
  suggestionPage: 'packageB/pages/suggestion/index',
  birthdayReminderPage: 'packageB/pages/birthdayReminder/index',
  birthdayReminderEditPage: 'packageB/pages/birthdayReminder/edit/index',
  userInfoPageEdit: 'packageB/pages/userInfo/index',
  physiologyPage: 'packageB/pages/physiology/index',
  physiologyEditPage: 'packageB/pages/physiology/edit/index',
  settingPage: 'packageB/pages/setting/index',
  moreFeaturesPage: 'packageB/pages/moreFeatures/index',
  categoriyConfigPage: 'packageB/pages/categoriyConfig/index',
  categoriyConfigEditPage: 'packageB/pages/categoriyConfig/edit/index',
  privacyPolicyPage: 'packageB/pages/privacyPolicy/index',
  serviceAgreementPage: 'packageB/pages/serviceAgreement/index',
  scheduleEditPage: 'packageB/pages/schedule/edit/index', // 日程编辑

  userManualPage: 'packageB/pages/userManual/index',
  userManualEditPage: 'packageB/pages/userManual/edit/index',

  collaborationTablePage: 'packageB/pages/collaborationTable/index',
  collaborationPeoplePage:
    'packageB/pages/collaborationTable/peopleManagement/index',
  collaborationJoinpage: 'packageB/pages/collaborationTable/join/index',
  shareAttendancePage: 'packageB/pages/shareAttendance/index',

  exerciseExecPage: 'packageB/pages/exercise/exerciseExec/index',
  exerciseGrroupListPage: 'packageB/pages/exercise/groupList/index',
  exerciseGroupEditPage: 'packageB/pages/exercise/groupList/groupEdit/index',
  exercisePlanEditPage: 'packageB/pages/exercise/groupList/planEdit/index',
  exercisePlanJoinpage: 'packageB/pages/exercise/join/index',
  holidayPage: 'packageB/pages/holiday/index',
  holidayEditPage: 'packageB/pages/holiday/edit/index',
};

export const routers = {
  ...packageRouters,
  ...packageARouters,
  ...packageBRouters,
};

const debuggingPage =
  process.env.NODE_ENV === 'development' ? [routers.authPage] : [];

export default {
  // lazyCodeLoading: 'requiredComponents',
  pages: Array.from(
    new Set(debuggingPage.concat(Object.values(packageRouters).filter(Boolean)))
  ),

  subpackages: [
    {
      root: 'packageA',
      pages: Object.values(packageARouters).map((item) =>
        item.replace('packageA/', '')
      ),
    },
    {
      root: 'packageB',
      pages: Object.values(packageBRouters).map((item) =>
        item.replace('packageB/', '')
      ),
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    // navigationBarBackgroundColor: '#ffffff',
    navigationBarBackgroundColor: '#7c4e7a', // '#7c4e7a' 春节
    // navigationBarTitleText: '简云日历',
    navigationBarTextStyle: 'white',
  },

  tabBar: {
    // custom: true,
    color: '#bbbbbb',
    selectedColor: '#7c4e7a', // '#7c4e7a' 春节
    borderStyle: 'black',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: routers['homePage'],
        text: '首页',
        iconPath: './assets/images/icon-home.png',
        selectedIconPath: './assets/images/icon-home-selected.png',
      },
      {
        pagePath: routers['schedulePage'],
        text: '日程',
        iconPath: './assets/images/icon-schedule.png',
        selectedIconPath: './assets/images/icon-schedule-selected.png',
      },
      {
        pagePath: routers['collaborationTableListPage'],
        text: '共享日历',
        iconPath: './assets/images/icon-coordination.png',
        selectedIconPath: './assets/images/icon-coordination-selected.png',
      },
      {
        pagePath: routers['extendPage'],
        text: '我的',
        iconPath: './assets/images/icon-user.png',
        selectedIconPath: './assets/images/icon-user-selected.png',
      },
    ],
  },
  // usingComponents: {
  //  'ec-canvas': './packageA/pages/homeStatistics/ec-canvas/ec-canvas',
  // },
};
