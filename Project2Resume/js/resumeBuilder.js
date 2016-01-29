// bio information section
var bio = {
    "name": "William Sisson",
    "role": "Director of Product Development",
    "contacts": {
        "mobile": "215-555-1212",
        "email": "tressisson@gmail.com",
        "github": "tressisson",
        "twitter": "none",
        "location": "Dallas, TX"
    },
    "welcomeMessage": "I am currently a web guy in Dallas Texas.",
    "skills": ["HTML5", "CSS3", "JavaScript", "AngularJS"],
    "biopic": "images/bioPic.jpg",
    "display": function () {
        var headerName = HTMLheaderName.replace("%data%", bio.name);
        var headerRole = HTMLheaderRole.replace("%data%", bio.role);

        var headerMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
        var headerEmail = HTMLemail.replace("%data%", bio.contacts.email);
        var headerTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
        var headerGithub = HTMLgithub.replace("%data%", bio.contacts.github);

        var headerPic = HTMLbioPic.replace("%data%", bio.biopic);
        var headerMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);


        $("#header").prepend(headerRole);
        $("#header").prepend(headerName);
        $("#header").append(headerPic);
        $("#header").append(headerMessage);

        $('#topContacts').append(headerMobile);
        $('#topContacts').append(headerEmail);
        $('#topContacts').append(headerTwitter);
        $('#topContacts').append(headerGithub);
        
        $('#footerContacts').append(headerMobile);
        $('#footerContacts').append(headerEmail);
        $('#footerContacts').append(headerTwitter);
        $('#footerContacts').append(headerGithub);

        $("#header").append(HTMLskillsStart);
        
        // function to display skills array
        for (var i = 0; i < bio.skills.length; i++) {
            var headerSkills = HTMLskills.replace("%data%", bio.skills[i]);
            $("#header").append(headerSkills);
        }

    }
};
bio.display();


// education information section
var education = {
    "schools": [
        {
            "name": "Texas A&M University - Commerce",
            "location": "Commerce, TX",
            "degree": "Masters of Science",
            "majors": ["Technology Management"],
            "dates": "2011-2013",
            "url": "http://www.tamuc.edu/"
        },
        {
            "name": "Texas A&M University - Commerce",
            "location": "Commerce, TX",
            "degree": "Bachelor of Applied Science",
            "majors": ["Business Management"],
            "dates": "2013-2014",
            "url": "http://www.tamuc.edu/"
        }
    ],
    "onlineCourses": [
        {
            "title": "Javascript Basics",
            "school": "Udacity",
            "date": "2016",
            "url": "https://www.udacity.com"
        },
        {
            "title": "Intro to HTML and CSS",
            "school": "Udacity",
            "date": "2016",
            "url": "https://www.udacity.com"
        },
        {
            "title": "Responsive Images",
            "school": "Udacity",
            "date": "2016",
            "url": "https://www.udacity.com"
        },
        {
            "title": "Intro to JQuery",
            "school": "Udacity",
            "date": "2016",
            "url": "https://www.udacity.com"
        }
    ],
    "display": function () {
        $("#education").append(HTMLschoolStart);
        for (var i = 0; i < education.schools.length; i++) {
            var schoolName = HTMLschoolName.replace("%data%", education.schools[i].name);
            var schoolDegree = HTMLschoolDegree.replace("%data%", education.schools[i].degree);
            var schoolDates = HTMLschoolDates.replace("%data%", education.schools[i].dates);
            var schoolLocation = HTMLschoolLocation.replace("%data%", education.schools[i].location);

            $(".education-entry").append(schoolName + schoolDegree);
            $(".education-entry").append(schoolDates);
            $(".education-entry").append(schoolLocation);

            for (var x = 0; x < education.schools[i].majors.length; x++) {
                var schoolMajor = HTMLschoolMajor.replace("%data%", education.schools[i].majors[x]);
                $(".education-entry").append(schoolMajor);
            }

        }
        $("#education").append(HTMLonlineClasses);
        for (var z = 0; z < education.onlineCourses.length; z++) {
            var onlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[z].title);
            var onlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[z].school);
            var onlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[z].date);
            var onlineURL = HTMLonlineURL.replace("%data%", education.onlineCourses[z].url);
            $("#education").append(HTMLschoolStart);
            $(".education-entry:last").append(onlineTitle + onlineSchool);
            $(".education-entry:last").append(onlineDates);
            $(".education-entry:last").append(onlineURL);
        }
    }
};
education.display();

