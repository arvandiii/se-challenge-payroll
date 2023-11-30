# Wave Software Development Challenge

The backend for the Wave software development challenge payroll system is implemented using `Node.js` and the `Express.js` framework, with `MongoDB` as the database. `Docker` is utilized for service management.

## Running
To run the backend of the application, you'll need to:
1. If you haven't already, install Docker and Docker-compose on your system.
2. Create a .env file in the project root that contains `PORT=[Here should be the port you want]`
2. For running the tests you can use docker-compose with the following instruction:
```
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```
3. For running the backend as a service you can run the following command:
```
docker-compose up
```

## APIs
### The API for uploading a new CSV file
```
curl --location 'localhost:<PORT>/upload/report' --form 'reportFile=@"<PATH-TO-CSV>"'
```

### The API for getting the report
```
curl --location 'localhost:<PORT>/report'
```

## Answers to Questions
### 1. How did you test that your implementation was correct? 
My testing approach encompassed both positive and negative scenarios, utilizing a sample CSV file. This comprehensive testing strategy was aimed at verifying the system's capability to accurately parse and process data, compile payroll reports, and determine pay periods. The testing was conducted through two methodologies: unit tests and API tests. For the unit tests, Jest was employed, which is integrated into the codebase. On the other hand, API testing was performed using Postman's API testing tool. Additionally, I rigorously tested various edge cases to ensure the system's robustness, including the handling of duplicate CSV IDs.

### 2. If this application was destined for a production environment, what would you add or change?
If given the opportunity to enhance the project, my focus would be on the following improvements:

1. **Job Queue Implementation**: Integrate a job queue system like Kafka or RabbitMQ for handling file uploads. This would not only offload the task from the main process, enhancing performance, but also ensure efficient tracking and completion of upload jobs.

2. **API Validation**: Adopt an API validation framework, akin to FastAPI in Python. Such a framework automates schema verification and type checking, significantly reducing manual validation efforts.

3. **File Storage Method**: Transition to using a service like Amazon S3 for file uploads, moving away from the current approach of storing files in a temporary local directory.

4. **Integration of API Testing in CI/CD**: Incorporate API testing directly into the version control workflow, utilizing CI/CD tools like GitLab CI/CD. This would ensure consistent testing and quality assurance throughout the development process.

5. **Integration of API Testing in CI/CD**: Integrating a monitoring system stands out as a crucial improvement. This system would provide real-time insights into the application's performance, track errors, and monitor system health. Such a setup is vital for promptly identifying and addressing issues, ensuring reliable and efficient operation, especially as the application scales. The incorporation of monitoring tools like Grafana or Prometheus would offer comprehensive visibility into the system's metrics and logs, facilitating proactive maintenance and optimization.

### 3. What compromises did you have to make as a result of the time constraints of this challenge?
The API architecture for better maintainability should be changed. Currently, with only two APIs, the structure is consolidated in the main module. However, for scalability and clearer organization, it would be beneficial to segregate them into distinct files and groups.

More tests could be added to make sure that all edge cases are covered. 

All the items mentioned in previous question are the compromises I made because of the scope of this project.