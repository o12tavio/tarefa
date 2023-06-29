const BreakableForeach = require('./BreakableForeach')
const CompileArguments = require('./CompileArguments')

function LizeWrapper (target, name, args, process)
{
  const LizeMetaName = `__LIZE_${name}_`
  const LizePatterns = `${LizeMetaName}PATTERNS`
  const LizeZeroArgumentPattern = `${LizeMetaName}ZERO_ARGUMENT`
  const LizeMethodId = `${LizeMetaName}_ID`

  if (!target[LizePatterns])
  {
    target[LizePatterns] = []
    target[LizeMethodId] = 0
  }

  if (!target[name])
  {
    target[name] = function () {
      const OptionData = {
        call: target[name],
        self: target
      }
      let args = Array.from(arguments)
      let returnValue = undefined
      let patterns = target[LizePatterns]
      let isCorresponded = false

      if (args.length === 0)
      {
        return target[LizeZeroArgumentPattern](OptionData)
      }

      BreakableForeach(patterns, pattern => {
        let isCorrespond = true
        let computed = {}
        let defualtArgCount = 0

        BreakableForeach(pattern.args, (arg, argIndex) => {
          if (typeof args[argIndex] === 'undefined')
          {
            if (arg.hasDefault())
            {
              computed[arg.name] = arg.default()
              defualtArgCount++
            }
            else
            {
              isCorrespond = false
              return false
            }
          }
          else
          {
            if (arg.vaild(args[argIndex]))
            {
              computed[arg.name] = args[argIndex]
            }
          }
        })

        if (Object.keys(computed).length < args.length + defualtArgCount)
        {
          isCorrespond = false
        }

        if (isCorrespond)
        {
          returnValue = target[pattern.methodName](computed, OptionData)
          isCorresponded = true
          return false
        }
      })

      if (isCorresponded === false)
      {
        throw Error(`Undefined argument pattern in ${name} function. passed:` + args.map(a => typeof a).join(','))
      }

      return returnValue
    }
  }

  if (!args || Object.keys(args).length === 0)
  {
    target[LizeZeroArgumentPattern] = process
  }
  else
  {
    target[LizeMethodId]++
    target[`${LizeMethodId}_${target[LizeMethodId]}_`] = process

    target[LizePatterns].push({
      args: CompileArguments(args),
      methodName: `${LizeMethodId}_${target[LizeMethodId]}_`
    })
  }
}

let LizeCore = {}

LizeWrapper(LizeCore, 'Lize', {
  target: null,
  name: String,
  args: Object,
  process: Function
}, ({ target, name, args, process }) => {
  return LizeWrapper(target, name, args, process)
})

LizeCore.Lize.Class = class {
  
}

LizeWrapper(LizeCore.Lize.Class, 'LizeStatic', {
  name: String,
  args: Object,
  process: Function,
}, function ({ name, args, process }) {
  LizeWrapper(this, name, args, process)
})

LizeWrapper(LizeCore.Lize.Class, 'LizePrototype', {
  name: String,
  args: Object,
  process: Function,
}, function ({ name, args, process }) {
  LizeWrapper(this.prototype, name, args, process)
})

LizeWrapper(LizeCore.Lize.Class, 'LizePrototypeGroup', {
  name: String,
  fn: Function
}, function ({ name, fn }) {
  let builder = {}
  let prototype = this.prototype

  LizeWrapper(builder, 'build', {
    args: Object,
    process: Function
  }, function ({ args, process }) {
    LizeWrapper(prototype, name, args, process)
  })
  fn(builder.build)
})

LizeWrapper(LizeCore.Lize.Class, 'LizeStaticGroup', {
  name: String,
  fn: Function
}, function ({ name, fn }) {
  let builder = {}
  let prototype = this

  LizeWrapper(builder, 'build', {
    args: Object,
    process: Function
  }, function ({ args, process }) {
    LizeWrapper(prototype, name, args, process)
  })
  fn(builder.build)
})

module.exports = LizeCore.Lize