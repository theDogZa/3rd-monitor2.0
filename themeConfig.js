/*=========================================================================================
  File Name: themeConfig.js
  Description: Theme configuration
==========================================================================================*/
// CONFIGS
const themeConfig = {
  menuList: [
    {
      key: "inboundAgent",
      url: "#/inbound-agent",
      isUse: true                 // options[Boolean] : true(default), false
    },
    {
      key: "inboundChannel",
      url: "#/inbound-channel",
      isUse: true                 // options[Boolean] : true(default), false
    },
    {
      key: "inboundQueue",
      url: "#/inbound-queue",
      isUse: true                 // options[Boolean] : true(default), false
    }
  ]

}
const configNavBar = {
  barColor: "",                     // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
  btnMenuColor: "light",            // options[String]  : "danger, warning, success, primary , secondary, info, light (default), dark ,white, transparent
  btnMenuIsUser: true,             // options[Boolean] : true(default), false
  iconMonitorColor: "danger",       // options[String]  : "danger(default), warning, success, primary , secondary, info, light, dark ,white, transparent
  iconUserOnlineColor: "success",   // options[String]  : "danger, warning, success(default), primary , secondary, info, light, dark ,white, transparent
  iconUserOfflineColor: "danger",   // options[String]  : "danger(default), warning, success, primary , secondary, info, light, dark ,white, transparent
  textConnectedOnlineColor: "success",   // options[String]  : "danger, warning, success(default), primary , secondary, info, light, dark ,white, transparent
  textConnectedOfflineColor: "danger",   // options[String]  : "danger(default), warning, success, primary , secondary, info, light, dark ,white, transparent
}
const configMainWidget = {
  NumLoopWidget: 5,                 // options[int] : min 1 to max5
  orderWidget: [
    'OfferedCalls', 'WaitingCalls', 'AnsweredCalls', 'AbandonedCalls', 'PerAbandonedCalls'
  ],
  inboundAgent: {
    NumLoopWidget: 5,                 // options[int] : min 1 to max5
    orderWidget: [
      'OfferedCalls', 'WaitingCalls', 'AnsweredCalls', 'AbandonedCalls', 'PerAbandonedCalls'
    ]
  },
  inboundChannel: {
    NumLoopWidget: 5,                 // options[int] : min 1 to max5
    orderWidget: [
      'OfferedCalls', 'WaitingCalls', 'AnsweredCalls', 'AbandonedCalls', 'PerAbandonedCalls'
    ]
  },
  inboundQueue: {
    NumLoopWidget: 5,                 // options[int] : min 1 to max5
    orderWidget: [
      'AnsweredCalls', 'AbandonedCalls', 'PerAbandonedCalls','OfferedCalls', 'WaitingCalls'
    ]
  },
  widget: {
    bankWidget:{
      widgetBgColor: "light",         // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "light",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetBorderColor: "",          // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "",
      widgetIconColor: "",              // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    OfferedCalls:{
      widgetBgColor: "primary",         // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "white",         // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetBorderColor: "",            // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "arrow-bottom-left",  // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    WaitingCalls:{
      widgetBgColor: "warning",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetBorderColor: "",          // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "phone-ring",      // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    AnsweredCalls:{
      widgetBgColor: "success",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetBorderColor: "",          // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "phone-hangup",     // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    AbandonedCalls:{
      widgetBgColor: "danger",        // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetBorderColor: "",          // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "call-missed",      // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    PerAbandonedCalls:{
      widgetBgColor: "danger",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "white",      // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetBorderColor: "",         // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "call-missed",     // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "2"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    }
  }
}

const configSubWidget = {
  numLoopWidget: 7,                 // options[int] : min 1 to max 7
  orderWidget: [
    'AgentReadyInQueue', 'AgentInUsed', 'AgentOnHold', 'AgentPaused', 'MissedCalls', 'AvgTalkTime', 'HandleCalls'
  ],
  inboundAgent: {
    numLoopWidget: 7,                 // options[int] : min 1 to max 7
    orderWidget: [
      'AgentReadyInQueue', 'AgentInUsed', 'AgentOnHold', 'AgentPaused'
    ],
  },
  inboundChannel: {
    numLoopWidget: 7,                 // options[int] : min 1 to max 7
    orderWidget: [
      'AgentReadyInQueue', 'AgentInUsed', 'AgentOnHold', 'AgentPaused', 'MissedCalls', 'AvgTalkTime', 'HandleCalls'
    ],
  },
  inboundQueue: {
    numLoopWidget: 7,                 // options[int] : min 1 to max 7
    orderWidget: [
      'AgentReadyInQueue', 'AgentInUsed', 'AgentOnHold', 'AgentPaused', 'MissedCalls', 'AvgTalkTime', 'HandleCalls'
    ],
  },
  widget: {
    bankWidget:{
      widgetBgColor: "light",         // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "light",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetBorderColor: "",          // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "",
      widgetIconColor: "",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    OfferedCalls:{
      widgetBgColor: "primary",         // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "white",         // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetBorderColor: "",            // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "arrow-bottom-left",  // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    WaitingCalls:{
      widgetBgColor: "warning",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetBorderColor: "",          // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "phone-ring",      // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    AnsweredCalls:{
      widgetBgColor: "success",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetBorderColor: "",          // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "phone-hangup",     // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    AbandonedCalls:{
      widgetBgColor: "danger",        // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetBorderColor: "",          // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "call-missed",      // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    PerAbandonedCalls:{
      widgetBgColor: "danger",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "white",      // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetBorderColor: "",         // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "call-missed",     // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "2"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    AgentReadyInQueue:{
      widgetBgColor: "white",         // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "",         // options[String]  : "danger, warning, success, primary , secondary, info, light, dark (default),white, transparent
      widgetBorderColor: "success",            // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "phone-hangup",  // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "success",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    AgentInUsed:{
      widgetBgColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark (default),white, transparent
      widgetBorderColor: "info",          // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "phone",      // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "info",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    AgentOnHold:{
      widgetBgColor: "white",         // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "",            // options[String]  : "danger, warning, success, primary , secondary, info, light, dark (default),white, transparent
      widgetBorderColor: "info",   // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "phone-settings",    // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "info",            // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"    // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    AgentPaused:{
      widgetBgColor: "white",        // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark (default),white, transparent
      widgetBorderColor: "warning",          // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "phone-settings",      // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "warning",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    MissedCalls:{
      widgetBgColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "",      // options[String]  : "danger, warning, success, primary , secondary, info, light, dark (default) ,white, transparent
      widgetBorderColor: "danger",         // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "call-missed",     // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "danger",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "0"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    AvgTalkTime:{
      widgetBgColor: "white",        // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark (default),white, transparent
      widgetBorderColor: "success",          // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "phone-hangup",      // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "success",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "t"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    },
    HandleCalls:{
      widgetBgColor: "white",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white, transparent
      widgetTextColor: "",      // options[String]  : "danger, warning, success, primary , secondary, info, light, dark (default),white, transparent
      widgetBorderColor: "success",         // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetIcon : "phone-hangup",     // options[String]  : "arrow-bottom-left, phone-ring, phone-hangup, call-missed, phone-missed, phone-settings, phone" on materialdesignicons.com
      widgetIconColor: "success",       // options[String]  : "danger, warning, success, primary , secondary, info, light, dark ,white
      widgetDigiNumberFormat : "2"     // options[int]  : " 0 = x,xxx (default), 2 = x,xxx.xx"
    }
  }
}

const configInboundAgent = {
  barColor: "primary",        // options[String]  : "danger, warning, success(default), primary (default), secondary, info, light, dark ,white, transparent
  isShowMenuBar: true,        // options[Boolean] : true(default), false
  isShowMainWidget: true,     // options[Boolean] : true(default), false
  isShowSubWidget: true       // options[Boolean] : true(default), false  
}
const configInboundChannel = {
  barColor: "success",        // options[String]  : "danger, warning, success(default), primary, secondary, info, light, dark ,white, transparent
  isShowMenuBar: true,        // options[Boolean] : true(default), false
  isShowMainWidget: true,     // options[Boolean] : true(default), false
  isShowSubWidget: true       // options[Boolean] : true(default), false
}
const configInboundQueue = {
  barColor: "success",        // options[String]  : "danger, warning, success(default), primary, secondary, info, light, dark ,white, transparent
  isShowMenuBar: true,        // options[Boolean] : true(default), false
  isShowMainWidget: true,     // options[Boolean] : true(default), false
  isShowSubWidget: true       // options[Boolean] : true(default), false
}
export { themeConfig, configInboundAgent, configInboundChannel, configInboundQueue, configNavBar, configMainWidget, configSubWidget }
export default themeConfig
