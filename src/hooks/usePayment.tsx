import { useDisclosure } from "@chakra-ui/react";
import { approvePayment, cancelPayment, paymentError } from "../apis/payment";
import { useAppSelector } from "../store/hooks";
import useAlert from "./useAlert";

interface IusePayment {
    isPaying: boolean;
    handlePiPayment:  (amount: number, memo: string, type: PaymentDataType, metadata: any, cb: (paymentId: string, txid: string, openPaying?: () => void, closePaying?: () => void) => Promise<void>) => void;
    closePaying: () => void;
    openPaying: () => void;
}

const usePayment = (): IusePayment => {
    const { isOpen: isPaying,  onClose: closePaying, onOpen: openPaying } = useDisclosure()
    const token = useAppSelector(state => state.userStore.token)
    const { showAlert } = useAlert()


    const handlePiPayment = (amount: number, memo: string, type: PaymentDataType,  metadata: any, cb: (paymentId: string, txid: string, openPaying?: () => void, closePaying?: () => void) => void) => {
        try {
            window?.Pi.createPayment({ amount, memo, metadata },
                {
                    onReadyForServerApproval: async function (paymentId) {
                        if (!token) return
                        try {
                            const data: ApprovePaymentPayload = {
                                payment_id: paymentId as string,
                                amount,
                                type,
                                description: memo
                            }
                            const result = await approvePayment(data, token.token)
                            if (!result.success) throw new Error(result.message)
                            // showAlert(result.message, "success")
                        }
                        catch (err: any) {
                            console.log("ERROR [PAYMENT APPROVE]:", err.message)
                            showAlert(err.message, "error")
                        }
                        finally {
                            closePaying()
                        }

                    },
                    onReadyForServerCompletion: function (paymentId, txid) {
                        cb(paymentId as string, txid as string, openPaying, closePaying)
                    },
                    onCancel: async function (paymentId) {
                        try {
                            openPaying()
                            const result = await cancelPayment(paymentId as string, token.token)
                            if (!result.success) throw new Error(result.message)
                            showAlert(result.message, "info")
                        }
                        catch (err: any) {
                            console.log("ERROR [PAYMENT CANCEL]:", err.message)
                            showAlert(err.message, "error")
                        }
                        finally {
                            closePaying()
                        }
                    },
                    onError: async function (error, payment) {
                        try {
                            openPaying()
                            const result = await paymentError(payment, token.token)
                            if (!result.success) throw new Error(result.message)
                            showAlert(result.message, "info")
                        }
                        catch (err: any) {
                            console.log("ERROR [PAYMENT ERROR]:", err.message)
                            showAlert(err.message, "error")
                        }
                        finally {
                            closePaying()
                        }
                    },
                });
        }
        catch (err: any) {
            const message = err.message
            if(message.includes("payments")) return showAlert("Pi Payment Error:", "info", "Please logout and log back in to continue")
            showAlert(err.message, "info")

        }
      
    }
    return { handlePiPayment, closePaying, isPaying, openPaying }
}

export default usePayment