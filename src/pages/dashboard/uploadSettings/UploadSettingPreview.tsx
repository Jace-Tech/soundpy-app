import React from 'react'
import DashLayout from '../../../components/global/DashLayout'
import AppBar from '../../../components/global/AppBar'
import { Text } from "@chakra-ui/react"
import AppContainer from '../../../components/global/AppContainer'

interface UploadSettingPreviewProps { }

const UploadSettingPreview: React.FC<UploadSettingPreviewProps> = () => {
    return (
        <DashLayout
            header={<AppBar page='Upload Preview' bordered />}
        >
            <AppContainer py={8}>
                <Text>Test</Text>
            </AppContainer>
        </DashLayout>
    )
}

export default UploadSettingPreview