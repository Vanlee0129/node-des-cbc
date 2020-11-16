# node-des-cbc

node版des-cbc加解密

## 前言  

为了保护请求内容不被抓包软件暴露出来，很多产品都采用了请求加密的方式。DES-CBC就是一种对称加密方式。在网上查资料时发现node的资料不多，所以研究之后记录一下使用node加解密DES-CBC。  

## 代码  

首先是加密函数：  

```js
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
    //编码方式除了可以使用hex还可以使用base64。
    let encode = encipher.update(encodeTxt, 'utf8', 'hex')
    encode += encipher.final('hex')
    return encode
}
```

解密函数：

```js
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
```

## 总结

在使用时要特别注意加密和解密的编码方式要对应起来，如果没有对应起来就会报错或者得不到结果。  
