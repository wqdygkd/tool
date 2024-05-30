// const AliOss = require('ali-oss')
import AliOss from 'ali-oss'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

/**
 *
 * @param type
 * @param fileLastName
 * @returns {string} // 'image',  'video', 'audio', 'others'
 */

export const getFileType = (type, fileLastName) => {
    if (/\.heic$/ig.test(fileLastName)) return 'image'
    if (/image/ig.test(type)) return 'image'
    if (/audio/ig.test(type)) return 'audio'
    if (/video/ig.test(type)) return 'video'
    return 'others'
}

export const uploadOSS = async(options, module = 'default', subModule = 'default') => {
    if (!options || !options.file) return
    const { file } = options
    const { type, name, size } = file

    const nameArr = name.split('.')
    const fileLastName = nameArr[nameArr.length - 1]
    const fileType = getFileType(type, fileLastName)

    const ossToken = {

    }

    const { region, accessKeyId, accessKeySecret, bucketName, endpoint, fileUrl } = ossToken
    const client = new AliOss({
        region,
        accessKeyId,
        accessKeySecret,
        bucket: bucketName,
    })

    const date = dayjs().format('YYYY-MM-DD')
    const fileUuid = module + '/' + subModule + '/' + date + '/' + uuid() + '.' + fileLastName

    // heic格式的图片在windows上file.type 为空，此处给出默认值
    const contentType = type || (/\.heic$/ig.test(fileLastName) ? 'image/heic' : 'other')

    try {
        const result = await client.put(fileUuid, options.file)
        if (result.res.status === 200) {
            return new Promise((resolve) => {
                resolve({
                    ok: true,
                    data: {
                        contentType,
                        fileName: name,
                        fileUrl: [fileUrl, result.name].join('/'),
                        size,
                    },
                })
            })
        }
    } catch (e) {
        console.log(e)
    }
}
