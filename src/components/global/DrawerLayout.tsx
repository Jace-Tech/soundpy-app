/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, ButtonProps, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Icon, Link, Stack, Switch, Text } from '@chakra-ui/react'
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs"
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SIDEBAR_LINKS } from '../../contents';
import { useLocation, useNavigate, Link as ReactLink } from 'react-router-dom';
import { setAppMode } from '../../store/slices/settingsSlice';
import useColorMode from '../../hooks/useColorMode';
import { IoLogOutOutline } from 'react-icons/io5';
import { logout } from '../../store/slices/userSlice';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DrawerLayoutProps { 
  isOpen: boolean;
  onClose: () => void;
}

const DrawerLayout: React.FC<DrawerLayoutProps> = ({ onClose, isOpen }) => {
  const { user } = useAppSelector(state => state.userStore)
  const { mode } = useAppSelector(state => state.settingStore)
  const { colors } = useColorMode()
  const dispatch = useAppDispatch()
  const {pathname} = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    onClose()
    return () => onClose()
  }, [pathname, onClose])

  const handleOnToggle = (e: any) => {
    const checked = e.target.checked
    if(checked) return dispatch(setAppMode("dark" as any))
    return dispatch(setAppMode("light" as any))
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }


  return (
    <Drawer
      isOpen={isOpen}
      placement='left'
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent bg={colors.BG_COLOR}>
        <DrawerCloseButton color={colors.TEXT_GRAY} />
        <DrawerHeader>
          <Stack>
            <Avatar borderColor={colors.DIVIDER} borderWidth={1} src={user?.profileImage} size={"lg"} name={user?.musicName || user?.username?.slice(1) || "Jace Alex"} />
            <Text fontSize={"sm"} color={colors.TEXT_GRAY}>{user?.username}</Text>
            <Link fontSize={"sm"} to={`/profile/${user?.username}`} color={colors.TEXT_WHITE} as={ReactLink}>View profile</Link>
          </Stack>
        </DrawerHeader>

        <Divider borderColor={colors.DIVIDER} />

        <DrawerBody px={0}>
          <Stack mt={3}>
            { SIDEBAR_LINKS.map(item =>  <SideBarItem {...item} key={item.title} />) }
            <SideBarItem 
              icon={IoLogOutOutline}
              title='Logout'
              handleClick={handleLogout}
              color={colors.SECONDARY_COLOR}
            />
          </Stack>
        </DrawerBody>

        <Divider borderColor={colors.DIVIDER} />

        <DrawerFooter justifyContent={"flex-start"}>
          <Stack spacing={4}>
            <Text color={colors.TEXT_WHITE} fontWeight={"black"} fontSize={"sm"}>Mode</Text>
            <HStack spacing={4}>
              <Icon fontSize={"xl"} as={BsFillSunFill} color={mode === "light" ? colors.PRIMARY_COLOR : colors.TEXT_GRAY} />
              <Switch colorScheme='teal' isChecked={mode === "dark"} onChange={handleOnToggle} />
              <Icon fontSize={"xl"} as={BsFillMoonStarsFill} color={mode === "dark" ? colors.PRIMARY_COLOR : colors.TEXT_GRAY}  />
            </HStack>
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
} 


interface SideBarItemProp extends ButtonProps {
  icon: any;
  title: string;
  link?: string;
  handleClick?: () => void;
}
const SideBarItem: React.FC<SideBarItemProp> = ({ icon, title, link, handleClick, ...prop }) => {
  const navigate = useNavigate()
  const { colors, hoverColor } = useColorMode()
  const { pathname } = useLocation()
  const isActive = pathname === link
  return (
    <HStack 
      color={colors.TEXT_WHITE} 
      onClick={link ? () => navigate(link) : handleClick} 
      spacing={4} as={Button} 
      _hover={{ bg: hoverColor}}
      rounded={0} 
      bg={isActive ? hoverColor : "transparent"}
      textAlign={"left"} py={6}
      {...prop as any}
    >
      <Icon as={icon} size={24} fontSize={"xl"} />
      <Text fontSize={"sm"} flex={1}>{title}</Text>
    </HStack>
  )
}

export default DrawerLayout