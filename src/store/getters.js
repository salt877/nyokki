export default {
  name: state => state.name,
  // doubleCount:state => state.count * 2
  
    doubleCount(state){
        console.log('gettersが呼ばれた')
        return state.count * 2
    
    // doubleCount:state => state.count * 2
}


}