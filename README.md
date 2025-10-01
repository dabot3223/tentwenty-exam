# tentwenty-exam
# npm version 10.8.2
# node version: 20.18.0
# XAMPP vaesion v3.3.0
# mysql version: mysql  Ver 15.1 Distrib 10.4.28-MariaDB, for Win64 (AMD64), source revision c8f2e9a5c0ac5905f28b050b7df5a9ffd914b7e7
# php version: PHP 8.0.28 (cli)

# instructions
Create a database with database name: tt_exam
download sql file from => https://drive.google.com/drive/folders/1sUEssmb133U16v2elrCHXDyPPM3vwXCl?usp=drive_link
import the sql file in the database tt_exam 

now open this project in visual studio => open terminal
(assuming u have NVM (node version manager) installed if not please install NVM)
install node 20.18.0 using => nvm install 20.18.0 (if not already installed)
switch to 20.18.0 using => nvm use 20.18.0
run command npm i (this will install all the dependencies from package.json)
now if you want you can run it on developer mode using => npm run dev
or 
production mode by running command=> npm run build 
after build is finished npm start

This is a nextjs project 
I have used app router 
Libraries used :
 Antd(for form, button etc components), 
 axios (for api connections), 
 moment(for date), 
 mysql2(to run mysql query in internal apis)
 react-bootstrap(used container of react bootstrap)

# for tentwenty official 
this is a partially done task
the query in this api /api/timesheet/getWeeklydata/route.js is made with the help of chatgpt 

# time taken
29-Sept => 3hrs
30-Sept => 20min + 5hrs 30 min
1-Oct => 40min

# total time spent => 9hrs 30 min