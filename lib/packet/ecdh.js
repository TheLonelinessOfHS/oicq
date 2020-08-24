"use strict";
const crypto = require("crypto");
const {md5} = require("./common");

//第一字节固定为0x04
const OICQ_PUBLIC_KEY = Buffer.from([
    0x04,
    0x92, 0x8d, 0x88, 0x50, 0x67, 0x30, 0x88, 0xb3, 0x43, 0x26, 0x4e, 0x0c,
    0x6b, 0xac, 0xb8, 0x49, 0x6d, 0x69, 0x77, 0x99, 0xf3, 0x72, 0x11, 0xde,
    0xb2, 0x5b, 0xb7, 0x39, 0x06, 0xcb, 0x08, 0x9f, 0xea, 0x96, 0x39, 0xb4,
    0xe0, 0x26, 0x04, 0x98, 0xb5, 0x1a, 0x99, 0x2d, 0x50, 0x81, 0x3d, 0xa8,
]);

/**
 * @link https://www.bookstack.cn/read/nodejs-api-doc-cn/crypto-class_ECDH.md
 */
let self = crypto.createECDH('secp192k1');
let public_key = self.generateKeys();
let private_key = self.getPrivateKey();
let share_key = md5(self.computeSecret(OICQ_PUBLIC_KEY));

function gen() {
    self = crypto.createECDH('secp192k1');
    public_key = self.generateKeys();
    private_key = self.getPrivateKey();
    share_key = md5(self.computeSecret(OICQ_PUBLIC_KEY));
}

module.exports = ()=>{
    return {public_key, private_key, share_key};
};
module.exports.gen = gen;