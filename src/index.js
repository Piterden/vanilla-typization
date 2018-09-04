class Test {}

const test = new Test()

class Typized {
  get args () {
    return {
      test: Test,
      string: String,
      array: Array,
      object: Object,
      boolean: Boolean,
      number: Number,
      regexp: RegExp,
      function: Function,
    }
  }

  constructor (...args) {
    const keys = Object.keys(this.args)

    if (args.length < keys.length) {
      throw new TypeError(`The constructor must receive at least ${keys.length} argument${keys.length > 1 && 's'}!!!`)
    }

    Object.assign(this, args.reduce((acc, arg, idx) => {
      const key = keys[idx]
      const instance = this.args[key]
      const type = instance.name ? instance.name.toLowerCase() : 'object'

      switch (typeof arg) {
        case 'array':
          if (!Array.isArray(arg)) {
            throw new TypeError(`The argument ${idx + 1} ('${key}') must be 'Array' type!!!`)
          }
          break

        case 'object':
          if (!(arg instanceof instance) || arg.constructor.name !== instance.name) {
            throw new TypeError(`The argument ${idx + 1} ('${key}') must be '${instance.name}' type!!!`)
          }
          break

        case 'string':
        case 'number':
        case 'boolean':
          if (typeof arg !== type) {
            throw new TypeError(`The argument ${idx + 1} ('${key}') must be '${instance.name}' type!!!`)
          }
          break
        
        default:
      }

      acc[key] = arg

      return acc
    }, {}))
  }
}

document.getElementById('app').innerHTML = 
JSON.stringify(new Typized(test, '.', [], {}, true, 5, /^/, () => {}), null, ' ')
