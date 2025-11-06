"use strict";

function Blog() {
    return (
        <div className="blog">
            <h3>Blog</h3>
            
            <h5>My Database Experience</h5>
                <h6>I do not have any type of Database Experience</h6>
       
            <h5>My Database Experience</h5>
                <h6>I do not have any type of Database Experience</h6>
            
            <h5>My Web Development Experience</h5>
                <h6>I have very little experience in creating a website. It has been a few years since I did web development. I learned HTML/CSS and a little bit of javascript back in high school</h6>
            
            <h5>HW 1 Home Page</h5>
                <h6>In this assignment what I found interesting to do was the ability to change the color of a link when hovering. I think what was valuable was the ability to create an unordered bullet list. What I found to be a little bit confusing was the concept of the database table. I was also confused on whether or not the media query worked.</h6>

            <h5>Database</h5>
                <h6>I do not have a lot of database experience. Working on this homework assignment was a challenge because the MySQLWorkbench was not working well with me.</h6>
            
            <h5>SPA HW</h5>
                <h6>What I found most difficult is that the links that once worked no longer worked.It took a while recoginize file in order for the link to work. I saw that my
                    API link was not working no more even though I did the same steps as before. It worked as a local but not as a link. Something that was confusing was multiple
                    css file. It took me a while to separate them. What I found valuable in this is the ability to create a a dropdown and the ability to change pages.
                </h6>
            
            <h5>Component HW</h5>
                <h6>What I found most interesting about this assignment is the ability to change the price and name of the destination.
                    I also think that the ability to change thing is very valuable to know. What I found confusing was the difference between js and react when they seem somewhat similar to each other. 
                </h6>
    
            <h5>Web API  HW</h5>
            <h6>What I found the easiest is to organize each file. The thing that I found hard to do was to see if I have linked and done everything else correctly, even after tunneling in. When I typed the localhost I mostly saw the whitelabel. 
                I also found it difficult to write the string sql for my other table.
            </h6>

            <h6>To see my <strong>List Users API</strong> open up in a new tab,click <a href="webUser/getAll" target="_blank">here</a>. </h6>
            <h6>To see my <strong>List Experience API</strong> open up in a new tab, click <a href="experience/getAll" target="_blank">here</a>. </h6>
            <h6>Click <a target="_blank" href="docs/WebAPI_db_errors.pdf">here</a> to see my Web API error document</h6>

            <h5>Show Data Sort HW</h5>
            <h6>For this homework I was able to fix my travel list JS and React buttons to work correctly. I also tried to fix the sql string. What I found difficult was that I was able to follow the format from the HW sample but I was not able to see it on my website.</h6>
            <h6> Due to not having localhost working I was not sure if I had made a mistake. I was able to make my other data show and was able to place a design for the table.</h6>

            <h5>Logon HW</h5>
            <h6>In this assignment I was able to fix my experience view in order to be able to see user_image and user_email so I was able to add them to the experience table.</h6>
            <h6>Something that I was struggling with in this assignment was to know how many files I needed to create. I also got confused  It was interesting to learn on how to do the login, logout and to get the profile.</h6>

            <h5>Insert HW</h5>
            <h6>I found this assignment to be interesting. It was fun to learn on how to insert new data. What I slightly struggled with was being able to put this assignments function in the table that I already have. </h6>

	        <h5>Update HW</h5>
            <h6>In this assignment I was able to update new data into my database table. What I found to be challenging was at first I could not get experience_id to show but then I realized it was a spelling mistake much later on. This was an interesting hw to learn about. </h6>

            <h5>Delete HW</h5>
            <h6>I found this assignment to be easy and helpful. I had no trouble to complete this assignment. Along the way I was able to fix majority of the other assignments.</h6>

            <h5>Server Page</h5>
                <h6>If you would like to see my API open up in a new tab, click <a href="world" target="_blank">here</a>.</h6>
    
            <h5>Proposed Database Table</h5>
                <ul>
                    <h6><li>DestinationID: Integer</li></h6>
                    <h6><li>DestinationName: VARCHAR</li></h6>
                    <h6><li>StartDate: DATE</li></h6>
                    <h6><li>EndDate: DATE</li></h6>
                    <h6><li>Cost: DECIMAL</li></h6>
                </ul>    
        </div>
    );
}