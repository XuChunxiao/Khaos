export const PAGE_SIZE = 15;
export const paginationParams = {
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['5', '10', '15', '20', '25', '30'],
};
const ENV = window.configs || {};
// 服务地址
export const API_URL = {
  project: {
    queryDoctors: `${ENV.ADMIN_URL}/project/queryDoctors.do`, // 查询医生列表
  },
};

// 页面元素权限
// DOCTOR 医生 NOTDOCTOR 非医生 INSIDE_ASSISTANT 内部医助（一期）
// OUTSITE_ASSISTANT 外部医助（二期）
// export const AUTH = {
//   // 内部医助
//   INSIDE_ASSISTANT: {
//     order: {
//       access: true,
//       dataAuth: {
//         name: true,
//         patientNo: true,
//         mobile: true,
//       },
//     },
//     myOrder: {
//       access: true,
//       dataAuth: {
//         doctorContact: true,
//         RobOrderBtn: true,
//         RobOrder: true,
//       },
//     },
//     AddOrder: {
//       access: false,
//     },
//     RobNewOrder: {
//       access: true,
//       dataAuth: {
//         assistantTab: true,
//       },
//     },
//     MyAssets: {
//       access: false,
//     },
//     MyIncome: {
//       access: true,
//     },
//     CustomerServiceCenter: {
//       access: true,
//     },
//     PersonalInfo: {
//       access: true,
//     },
//     AllOrder: {
//       access: true,
//     },
//   },

//   // 医生
//   DOCTOR: {
//     myOrder: {
//       access: true,
//       dataAuth: {
//         addFee: true,
//       },
//     },
//     AddOrder: {
//       access: true,
//       dataAuth: {
//         doctorTab: true,
//       },
//     },
//     RobNewOrder: {
//       access: false,
//     },
//     WaitServiceOrder: {
//       access: false,
//     },
//     ServicingOrder: {
//       access: false,
//     },
//     CustomerServiceCenter: {
//       access: true,
//     },
//     PersonalInfo: {
//       access: true,
//     },
//     ForgetPassword: {
//       access: true,
//     },
//     SetPassword: {
//       access: true,
//     },
//     MyIncome: {
//       access: false,
//     },
//     EssentialiInformation: {
//       access: true,
//     },
//     ReviseIphoneNumber: {
//       access: true,
//     },
//     AuditFailedToPass: {
//       access: true,
//     },
//     AuditInfomation: {
//       access: true,
//     },
//     Feedback: {
//       access: true,
//     },
//     SetCommonAddress: {
//       access: true,
//     },
//     SetNewAddress: {
//       access: true,
//     },
//     SetOrder: {
//       access: true,
//     },
//     Setting: {
//       access: true,
//     },
//     MyAssets: {
//       access: true,
//     },
//     AllOrder: {
//       access: true,
//     },
//   },
//   // 非医生
//   NOTDOCTOR: {
//     myOrder: {
//       access: true,
//       dataAuth: {
//         addFee: true,
//       },
//     },
//     AddOrder: {
//       access: true,
//       dataAuth: {
//         doctorTab: true,
//       },
//     },
//     RobNewOrder: {
//       access: false,
//     },
//     WaitServiceOrder: {
//       access: false,
//     },
//     ServicingOrder: {
//       access: false,
//     },
//     CustomerServiceCenter: {
//       access: true,
//     },
//     PersonalInfo: {
//       access: true,
//     },
//     ForgetPassword: {
//       access: true,
//     },
//     SetPassword: {
//       access: true,
//     },
//     MyIncome: {
//       access: false,
//     },
//     EssentialiInformation: {
//       access: true,
//     },
//     ReviseIphoneNumber: {
//       access: true,
//     },
//     AuditFailedToPass: {
//       access: true,
//     },
//     AuditInfomation: {
//       access: true,
//     },
//     Feedback: {
//       access: true,
//     },
//     SetCommonAddress: {
//       access: true,
//     },
//     SetNewAddress: {
//       access: true,
//     },
//     SetOrder: {
//       access: true,
//     },
//     Setting: {
//       access: true,
//     },
//     MyAssets: {
//       access: true,
//     },
//     AllOrder: {
//       access: true,
//     },
//   },
//   // 访客
//   VISITOR: {
//     myOrder: {
//       access: false,
//     },
//     AddOrder: {
//       access: false,
//     },
//     RobNewOrder: {
//       access: false,
//     },
//     CustomerServiceCenter: {
//       access: false,
//     },
//     PersonalInfo: {
//       access: false,
//     },
//     ForgetPassword: {
//       access: true,
//     },
//     SetPassword: {
//       access: false,
//     },
//     MyIncome: {
//       access: false,
//     },
//     EssentialiInformation: {
//       access: false,
//     },
//     ReviseIphoneNumber: {
//       access: false,
//     },
//     AuditFailedToPass: {
//       access: false,
//     },
//     AuditInfomation: {
//       access: false,
//     },
//     Feedback: {
//       access: false,
//     },
//     SetCommonAddress: {
//       access: false,
//     },
//     SetNewAddress: {
//       access: false,
//     },
//     SetOrder: {
//       access: false,
//     },
//     Setting: {
//       access: false,
//     },
//     MyAssets: {
//       access: false,
//     },
//     AllOrder: {
//       access: false,
//     },

//   },
// };

