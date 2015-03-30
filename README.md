# Database API
--------

## Courses DB API
---

Methods to access the User database;
For getter methods, callback should in the form function(error, returned_data).
For setter methods, callback should in the form function(error, number_of_docs_affected, raw_mongo_response).


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