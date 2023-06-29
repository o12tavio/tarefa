function BreakableForeach (array, fn)
{
  for (let i = 0; i < array.length; ++i)
  {
    if (fn(array[i], i) === false)
    {
      return false
    }
  }

  return true
}

module.exports = BreakableForeach