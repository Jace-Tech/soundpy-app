/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import routes from './routes'
import useColorMode from './hooks/useColorMode'
import AppLoader from './components/global/AppLoader'
import { useAppSelector } from './store/hooks'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps { }

const App: React.FC<AppProps> = () => {
  const {colors} = useColorMode()
  const user = useAppSelector(state => state.userStore.user)
  
  const { pathname } = useLocation()
  if(pathname !== "/" && !user) return <Navigate to="/" replace />

  return (
    <Box overflowX={"hidden"} minH={"full"} bg={colors.BG_COLOR}>
      <Suspense fallback={<AppLoader hasBg />}>
        <Routes>
          {routes.map((route, index) => <Route {...route} key={`route-${index + 1}`} />)}
        </Routes>
      </Suspense>
    </Box>
  )
}

export default App