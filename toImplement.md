add conditional to form view that displays tier intervention radio buttons based on subject slected
make faculty select boxes searchable by typing

Add Every feature/commit to Readme.md as a note, refactor later

Add mongoose
  //-config
  //-Faculty model
  -Student model
    -form validations
  -create seed and deseed script
    //-for Faculty

Add PassportJs
  -implement login page
  -add passport-local strategy
    -add sessions
    -make sure password is stored with argon2
    -model password methods for Faculty
  -verify access
  -link logout in navbar to logout passport function

Create Dashboard
-add favicon
  -list students in database (name, grade, hrteacher, forms )
    -only list students with forms
  -allow teacher to view or print any worksheet from the student
  -implement a new worksheet flow at the top of the page
    -one row,
      1. autofill student names from db
      2. select subject
      3. select intervention tier
        -throw error if student has the same tier&&subject || !tier < selectedTier&&subject
      4. click to enter the form
        -will load students name, and predetermined info into hidden fields
        -will serve the proper form with the conditional objects determined by subject


Create Tier Two Worksheet
  -Make sure all inputs for the district template are included
    -conditionally populate tier intervention radio options
    -serve student data into hidden fields
    -serve previous problem id as the devault value for the textarea
    -serve previous intervention descriptions as hidden input fields and display lists
  -Review validations
  -Make sure the data is persisted to an object in the students appropriate list using form submission data
  -Return user to dashboard after creation with success flash message


--COMPLETES EXPECTED IMPLEMENTATION--

Add DocX Templater
  -add to student display on Dashboard
  -clicking creates the file and sends it to the browser print page
