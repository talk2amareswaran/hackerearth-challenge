
The project has been developed in Spring Boot 1.5.16.RELEASE version with Gradle 2.4.12.

JDK version
1.8.0_181

Implemented OAuth2 Authorization Server and Resource Server concept to get the OAuth token and access the resource.

SQL Script file and SQL dump have been attached in the source. Please use anyone to load the data into the MySQL.

MySQL Username and Password has to be configured in the application.yml file.

Then, to run the application

come to the main folder and run the command - gradle clean build

After build successful, go the build and libs directory.

Now, run the JAR file by using the command - java -jar hotel-app-source-0.0.1-SNAPSHOT.jar

after the application started, go to the browser and hit the URL - http://localhost:8080/

JAR file also attached you can run the application directly. Before that, Database should be created and it will connect localhost with the username and password is root/root

Use the below email address and password to login into the application - or create a new user

email address: kite_d@gmail.com
password: amaramar

Output has been shared in the output folder.

Open API(s) 
http://localhost:8080/categories
http://localhost:8080/search/term
http://localhost:8080/search/hotels
http://localhost:8080/search/hotels/category
http://localhost:8080/search/hotels/{id}
http://localhost:8080/newuser

Protected API(s)
http://localhost:8080/book/confirm - Login required or send the access token in the request header


Web Pages
http://localhost:8080/
http://localhost:8080/index
http://localhost:8080/welcome
http://localhost:8080/search
http://localhost:8080/hotel
http://localhost:8080/login
http://localhost:8080/bookingpage
http://localhost:8080/logout
http://localhost:8080/register