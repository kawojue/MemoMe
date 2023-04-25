const crypt = require('text-encryption')

const decrypt = (content: string) => {
    const text: string = crypt.decrypt(content as string, process.env.NEXT_PUBLIC_STRING_KEY)
    return text
}

export default decrypt