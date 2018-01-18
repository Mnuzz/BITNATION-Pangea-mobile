import AssetsImages from './AssetsImages';
import Colors from './Colors';
import { Platform } from 'react-native';

export const tabsStyle = {
  tabBarButtonColor: Colors.white,
  tabBarLabelColor: Colors.BitNationLightBlue,
  tabBarSelectedLabelColor: Colors.white,
  tabBarSelectedButtonColor: Colors.white,
  tabBarBackgroundColor: 'rgba(17,39,110,0.9)',
};

export const appStyle = {
  ...tabsStyle
};

export const androidNavigationButtons = Platform.OS === 'android' ? {
  leftButtons: [{
    id: 'back',
    buttonColor: Colors.white,
  }],
} : {};

export const navigatorStyle = {
  statusBarTextColorScheme: 'light',
  statusBarColor: Platform.OS === 'ios' ? 'transparent' : 'black',
  navBarTransparent: true,
  navBarTranslucent: true,
  navBarNoBorder: true,
  drawUnderNavBar: true,
  drawUnderStatusBar: false,
  navBarTextColor: Colors.white,
  screenBackgroundColor: 'transparent',
  rootBackgroundImageName: 'background',
};

export const hiddenNavigatorStyle = {
  statusBarTextColorScheme: 'light',
  statusBarColor: Platform.OS === 'ios' ? 'transparent' : 'black',
  navBarHidden: true,
  drawUnderStatusBar: false,
  screenBackgroundColor: 'transparent',
  rootBackgroundImageName: 'background',
};

const baseKeyScreen = {
  navigatorStyle: {
    ...navigatorStyle,
    disabledBackGesture: true,
  },
  overrideBackPress: true,
}

const Screens = {
  SPLASH_SCREEN: {
    screen: 'Pangea.SplashScreen',
    title: 'Splash',
  },
  DASHBOARD_SCREEN: {
    screen: 'Pangea.DashboardScreen',
    label: 'Dashboard',
    icon: AssetsImages.TabIcons.dashboard,
    navigatorStyle: hiddenNavigatorStyle,
  },
  CHAT_SCREEN: {
    screen: 'Pangea.ChatScreen',
    label: 'Chat',
    icon: AssetsImages.TabIcons.chat,
    title: 'Chat',
    navigatorStyle: hiddenNavigatorStyle,
  },
  NATIONS_SCREEN: {
    screen: 'Pangea.NationsScreen',
    label: 'Nations',
    icon: AssetsImages.TabIcons.nations,
    title: '  Nations  ', // Spaces here are to fix title truncating
    navigatorStyle,
  },
  NATION_DETAILS_SCREEN: {
    screen: 'Pangea.NationDetailsScreen',
    title: 'Nation',
    navigatorStyle,
  },
  WALLET_SCREEN: {
    screen: 'Pangea.WalletScreen',
    label: 'Wallet',
    icon: AssetsImages.TabIcons.wallet,
    title: 'Wallet',
    navigatorStyle,
  },
  PROFILE_SCREEN: {
    screen: 'Pangea.ProfileScreen',
    label: 'Profile',
    icon: AssetsImages.TabIcons.profile,
    title: 'Profile & Settings',
    navigatorStyle,
  },
  CREATE_KEY_SCREEN_STEP_1: {
    screen: 'Pangea.CreateKeyStep1',
    title: ' Create Private Key ',
    ...baseKeyScreen,
  },
  CREATE_KEY_SCREEN_STEP_2: {
    screen: 'Pangea.CreateKeyStep2',
    title: 'Create Private Key',
    ...baseKeyScreen,
  },
  CREATE_KEY_SCREEN_STEP_3: {
    screen: 'Pangea.CreateKeyStep3',
    title: 'Create Private Key',
    ...baseKeyScreen,
  },
  VERIFY_KEY_INSTRUCTION_SCREEN: {
    screen: 'Pangea.VerifyKeyInstructionScreen',
    title: 'Verify Private Key',
    ...baseKeyScreen,
  },
  VERIFY_KEY_SCREEN_STEP_2: {
    screen: 'Pangea.VerifyKeyStep2',
    title: 'Verify Private Key',
    ...baseKeyScreen,
  },
  LOAD_WALLET_SCREEN: {
    screen: 'Pangea.LoadWalletScreen',
    title: ' Load wallet ',
    ...baseKeyScreen,
  },
  INTRO_SCREEN: {
    screen: 'Pangea.Intro',
    navigatorStyle: hiddenNavigatorStyle,
  },
  RECEIVE_MONEY_SCREEN: {
    screen: 'Pangea.ReceiveMoneyScreen',
    title: 'Receive Money',
    navigatorStyle,
  },
  CREATE_KEY_SUCCESS_SCREEN: {
    screen: 'Pangea.CreateKeySuccessScreen',
    title: 'Create Private Key',
    ...baseKeyScreen,
  },
  VERIFY_KEY_SUCCESS_SCREEN: {
    screen: 'Pangea.VerifyKeySuccess',
    title: 'Verify Private Key',
    backButtonTitle: 'Cancel',
    navigatorStyle,
  },
  SEND_MONEY_SCREEN: {
    screen: 'Pangea.SendMoneyScreen',
    title: 'Send money',
    navigatorStyle,
  },

};

export function screen(name) {
  return { ...Screens[name] };
}