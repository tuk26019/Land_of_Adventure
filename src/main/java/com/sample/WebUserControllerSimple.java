package com.sample;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import model.webUser.StringData;
import model.webUser.StringDataList;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@RestController
public class WebUserControllerSimple {

    @RequestMapping("/webUser/getAllSimple")
    public String dbController() {
        StringDataList strDataList = new StringDataList();
        StringData sd = new StringData();
        String msg = "";
        try {
            String DRIVER = "com.mysql.cj.jdbc.Driver";
            Class.forName(DRIVER);
            Connection conn = null;
            try {
                String dbAndPass = "sp24_3308_tuk26019?user=tuk26019&password=ohV4gaen";
                String url = "jdbc:mysql://localhost:3307/" + dbAndPass; // Assumes running from home
                conn = DriverManager.getConnection(url);
                String sql = "SELECT web_user_id, user_email FROM web_user "
                        + "ORDER BY web_user_id ";
                try {
                    PreparedStatement stmt = conn.prepareStatement(sql);
                    ResultSet results = stmt.executeQuery();
                    while (results.next()) {
                        sd = new StringData();
                        try {
                            sd.webUserId = String.valueOf(results.getInt("web_user_id")); // convert to string
                            sd.userEmail = results.getString("user_email");
                        } catch (Exception e) {
                            msg = "Exception thrown while extracting data from result set. Error is: "
                                    + e.getMessage();
                            sd.errorMsg = msg;
                            System.out.println(msg);
                        }
                        strDataList.add(sd);
                    } 
                    results.close();
                    stmt.close();
                } catch (Exception e) {
                    msg = "Exception thrown compiling this SQL (" + sql + "). Error is: " + e.getMessage();
                    strDataList.add(sd);
                    System.out.println(msg);
                } finally {
                    conn.close();
                }
            } catch (Exception e) {
                msg = "Exception thrown trying to connect. Error message: " + e.getMessage();
                strDataList.add(sd);
                System.out.println(msg);
            }
        } catch (Exception e) {
            msg = "Exception thrown trying to find MySQL Drivers. Error message: " + e.getMessage();
            strDataList.add(sd);
            System.out.println(msg);
        }
        return dbUtils.Json.toJson(strDataList);
    }
}