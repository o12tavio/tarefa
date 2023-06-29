var Lize = require('../src/Lize')

describe('Default style', () => {
  test('Vec2', () => {
    let API = {}

    Lize(API, 'Vec2', {
      x: Number,
      y: Number
    }, ({ x, y }) => {
      return { x, y }
    })

    expect(API.Vec2(0, 0)).toEqual({ x: 0, y: 0 })
    expect(API.Vec2(32, 12)).toEqual({ x: 32, y: 12 })
    expect(API.Vec2(64, 16)).toEqual({ x: 64, y: 16 })
  })

  test('Vec2 overload', () => {
    let API = {}

    Lize(API, 'Vec2', {
      x: Number,
      y: Number
    }, ({ x, y }) => {
      return { x, y }
    })

    Lize(API, 'Vec2', {
      xy: Number
    }, ({ xy }, { call }) => {
      return call(xy, xy)
    })

    Lize(API, 'Vec2', {}, ({ call }) => {
      return call(0)
    })

    Lize(API, 'Vec2', {
      object: [
        Object,
        value => 'x' in value && 'y' in value
      ],
    }, ({ object }, { call }) => {
      return call(object.x, object.y)
    })

    expect(API.Vec2(34, 43)).toEqual({ x: 34, y: 43 })
    expect(API.Vec2(1024)).toEqual({ x: 1024, y: 1024 })
    expect(API.Vec2()).toEqual({ x: 0, y: 0 })
    expect(API.Vec2({ x: 32, y: 64 })).toEqual({ x: 32, y: 64 })
  })
})
