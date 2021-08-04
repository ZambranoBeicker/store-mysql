# With MySQL Store

---

A Single Page Application built in Vanilla JS (JavaScript) and plain CSS without any framework or library. This is just a simple
page that lets you see ordered data by categories and you can use the search bar to browse items that contains the words you type.

The next lines explain the process i used to build the app.

## Webpack

Webpack is a JS module bundler that lets you improve the performance of your web app and that's why is so important to use it for
a frontend web app and this is i started with. Just a simple webpack configuration that creates the final bundle and optimize the
files. You can know more about it on `webpack.config.js`

## File structure and code organization

### JS

```
- src/index.js
- src/js/app.js
- src/js/product.js
- src/js/search.js
- src/js/helpers.js
```

I decided to use an object literal-like design pattern for the JS code because I don't want everyone can access to certain
features that are supposed to be unique to those parts of the app. For example, every function or feature i build for the main
content section needs to be only used for that part. That's why you will see files like `product` or `search`. Every file
contains only the needed features for its related part in the app.

Since this is an small exercise i don't want to spend a lot of time arranging the files in an scalable structure. I just want
to work the easiest way i could with every file so i just throw all every JS file into a JS folder and the same for the CSS.

Going back to the design patterns i used, i wanted to use some concepts from SOLID and Singleton patterns. Every "subscriber" will
be notify about the events and then do the necesary actions. For example, the app will fetch the data at the first load, when that
happens the "Main Content Subscriber" will show all the data. But there's only one main content so in `src/product.js` i made it
throw an exception if you try to add more than one subscriber and the same applies for the search bar

### CSS

```
- src/css/index.css
- src/css/card.css
- src/css/header.css
- src/css/variables.css
```

The CSS structure is not so difficult to understand what i did. I just wanted to have all the styles separated for each section, one file per section. And, as you can see in the `src/index.js`, the `src/index.css` file also import every file into it and the
global styles are put in that file.

There's only one break point for desktop resolutions i wanted to use because, again, this is a simple exercise. I like to work
using the _mobile first_ approach so you will see that every media query is only for desktop resolutions.

## Deploy

### Frontend

To deploy the web page i used netlify because of its ease. Only press one or two buttons and everything will be available whitin
one or two minutes.

### Backend

The backned was quite more difficult since this is my first time deploying an API. I'm using heroku to serve my API with pm2
to guarantee that it will be available all the time restarting it if there's some problem.
