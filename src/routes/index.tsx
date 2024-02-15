
import React from 'react'
import { ReactNode, lazy } from "react";

import { Welcome } from "../pages";
import { Navigate } from "react-router-dom";

import UploadContextProvider from "../context/UploadContext";
import Settings from "../pages/dashboard/settings/Settings";
import Test from "../pages/Test";
import Likes from "../pages/dashboard/likes/Likes";

const Dashboard = lazy(() => import("../pages/dashboard/"))
const Upload = lazy(() => import("../pages/dashboard/upload/Upload"))
const ProfileSettings = lazy(() => import("../pages/dashboard/profileSettings/ProfileSettings"))
const Inbox = lazy(() => import("../pages/dashboard/inbox/Inbox"))
const Profile = lazy(() => import("../pages/dashboard/profile/Profile"))
const UploadSetting = lazy(() => import("../pages/dashboard/uploadSettings/UploadSetting"))
const Wallet = lazy(() => import("../pages/dashboard/wallet/Wallet"))
const Transaction = lazy(() => import("../pages/dashboard/transactions/Transaction"))
const TransactionDetail = lazy(() => import("../pages/dashboard/transactionDetails/TransactionDetail"))
const MyFeed = lazy(() => import("../pages/dashboard/MyFeed"))
const Chat = lazy(() => import("../pages/dashboard/chat/Chat"))
const SignupSuccess = lazy(() => import("../pages/SignupSuccess"))
const Playlist = lazy(() => import("../pages/dashboard/playlist/Playlist"))
const PlayMedia = lazy(() => import("../pages/dashboard/playMedia/PlayMedia"))
const UploadSettingPreview = lazy(() => import("../pages/dashboard/uploadSettings/UploadSettingPreview"))



type RouteType = {
  path: string;
  element: ReactNode
}

export default [
  { element: <Dashboard />, path: "/home" },
  { element: <Welcome />, path: "/" },
  {
    element: (
      <UploadContextProvider>
        <Upload />
      </UploadContextProvider>),
    path: "/upload"
  },
  {
    element: (
      <UploadContextProvider>
        <UploadSettingPreview />
      </UploadContextProvider>),
    path: "/upload/preview"
  },
  {
    element: (
      <UploadContextProvider>
        <UploadSetting />
      </UploadContextProvider>),
    path: "/upload/:name"
  },
  { element: <Profile />, path: "/profile/:username" },
  { element: <ProfileSettings />, path: "/profile/settings" },
  { element: <Inbox />, path: "/inbox" },
  {
    element: (
      <UploadContextProvider>
        <Chat />
      </UploadContextProvider>)
    , path: "/chat/:username"
  },
  { element: <MyFeed />, path: "/my-feed" },
  { element: <Likes />, path: "/content/:id/likes" },
  { element: <Test />, path: "/test" },
  { element: <Wallet />, path: "/wallet" },
  { element: <Playlist />, path: "/playlist" },
  { element: <PlayMedia />, path: "/playmedia" },
  { element: <Settings />, path: "/settings" },
  { element: <SignupSuccess />, path: "/welcome" },
  { element: <Transaction />, path: "/transaction/" },
  { element: <TransactionDetail />, path: "/transaction/:id" },
  { element: <Navigate replace to={"/"} />, path: "*" },
] satisfies RouteType[]