### Project has multiple iterations of the application (Testing things yaaay)
- development branch is a simplified version of the website that was created for specific use for a community. 
- production is an oooold version of the site (I was using the branches correctly then) Should still work? I wasn't in the habit of using tags yet so yeah. That's probably version 1.* of the site.
- I don't remember what devProcess branch is for.
- forums/favorites and guildRecruitmentNeeds were test branches for features that may or may not have gotten implemented. This version of the site should be when it was fully implemented. Permissions, forums, applications, user management, etc... All of this never got updated with the refactored versions and angular 2 site.
- angularRefactor is development updated to run angular 1.X with a webpack server instead of gulp. It was more of a proof of concept attempt. Not sure if it even works anymore.
- angular 2 branch is the same look as development, but has been completely over-hauled to angular 2 specifications and no longer uses gulp. It has it's own readme


### Running the app

npm install

run mongo

npm start

gulp watch //For browsersync



For more information on AngularJS please check out http://angularjs.org/
For more on Express and Jade, http://expressjs.com/ and http://jade-lang.com/.
Also used is angular-material.