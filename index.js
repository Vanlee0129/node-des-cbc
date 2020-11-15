const crypto = require('crypto')

// DES 加密
/**
 * @description DES加密，以hex为例
 * @param {String} encodeTxt 待加密的字符串
 * @param {String} key 秘钥
 * @param {String} iv 偏移量
 */
function desEncode(encodeTxt, key, iv) {
    key = key.length >= 8 ? key.slice(0, 8) : key.concat('0'.repeat(8 - key.length))
    iv = iv.length >= 8 ? iv.slice(0, 8) : iv.concat('0'.repeat(8 - iv.length))
    const keyHex = Buffer.from(key)
    const ivHex = Buffer.from(iv)
    const encipher = crypto.createCipheriv('des-cbc', keyHex, ivHex)
    let encode = encipher.update(encodeTxt, 'utf8', 'hex')
    encode += encipher.final('hex')
    return encode
}

// DES 解密
/**
 * @description DES解密，要和加密方式对应起来
 * @param {String} decodeTxt 待解密的字符串
 * @param {String} key 秘钥
 * @param {String} iv 偏移量
 */
function desDecode(decodeTxt, key, iv) {
    key = key.length >= 8 ? key.slice(0, 8) : key.concat('0'.repeat(8 - key.length))
    iv = iv.length >= 8 ? iv.slice(0, 8) : iv.concat('0'.repeat(8 - iv.length))
    const keyHex = Buffer.from(key)
    const ivHex = Buffer.from(iv)
    const decipher = crypto.createDecipheriv('des-cbc', keyHex, ivHex)
    let decode = decipher.update(decodeTxt, 'hex', 'utf8')
    decode += decipher.final('utf8')
    return decodes
}

module.exports = {
    desEncode,
    desDecode
}


