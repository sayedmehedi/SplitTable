import { View, Text,FlatList,StyleSheet } from 'react-native'
import React from 'react'

const TransactionData = [
    {
        id:1,
        dateTime:'24 June 12:00',
        clubName:'Ebc at night',
        tableName:'table Name',
        numberOfGuest:'6',
        status:'Cancelled',
        paymentType:'Credit Card',
        price:'$1315.30'
    },
    {
        id:2,
        dateTime:'24 June 12:00',
        clubName:'Ebc at night',
        tableName:'table Name',
        numberOfGuest:'6',
        status:'Cancelled',
        paymentType:'Credit Card',
        price:'$1315.30'
    },
    {
        id:3,
        dateTime:'24 June 12:00',
        clubName:'Ebc at night',
        tableName:'table Name',
        numberOfGuest:'6',
        status:'Cancelled',
        paymentType:'Credit Card',
        price:'$1315.30'
    },
    {
        id:4,
        dateTime:'24 June 12:00',
        clubName:'Ebc at night',
        tableName:'table Name',
        numberOfGuest:'6',
        status:'Cancelled',
        paymentType:'Credit Card',
        price:'$1315.30'
    },
    {
        id:5,
        dateTime:'24 June 12:00',
        clubName:'Ebc at night',
        tableName:'table Name',
        numberOfGuest:'6',
        status:'Cancelled',
        paymentType:'Credit Card',
        price:'$1315.30'
    },
    {
        id:6,
        dateTime:'24 June 12:00',
        clubName:'Ebc at night',
        tableName:'table Name',
        numberOfGuest:'6',
        status:'Cancelled',
        paymentType:'Credit Card',
        price:'$1315.30'
    }
]



const renderTransactionList = ({item}) => <View key={item.id} style={{
    height:100,
        width:'100%',
        borderRadius:8,
        backgroundColor:'white',
        marginVertical:5,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#F1F1F1',
        justifyContent:'space-around',
        paddingHorizontal:20

}}>
    <View style={{alignItems:'center'}}>
        <Text style={{
            fontFamily:'Satoshi-Regular',
            fontSize:12,
            color:'#8A8D9F'
        }}>24</Text>
        <Text style={{
            fontFamily:'SatoshiVariable-Bold',
            fontSize:20,
            color:'#8A8D9F'

        }}>Jun</Text>
        <Text style={{
             fontFamily:'Satoshi-Regular',
             fontSize:12,
             color:'#8A8D9F'
        }}>12:00</Text>
    </View>

   <View>
   <Text style={{
    fontFamily:'SatoshiVariable-Bold',
    fontSize:14,
    color:'#262B2E'
   }}>{item.clubName}</Text>
    <View style={{flexDirection:'row',marginVertical:4}}>
        <Text style={{
             fontFamily:'Satoshi-Regular',
             fontSize:12,
             color:'#8A8D9F'
        }}>{item.tableName} |</Text>
        <Text style={{
             fontFamily:'Satoshi-Regular',
             fontSize:12,
             color:'#8A8D9F',
             
        }}> {item.numberOfGuest} Guest</Text>

    </View>
    <View style={{flexDirection:'row',alignItems:'center'}}>
        <View style={styles.dot}/>
    <Text style={{
        fontFamily:'Satoshi-Regular',
        fontSize:10,
        color:'#FE2121'
    }}>{item.status}</Text>
    </View>
   </View>

   <View >
    <Text style={{
         fontFamily:'Satoshi-Regular',
         fontSize:10,
         color:'#8A8D9F',
         alignSelf:'flex-end'
    }}>{item.paymentType}</Text>
    <Text style={{
        fontFamily:'SatoshiVariable-Bold',
        fontSize:18,
        color:'#262B2E'
    }}>{item.price}</Text>
   </View>

</View>

const TransectionScreen = () => {
  return (
    <View style={{backgroundColor:'white',flex:1,padding:10}}>

<FlatList
    data={TransactionData}
    renderItem={renderTransactionList}
    keyExtractor={item => item.id}
    />
      
    </View>
  )
}

const styles = StyleSheet.create({
    dot:{
        height:8,
        width:8,
        borderRadius:4,
        backgroundColor:'#FE2121',
        marginRight:10
    }
})

export default TransectionScreen