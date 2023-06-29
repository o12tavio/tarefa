class Argument
{
  constructor (name, vaild, defaultValue) {
    this.name = name
    this.vaild = vaild
    this.default = defaultValue
  }

  hasDefault () {
    return this.default ? true : false
  }
}

module.exports = Argument