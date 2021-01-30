/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START classroom_list_courses]
/**
 * Lists all course names and ids. 
 */

function consolidation(){
  var ids = listCourses();
  //var emails = listEmails(ids);
  Logger.log('%s', ids);
}

function doGet(e) {
  //var template = HtmlService.createTemplateFromFile('Index');

  // Retrieve and process any URL parameters, as necessary.
  /*
  if (e.parameter.folderId) {
    template.folderId = e.parameter.folderId;
  } else {
    template.folderId = 'root';
  }

  // Build and return HTML in IFRAME sandbox mode.
  return template.evaluate()
      .setTitle('Web App Window Title')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);

    
        var string = listCourses();
        return HtmlService.createHtmlOutput(string);
        //return listCourses().toString();
*/
  var res = listCourses();
  
  var params = JSON.stringify(res);
  
  /*
  var pp = JSON.parse(params);
  
*/
  var result = [];

  for(var i in res)
    result.push([i, res [i]]);
  //return result;
  //return HtmlService.createHtmlOutput(params);
  return typeof(params);
}



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
      //Logger.log('%s (%s) (%s)', courses[course].name, courses[course].id);
      ownerId.push(listEmails(courses[course].ownerId));
      
    }
  }
  return ownerId;
  //return courses;
}

function listEmails(id) {
  //var emails = [];
  var emails = Classroom.UserProfiles.get(id);  
  Logger.log('%s', emails.emailAddress);
}




  
 // [END classroom_list_courses]
