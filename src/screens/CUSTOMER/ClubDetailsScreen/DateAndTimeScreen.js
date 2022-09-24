import React from 'react';
import dayjs from 'dayjs';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const DateAndTimeScreen = ({navigation}) => {
  const [initialDate, setInitialDate] = React.useState(() =>
    dayjs().format('YYYY-MM-DD'),
  );

  return (
    <View style={{flex: 1}}>
      <Calendar
        initialDate={initialDate}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={dayjs().format('YYYY-MM-dd')}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log('selected day', day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => {
          console.log('selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MMM yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          setInitialDate(month.dateString);
        }}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={direction => {
          if (direction === 'left') {
            return (
              <Text style={{
                fontFamily:'Satoshi-Medium',
                fontSize:16,
                color:'#A5ACB9'
              }}>
                {dayjs(initialDate, 'YYYY-MM-DD')
                  .subtract(1, 'M')
                  .format('MMM YYYY')}
              </Text>
            );
          }

          return (
            <Text style={{
              fontFamily:'Satoshi-Medium',
              fontSize:16,
              color:'#A5ACB9'
            }}>
              {dayjs(initialDate, 'YYYY-MM-DD').add(1, 'M').format('MMM YYYY')}
            </Text>
          );
        }}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        disableAllTouchEventsForDisabledDays
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={date => {
          if (date !== undefined) {
            return <Text style={{color: "#FF3FCB",fontSize:18,fontFamily:'Satoshi-Medium'}}>{date.toString('MMM yyyy')}</Text>;
          }
        }}
        enableSwipeMonths
      
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: 'red',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: 'red',
          todayTextColor: '#00adf5',
          dayTextColor: 'black',
          textDisabledColor: '#111111',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: 'blue',
          indicatorColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
      <LinearGradient
       colors={[ '#402B8C','#FF3FCB']}
       start={{x: 0, y: 0}}
       end={{x: 1, y: 0}}
       style={{
         height: 70,
         width: '100%',
         flexDirection:'row',
         alignItems:'center',
         justifyContent:'space-between',
         paddingHorizontal:10,
         position:'absolute',
         bottom:0
       }}
      >

      
        <Text style={{
            fontFamily:'Satoshi-Medium',
            color:'white',
            fontSize:16

        }}>Tue, 17 Jun,10:30am</Text>
       <TouchableOpacity
       onPress={()=>navigation.navigate('selectTable')}
       style={styles.continueButton}>
        <Text style={{color:'#FF3FCB'}}>Continue</Text>
        
        </TouchableOpacity>
        </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  continueButton: {
    height: 50,
    width: 130,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DateAndTimeScreen;

