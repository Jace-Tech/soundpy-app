/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import DashLayout from '../../../components/global/DashLayout'
import AppBar from '../../../components/global/AppBar'
import AppContainer from '../../../components/global/AppContainer'
import { Navigate, useParams } from 'react-router-dom'
import { Center, CircularProgress, Stack, useDisclosure } from '@chakra-ui/react'
import { useAppSelector } from '../../../store/hooks'
import { getTransactionsDetails } from '../../../apis/transactions'
import useColorMode from '../../../hooks/useColorMode'
import DetailItem from './components/DetailItem'
import ContentCard from './components/ContentCard'
import { HEADER_HEIGHT } from '../chat/footer_variants'

interface TransactionDetailProps { }
const TransactionDetail: React.FC<TransactionDetailProps> = () => {
    const [transaction, setTransaction] = useState<TransactionDataType>()
    const { colors } = useColorMode()
    const token = useAppSelector(state => state.userStore.token)
    const param = useParams()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [hashData, setHashData] = useState<HashType>()

    const handleFetchDetails = async () => {
        if (!token) return
        try {
            onOpen()
            const result = await getTransactionsDetails(param.id, token.token);
            if (!result.success) throw new Error(result.message)
            setTransaction(result.data)
        }
        catch (error: any) {
            console.log("ERR:", error.message)
        }
        finally {
            onClose()
        }
    }

    const getHash = async () => {
        console.log("HII: UP")
        if (!transaction || !transaction?.meta.transaction) return
        try {
            const req = await fetch(transaction.meta.transaction._link)
            const res = await req.json()
            console.log("HII:", res)
            setHashData(res)
        }
        catch (error: any) {
            console.log("ERROR:", error.message)
        }
    }

    useEffect(() => {
        handleFetchDetails()
    }, [param])

    useEffect(() => {
        getHash()
    }, [transaction])

    if (!param.id) return <Navigate to={"/transaction"} replace />


    return (
        <DashLayout
            hideFooter
            capHeight={HEADER_HEIGHT + 30}
            header={<AppBar bordered page='Transaction Detail' />}>
            <AppContainer >
                {isOpen ? (
                    <Center mt={4} fontSize={"sm"} color={colors.TEXT_GRAY}>
                        <CircularProgress isIndeterminate size={6} color={"gray.500"} />
                        Loading
                    </Center>
                ) : (
                    <Stack my={6}>
                        { transaction?.type === "content" &&  <ContentCard {...transaction?.meta.metadata.content as ContentFeedType} /> }
                        <Stack>
                            <DetailItem
                                title='Description:'
                                value={transaction?.desc}
                            />
                            <DetailItem
                                title='Status:'
                                value={transaction?.status}
                                isStatus
                            />
                            <DetailItem
                                title='Order number:'
                                value={transaction?.piPaymentId}
                                canCopy
                            />
                            <DetailItem
                                title='Real pi amount:'
                                value={transaction?.amount.toLocaleString() + "π"}
                            />
                            {hashData && <DetailItem
                                title='Blockchain hash:'
                                value={hashData?.hash}
                                canCopy
                            />}
                             <DetailItem
                                title='Transaction time:'
                                value={(new Date(transaction?.meta.created_at)).toDateString()}
                            />
                        </Stack>
                    </Stack>
                )}
            </AppContainer>
        </DashLayout>
    )
}

export default TransactionDetail