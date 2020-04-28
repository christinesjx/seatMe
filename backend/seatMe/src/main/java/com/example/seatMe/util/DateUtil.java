package com.example.seatMe.util;

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
}
