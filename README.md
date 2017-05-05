# psd150-intervention-system



# For my project:
My project is an express application that allows a teacher to input educational
intervention data for a student they are working with, and persist that data as a document to a database.
The Teacher is also able to log into a dashboard, and see their students. Data is stored
for teachers and students as Documents using mongoose, login is done with passport-local and bcrypt
(there will be no registration as users will be added manually via an admin).

Pre-Existing implementation was: a partially complete handlebars template for the form,
an app.js file containing boilerplate for bodyparser, sessions, handlebars, and an index router,
which only renders the form template. The app also contains a .env file. I also have rough data models
done for teachers and students(to help structure the form template), but no validations or
model methods defined. (The models were changed significantly on conference with my dear mother who
this application will be used for)


# To Begin:
cd into the project folder, and run:
  $ npm install  OR  $ yarn install

(If you are running a Mac OS, please start your MongoDB before seeding)
Following successful installation of packages, in the applications root directory, run the command:
  $ node seed.js

This will clear any existing data, create 50 faculty members with random data, and 600 students with
one completed Worksheet attached each.


# Lets Party!
(Due to the timeframe, there are not any validations or required fields in the form or database.
  To enjoy the current functionality of the app, please be sure to populate all fields in the form
  before submitting.)

Every Faculty user is created with an email of foo1@bar.com, differentiated by the number following foo.
  eg. foo1@bar.com, foo20@bar.com, etc. (This is true from 1 to 49)

Every user shares the same password "Foo" (case sensitive of course)

To start the application, assuming you have seeded and installed dependencies, navigate to the
applications root directory and run:
  $ nodemon (or if not installed globally, run $ node app.js)

This will allow you to access the app in your web browser at:
  'http://localhost:3000'

Login with the credentials explained above, and youre on your way to filing your first educational
intervention form!!! exciting!


# Filing a Form
1. Click the leftmost dropdown menu at the top of the page, or begin typing to select a student.
2. Select the Subject and Tier of the Worksheet you wish to create
3. Clicking the button on the right will bring you to a form page where you will enter the
    appropriate information and click submit.
4. You will be redirected to your home page where you will see that student (and their form)
    attached to your dashboard so you can perform further actions and assess progress
5. You will be able to look at the terminal window running nodemon on successful submission of a form,
    and see that there is a 'pmStudents' array full of gobbldygook. That nonsense is each student and
    their associated forms (which live in an array on each students document). This will soon change
    to where I am storing a reference to the students instead of their entire object, The current functionality
    is simply to assure that it is being attatched to our current user.


# Where this app is going:
My mother and everyone else working doing interventions (focused help for kids falling behind)
  in the local school district are currently working from spreadsheets so this is a start at a solution.

My next steps are to push the existing functionality to all its breaking points, and patch accordingly.

Even before that, there is some major refactoring to be done in how tasks are being abstracted and how
data is being structured as it is passed around the app. Namely, as far as structures go, the
helpers that serve name and label values to the form are:
  not tier agnostic,
  do not correspond with schema keys, and are poorly named and separated.

the form creation transaction is also brittle to a fault and has no error handling.

Where I populate data from the form, all the assignment there was done piece by piece over many stages in the applications life,
so they deserve a good hard thinking about how that whole system can be more extensible (not to mention a lot of database querying in the background)

Finally, from the home page on, all navigation is done through post routers, which was just a hacky way to send some hidden field
data. Putting more thought into how that data could be transmitted server side is something I will certainly be looking at.

Total time coding was ~20 hours

There is a file in the root called toImplement.md that I used as a checklist and scratchpad through the
process if that is of any interest.
