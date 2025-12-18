# Howling

Live demo: https://howlingtailwind.netlify.app/

Howling is a social media frontend project built with Tailwind CSS v4 and JavaScript ES Modules. It connects to the Noroff Social API for posting, commenting, reacting, following users, and more.

## Features

- Register and login with a @stud.noroff.no email
- Create, edit, and delete posts (with media and tags)
- Follow and unfollow users
- Comment on and react to posts
- Search posts
- Responsive UI with an animated mobile menu

## Improvements for Portfolio 2

- Improved login UX by replacing browser alerts with inline error/success messages and a loading state.
- Added authentication handling for protected pages: unauthenticated users are redirected to the login page with a friendly message.
- Added post-login redirect support so users return to the page they originally tried to access.

## Prerequisites

- Node.js (v20+)
- npm

### Installation

```bash
npm install
```
```bash
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

## Technologies

- Tailwind CSS v4

- JavaScript (ES Modules)

- HTML5

- REST API (Noroff Social API)

- Prettier

- CSS for Menu animation

## Author

RunarPettersen

GitHub: https://github.com/RunarPettersen