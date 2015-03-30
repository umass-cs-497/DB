# Database API
--------

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