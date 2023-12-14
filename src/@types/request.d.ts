type ApprovePaymentPayload = {
    payment_id: string;
    description?: string;
    type: string;
    amount: number;
}

type CompletePaymentPayload = {
    paymentId: string;
    txid: string;
}