// work information section
var work = {
    "jobs": [
        {
            "employer": "ESI Estech Systems",
            "title": "Director of Product Development",
            "location": "Plano, TX",
            "dates": "Feb 2015 - Present",
            "description": "Worked as a senior web developer, then team lead of web dev and mobile.  Later Engineering Manager and then Director."
        },
        {
            "employer": "Genband",
            "title": "Sr. Web Developer (Short-Term Contract)",
            "location": "Frisco, TX",
            "dates": "October 2014 - February 2015",
            "description": "Worked on a short-term contract as a Sr. Web Dev."
        },
        {
            "employer": "City of Crandall",
            "title": "Head of IT / Detective",
            "location": "Crandall, TX",
            "dates": "November 2008 - October 2014",
            "description": "Worked as Head of IT and a Police Detective"
        },
        {
            "employer": "The Southern Hunter",
            "title": "Owner",
            "location": "Kaufman, TX",
            "dates": "August 2004 - April 2010",
            "description": "Owned a sporting goods retail business with a physical and online presence."
        },
        {
            "employer": "Texas Instruments",
            "title": "Web Developer",
            "location": "Dallas, TX",
            "dates": "May 2001 - August 2004",
            "description": "Worked as a web developer for ti.com and created several hundred partner extranets."
        },
        {
            "employer": "epicRealm",
            "title": "Web Developer",
            "location": "Richardson, TX",
            "dates": "March 2000 - May 2001",
            "description": "Worked as a web developer for a web content caching startup company."
        },
        {
            "employer": "Safeguard",
            "title": "Web Developer",
            "location": "Dallas, TX",
            "dates": "March 1999 - March 2000",
            "description": "Build corporate website and partner extranet using ASP."
        },
        {
            "employer": "MCI",
            "title": "Systems Engineer",
            "location": "Richardsonb, TX",
            "dates": "September 1998 - March 1999",
            "description": "Worked as a systems engineer on a telecom translation and provisioning system."
        }
    ],
    "display": function () {

        $("#workExperience").append(HTMLworkStart);      
        
        // display work info function
        for (var i = 0; i < work.jobs.length; i++) {

            var jobEmployer = HTMLworkEmployer.replace("%data%", work.jobs[i].employer);
            var jobTitle = HTMLworkTitle.replace("%data%", work.jobs[i].title);
            var jobLocation = HTMLworkLocation.replace("%data%", work.jobs[i].location);
            var jobDates = HTMLworkDates.replace("%data%", work.jobs[i].dates);
            var jobDescription = HTMLworkDescription.replace("%data%", work.jobs[i].description);

            $(".work-entry").append(jobEmployer + jobTitle);
            $(".work-entry").append(jobDates);
            $(".work-entry").append(jobLocation);
            $(".work-entry").append(jobDescription);
        }
    }
};
work.display();

// project inforation section
var proj = {
    "projects": [
        {
            "title": "Udacity Portfolio",
            "dates": "2016",
            "description": "Created a portfolio of projects",
            "images": ["images/portfolioImage1.jpg", "images/resumeImage1.jpg"]
        },
        {
            "title": "Online Resume",
            "dates": "2016",
            "description": "Developed a resume site for nanodegree project",
            "images": ["images/resumeImage1.jpg", "images/portfolioImage1.jpg"]
        }
    ],
    "display": function () {

        $("#projects").append(HTMLprojectStart);
        for (var i = 0; i < proj.projects.length; i++) {
            var projectTitle = HTMLprojectTitle.replace("%data%", proj.projects[i].title);
            var projectDate = HTMLprojectDates.replace("%data%", proj.projects[i].dates);
            var projDesc = HTMLprojectDescription.replace("%data%", proj.projects[i].description);

            $(".project-entry").append(projectTitle);
            $(".project-entry").append(projectDate);
            $(".project-entry").append(projDesc);
            
            //sub loop for multiple images
            for (var x = 0; x < proj.projects[i].images.length; x++) {
                var projectImage = HTMLprojectImage.replace("%data%", proj.projects[i].images[x]);
                $(".project-entry").append(projectImage);
            }
        }

    }
};
proj.display();


// Google map code
$("#mapDiv").append(googleMap);