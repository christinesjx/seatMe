package com.example.seatMe.util;


import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;


public class DateUtil {



    /**
     * convert date from 'DD-MM-YYYY' to Date object
     * @param date
     * @return
     */
    public static Date formatDate(String date) {
        String[] dateSpilt =  date.split("-");
        String month = dateSpilt[0];
        String day = dateSpilt[1];
        String year = dateSpilt[2];
        Date reservedDate = new GregorianCalendar(Integer.parseInt(year), Integer.parseInt(month), Integer.parseInt(day)).getTime();
        return reservedDate;
    }

    public static String getDateWithoutTime(Date date){
        return date.toString().split(" ")[0];
    }

    public static String getTimeFromTimestamp(Timestamp timestamp){
        String time = timestamp.toString();
        String[] strs = time.split(" ");
        return  strs[1];
    }
}
