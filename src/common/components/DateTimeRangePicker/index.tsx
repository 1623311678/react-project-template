import React, { useState, useEffect } from "react";
import { Checkbox, Space, DatePicker } from "antd";
import moment, { Moment } from "moment";

const FORMAT_STRING = "YYYY-MM-DD HH:mm:ss";

type Time = string | Moment | undefined;

interface IDateTimeRangePickerProps {
  startTime?: Time;
  endTime?: Time;
  long?: boolean;
  onChange?: (fd: { startTime: Time; endTime: Time; long: boolean }) => void;
  showEndTimeError?:boolean
}

const DateTimeRangePicker: React.FC<IDateTimeRangePickerProps> = ({
    startTime,
    endTime,
    long,
    onChange,
    showEndTimeError= true
    }) => {
  const [data, setData] = useState<{
    startTime: Time;
    endTime: Time;
    long: boolean;
  }>({
    startTime,
    endTime,
    long
  });
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const onDatePickerChange = (date, dateString, type) => {
    const fd = {
      startTime: data.startTime,
      endTime: data.endTime,
      [`${type}Time`]: dateString,
      long: type == "end" ? false : data.long
    };
    // setData(fd);
    onChange && onChange(fd);
  };
  const onCheckboxChange = (e, name) => {
    const fd = {
      startTime: data.startTime,
      long: e.target.checked,
      endTime:
        name == "long" && e.target.checked
          ? undefined
          : data.endTime
            ? moment(data.endTime).format(FORMAT_STRING)
            : undefined
    };
    // setData(fd);
    onChange && onChange(fd);
  };
  // 开始时间限制
  const disabledStartDate = current => {
    const { endTime } = data;
    if (endTime) {
      return (
        current &&
        (current.format("YYYY-MM-DD") > moment(endTime).format("YYYY-MM-DD") ||
          current.format("YYYY-MM-DD") < moment().format("YYYY-MM-DD"))
      );
    } else {
      return (
        current && current.format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")
      );
    }
  };

  // 结束时间限制
  const disabledEndDate = current => {
    const { startTime } = data;
    const start = startTime
      ? moment(startTime)
      : moment()
        .subtract(1, "days")
        .endOf("day");
    return current && current.format("YYYY-MM-DD") < start.format("YYYY-MM-DD");
  };

  const disabledStartDateTime = (date: any) => {
    const { endTime } = data;
    const hours = moment().hours();
    const minutes = moment().minutes();
    const seconds = moment().seconds();
    const endHours = moment(endTime).hours();
    const endMinutes = moment(endTime).minutes();
    const endSeconds = moment(endTime).seconds();
    // 当日只能选择当前时间之后的时间点
    const dateHours = moment(date).hours();
    const dateMinutes = moment(date).minutes();
    const isCurrent = moment(date).date() === moment().date(); // 选择的时间和斤
    const isSame = moment(date).date() === moment(endTime).date(); // 选择的时间和结束时间是一天
    const hasEndTime = !!endTime;
    const hourRange = range(0, 24);
    const minuteRange = range(0, 60);
    if (date && isCurrent) {
      return {
        disabledHours: () =>
          hasEndTime && isSame
            ? [
              ...hourRange.slice(0, hours),
              ...hourRange.slice(endHours + 1, 24)
            ]
            : hourRange.slice(0, hours),
        disabledMinutes: () => {
          if (dateHours != endHours) {
            return dateHours > hours ? [] : minuteRange.slice(0, minutes + 1);
          } else {
            return minuteRange.slice(endMinutes + 1, 60);
          }
        },
        disabledSeconds: () => {
          if (dateHours != endHours) {
            return dateHours > hours || dateMinutes > minutes
              ? []
              : minuteRange.slice(0, seconds + 1);
          } else {
            if (dateMinutes != endMinutes) {
              return [];
            } else {
              return minuteRange.slice(endSeconds, 60);
            }
          }
        }
      };
    }
    return {
      disabledHours: () =>
        hasEndTime && isSame ? hourRange.slice(endHours + 1, 24) : [],
      disabledMinutes: () => {
        if (isSame) {
          if (dateHours != endHours) {
            return [];
          } else {
            return minuteRange.slice(endMinutes + 1, 60);
          }
        } else {
          return [];
        }
      },
      disabledSeconds: () => {
        if (isSame) {
          if (dateHours != endHours) {
            return [];
          } else {
            if (dateMinutes != endMinutes) {
              return [];
            } else {
              return minuteRange.slice(endSeconds + 1, 60);
            }
          }
        } else {
          return [];
        }
      }
    };
  };
  const disabledEndDateTime = (date: any) => {
    const { startTime } = data;
    const hours = moment(startTime).hours();
    const minutes = moment(startTime).minutes();
    const seconds = moment(startTime).seconds();
    // 当日只能选择当前时间之后的时间点
    const dateHours = moment(date).hours();
    const dateMinutes = moment(date).minutes();
    if (date && moment(date).date() === moment(startTime).date()) {
      return {
        disabledHours: () => range(0, 24).splice(0, hours),
        disabledMinutes: () =>
          dateHours > hours ? [] : range(0, 60).splice(0, minutes),
        disabledSeconds: () =>
          dateHours > hours || dateMinutes > minutes
            ? []
            : range(0, 60).splice(0, seconds + 1)
      };
    }
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => []
    };
  };
  // useEffect(() => {
  //   console.log(moment().format(FORMAT_STRING))
  //   // 防止改时区时 默认时间不更新
  //   setData({
  //     ...data,
  //     startTime: data.startTime ? moment(data.startTime) : moment()
  //   });
  // }, []);
  useEffect(() => {
    setData({
      startTime: startTime ? moment(startTime) : undefined,  // // 防止改时区时 默认时间不更新
      endTime,
      long
    });
  }, [startTime, endTime, long]);
  return (
    <Space size={10}>
      <div>
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          style={{border: data.startTime ? "":  '1px solid #D0021B'}}
          value={data.startTime ? moment(data.startTime) : undefined}
          disabledDate={disabledStartDate}
          disabledTime={disabledStartDateTime}
          onChange={(date, dateString) =>
            onDatePickerChange(date, dateString, "start")
          }
        />
        {!data.startTime && <p style={{color: '#d0021b', position: 'absolute'}}>开始时间不能为空</p>}
      </div>
      <span> ~ </span>
      <div>
        <DatePicker
          showTime
          value={data.endTime ? moment(data.endTime) : undefined}
          format="YYYY-MM-DD HH:mm:ss"
          style={{border: showEndTimeError ? (data.endTime || data.long) ? "":  '1px solid #D0021B': ""}}
          disabledDate={disabledEndDate}
          disabledTime={disabledEndDateTime}
          onChange={(date, dateString) =>
            onDatePickerChange(date, dateString, "end")
          }
        />
        {showEndTimeError ? (!data.endTime && !data.long) && <p style={{color: '#d0021b', position: 'absolute'}}>结束时间不能为空</p>: null}
      </div>
      <Checkbox checked={data.long} style={{width:"60px"}} onChange={() => onCheckboxChange(event, "long")}>
        长期
      </Checkbox>
    </Space>
  );
};

export default React.memo(DateTimeRangePicker);