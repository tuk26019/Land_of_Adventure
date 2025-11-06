package model.experience;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dbUtils.*;

public class DbMods {
    /*
     * Returns a "StringData" object that is full of field level validation
     * error messages (or "" for any field that passes validation).
     */
    private static StringData validate(StringData inputData) {
        StringData errorMsgs = new StringData();
        errorMsgs.location_visit = Validate.stringMsg(inputData.location_visit, 50, true);
        errorMsgs.type_experience = Validate.stringMsg(inputData.type_experience, 50, true);
        errorMsgs.image_experience = Validate.stringMsg(inputData.image_experience, 500, false);
        
        // Validate rating if it's not empty
        if (inputData.rating != null && !inputData.rating.isEmpty()) {
            int rating = Validate.convertInteger(inputData.rating);
            if (rating < 1 || rating > 5) {
                errorMsgs.rating = "Rating must be between 1 and 5";
            }
        }
        
        // Validate cost only if it's provided
        if (inputData.cost != null && !inputData.cost.isEmpty()) {
            errorMsgs.cost = Validate.integerMsg(inputData.cost, false);
        }
        
        errorMsgs.date_visit = Validate.dateMsg(inputData.date_visit, false);
        errorMsgs.web_user_id = Validate.integerMsg(inputData.web_user_id, true);
        
        return errorMsgs;
    }// validate

    public static StringData insert(StringData inputData, DbConn dbc) {
        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.characterCount() > 0) {
            // Check if email selection is missing or invalid
            if (errorMsgs.web_user_id != null && !errorMsgs.web_user_id.isEmpty()) {
                errorMsgs.errorMsg = "Please Select Email";
            } else {
                errorMsgs.errorMsg = "Please try again"; // Other validation errors
            }
            return errorMsgs;
        } else {
            String sql = "INSERT INTO experience (location_visit, type_experience, image_experience, " +
                    "rating, cost, date_visit, web_user_id) values (?,?,?,?,?,?,?)";
            PrepStatement pStatement = new PrepStatement(dbc, sql);
            pStatement.setString(1, inputData.location_visit);
            pStatement.setString(2, inputData.type_experience);
            pStatement.setString(3, inputData.image_experience);
            pStatement.setInt(4, Validate.convertInteger(inputData.rating));
            pStatement.setInt(5, Validate.convertInteger(inputData.cost));
            pStatement.setDate(6, Validate.convertDate(inputData.date_visit));
            pStatement.setInt(7, Validate.convertInteger(inputData.web_user_id));
            int numRows = pStatement.executeUpdate();
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = "";
                } else {
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Role Id - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That location visit is already taken";
            }
        }
        return errorMsgs;
    } // insert

    public static StringData update(StringData updateData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(updateData);

        // For update, we also need to check that experience_id has been supplied by the
        // user...
        errorMsgs.experience_id = Validate.integerMsg(updateData.experience_id, true);

        if (errorMsgs.characterCount() > 0) { // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
             * Useful to know the exact field names in the database...
             * String sql =
             * "SELECT experience_id, location_visit, type_experience, "
             * +"image_experience, rating, cost, date_visit, experience.web_user_id, "
             * + "user_image, user_email "
             * + "FROM experience, web_user "
             * + "WHERE experience.web_user_id = web_user.web_user_id  "
             * + "ORDER BY experience.experience_id";
             */

            String sql = "UPDATE experience SET location_visit = ?, type_experience = ?, image_experience = ?, " +
                    "rating = ?, cost = ?, date_visit = ?, web_user_id = ? WHERE experience_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, updateData.location_visit);
            pStatement.setString(2, updateData.type_experience);
            pStatement.setString(3, updateData.image_experience);
            pStatement.setInt(4, Validate.convertInteger(updateData.rating));
            pStatement.setInt(5, Validate.convertInteger(updateData.cost));
            pStatement.setDate(6, Validate.convertDate(updateData.date_visit));
            pStatement.setInt(7, Validate.convertInteger(updateData.web_user_id));
            pStatement.setInt(8, Validate.convertInteger(updateData.experience_id));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to
                                             // the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk
                    // sql update OR the web User id (supplied by the client side) does not exist.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid User Role Id - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That location visit is already taken ";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update

    public static StringData getById(DbConn dbc, String id) {
        StringData sd = new StringData();
        // This case already tested in the controller, but ("belt and suspenders")
        // we are double checking here as well.
        if (id == null) {
            sd.errorMsg = "Cannot getById (experience): id is null";
            return sd;
        }

        Integer intId;
        try {
            intId = Integer.valueOf(id);
        } catch (Exception e) {
            sd.errorMsg = "Cannot getById (experience): URL parameter 'id' can't be converted to an Integer.";
            return sd;
        }
        try {
            String sql = "SELECT experience_id, location_visit, type_experience, "
                    + "image_experience, rating, cost, date_visit, experience.web_user_id, "
                    + "user_image, user_email "
                    + "FROM experience, web_user "
                    + "WHERE experience.web_user_id = web_user.web_user_id  "
                    + "AND experience_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the
            // the first (and only) ?
            stmt.setInt(1, intId);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.experience_id = Format.fmtInteger(results.getObject("experience_id"));
                sd.location_visit = Format.fmtString(results.getObject("location_visit"));
                sd.type_experience = Format.fmtString(results.getObject("type_experience"));
                sd.image_experience = Format.fmtString(results.getObject("image_experience"));
                sd.rating = Format.fmtInteger(results.getObject("rating"));
                sd.cost = Format.fmtInteger(results.getObject("cost"));
                sd.date_visit = Format.fmtDate(results.getObject("date_visit"));
                sd.web_user_id = Format.fmtInteger(results.getObject("web_user_id"));

            } else {
                sd.errorMsg = "Experience Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.experience.DbMods.getById(): " + e.getMessage();
        }
        return sd;
    } // getById
    public static StringData delete(DbConn dbc, String exprienceId) {

        StringData sd = new StringData();

        if (exprienceId == null) {
            sd.errorMsg = "modelexperience.DbMods.delete: " +
                    "cannot delete experience record because 'experience_id' is null";
            return sd;
        }

        sd.errorMsg = dbc.getErr();
        if (sd.errorMsg.length() > 0) { // cannot proceed, db error
            return sd;
        }

        try {

            String sql = "DELETE FROM experience WHERE experience_id = ?";

            // Compile the SQL (checking for syntax errors against the connected DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, exprienceId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                sd.errorMsg = "Record not deleted - there was no record with experience_id " + exprienceId;
            } else if (numRowsDeleted > 1) {
                sd.errorMsg = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in modelexperience.DbMods.delete(): " + e.getMessage();
        }

        return sd;
    }
}