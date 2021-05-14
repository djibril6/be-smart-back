# be-smart-back 
This simple Node JS application is the back-end of this Angular web applicaiton: https://github.com/djibril6/be-smart
This project is made for learning some best practices in web security. So we did a penetration testing to find commoms flaws and vulnerability and then we fix them. 

## running
This applicaition use mongoDB for data storage so you need to install it and create user and database for this app.
Then you have to create a .env file in the root of the projet and add the mongoDB connections identifiers through the variable `MONGODB_URI`, 
and the secret word for the token with the `MOT_SECRET_TOKEN` variable. 

install all required packages with `npm install` and run the app with `npm start`.
