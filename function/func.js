export const getDate =(date)=>{

    return date?.split(' ')[0]

}

export  const  getBincode =(data) =>{
    const code = []

    data?.stockLocationBinInfo.length > 0 &&
      data?.stockLocationBinInfo.forEach((element) => {
        if (element.binCode && element.location === data.location) {
          code.push(element.binCode)
        }
      })

    return code
  }

  export const getBincodeWithQty =(data)=> {
    const code = []

    data?.stockLocationBinInfo.length > 0 &&
      data?.stockLocationBinInfo.forEach((element) => {
        if (element.binCode && element.location === data.location) {
          code.push({
            binCode: element.binCode,
            qty: Number(element.qty),
            currentQty: Number(element.qty),
          })
        }
      })

    return code
  }


  export const getSupplyQty=(item) =>{
    return item.binCodeArrayWithQty.reduce(function (
      accumulator,
      currentValue
    ) {
      return accumulator + Number(currentValue.qty)
    },
    0)
  }