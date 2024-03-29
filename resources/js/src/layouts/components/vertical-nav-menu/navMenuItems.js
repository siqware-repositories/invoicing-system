/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: "/",
    name: "ទំព័រដើម",
    slug: "home",
    icon: "HomeIcon",
  },
  {
    url: "/user",
    name: "អ្នកប្រើប្រាស់",
    slug: "user",
    icon: "UserIcon",
  },
    {
    url: "/supplier",
    name: "អ្នកផ្គត់ផ្គង់",
    slug: "supplier",
    icon: "UserIcon",
  },
{
    url: "/customer",
    name: "អតិថិជន",
    slug: "customer",
    icon: "UserIcon",
  },

  {
    url: "/settings",
    name: "ការកំណត់",
    slug: "setting",
    icon: "UserIcon",
  },
  {
    url: "/page2",
    name: "Page 2",
    slug: "page2",
    icon: "FileIcon",
  },
]
