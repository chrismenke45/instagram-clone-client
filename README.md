# Instagram Clone Front End
This is the front end of the instagram clone I'm currently building with React.
## How it's made:
Tech used: TypeScript with React.js, CSS, Google firebase (firestore)
<br />
This front end works with my [instagram clone api](https://github.com/chrismenke45/instagram-clone-api) to give users the full instagram expierence. Reusable components were made with TypeScript with React and styled with vanilla CSS.  The front end currently does all inferfacing with Google firestore for photo storage. I made this architecture decision in order to keep my outbound data transfer low on my backend to keep my backend hosting free.
## Optimizations
 I would like to make the css easier to understand/read for others, and I think I will look into using tailwind.css in the future. I will be incorperating it into my next project. I would also have my backend interface with my photo store if cost wasn't an issue. This would allow the backend to call for photo deletion when deleting model instances instead of needing to delete the photo off of firestore from the front end and then deleting the model instance from the backend.
 ## Lessons learned
 TypeScript is incredible. It makes code so much more readable and easier to decipher. I will be using it in most projects moving forward and will push my teams to use it in the future. This was also my first large project to use the useReducer and useContext hooks. They were extremely helpful and I will be using them in the future for complex and/or global state management.
 

