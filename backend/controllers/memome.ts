import { v4 as uuid } from 'uuid'
import User from '../models/UserModel'
import MemoMe from '../models/MemoMeModel'
import { Request, Response } from 'express'
const textCrypt = require('text-encryption')
const asyncHandler = require('express-async-handler')

const addMemo = asyncHandler(async (req: Request, res: Response) => {
    let { user }: any = req.params
    let { content }: any = req.body
    user = user?.toLowerCase()?.trim()
    content = content?.toLowerCase()?.trim()

    if (!user) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "Invalid params"
        })
    }

    if (!content) {
        return res.status(400).json({
            success: false,
            action: "warning",
            msg: "Content cannot be blank"
        })
    }

    const account: any = await User.findOne({ user }).exec()

    if (!account) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "User does not exist."
        })
    }

    const encryptContent: string = textCrypt.encrypt(content, process.env.STRING_KEY as string)

    if (account.body) {
        const memome: any = await MemoMe.findOne({ user: account.id }).exec()
        memome.body = [...memome.body, {
            idx: uuid(),
            content: encryptContent
        }]
        await memome.save()
        return res.sendStatus(200)
    }

    await MemoMe.create({
        user: account.id,
        body: [{
            idx: uuid(),
            content: encryptContent
        }]
    })
    account.hasContent = true
    await account.save()

    res.sendStatus(200)
})

// get memos

export { addMemo }