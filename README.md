# Frontend Mentor - Password generator app solution

This is a solution to the [Password generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.


### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript 


### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

Styling the range input slider for consitent appearance across browsers was a challenge with this project that I was not prepared for. Hoo boy, I spent hours trying different methods and deciding on which approach to take. Eventually, I settled on a CSS-only approach as I wanted to avoid using JavaScript to style elements as much as possible. The CSS is pretty complex (for me) and took a while to grasp, and honestly going a JS route may have been simpler, but it was an interesting detor nonetheless.



```html
<h1>Some HTML code I'm proud of</h1>
```
```css
.proud-of-this-css {
  color: papayawhip;
}
```
```js
const proudOfThisFunc = () => {
  console.log('🎉')
}
```

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

The password strength checker algorithm is quite rudimentary and somewhat arbitrary. I develped the logic by researching for about an hour and playing around with several tools I found online, including [The Password Meter](https://passwordmeter.com/). I fully recognize that to elevate this app to something more accurate to CyberSec standards will require a more robust solution or maybe even a third-party library. It's something I may tackle for a future revision of the project.


### Useful resources

- [modernCSSdev](https://moderncss.dev/pure-css-custom-checkbox-style/) - Stephanie Eckles content over at Modern CSS Solutions is one of my go-to resources and this custom checkbox style tutorial was a big help with this project.
- [Range slider for chrome - stackoverflow](https://stackoverflow.com/questions/65738788/input-range-slider-progress-for-chrome-browser) - This is the stackoverflow post that led me to my eventual solution for dealing with the range slider styling for chrome, based heavily on [this codepen](https://codepen.io/ShadowShahriar/pen/zYPPYrQ)


## Author

- Website - [Matt Pahuta](https://www.mattpahuta.com)
- Frontend Mentor - [@mattpahuta](https://www.frontendmentor.io/profile/MattPahuta)
- Bluesky - [@mattpahuta](https://bsky.app/profile/mattpahuta.bsky.social)
- LinkedIn - [Matt Pahuta](www.linkedin.com/in/mattpahuta)


## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.
