onmessage = function (e) {
  const vm = e.data

  const output = vm.filteredData.filter((item) => {
    if (vm.activePriceRange) {
      if (vm.activePriceRange.range[0] === 0) {
        if (parseFloat(item.minPrice) < vm.activePriceRange.range[1]) {
          return true
        } else {
          return false
        }
      } else if (vm.activePriceRange.range[1] === 0) {
        if (parseFloat(item.minPrice) > vm.activePriceRange.range[0]) {
          return true
        } else {
          return false
        }
      } else if (
        parseFloat(item.minPrice) > vm.activePriceRange.range[0] &&
        parseFloat(item.minPrice) < vm.activePriceRange.range[1]
      ) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  })

  switch (vm.sortBy) {
    case 'hi-low':
      postMessage(
        output.sort((a, b) => {
          if (a.priceRange.min < b.priceRange.min) {
            return 1
          }
          if (a.priceRange.min > b.priceRange.min) {
            return -1
          }

          return 0
        })
      )
      break
    case 'low-hi':
      postMessage(
        output.sort((a, b) => {
          if (a.priceRange.min < b.priceRange.min) {
            return -1
          }
          if (a.priceRange.min > b.priceRange.min) {
            return 1
          }

          return 0
        })
      )
      break
    default:
      postMessage(output)
  }
}
