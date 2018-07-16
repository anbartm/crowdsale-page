import SHA3 from 'crypto-js/sha3'
import validator from 'validator'
import { ErrorMessages } from './errorMessages.js'

const sha3 = value => SHA3(value, { outputLength: 256 }).toString()

export const rules = {
  isLength: address => address && address.length !== 42,

  isEmail: address =>
    address && !validator.isEmail(address) && ErrorMessages.invalidEmail(),

  isAddress: address =>
    !(
      /^(0x)?[0-9a-f]{40}$/i.test(address) &&
      (/^(0x)?[0-9a-f]{40}$/.test(address) ||
        /^(0x)?[0-9A-F]{40}$/.test(address) ||
        !sha3(address.replace('0x', '').toLowerCase())
          .split('')
          .slice(0, 40)
          .some(
            (char, index) =>
              (parseInt(char, 16) > 7 &&
                address[index + 2].toUpperCase() !== address[index + 2]) ||
              (parseInt(char, 16) <= 7 &&
                address[index + 2].toLowerCase() !== address[index + 2])
          ))
    ) && ErrorMessages.invalidAddress()
}
