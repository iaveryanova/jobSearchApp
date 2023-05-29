# Getting Started with Create React App

**Application for searching and managing vacancies**  
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  

## Available Scripts
In the project directory, you can run:  

###  `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.  
The page will reload when you make changes.  
You may also see any lint errors in the console.  

**Note: Need to fill *.env* or create *.env.local* at the root of the project with the following options**  
REACT_APP_LOGIN=LOGIN  
REACT_APP_PASSWORD=PASSWORD  
REACT_APP_CLIENT_ID=CLIENT_ID  
REACT_APP_CLIENT_SECRET=CLIENT_SECRET  
REACT_APP_X_SECRET_KEY=X_SECRET_KEY  
REACT_APP_X_API_APP_ID=X_API_APP_ID  

## Functionality

API service Superjob was used (https://api.superjob.ru/).  

**Implemented the following endpoints:**  
- Password authorization  
- Job search (the user sees a list of available vacancies, as well as filters to narrow the search)  
- Industry Directory  
- Job vacancy (the user can click on a vacancy and get to the “Vacancy” page for its detailed view)  
- Favorites (the user can save the job as a favorite by clicking on the star, the user can remove the vacancy from favorites by clicking again on the star)  
- Loader (display loader while waiting for server response)  
- Implemented pagination of vacancies  

### UI  
The project is made using Mantine components library  