import CommonUtils from './CommonUtils'

const inputModel = {
  'text': {
    default: ''
  },
  'checkbox': {
    default: []
  },
  'radio': {
    default: ''
  },
  'pill': {
    default: ''
  },
  'form-list': {
    default: []
  },
  'datepicker': {
    default: []
  },
  'page-size': {
    default: 20
  },
  'select': {
    default: undefined,
    visual: (result, schema, value) => {

      result[schema.id] = (Array.isArray(value))
        ? value.map(item => (item.label)).join(',')
        : value.label

    },
    api: (result, schema, value) => {

      result[schema.id] = (Array.isArray(value))
        ? value.map(item => (item.value)).join(',')
        : value.value

    }
  },
  'color-picker': {
    default: ''
  },
  'search': {
    default: ''
  },
  'checkbox-list': {
    default: []
  }

}

// is input value empty
function isInputEmpty (customIsEmpty, value) {
  return (customIsEmpty)
    ? customIsEmpty(value)
    : CommonUtils.isFalsey(value)
}

// get api model
let apiFormFormatter = (...args) => formFormatter('api', ...args)

// get visial model
let visialFormFormatter = (...args) => formFormatter('visual', ...args)

// main formatting function
function formFormatter (formattingType, result, schema, value) {

  // get input modal and formatting func
  let model = inputModel[schema.type]
  let formattingFunction = model[formattingType]

  // if input's value is not empty
  if (!isInputEmpty(model.isEmpty, value)) {

    // custom formatting if available
    if (formattingFunction) {
      formattingFunction(result, schema, value)
    }

    // otherwise default formatting
    else {
      result[schema.id] = value
    }

  }
}


export default {
  inputModel,
  apiFormFormatter,
  visialFormFormatter
}
