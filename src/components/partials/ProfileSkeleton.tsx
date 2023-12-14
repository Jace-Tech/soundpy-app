import { HStack, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'
import React from 'react'
import AppContainer from '../global/AppContainer'
import DashLayout from '../global/DashLayout'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileSkeletonProps { }

const ProfileSkeleton: React.FC<ProfileSkeletonProps> = () => {
    return (
        <DashLayout capHeight={55}>
            <AppContainer>
                <Skeleton h={200} />
                <Stack mt={"-8"}>
                    <SkeletonCircle h={20} w={20} mb={4} />
                    <SkeletonText noOfLines={1} mb={2} maxW={150} />
                    <SkeletonText noOfLines={1} maxW={120} />
                </Stack>

                <Stack mt={5} spacing={1}>
                    <SkeletonText noOfLines={3} mb={4} />
                    <HStack spacing={2}>
                        <SkeletonText noOfLines={1} w={50} />
                        <SkeletonText noOfLines={1} w={50} />
                    </HStack>
                </Stack>

                <Stack mt={10}>
                    <Skeleton h={200} rounded={"md"} />
                </Stack>
            </AppContainer>
        </DashLayout>
    )
}


export default ProfileSkeleton