const Lize = require('../src/Lize')

class Vec2 extends Lize.Class {
  constructor () {
    super()
    this.set(...arguments)
  }

  components () {
    return { x: this.x, y: this.y }
  }
}

Vec2.LizePrototype('set', {
  x: Number,
  y: Number
}, function ({ x, y }) {
  this.x = x
  this.y = y
})

Vec2.LizePrototypeGroup('set', build => {
  build({
    xy: Number,
  }, function ({ xy }) {
    this.set(xy, xy)
  })
  build({
    object: Object,
  }, function ({ object }) {
    this.set(object.x, object.y)
  })
})

Vec2.LizeStatic('Info', {}, function () {
  return 'LizeAPI'
})

Vec2.LizeStaticGroup('Info', build => {
  build({
    name: String
  }, function ({ name }) {
    if (name === 'Version') return '0.0.2'

    return false
  })
})

describe('Vec2 test', () => {
  test('Vec2.set', () => {
    let pos1 = new Vec2(0, 0)

    expect(pos1.components()).toEqual({ x: 0, y: 0 })

    pos1.set(32)
    
    expect(pos1.components()).toEqual({ x: 32, y: 32 })

  })

  test('Vec2.Info', () => {
    expect(Vec2.Info()).toBe('LizeAPI')
    expect(Vec2.Info('Version')).toBe('0.0.2')
    expect(Vec2.Info('Unknown')).toBeFalsy()
  })
})