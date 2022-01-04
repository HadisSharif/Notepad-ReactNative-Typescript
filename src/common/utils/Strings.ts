export const Strings = {
    'appName': 'Colorify Note',
    'note': 'Note',
    'profile': 'Profile',
    'setting': 'Setting',
    'ok': 'OK',
    'yes': 'Yes',
    'no': 'No',
    'warning': 'Warning',
    'sureExit': 'Are you sure you want to logout?',
    'logincancelled': 'User cancelled login',
    'playServicesError': 'Please install or update Play Services'
}

export const ScreenNames = {
    MainBottomTabs: 'MainBottomTabs',
    SingleNotePage: 'SingleNotePage',
    ProfilePage: 'ProfilePage',
    NoteListPage: 'NoteListPage',
    SignOutPage: 'SignOutPage',
    Setting: 'Setting'
}

export const randomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}
