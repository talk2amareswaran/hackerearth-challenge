The application has been developed by using Spring Boot 2.0 version with Gradle build.
Used Bootstrap 4 and JQuery for User Interface design and API calls from the client.
MySQL database has been used to fetch the data from the database.

Steps to run the application is given below.

1. Open the scripts.sql file.
2. Replace the CSV file path on the LOAD DATA sql command.
3. Execute the scripts.sql file into the MySQL database.

4. Now, open the application.yml file on the src/main/resources directory, then in the datasource property - provide a valid username and password to connect the database.
5. Then, open parent folder in command prompt. For example - C:\talk2amareswaran-downloads\tedtalksdemo\tedtalksdemo
6. use gradle clean build command to take a build of this application. (dependencies will download. So application will take more time on first time build)
7. After the build successful, go to the build/libs directory.
8. You can see the tedtalksdemo-0.0.1-SNAPSHOT.jar file.
9. Now run the command - java -jar tedtalksdemo-0.0.1-SNAPSHOT.jar
10. Application will start on the port 8080.

Now hit the url - http://localhost:8080/ on your web browser and do the action - use chrome

API URL 
http://localhost:8080/tags
http://localhost:8080/talks