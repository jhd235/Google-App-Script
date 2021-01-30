function listCourses() {
  var courses = [];
  var ownerId = [];
  var pageToken = null;
  var optionalArgs = {
    pageToken: pageToken,
    pageSize: 100
  };
  while (true) {
    var response = Classroom.Courses.list(optionalArgs);
    // @ts-ignore
    var courses = response.courses;
    if (!pageToken) {
       break;
    }
  }
  if (courses.length === 0) {
    Logger.log("No courses found.");
  } else {
    Logger.log("Courses:");
    // @ts-ignore
    for (course in courses) {
      // @ts-ignore
      Logger.log('%s (%s) %s %s', getName(courses[course].ownerId), getEmail(courses[course].ownerId), courses[course].name, getGroup(courses[course].id, courses[course].id));
      
    }
  }
  return ownerId;
  //return courses;
}

function getEmail(id) {
  return Classroom.UserProfiles.get(id).emailAddress;
}

function getName(id) {
  return Classroom.UserProfiles.get(id).name.fullName;

}

function getGroup(id, cid) {
  //return Classroom.Courses.Teachers.get(id, ownerId).profile.emailAddress;
  //return Classroom.UserProfiles.get(id).emailAddress;
  return Classroom.Courses.CourseWork.get(id, cid);
}
