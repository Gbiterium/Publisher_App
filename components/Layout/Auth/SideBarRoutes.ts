export type RouteSetupType = {
  pathName: string
  icon?: string
  name: string
  noID?: boolean
  dropdown?: RouteSetupType[]
  isToggled?: boolean
}

export type RouteType = {
  path: string
  keywords: string[]
  routes: RouteSetupType[]
}
export const Routes: Array<RouteType> = [
  {
    path: 'administration',
    keywords: ['sms', 'administration'],
    routes: [
      {
        pathName: 'sms-id-administration-student',
        icon: 'student',
        name: 'student',
      },
      {
        pathName: 'sms-id-administration-classes',
        icon: 'classes',

        name: 'classes',
      },
      // {
      //   pathName: 'sms-id-administration-clubs',
      //   icon: 'flag',
      //   name: 'clubs',
      // },
      {
        pathName: 'sms-id-administration-family',
        icon: 'family',
        name: 'family',
      },
      {
        pathName: 'sms-id-administration-configuration-year',
        name: 'Academic Year',
        icon: 'calender',
      },
      {
        pathName: 'sms-id-administration-configuration-period',
        name: 'Academic Period',
        icon: 'period',
      },
      {
        pathName: 'sms-id-administration-configuration-timetable',
        icon: 'timetable',
        name: 'Timetable Period',
      },
      {
        pathName: 'sms-id-administration-configuration-library',
        icon: 'library',
        name: 'Library Management',
      },
      {
        pathName: 'sms-id-administration-configuration-grade',
        name: 'Grade Level',
        icon: 'grade',
      },
      // {
      //   pathName: 'sms-id-administration-academic-year',
      //   name: 'Subject',
      // },
      {
        pathName: 'sms-id-administration-configuration-house',
        icon: 'house',
        name: 'House',
      },
      {
        pathName: 'sms-id-administration-configuration-calender',
        icon: 'calender',
        name: 'School Calender',
      },
      {
        pathName: 'sms-id-administration-configuration-lesson-plan',
        icon: 'fluent:people-checkmark-24-filled',
        name: 'Lesson Plan Approver',
      },
      {
        pathName: 'sms-id-administration-configuration-report-card-template',
        icon: 'report',
        name: 'Report Card Template',
      },
      // {
      //   pathName: 'sms-id-administration-configuration-report-card',
      //   icon: 'icon-park-outline:table-report',
      //   name: 'Report Card',
      // },
      // {
      //   pathName: 'sms-id-administration-configuration',
      //   icon: 'akar-icons:gear',
      //   name: 'configuration',
      //   dropdown: [
      //     {
      //       pathName: 'sms-id-administration-configuration-year',
      //       name: 'Academic Year',
      //       icon: 'ic:baseline-family-restroom',

      //     },
      //     {
      //       pathName: 'sms-id-administration-configuration-period',
      //       name: 'Academic Period',
      //       icon: 'fa-solid:chalkboard-teacher',

      //     },
      //     {
      //       pathName: 'sms-id-administration-configuration-timetable',
      //       icon: 'mdi:timetable',
      //       name: 'Timetable Period',
      //     },
      //     {
      //       pathName: 'sms-id-administration-configuration-library',
      //       icon: 'clarity:library-solid',
      //       name: 'Library Management',
      //     },
      //     {
      //       pathName: 'sms-id-administration-configuration-grade',
      //       name: 'Grade Level',
      //     },
      //     // {
      //     //   pathName: 'sms-id-administration-academic-year',
      //     //   name: 'Subject',
      //     // },
      //     {
      //       pathName: 'sms-id-administration-configuration-house',
      //       icon: 'bi:house',
      //       name: 'House',
      //     },
      //     {
      //       pathName: 'sms-id-administration-configuration-calender',
      //       icon: 'iwwa:year',
      //       name: 'School Calender',
      //     },
      //     {
      //       pathName: 'sms-id-administration-academic-year',
      //       icon: 'icon-park-outline:table-report',
      //       name: 'Report Card Template',
      //     },
      //     {
      //       pathName: 'sms-id-administration-configuration-report-card',
      //       icon: 'icon-park-outline:table-report',
      //       name: 'Report Card',
      //     },

      //   ]
      // },
    ],
  },
  {
    path: 'staff',
    keywords: ['sms', 'staff'],
    routes: [
      {
        pathName: 'sms-id-staff-employee',
        name: 'employee',
        icon: 'employee',
      },
      {
        pathName: 'sms-id-staff-contracts',
        name: 'contracts',
        icon: 'contract',
      },
      {
        pathName: 'sms-id-staff-attendance',
        name: 'Time and Attendance',
        icon: 'checklist',
      },
      {
        pathName: 'sms-id-staff-payroll',
        name: 'Payroll',
        icon: 'payroll',
      },

      {
        pathName: 'sms-id-staff-pension-settings',
        name: 'HR Settings',
        icon: 'settings',
        isToggled: false,

        dropdown: [
          {
            pathName: 'sms-id-staff-payments&deductions',
            name: 'Payments and Deductions',
          },
          {
            pathName: 'sms-id-staff-pension-settings',
            name: 'Pension Settings',
          },
          {
            pathName: 'sms-id-staff-banks',
            name: 'Banks',
          },
        ],
      },
    ],
  },
  {
    path: 'settings',
    keywords: ['settings'],
    routes: [
      {
        pathName: 'sms-id-settings-profile',
        name: 'school profile',
        icon: 'schoolprofile',
      },
      // {
      //   pathName: 'sms-id-settings-site',
      //   name: 'site',
      //   dropdown: [      {
      //     pathName: 'sms-id-settings-site',
      //     name: 'Site',
      //   },]
      // },
      // {
      //   pathName: 'sms-id-settings-departments',
      //   name: 'departments',
      // },
      // {
      //   pathName: 'sms-id-settings-differenciation',
      //   name: 'differenciation',
      // },
    ],
  },
  {
    path: 'lms',
    keywords: ['sms', 'lms'],
    routes: [
      // {
      //   pathName: 'sms-id-lms-dashboard',
      //   icon: 'home',
      //   name: 'Learning Dashboard',
      // },
      {
        pathName: 'sms-id-lms-classes',
        icon: 'classes',
        name: 'Classes',
      },
      {
        pathName: 'sms-id-lms-subjects',
        icon: 'books',
        name: 'Subjects',
      },
      {
        pathName: 'sms-id-lms-excercises',
        icon: 'excercises',
        name: 'Assignments',
      },
      // {
      //   pathName: 'sms-id-lms-clubs',
      //   icon: 'clubs',
      //   name: 'Clubs',
      // },
      {
        pathName: 'sms-id-lms-library',
        icon: 'clarity:library-solid',
        name: 'School Library',
      },
      {
        pathName: 'sms-id-lms-assignment-gallery',
        icon: 'assignment',
        name: 'Assignment Gallery',
      },
      {
        pathName: 'sms-id-lms-lesson-gallery',
        icon: 'books',
        name: 'Lesson Gallery',
      },
      {
        pathName: 'sms-id-lms-lessonplan',
        icon: 'bxs:folder-open',
        name: 'Lesson Plan',
      },
    ] as RouteSetupType[],
  },
  {
    path: 'profile',
    keywords: ['publisher'],
    routes: [
      {
        pathName: 'publisher-analytics',
        name: 'Dashboard',
        icon: 'material-symbols:leaderboard-outline',
        noID: true,
      },
      {
        pathName: 'publisher-bookshelf',
        name: 'Bookshelf',
        icon: 'material-symbols:description-outline',
        noID: true,
      },
      {
        pathName: 'publisher-payment',
        name: 'Payment',
        icon: 'material-symbols:account-balance',
        noID: true,
      },
    ],
  },
  {
    path: 'finance',
    keywords: ['sms', 'finance'],
    routes: [
      {
        pathName: 'sms-id-finance-products_and_services',
        name: 'Sales',
        icon: 'sales',
        isToggled: false,

        dropdown: [
          {
            pathName: 'sms-id-finance-school_fees',
            name: 'School Fees ',
            icon: 'schoolfees'
          },

          {
            pathName: 'sms-id-finance-invoices',
            name: 'Invoices ',
            icon: 'invoice'
          },
          {
            pathName: 'sms-id-finance-receipts',
            name: 'Receipts ',
            icon: 'receipt'
          },


          {
            pathName: 'sms-id-finance-customers',
            name: 'Customers ',
            icon: 'customers'

          },

        ]
      },
      {
        pathName: 'sms-id-financex-bills',
        name: 'Purchases',
        icon: 'financepurchases',
        isToggled: false,


        dropdown: [
          {
            pathName: 'sms-id-finance-bills',
            name: 'Bills ',
            icon: 'bill'

          },
          {
            pathName: 'sms-id-finance-suppliers',
            name: 'Suppliers ',
            icon: 'customers'

          },
          {
            pathName: 'sms-id-finance-payments',
            name: 'Payments ',
            icon: 'atmcard'
          },




        ]
      },
      {
        pathName: 'sms-id-finance-products_and_services',
        name: 'Product and Services',
        icon: 'fluent:box-16-filled',
      },
      {
        pathName: 'sms-id-finance-journal_entries',
        name: 'Journal Entries',
        icon: 'clarity:library-solid',
      },
      // {
      //   pathName: 'sms-id-finance-reports',
      //   name: 'Reports',
      //   icon: 'schoolprofile',
      // },
      {
        pathName: 'sms-id-financex-charts_of_account',
        name: 'Configuration',
        icon: 'settings',
        isToggled: false,

        dropdown: [
          {
            pathName: 'sms-id-finance-school_fees_templates',
            name: 'School Fees Templates ',
            icon: 'schoolfeestemplate'
          },
          {
            pathName: 'sms-id-finance-discounts',
            name: 'Discounts ',
            icon: 'discount',
          },
          {
            pathName: 'sms-id-finance-journals',
            name: 'Journals ',
            icon: 'journal',
          },
          {
            pathName: 'sms-id-finance-taxes',
            name: 'Taxes',
            icon: 'taxes',
          },

          {
            pathName: 'sms-id-finance-payment_methods',
            name: 'Payment Methods ',
            icon: 'atmcard'


          },
          {
            pathName: 'sms-id-finance-charts_of_account',
            name: 'Charts of Accounts ',
            icon: 'charts',
          },


        ]
      },


    ],
  },
]

export default Routes
