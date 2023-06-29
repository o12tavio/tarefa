function TypeJudge (target, type)
{
  if (typeof target === 'undefined' || target === null)
  {
    return false
  }
  
  return target.constructor === type
}

module.exports = TypeJudge