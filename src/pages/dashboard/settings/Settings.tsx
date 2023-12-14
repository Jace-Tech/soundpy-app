/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import DashLayout from '../../../components/global/DashLayout'
import AppBar from '../../../components/global/AppBar'
import SectionBox from '../../../components/global/SectionBox'
import AppContainer from '../../../components/global/AppContainer'
import useColorMode from '../../../hooks/useColorMode'
import { HStack, Heading, Stack, Switch, Text } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { changeCardStyle } from '../../../store/slices/settingsSlice'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SettingsProps {} 

const Settings:React.FC<SettingsProps> = () => {
  const { colors } = useColorMode()
  const { cardStyle } = useAppSelector(state => state.settingStore)

  const dispatch = useAppDispatch()
  return (
    <DashLayout
      hideFooter
      header={<AppBar page='Settings' bordered />}
    >
      <AppContainer>
        <SectionBox sectionTitle='App settings' HeaderProp={{ mb: 2, fontWeight: "normal", letterSpacing: "widest", textTransform: "uppercase", color: colors.TEXT_DARK, size: "xs" }}>
          <Stack>
            <HStack p={2} borderBottom={`1px solid ${colors.DIVIDER}`}>
              <Stack flex={1} spacing={1}>
                <Heading color={colors.TEXT_WHITE} size={"sm"}>Card with background</Heading>
                <Text color={colors.TEXT_GRAY} fontSize={"xs"}>Add background to feed cards</Text>
              </Stack>

              <Switch 
                isChecked={cardStyle === "bg"}
                onChange={() => dispatch(changeCardStyle((cardStyle === "bg" ? "bordered" : "bg")! as any))}
              />
            </HStack>
          </Stack>
        </SectionBox>
      </AppContainer>
    </DashLayout>
  )
}

export default Settings