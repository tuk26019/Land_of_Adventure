package model.experience;

public class StringData {
    public String experience_id = ""; // These field names should match the column names from the SQL query
    public String location_visit = "";
    public String type_experience = "";
    public String image_experience = "";
    public String rating = "";
    public String cost = "";
    public String date_visit = "";
    public String web_user_id = ""; 
    public String user_image = "";
    public String user_email = ""; 
    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    public int characterCount() {
        String s = this.experience_id + this.location_visit + this.type_experience +
                this.image_experience + this.rating + this.cost + this.date_visit + this.web_user_id +
                this.user_image + this.user_email;
        return s.length();
    }

    // not required, can be useful for debugging
    public String toString() {
        return "Experience Id: " + this.experience_id
                + ", Location Visit: " + this.location_visit
                + ", Type Experience: " + this.type_experience
                + ", Image Experience: " + this.image_experience
                + ", Rating: " + this.rating
                + ", Cost: " + this.cost
                + ", Date Visit: " + this.date_visit;
    }
}