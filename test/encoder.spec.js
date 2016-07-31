import Encoder from '../src/encoder'
import { assert } from 'chai'

describe('Encoder', () => {

  it('should encode rfc4648', () => {
    let buf = [1]
    let test = 'AE' 

    let encoder = new Encoder()
    let encode = encoder.finalize(buf)

    assert.equal(encode, test)
  })

})
