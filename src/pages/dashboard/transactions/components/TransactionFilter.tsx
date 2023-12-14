import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerOverlay, FormControl, FormLabel, HStack, Select, Stack, Text, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"
import useColorMode from "../../../../hooks/useColorMode";
import CustomButton from "../../../../components/global/CustomButton";

interface TransactionFilterProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    handleReset: () => Promise<void>;
    isLoading: boolean;
    handleApply: (search: string) => Promise<void> 
}
const TransactionFilter: React.FC<TransactionFilterProps> = ({ isOpen, onClose, onOpen, isLoading, handleApply, handleReset }) => {
    const { colors } = useColorMode()
    const [filter, setFilter] = useState({
        status: null,
        type: null,
        isCredit: null
    })
    const { isOpen: isCancelling, onClose: closeCancel, onOpen: openCancel } = useDisclosure()

    const handleClearAll = async () => {
        openCancel()
        await handleReset()
        closeCancel()
    }

    const handleAction = async () => {
        const items = Object.entries(filter).filter(([_, value]) => value).reduce((item, [key, value]) => {
            return {...item, [key]: value }
        }, {})

        const search = new URLSearchParams(items)
        await handleApply(search.toString())
    }
    const statuses = [
        {
            value: "pending",
            label: "Pending",
        },
        {
            value: "subscription",
            label: "Success",
        },
        {
            value: "cancelled",
            label: "Cancelled",
        },
        {
            value: "error",
            label: "Error",
        },
    ]

    const kinds = [
        {
            value: "content",
            label: "Content",
        },
        {
            value: "subscription",
            label: "Subscription",
        },
        {
            value: "message",
            label: "Message",
        },
        {
            value: "stake",
            label: "Stake",
        },
    ]

    const types = [
        {
            value: "credit",
            label: "Credit",
        },
        {
            value: "debit",
            label: "Debit",
        },
    ]

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <HStack py={2} borderBottom={`1px solid ${colors.DIVIDER}`} px={4}>
                    <Text flex={1} fontWeight={"bold"} letterSpacing={"wider"} textTransform={"uppercase"} color={colors.TEXT_WHITE} fontSize={".9rem"} textAlign={"center"}>Filter Transaction</Text>
                    <DrawerCloseButton pos={"static"} />
                </HStack>

                <DrawerBody as={Stack} spacing={3} px={3}>
                    <FormControl>
                        <FormLabel fontSize={"sm"}>Transaction Status</FormLabel>
                        <Select onChange={({ target }) => setFilter(prev => ({ ...prev, status: target.value }))} color={colors.TEXT_WHITE} _placeholder={{ color: colors.TEXT_GRAY }} fontSize={"sm"}>
                            <option value="">All</option>
                            { statuses.map(item => <option selected={filter.status === item.value} value={item.value}>{item.label}</option>) }
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={"sm"}>Transaction Kind</FormLabel>
                        <Select onChange={({ target }) => setFilter(prev => ({ ...prev, type: target.value }))} color={colors.TEXT_WHITE} _placeholder={{ color: colors.TEXT_GRAY }} fontSize={"sm"}>
                            <option value="">All</option>
                            { kinds.map(item => <option selected={filter.type === item.value} value={item.value}>{item.label}</option>) }
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={"sm"}>Transaction Type</FormLabel>
                        <Select onChange={({ target }) => setFilter(prev => ({ ...prev, isCredit: target.value }))} color={colors.TEXT_WHITE} _placeholder={{ color: colors.TEXT_GRAY }} fontSize={"sm"}>
                            <option value="">All</option>
                            { types.map(item => <option selected={filter.isCredit === item.value} value={item.value}>{item.label}</option>) }
                        </Select>
                    </FormControl>
                </DrawerBody>

                <DrawerFooter pt={3} justifyContent={"flex-start"} px={3} borderTop={`1px solid ${colors.DIVIDER}`}>
                    <Button fontSize={"sm"} isLoading={isCancelling} loadingText={"Clear"} variant='outline' mr={3} onClick={handleClearAll}>
                        Clear
                    </Button>
                    <CustomButton fontSize={"sm"} px={6} isLoading={!isCancelling && isLoading} onClick={handleAction}>Apply</CustomButton>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default TransactionFilter
