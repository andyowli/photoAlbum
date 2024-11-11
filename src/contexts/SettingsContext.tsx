import React, { createContext, useContext, useEffect, useState } from 'react';
// import useProfileStore from '../store/profileStore';

export type Language = 'en' | 'zh';
export type Theme = 'light' | 'dark';

interface SettingsContextType {
  language: Language;
  theme: Theme;
  // isProfileVisible: boolean;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  // setProfileVisibility: (visible: boolean) => void;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const translations = {
  en: {
    // Navigation
    home: "Home",
    gallery: "Gallery",
    Upload: "Upload",
    personalPage: "Personal Page",
    profile: "Profile",
    settings: "Settings",
    login: "Login",
    register: "Register",
    logout: "Log out",
    
    // Settings
    general: "General",
    notifications: "Notifications",
    privacy: "Privacy",
    generalSettings: "General Settings",
    theme: "Theme",
    themeDescription: "Switch between light and dark mode",
    language: "Language",
    languageDescription: "Select your preferred language",
    notificationSettings: "Notification Settings",
    emailNotifications: "Email Notifications",
    emailDescription: "Receive email updates about your activity",
    pushNotifications: "Push Notifications",
    pushDescription: "Receive push notifications about your activity",
    privacySettings: "Privacy Settings",
    profileVisibility: "Profile Visibility",
    visibilityDescription: "Make your profile visible to other users",
    onlineStatus: "Show Online Status",
    onlineDescription: "Let others see when you're online",

    // Profile
    updateProfilePicture: "Update Profile Picture",
    choosePicture: "Choose a new profile picture to upload. Images must be less than 5MB.",
    cancel: "Cancel",
    upload: "Upload",
    success: "Success",
    profileUpdated: "Profile picture updated successfully",
    fileTooLarge: "File too large",
    fileSizeLimit: "Please select an image under 5MB",
    invalidFileType: "Invalid file type",
    selectImageFile: "Please select an image file",

    //Gallery
    photoGallrty: "Photo Gallery",
    search:'Search by title or description...',

    //Personal Page
    profilePicture: "Profile Picture",
    profileHidden:'This page is currently private',
    makeProfilePublic:'The current user is hidden and cannot be viewed',

    // Login
    accountNumber:'Username or Email',
    password:'Password',
    forgotPassword:'Forgot Password?',

    //Register
    username: "Username",
    email: "Email",
  },
  zh: {
    // Navigation
    home: "首页",
    gallery: "图库",
    Upload: "上传",
    personalPage: "个人主页",
    profile: "个人资料",
    settings: "设置",
    login: "登录",
    register: "注册",
    logout: "退出登录",
    
    // Settings
    general: "通用",
    notifications: "通知",
    privacy: "隐私",
    generalSettings: "通用设置",
    theme: "主题",
    themeDescription: "切换明暗主题",
    language: "语言",
    languageDescription: "选择您偏好的语言",
    notificationSettings: "通知设置",
    emailNotifications: "邮件通知",
    emailDescription: "接收关于您活动的邮件更新",
    pushNotifications: "推送通知",
    pushDescription: "接收关于您活动的推送通知",
    privacySettings: "隐私设置",
    profileVisibility: "个人资料可见性",
    visibilityDescription: "让其他用户看到您的个人资料",
    onlineStatus: "显示在线状态",
    onlineDescription: "让其他人看到您何时在线",

    // Profile
    updateProfilePicture: "更新头像",
    choosePicture: "选择新的头像上传。图片大小必须小于5MB。",
    saveChanges:"保存更改",
    fullName:'全名',
    email: "电子邮箱",
    preview: "预览",
    cancel: "取消",
    upload: "上传",
    success: "成功",
    profileUpdated: "头像更新成功",
    fileTooLarge: "文件过大",
    fileSizeLimit: "请选择小于5MB的图片",
    invalidFileType: "无效的文件类型",
    selectImageFile: "请选择图片文件",

    //Gallery
    photoGallrty: "图片库",
    search:'按标题或描述搜索...',

    //Personal Page
    profilePicture: "个人头像",
    profileHidden:'此页面当前是私人的',
    makeProfilePublic:'当前用户已隐藏，无法查看',

    // Login
    accountNumber:'用户名或密码',
    password:'密码',
    forgotPassword:'忘记密码?',

    //Register
    username: "Username",
    confirmPassword: "确认密码",


  }
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  // const [isProfileVisible, setIsProfileVisible] = useState(() => {
  //   const saved = localStorage.getItem('profileVisibility');
  //   return saved ? JSON.parse(saved) : true;
  // });


  

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // useEffect(() => {
  //   localStorage.setItem('profileVisibility', JSON.stringify(isProfileVisible));
  // }, [isProfileVisible]);

//   useEffect(() => {
//     localStorage.setItem('theme', theme);
//     const root = document.documentElement;
//     if (theme === 'dark') {
//       root.classList.add('dark');
//     } else {
//       root.classList.remove('dark');
//     }
//   }, [theme]);


    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <SettingsContext.Provider 
      value={{ 
        language, 
        theme, 
        // isProfileVisible,
        setLanguage, 
        setTheme, 
        // setProfileVisibility: setIsProfileVisible, 
        t 
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};