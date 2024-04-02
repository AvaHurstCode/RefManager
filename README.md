# Notes for Hand-in:

### Install dependencies through `npm install`

### Start with `npm run devStart`

### Access through `localhost:4000`

## Routes for database testing:

- `/projects` - Displays list of projects from the database
  - Click the black square to delete the project
  - Click "edit" to edit the project name and author
- `/editProject/<ProjectId>` - Form to edit project - ID handled through the edit button in the `/projects` page
- `/newProject` - Form to create new project entry into the database

## Other routes:

- `/` or `/index` - Homepage
- `/about` - About page
- `/login` - Login page (non-functioning, takes you to projects overview on submit)
- `/editor` - A work in progress project editor page (non-functioning)

# Description

A referencing tool web-app that allows users to create and manage image references for their artworks and other creative processes.

Future features:

- Infinite canvas
- Drag and Drop images
- Create gradient
- Sort images

Learning Resources:
It was my goal with this project to not use any AI generated content at all, not even to explain things to me or to tell me what is wrong with my code. Every line was written manually by me, with the exception of reset.css which has content from https://meyerweb.com/eric/tools/css/reset/index.html, and a couple of one liners from places like w3schools.com which I modified.

I mention this because I got extremely hooked into learning CSS and pushed my skills far beyond my own expectations. Every time I completed an effect I would get inspired to make a new one, making sure never to directly follow a tutorial for them as to push my skills further. I'm very proud of how much I've learned, and I'd hate for it to be put down to the use of AI.

The main resources I used for learning were:

https://developer.mozilla.org/en-US/docs/Web/CSS/ - I have read more of this than i'd like to admit.

https://www.youtube.com/@Hyperplexed - This channel got me fully into learning CSS, the way they broke down the effects into smaller components completely opened my eyes as to what was possible with just CSS.

https://www.youtube.com/@KevinPowell - I learned almost everything from watching his videos.

https://www.youtube.com/@Fireship - Was useful for some basic knowledge, but very limited tutorials.

IMPORTANT:
This git repository was started after roughly a week of learning the basics of CSS. My earlier experimentation for this same project can be found in a seperate git repository: https://github.com/AvaHurstCode/Referencing-Tool
I restarted this project as the old one was getting messy, and I had a bunch of new ideas I wanted to try in a new environment
