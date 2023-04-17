interface ICheckMail {
    valid: boolean
    validators: any
    reason?: string
}

interface IMailer {
    senderName: string
    to: string
    subject: string
    text: string
}

interface IGenOTP {
    totp: string
    totpDate: number
}

interface ILimiter {
    max: number
    timerArr: number[]
    msg?: string
}

export {
    IMailer, ICheckMail,
    IGenOTP, ILimiter
}