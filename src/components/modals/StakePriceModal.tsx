/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, CloseButton, Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Heading, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, {  } from 'react'
import useColorMode from '../../hooks/useColorMode';
import CustomButton from '../global/CustomButton';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StakePriceModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: AppSettingsData; 
    handleAction: () => Promise<void>;
    isLoading: boolean;
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const StakePriceModal: React.FC<StakePriceModalProps> = ({ isOpen, onClose, settings, isLoading, handleAction }) => {
    const { colors } = useColorMode()
    const { isOpen: isStaking, onClose: closeStaking, onOpen: openStaking } = useDisclosure()


    const handleClick = async () => {
        openStaking()
        await handleAction()
        closeStaking()
    }

    return (
        <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent bg={colors.BG_COLOR} minH={400} roundedTop={"lg"}>

                <DrawerHeader as={HStack}>
                    <Heading flex={1} textAlign={"center"} fontSize={"2xl"} textDecor={"underline"} textUnderlineOffset={4} textDecorationThickness={"2px"} color={colors.TEXT_WHITE}>Return or Forfeit</Heading>
                    <CloseButton color={colors.TEXT_WHITE} onClick={onClose} pos={"relative"}  />
                </DrawerHeader>
                <DrawerBody>
                    <VStack>
                        <Heading size={"md"} color={colors.TEXT_WHITE}>Do you own this content?</Heading>
                        <Text textAlign={"center"} color={colors.TEXT_DARK}>Stake {isLoading ? <CircularProgress isIndeterminate color='gray.400' size={6} /> : settings?.stakePrice} Pi to avoid infringement!
                            your staked pi will be returned to you
                            upon content ownership confirmation via
                            copyright certication or live studio record.
                            You have 6 months maximum to confirm
                            content ownership or forfeit your staked Pi.
                        </Text>
                    </VStack>

                    <HStack mt={4} alignItems={"flex-start"}>
                        <Heading size={"sm"} color={colors.TEXT_WHITE}>NOTE:</Heading>
                        <Text fontSize={"sm"} color={colors.TEXT_DARK} fontWeight={"semibold"} flex={1}>Staked amount changes upon infringement, earnings lost and deletion of content</Text>
                    </HStack>

                    <Divider w={"full"} maxW={"300px"} mx={"auto"}  my={4} borderColor={colors.TEXT_GRAY} />

                    <Stack w={"full"} maxW={"300px"} mx={"auto"}>
                        <HStack>
                            <Heading color={colors.TEXT_WHITE} fontSize={"lg"} flex={1}>Amount:</Heading>
                            <Text color={colors.TEXT_WHITE} fontWeight={"semibold"}>{settings?.stakePrice} Pi</Text>
                        </HStack>

                        <HStack>
                            <Heading color={colors.TEXT_WHITE} fontSize={"lg"} flex={1}>Transaction Fee:</Heading>
                            <Text color={colors.TEXT_WHITE} fontWeight={"semibold"}>0.01 Pi</Text>
                        </HStack>
                    </Stack>

                    <CustomButton isLoading={isStaking} onClick={handleClick} mt={12} fontSize={"md"} w={"full"}>Accept and Stake</CustomButton>

                    {/* <Box mb={6} mt={4}>
                        <FormControl as={HStack} alignItems={"center"}>
                            <Checkbox isChecked={isChecked} onChange={() => setIsChecked(prev  => !prev)} />
                            <FormLabel m={0} fontSize={"sm"} color={colors.TEXT_DARK}>Don't show this again</FormLabel>
                        </FormControl>
                    </Box> */}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default StakePriceModal