# Database API
--------

* Methods to access the User database.
* For getter methods, callback should be in the form function(error, returned_data).
* For setter methods, callback should be in the form function(error, affected_document).

## Users API
---

|	Method							|  return              |
|--------------------------------|-----------------------------------|
|addBookmarkById(user_id, newBookmark, callback) | return edited user (if any)|
|addCourseById(user_id, courseId, callback) | return edited user (if any)|
|addNotificationById(user_id, newNotification, callback) | return edited user (if any)|
|createUser(user_id, password, username, role, callback) | return created user (if any)|
|deleteUserById(user_id, callback) | return deleted user (if any)|
|dropUserDatabase(callback) | return void|
|getBookmarksById(user_id, callback) | return users bookmarks|
|getCoursesById(user_id, callback) | return users courses|
|getUnreadNotificationsById(user_id, callback) | return users notification|
|getUserById(user_id, callback) | return whole users info|
|getUserRoleById(user_id, callback) | return users role|
|setNameById(user_id, firstName, lastName, callback) | return edited user (if any)|
|setUsernameById(user_id, newUsername, callback) | return edited user (if any)|




## Courses API
---

|	Method							|  return              |
|--------------------------------|-----------------------------------|
addUserById(courseId, userId, callback) | return course |
createCourse(semester, department, courseNumber, callback) | return course |
getCourseById(courseId, callback) | return course | 
getRegisteredUsersById(id, callback) | return course.registeredUsers |
getAllUserEmailsById(id, callback) | returne course.emails|
dropCoursesDatabase(callback) | return 1 for success 0 for failure |
deleteCourseById(courseID, callback) | return 1 for success 0 for failure |



 












