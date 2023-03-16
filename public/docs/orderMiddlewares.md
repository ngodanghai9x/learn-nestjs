## Summary
### In general, the request lifecycle looks like the following:
Incoming request
Globally bound middleware
Module bound middleware
Global guards
Controller guards
Route guards
Global interceptors (pre-controller)
Controller interceptors (pre-controller)
Route interceptors (pre-controller)
Global pipes
Controller pipes
Route pipes
Route parameter pipes
Controller (method handler)
Service (if exists)
Route interceptor (post-request)
Controller interceptor (post-request)
Global interceptor (post-request)
Exception filters (route, then controller, then global)
Server response