# [Education Intervention Management System](https://github.com/markmarkyesyes/psd150-intervention-system)
### Current TDD MERN stack rewrite in progress


## About
EIMS is an easy to use system to manage and track educational interventions. This is being developed as a more reliable alternative to legacy management systems currently in place at Franklin Edison Primary School in Peoria, IL. It not only allows you to manage students' interventions, but will also allow easily presentable analytics regarding success rates of specific strategies.

## Server Setup
Clone the project into your desired directory then
```
$cd psd150-intervention-system
$npm install || $yarn install
$node seed.js
```

At this point, you will have a demo seeded instance of the application ready to run in a development environment.

Start with:
```
$nodemon || $node app.js
```
The local instance is now accessible with dummy users [here](http://localhost:3000)

## Demo Seed Information
Every Faculty user is created with an email of foo1@bar.com, differentiated by the number following foo.
_eg. foo1@bar.com, foo20@bar.com, etc. (This is true from 1 to 49)_
Every user shares the same password "Foo" (case sensitive)

## Filing a Form
1. Click the leftmost dropdown menu at the top of the page, or begin typing to select a student.
2. Select the Subject and Tier of the Worksheet you wish to create
3. Clicking the button on the right will bring you to a form page where you will enter the appropriate information and click submit.
4. You will be redirected to your home page where you will see that student (and their form) attached to your dashboard sou can perform further actions and assess progress
5. You will be able to look at the terminal window running nodemon on successful submission of a form,and see that there is a 'pmStudents' array full of gobbldygook. That nonsense is each student and their associated forms (which live in an array on each students document). This will soon change to where I am storing a reference to the students instead of their entire object, The current functionality is simply to assure that it is being attached to our current user.
