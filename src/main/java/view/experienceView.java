package view;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.experience.*;
import dbUtils.*;

public class experienceView {

    public static StringDataList getAllUsers(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 

        sdl.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.
        if (sdl.dbError.length() > 0) {
            return sdl; // cannot proceed, db error (and that's been recorded in return object).
        }
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT experience_id, location_visit, type_experience, "
            +"image_experience, rating, cost, date_visit, experience.web_user_id, "
            + "user_image, user_email "
            + "FROM experience, web_user "
            + "WHERE experience.web_user_id = web_user.web_user_id  "
            + "ORDER BY experience.experience_id";  // always order by something, not just random order.
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the Format methods do not throw exceptions. If they find illegal data (like you 
                // tried to format a date as an integer), they return an error message (instead of 
                // returning the formatted value). So, you'll see these error messages right in the 
                // API output (JSON data) and/or you'll see it on the page in the UI.

                sd.experience_id = Format.fmtInteger(results.getObject("experience_id"));
                sd.location_visit = Format.fmtString(results.getObject("location_visit"));
                sd.type_experience = Format.fmtString(results.getObject("type_experience"));
                sd.image_experience= Format.fmtString(results.getObject("image_experience"));
                sd.rating = Format.fmtInteger(results.getObject("rating"));
                sd.cost = Format.fmtInteger(results.getObject("cost"));
                sd.date_visit = Format.fmtDate(results.getObject("date_visit"));
                sd.web_user_id = Format.fmtInteger(results.getObject("web_user_id"));
                sd.user_email = Format.fmtString(results.getObject("user_email"));
                sd.user_image = Format.fmtString(results.getObject("user_image"));
                
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in ExperienceView.getAllUsers(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}
