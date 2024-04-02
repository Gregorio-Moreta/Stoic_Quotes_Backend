# Vercel Deployment Instructions

### Step-by-step instructions

1. Create a folder called `api` on the root of your application
2. Move your files and folders into the newly created api folder
   - config
   - controllers
   - models
   - routes
   - utils
   - index.js 

Make sure to rename your `server.js` file to `index.js`, be sure to comment out the `app.listen` function, and replace it with `export default app`. It should look something like this 

```javascript
// app.listen(PORT, () =>{
//     console.log(`you are listening on port https://localhost:${PORT}`)
// })

// A minor change, to the index.js file, vercel needs you to export the app like this

// You should leave the app.listen function in there so you can run it on your local server if you want to. 

// All you have to do is comment the app.listen back in and comment out the export default app

export default app
```

3. If you run the following command `tree -L 1`, you should see the following output on the root of your project directory:

``` javascript
├── README.md
├── api
├── node_modules
├── package-lock.json
├── package.json
├── stoicQuotes.json
└── vercel.json

3 directories, 5 files
```

4. The api folder when you run the following command `tree api -L 1` should look like this
   
``` javascript
api
├── config
├── controllers
├── index.js
├── models
├── routes
└── utils

6 directories, 1 file
```

5. 
   When you refactor the application in this way, make sure you test everything thoroughly and verify that all your imports are correct, because when you move the folders into the new api folder, the imports need to point to the right folders, sometimes imports are not updated properly and this could break your app. 
   
   Make sure to test all of your endpoints and check that the folders are imported correctly.

6. Create a `vercel.json` file on the root of your directory if you haven't already and add the following code block
```javascript
{
    "version": 2,
    "builds": [
      {
        "src": "api/index.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        
        "src": "/(.*)",
        "dest": "api/index.js"
      }
    ]
}
```

The build command described here and the router should point to your api/index.js file which is essentially just your server.js file, vercel requires you to name it index.js and put it in the api directory.

7. Update your package.json file and update the `"main"` key value pair to point to the `api/index.js` file and also update the `"start"` script to point to the `api/index.js` as well. The package.json file should look something like the following

```javascript
{
  "name": "stoic_quotes_backend",
  "version": "1.0.0",
  "description": "",
  "main": "api/index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node ./api/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.18.3",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.2.1",
    "morgan": "^1.10.0"
  }
}
```
The main entry point to your app is determined by the `"main"` key value pair, and the start script will be executed after the main entry point is executed vercel builds and launches your application in the server when you host/ deploy it.

8. Be sure to configure your environmental variables in the settings/ environmental variables tab on vercel itself when you import your project, for this project you need to add the following env values

```javascript
DATABASE_URI="mongodb+srv://seir:<PASSWORD>@sei.c1juz.mongodb.net/<DATABASE NAME>?retryWrites=true&w=majority"
PORT='3001'
SECRET='mysecret'
```
- Do not forget to add your password and the name you would like to give to your database in your connection string!

![screenshot of setting env variables](./assets/Screen%20Shot%202024-04-02%20at%204.08.43%20PM.png)


9. Set your production branch to the one you would like to deploy 

![screenshot of setting a production branch](./assets/Screen%20Shot%202024-04-02%20at%204.12.55%20PM.png)

10. Create a deployment hook if you want to deploy a branch without having to push to it.

- Name your deployment hook in both input fields after the branch you want to deploy, in this case add `feature/vercel-deployment` to both input fields. 
- You should get the deployment hook URL back and you can execute it by doing the following command 
  ``` javascript
  curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_Jg8cdEI7GE4jhkCYEZKegCn1fCZR/4Y0rJKjRdv
  ```

![screenshot of creating a deployment hook](./assets/Screen%20Shot%202024-04-02%20at%204.14.42%20PM.png)

When you execute the deployment hook command in the terminal it should look something like this

![screenshot of executing the deployment hook](assets/Screen%20Shot%202024-04-02%20at%204.31.15%20PM.png)

1.   Check your deployment on the vercel for the feature/vercel-deployment on the deployments tab.
It should look something like this

![screenshot of the deployment in the deployments tab](assets/Screen%20Shot%202024-04-02%20at%204.23.22%20PM.png)

12. The deployment, if it was successful should look something like

![screenshot of the ](assets/Screen%20Shot%202024-04-02%20at%204.24.49%20PM.png)

# Contratulations!
If everything went well you were able to deploy your application, well done! If the app failed, you should get ready to debug, retrace the steps and verify that you followed along and didn't skip anything. If all else fails ask for help.


## Bonus
If you got this far, you can also import the following endpoints to your postman and have access to these routes I  have set up for you









