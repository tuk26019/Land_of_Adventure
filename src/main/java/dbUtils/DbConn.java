package dbUtils;

import java.sql.DriverManager;
import java.sql.Connection;

public class DbConn {

    private String errMsg = "";
    private java.sql.Connection conn = null;

    public DbConn() {

        String dbAndPass = "sp24_3308_tuk26019?user=tuk26019&password=ohV4gaen";
        try {
            String DRIVER = "com.mysql.cj.jdbc.Driver";
            Class.forName(DRIVER);
            try {
                // Assume you are running from home using tunneling...
                String url = "jdbc:mysql://localhost:3307/" + dbAndPass;

                // unless you are working from temple (e.g., lab computer or published)
                if (this.isTemple()) {
                    url = "jdbc:mysql://cis-linux2.temple.edu:3306/" + dbAndPass;
                }
                this.conn = DriverManager.getConnection(url);

            } catch (Exception e) { // cant get the connection
                recordError("Problem getting connection:" + e.getMessage());
            }
        } catch (Exception e) { // cant get the driver...
            recordError("Problem getting driver:" + e.getMessage());
        }
    } // method

    private void recordError(String errorMsg) {
        this.errMsg = errorMsg;
        System.out.println("Error in DbConn. " + errorMsg);
    }

    public Connection getConn() {
        return this.conn;
    }

   
    public String getErr() {
        return this.errMsg;
    }

    public void close() {

        if (conn != null) {
            try {
                conn.close();
            } 
            catch (Exception e) {
            } 
        } 
    } 

    private boolean isTemple() {
        boolean temple = false;
        try {
            String hostName = java.net.InetAddress.getLocalHost().getCanonicalHostName();
            hostName = hostName.toLowerCase();
            System.out.println("***** hostName is [" + hostName + "] *****");
            if (hostName.endsWith("temple.edu")) {
                temple = true;
            }
        } catch (Exception e) {
            recordError("Unable to get hostName: " + e.getMessage());
        }
        return temple;
    }
    protected void finalize() {
        this.close(); 
    }

} 
