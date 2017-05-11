add conditional to form view that displays tier intervention radio buttons based on subject slected
make faculty select boxes searchable by typing

Add Every feature/commit to Readme.md as a note, refactor later

Add mongoose
  //-config
  //-Faculty model
  //-Student model
    -form validations
  //-create seed and deseed script
    //-for Faculty

Add PassportJs
  //-implement login page
  //-add passport-local strategy
    //-add sessions
    ??-make sure password is stored with argon2
    //-model password methods for Faculty
  //-verify access
  //-link logout in navbar to logout passport function

Create Dashboard
-add favicon
  //-list students in database (name, grade, hrteacher, forms )
    //-only list students with forms
  -allow teacher to view or print any worksheet from the student
  -when a student is present on a teachers dashboard,
    -allow them to view dropdowns of the students paperwork sorted by tier
    -further divided between reading, math, and behavior
  -implement a complete worksheet flow
    -select student(from proper faculty list)
    -load existing data as text and serve final boxes,

  //-implement a new worksheet flow at the top of the page
    //-one row,
      //1. autofill student names from db
        //-serve student names
        //-seed more students on a loop
        //-run large seed of inital students to benchmark
      //2. select subject
      //3. select intervention tier
        -throw error if student has the same tier&&subject || !tier < selectedTier&&subject
      //4. click to enter the form
        //-will load students name, and predetermined info into hidden fields
        //-will serve the proper form with the conditional objects determined by subject


New Tier Two Worksheet
  //-Make sure all inputs for the district template are included
    //-conditionally populate tier intervention radio options
    //-serve student data into hidden fields
    -serve previous problem id as the devault value for the textarea
    -serve previous intervention descriptions as hidden input fields and display lists
    //-label pm tools
    //-import teacher names as datalist (via helper)
    //-second group of progress details can select multiple
    //-break each section into partials
  -Review validations
    -add note as to mins/session validation
  -make sure it is pushed to all associated teachers associated students field
  -make sure it is separately added to the interventionists students field
  //-Return user to dashboard after creation
      -with success flash messages

Close Tier Two Worksheet
  -break intervention effectiveness section into a logic module that returns directly to form persistence
  -make sure progress details(group one) will have select buttons where only one can be selected at a time
  -persist completed date server side
  -confirm data before persisting


-persist to database correctly
-persist reference to the student to interventionist and hr teacher on creation

Split form entry into starting and closing pages

-changing db keys
  //-first models,
  //-second seeds,
  -third in home page,
  //-fourth in forms serving page
   -including helper methods
  //-fifth in form page
    -break out into partials
  -sixth in form persistence(implement new form persistence system)
-add student codes

consider what we are doing to serve student names into the dropdown on the dashboard, and resplitting it when we get to form submission. (seems convoluted)
  -pass objects with fullname and student document id
    -in worksheet, return id as hidden field, dont return name
  -do the same when passing faculty


-find way to populate worksheets when needed rather than on dashboard load (since loading will slow quickly with volume)
--COMPLETED EXPECTED IMPLEMENTATION--
Refactor: getStudentNames method - rename to getNames
          initial state for form creation
          combine id/populator helpers
          reformat id's to match db
          (once validations are in place)Make inputs identical to model so we can persist the response object without modification

Add DocX Templater
  -add to student display on Dashboard
  -clicking creates the file and sends it to the browser print page

Login features
  -not a user? send email to admin to notify

Implement flash messages
  -login
  -form creation
  -attempting to create invalid form

Step by step error handling
