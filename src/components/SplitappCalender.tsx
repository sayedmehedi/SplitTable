import React from "react";
import {Text} from "react-native";
import {splitAppTheme} from "@src/theme";
import {DateData, Theme} from "react-native-calendars/src/types";
import {Calendar, CalendarProps} from "react-native-calendars";

const theme: Theme = {
  dayTextColor: splitAppTheme.colors.black,
  selectedDayTextColor: splitAppTheme.colors.white,
  selectedDayBackgroundColor: splitAppTheme.colors.primary[300],
  arrowColor: splitAppTheme.colors.primary[300],
  todayTextColor: splitAppTheme.colors.primary[300],
  textDayFontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
  textMonthFontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
  textDayHeaderFontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
  textDayFontSize: splitAppTheme.fontSizes.md,
  textMonthFontSize: splitAppTheme.fontSizes.md,
  textDayHeaderFontSize: splitAppTheme.fontSizes.md,
};

interface Props extends CalendarProps {
  onChange?: (data: DateData) => void;
}

export default function SplitappSingleSelectCalender(props: Props = {}) {
  const [selectedDay, setSelectedDay] = React.useState<
    DateData["dateString"] | null
  >(null);

  const markedDates = React.useMemo(() => {
    return selectedDay !== null
      ? {
          [selectedDay]: {
            selected: true,
          },
        }
      : {};
  }, [selectedDay]);

  return (
    <Calendar
      {...props}
      firstDay={1}
      hideExtraDays
      theme={theme}
      enableSwipeMonths
      onDayPress={day => {
        setSelectedDay(day.dateString);
        props.onChange?.(day);
      }}
      markedDates={markedDates}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={"MMM yyyy"}
      // Replace default month and year title with custom one. the function receive a date as parameter
      renderHeader={date => {
        if (date !== undefined) {
          return (
            <Text
              style={{
                fontSize: splitAppTheme.fontSizes.lg,
                color: splitAppTheme.colors.primary[300],
                fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
              }}>
              {date.toString("MMM yyyy")}
            </Text>
          );
        }
      }}
    />
  );
}
