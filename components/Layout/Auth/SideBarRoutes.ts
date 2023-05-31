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
    path: 'profile',
    keywords: ['publisher'],
    routes: [
      {
        pathName: 'publisher-analytics',
        name: 'Analytics',
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
        pathName: 'publisher-digital-library',
        name: 'Digital Content Library',
        icon: 'ic:round-play-lesson',
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
