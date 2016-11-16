/**
** Name : Lydia Cupery
** Class: CS 336/Web Development
** Date: September 15, 2016
**/

//array to store friends in
var friendsArray = [];

//object prototype for person with name, birthdate, and greeting
function Person(firstName, lastName, birthdate, greeting){
	this.firstName = firstName;
	this.lastName = lastName;
	this.birthdate = birthdate;
	this.greeting = greeting;
}

//mutator method for name
Person.prototype.updateName = function(newFirst, newLast){
	person.firstName = newFirst;
	person.lastName = newLast;
}

//accessor method for birthdate to compute age
Person.prototype.getAge = function(){
    var today = new Date();
    var birthDate = new Date(this.birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//mutator method that adds a new friend
Person.prototype.addToFriends = function(){
	friendsArray.push(this);
}

//method to print the greeting
Person.prototype.printGreeting = function(){
	console.log(this.firstName + " person says " + this.greeting);
}


//define me, Paige, and moses and Person objects 
var me = new Person("Lydia", "Cupery", "1995/03/01", "Selam Canlarim <3");
var Paige = new Person("Paige", "Brinks", "2003/01/01", "Guten Tag!");
var Moses = new Person("Moses", "Kevin", "1994/01/01", "Hello");

//and myself(I must be getting desperate...), Paige and Moses as friends
me.addToFriends();
Paige.addToFriends();
Moses.addToFriends();

//print the greetings of my friends
Paige.printGreeting();
me.printGreeting();
Moses.printGreeting();

//print out everything in the friends array
for(i=0; i<friendsArray.length; i++){
	console.log("One of my friends is " + friendsArray[i].firstName + " " + friendsArray[i].lastName);
}

//calculate my age and Paige's age
var age = me.getAge();
var age2 = Paige.getAge();
//print out the calculated ages
console.log("My age is " + age);
console.log("Paige's age is " + age2 + " (not actually)");

//object prototype for student, inherits all features from Person and adds a subject of study
function Student(firstName, lastName, birthdate, greeting, studySubject){
	Person.call(this, firstName, lastName, birthdate, greeting);
	this.studySubject = studySubject;
}

//Student is a type of Person
Student.prototype = Object.create(Person.prototype);

//re-define the printGreeting method for a student
Student.prototype.printGreeting = function() {
	console.log(this.firstName + " student says " + this.greeting);
}

//create instance of student
var academicMe = new Student("Lydia", "Cupery", "1995/03/01", "I hope you are stuyding!", "Computer Science");
//have that instance of student print a greeting
academicMe.printGreeting();
//have it print out field of study
console.log(academicMe.firstName + " is studying " + academicMe.studySubject);




