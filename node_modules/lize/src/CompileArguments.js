const Argument = require('./Argument')
const TypeJudge = require('./TypeJudge')
const BreakableForeach = require('./BreakableForeach')

function CompileArguments (args)
{
  let compiled = []
  
  Object.keys(args).forEach(key => {
    let arg = args[key]
    let name = key
    let defaultValue = null
    let vailds = []

    if (arg === null)
    {
    }
    else if (TypeJudge(arg, Array))
    {
      if (arg[0] && TypeJudge(arg[0], Function))
      {
        vailds.push(value => TypeJudge(value, arg[0]))
      }

      if (arg[1] && TypeJudge(arg[1], Function))
      {
        vailds.push(value => arg[1])
      }

      if (arg[2] && TypeJudge(arg[2], Function))
      {
        defaultValue = arg[2]
      }
    }
    else if (TypeJudge(arg, Function))
    {
      vailds.push(value => TypeJudge(value, arg))
    }
    else
    {
      if ('type' in arg && TypeJudge(arg.type, Function))
      {
        vailds.push(value => TypeJudge(value, arg.type))
      }
  
      if ('vaild' in arg && TypeJudge(arg.vaild, Function))
      {
        vailds.push(value => arg.vaild(value))
      }

      if ('default' in arg && TypeJudge(arg.default, Function))
      {
        defaultValue = arg.default
      }
    }

    compiled.push(new Argument(name, value => {
      let result = true

      BreakableForeach(vailds, vaild => {
        if (vaild(value) === false)
        {
          result = false
          return false
        }
      })

      return result
    }, defaultValue))
  })

  return compiled
}

module.exports = CompileArguments