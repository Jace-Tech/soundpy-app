import { IoHome, IoHomeOutline, IoMail, IoMailOutline, IoPersonCircle, IoWallet, IoSettings, IoHeadset, IoAddCircle} from "react-icons/io5"
import { RiPlayListFill } from "react-icons/ri"
import { MdRssFeed } from "react-icons/md"
import { IoIosCard } from "react-icons/io"

export const FOOTER_LINKS = [
  {
    link: "/home",
    ActiveIcon: IoHome,
    Icon:  IoHomeOutline,
    title: "Home"
  },
  {
    link: "/playlist",
    ActiveIcon: RiPlayListFill,
    Icon: RiPlayListFill,
    title: "Playlist"
  },
  {
    link: "/upload",
    ActiveIcon: IoAddCircle,
    Icon: IoAddCircle,
    title: "Upload",
    main: true
  },
  {
    link: "/my-feed",
    ActiveIcon: MdRssFeed,
    Icon: MdRssFeed,
    title: "My Feed"
  },
  {
    link: "/inbox",
    ActiveIcon: IoMail,
    Icon:  IoMailOutline,
    title: "Inbox"
  },
]

export const SIDEBAR_LINKS = [
  {
    link: "/profile/settings",
    icon:  IoPersonCircle,
    title: "Profile Settings"
  },
  {
    link: "/wallet",
    icon:  IoWallet,
    title: "Wallet"
  },
  {
    link: "/transaction/",
    icon:  IoIosCard,
    title: "Transactions"
  },
  {
    link: "/settings",
    icon:  IoSettings,
    title: "Settings"
  },
  {
    link: "/help",
    icon:  IoHeadset,
    title: "Help Center"
  }
]