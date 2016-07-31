export default class Encoder {

  constructor () {
    this.buf = ''
    this.shift = 3
    this.carry = 0
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  }

  finalize (buf) {

    if (buf) {
      this.write(buf)
    }

    // ensure run twice for each buf entry
    if (this.shift !== 3) {
      this.buf += this.alphabet[this.carry & 0x1f]
      this.shift = 3
      this.carry = 0
    }

    return this.buf
  }

  write (buf) {

    let shift = this.shift, carry = this.carry

    for (let i = 0; i < buf.length; i++) {

      let byte = buf[i]
      let index = carry | (byte >> shift)

      this.buf += this.alphabet[index & 0x1f]

      if (shift > 5) {
        shift -= 5
        index = byte >> shift
        this.buf += this.alphabet[index & 0x1f]
      }

      shift = 5 - shift
      carry = byte << shift
      shift = 8 - shift
    }

    this.shift = shift
    this.carry = carry

    return this
  }

}