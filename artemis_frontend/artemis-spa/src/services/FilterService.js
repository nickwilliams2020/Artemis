import Vue from 'vue'
import moment from 'moment'

// localeString
Vue.filter('localeString', value => {

  try {
    return (value)
      ? value.toLocaleString()
      : value
  }
  catch (error) {
    console.log('filter [localeString]: ' + error)
    return value
  }

})

// titleCase
Vue.filter('titleCase', value => {

  try {
    return (value)
      ? value.replace(/\w\S*/g, txt => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
      : value
  }
  catch (error) {
    console.log('filter [titleCase]: ' + error)
    return value
  }

})

// lowerCase

Vue.filter('lowerCase', value => {

  try {
    return (value)
      ? value.replace(/\w\S*/g, txt => txt.toLowerCase())
      : value
  }
  catch (error) {
    console.log('filter [titleCase]: ' + error)
    return value
  }

})


// replaceUnderscores
Vue.filter('replaceUnderscores', value => {

  try {
    return (value && value.length > 0)
      ? value.replace(/_/g, ' ')
      : value
  }
  catch (error) {
    console.log('filter [replaceUnderscores]: ' + error)
    return value
  }

})

// upperCase
Vue.filter('upperCase', value => {

  try {
    return (value)
      ? value.toUpperCase()
      : value
  }
  catch (error) {
    console.log('filter [upperCase]: ' + error)
    return value
  }

})

// kebabCase
Vue.filter('kebabCase', value => {


  try {
    return (value)
      ? value.replace(/\s+/g, '-').toLowerCase()
      : value
  }
  catch (error) {
    console.log('filter [kebabCase]: ' + error)
    return value
  }

})
// date to MMM DD, YYYY
Vue.filter('date', value => {

  try {
    return (value)
      ? moment(value).format('MMM DD, YYYY')
      : value
  }
  catch (error) {
    console.log('filter [date]: ' + error)
    return value
  }

})

// arrayToString
Vue.filter('arrayToString', value => {

  try {
    return (value.length)
      ? value.join(', ')
      : value
  }
  catch (error) {
    console.log('filter [arrayToString]: ' + error)
    return value
  }

})

// objectArrayToString
Vue.filter('objectArrayToString', (value, key) => {

  try {
    return (value.length)
      ? value.map(item => item[key]).join(', ')
      : value
  }
  catch (error) {
    console.log('filter [objectArrayToString]: ' + error)
    return value
  }

})

// filterLoop
Vue.filter('filterLoop', (value, filterArray = []) => {

  try {

    filterArray.forEach(filter => {
      value = Vue.options.filters[filter](value)
    })

    return value
  }
  catch (error) {
    return value
  }

})

// highlight

Vue.filter('highlight', (word, query) => {
  let check = new RegExp(query, 'ig')
  return word.toString().replace(check, (matchedText, a, b) => {
    return ('<span style="background-color: #fcaf41">' + matchedText + '</span>')
  })
})



//  SNV
Vue.filter('SNV', initValue => {


  try {
    var x = ''
    if (initValue.length) {
      for (var k = 0; k < initValue.length; k++) {
        var secValue = initValue[k]
        if (secValue['nextGenerationSequences']) {
          secValue = secValue['nextGenerationSequences']
          if (secValue.length) {
            for (var i = 0; i < secValue.length; i++) {
              var value = secValue[i]
              if (value['variantReport']) {
                value = value['variantReport']
                if (value['singleNucleotideVariants']) {
                  value = value['singleNucleotideVariants']
                  if (value.length) {
                    for (var j = 0; j < value.length; j++) {
                      x = x + value[j]['gene']
                      if (j < value.length - 1) {
                        x = x + ', '
                      }
                    }
                  }
                }
              }
            if (i < secValue.length - 1 && x !== '') {
                x = x + ', '
              }
            }
          }
        }
        if (k < initValue.length - 1 && x !== '') {
          x = x + ', '
        }
      }
    }
    return x

  }
  catch (error) {
    console.log('filter [objectArrayToString]: ' + error)
    return value
  }

})


//  SNVi
Vue.filter('SNVi', initValue => {


  try {
    var x = ''
    if (initValue.length) {
      for (var k = 0; k < initValue.length; k++) {
        var secValue = initValue[k]
        if (secValue['nextGenerationSequences']) {
          secValue = secValue['nextGenerationSequences']
          if (secValue.length) {
            for (var i = 0; i < secValue.length; i++) {
              var value = secValue[i]
              if (value['variantReport']) {
                value = value['variantReport']
                if (value['singleNucleotideVariants']) {
                  value = value['singleNucleotideVariants']
                  if (value.length) {
                    for (var j = 0; j < value.length; j++) {
                      x = x + value[j]['identifier']
                      if (j < value.length - 1) {
                        x = x + ', '
                      }
                    }
                  }
                }
              }
            if (i < secValue.length - 1 && x !== '') {
                x = x + ', '
              }
            }
          }
        }
        if (k < initValue.length - 1 && x !== '') {
          x = x + ', '
        }
      }
    }
    return x

  }
  catch (error) {
    console.log('filter [objectArrayToString]: ' + error)
    return value
  }

})


//  CNV
Vue.filter('CNV', initValue => {


  try {
    var x = ''
    if (initValue.length) {
      for (var k = 0; k < initValue.length; k++) {
        var secValue = initValue[k]
        if (secValue['nextGenerationSequences']) {
          secValue = secValue['nextGenerationSequences']
          if (secValue.length) {
            for (var i = 0; i < secValue.length; i++) {
              var value = secValue[i]
              if (value['variantReport']) {
                value = value['variantReport']
                if (value['copyNumberVariants']) {
                  value = value['copyNumberVariants']
                  if (value.length) {
                    for (var j = 0; j < value.length; j++) {
                      x = x + value[j]['gene']
                      if (j < value.length - 1) {
                        x = x + ', '
                      }
                    }
                  }
                }
              }
            if (i < secValue.length - 1 && x !== '') {
                x = x + ', '
              }
            }
          }
        }
        if (k < initValue.length - 1 && x !== '') {
          x = x + ', '
        }
      }
    }
    return x

  }
  catch (error) {
    console.log('filter [objectArrayToString]: ' + error)
    return value
  }

})

//  CNVi
Vue.filter('CNVi', initValue => {


  try {
    var x = ''
    if (initValue.length) {
      for (var k = 0; k < initValue.length; k++) {
        var secValue = initValue[k]
        if (secValue['nextGenerationSequences']) {
          secValue = secValue['nextGenerationSequences']
          if (secValue.length) {
            for (var i = 0; i < secValue.length; i++) {
              var value = secValue[i]
              if (value['variantReport']) {
                value = value['variantReport']
                if (value['copyNumberVariants']) {
                  value = value['copyNumberVariants']
                  if (value.length) {
                    for (var j = 0; j < value.length; j++) {
                      x = x + value[j]['identifier']
                      if (j < value.length - 1) {
                        x = x + ', '
                      }
                    }
                  }
                }
              }
            if (i < secValue.length - 1 && x !== '') {
                x = x + ', '
              }
            }
          }
        }
        if (k < initValue.length - 1 && x !== '') {
          x = x + ', '
        }
      }
    }
    return x

  }
  catch (error) {
    console.log('filter [objectArrayToString]: ' + error)
    return value
  }

})

//  GF
Vue.filter('GF', initValue => {


  try {
    var x = ''
    if (initValue.length) {
      for (var k = 0; k < initValue.length; k++) {
        var secValue = initValue[k]
        if (secValue['nextGenerationSequences']) {
          secValue = secValue['nextGenerationSequences']
          if (secValue.length) {
            for (var i = 0; i < secValue.length; i++) {
              var value = secValue[i]
              if (value['variantReport']) {
                value = value['variantReport']
                if (value['geneFusions']) {
                  value = value['geneFusions']
                  if (value.length) {
                    for (var j = 0; j < value.length; j++) {
                      x = x + value[j]['gene']
                      if (j < value.length - 1) {
                        x = x + ', '
                      }
                    }
                  }
                }
              }
            if (i < secValue.length - 1 && x !== '') {
                x = x + ', '
              }
            }
          }
        }
        if (k < initValue.length - 1 && x !== '') {
          x = x + ', '
        }
      }
    }
    return x

  }
  catch (error) {
    console.log('filter [objectArrayToString]: ' + error)
    return value
  }

})


//  GFi
Vue.filter('GFi', initValue => {


  try {
    var x = ''
    if (initValue.length) {
      for (var k = 0; k < initValue.length; k++) {
        var secValue = initValue[k]
        if (secValue['nextGenerationSequences']) {
          secValue = secValue['nextGenerationSequences']
          if (secValue.length) {
            for (var i = 0; i < secValue.length; i++) {
              var value = secValue[i]
              if (value['variantReport']) {
                value = value['variantReport']
                if (value['geneFusions']) {
                  value = value['geneFusions']
                  if (value.length) {
                    for (var j = 0; j < value.length; j++) {
                      x = x + value[j]['identifier']
                      if (j < value.length - 1) {
                        x = x + ', '
                      }
                    }
                  }
                }
              }
            if (i < secValue.length - 1 && x !== '') {
                x = x + ', '
              }
            }
          }
        }
        if (k < initValue.length - 1 && x !== '') {
          x = x + ', '
        }
      }
    }
    return x

  }
  catch (error) {
    console.log('filter [objectArrayToString]: ' + error)
    return value
  }

})



//  indels
Vue.filter('indels', initValue => {


  try {
    var x = ''
    if (initValue.length) {
      for (var k = 0; k < initValue.length; k++) {
        var secValue = initValue[k]
        if (secValue['nextGenerationSequences']) {
          secValue = secValue['nextGenerationSequences']
          if (secValue.length) {
            for (var i = 0; i < secValue.length; i++) {
              var value = secValue[i]
              if (value['variantReport']) {
                value = value['variantReport']
                if (value['indels']) {
                  value = value['indels']
                  if (value.length) {
                    for (var j = 0; j < value.length; j++) {
                      x = x + value[j]['gene']
                      if (j < value.length - 1) {
                        x = x + ', '
                      }
                    }
                  }
                }
              }
              if (i < secValue.length - 1 && x !== '') {
                x = x + ', '
              }
            }
          }
        }
        if (k < initValue.length - 1 && x !== '') {
          x = x + ', '
        }
      }
    }
    return x

  }
  catch (error) {
    console.log('filter [objectArrayToString]: ' + error)
    return value
  }

})


//  indelsi
Vue.filter('indelsi', initValue => {


  try {
    var x = ''
    if (initValue.length) {
      for (var k = 0; k < initValue.length; k++) {
        var secValue = initValue[k]
        if (secValue['nextGenerationSequences']) {
          secValue = secValue['nextGenerationSequences']
          if (secValue.length) {
            for (var i = 0; i < secValue.length; i++) {
              var value = secValue[i]
              if (value['variantReport']) {
                value = value['variantReport']
                if (value['indels']) {
                  value = value['indels']
                  if (value.length) {
                    for (var j = 0; j < value.length; j++) {
                      x = x + value[j]['identifier']
                      if (j < value.length - 1) {
                        x = x + ', '
                      }
                    }
                  }
                }
              }
              if (i < secValue.length - 1 && x !== '') {
                x = x + ', '
              }
            }
          }
        }
        if (k < initValue.length - 1 && x !== '') {
          x = x + ', '
        }
      }
    }
    return x

  }
  catch (error) {
    console.log('filter [objectArrayToString]: ' + error)
    return value
  }

})


//  UGF
Vue.filter('UGF', initValue => {


  try {
    var x = ''
    if (initValue.length) {
      for (var k = 0; k < initValue.length; k++) {
        var secValue = initValue[k]
        if (secValue['nextGenerationSequences']) {
          secValue = secValue['nextGenerationSequences']
          if (secValue.length) {
            for (var i = 0; i < secValue.length; i++) {
              var value = secValue[i]
              if (value['variantReport']) {
                value = value['variantReport']
                if (value['unifiedGeneFusions']) {
                  value = value['unifiedGeneFusions']
                  if (value.length) {
                    for (var j = 0; j < value.length; j++) {
                      x = x + value[j]['driverGene']
                      if (j < value.length - 1) {
                        x = x + ', '
                      }
                    }
                  }
                }
              }
           if (i < secValue.length - 1 && x !== '') {
                x = x + ', '
              }
            }
          }
        }
        if (k < initValue.length - 1 && x !== '') {
          x = x + ', '
        }
      }
    }
    return x

  }
  catch (error) {
    console.log('filter [objectArrayToString]: ' + error)
    return value
  }

})


//  UGFi
Vue.filter('UGFi', initValue => {


  try {
    var x = ''
    if (initValue.length) {
      for (var k = 0; k < initValue.length; k++) {
        var secValue = initValue[k]
        if (secValue['nextGenerationSequences']) {
          secValue = secValue['nextGenerationSequences']
          if (secValue.length) {
            for (var i = 0; i < secValue.length; i++) {
              var value = secValue[i]
              if (value['variantReport']) {
                value = value['variantReport']
                if (value['unifiedGeneFusions']) {
                  value = value['unifiedGeneFusions']
                  if (value.length) {
                    for (var j = 0; j < value.length; j++) {
                      x = x + value[j]['identifier']
                      if (j < value.length - 1) {
                        x = x + ', '
                      }
                    }
                  }
                }
              }
           if (i < secValue.length - 1 && x !== '') {
                x = x + ', '
              }
            }
          }
        }
        if (k < initValue.length - 1 && x !== '') {
          x = x + ', '
        }
      }
    }
    return x

  }
  catch (error) {
    console.log('filter [objectArrayToString]: ' + error)
    return value
  }

})



//  disease
Vue.filter('disease', value => {


  try {
    var x = ''
    if (value.length) {
      for (var i = 0; i < value.length; i++) {
        var newValue = value[i]
        x = x + newValue['ctepCategory']
        if (i + 1 < value.length) {
          x = x + '; '
        }
      }
    }
    return x
  }
  catch (error) {
    console.log('filter [objectArrayToString]: ' + error)
    return value
  }

})
