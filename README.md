# Database API
--------

Methods to access the User database;
For getter methods, callback should in the form function(error, returned_data).
For setter methods, callback should in the form function(error, number_of_docs_affected, raw_mongo_response).

## Courses DB API
---



|	Method							|  return              |
|--------------------------------|-----------------------------------|
|deleteUserByEmail(email, callback) | return 1 for success 0 for failure|
|dropUserDatabase(callback) | return 1 for success 0 for failure|
|getBookmarksByEmail(email, callback) | return users bookmarks|
|getCoursesByEmail(email, callback) | return users courses|
|getUnreadNotificationsByEmail(email, callback) | return users notification|
|getUserById(Objectid, callback) | return whole users info|
|getUserRoleByEmai(email, callback) | return users role|
|setNameByEmail(email, firstName, lastName, callback) | return 1 for success 0 for failure|
|setUsernameByEmail(email, newUsername, callback) | return 1 for success 0 for failure|

## Users DB API
---


|	Method							|  return              |
|--------------------------------|-----------------------------------|
|addBookmarkByEmail(email, newBookmark, callback) | return 1 for success 0 for failure|
|addCourseByEmail(email, courseId, callback) | return 1 for success 0 for failure|
|addNotificationByEmail(email, newNotification, callback) | return 1 for success 0 for failure|
|createUser(email, password, username, role, callback) | return 1 for success 0 for failure|
|deleteUserByEmail(email, callback) | return 1 for success 0 for failure|
|dropUserDatabase(callback) | return 1 for success 0 for failure|
|getBookmarksByEmail(email, callback) | return user.bookmarks|
|getCoursesByEmail(email, callback) | return user.courses|
|getUnreadNotificationsByEmail(email, callback) | return userrs.notifications|
|getUserRoleByEmail(email, callback) | return user.role|
|getUserById(id, callback) | return entire user info|
|setNameByEmail(email, firstName, lastName, callback) | return 1 for success 0 for failure|
|setUsernameByEmail(email, newUsername, callback) | return 1 for success 0 for failure|















