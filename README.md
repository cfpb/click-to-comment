⚠️ THIS REPO IS DEPRECATED ⚠️

click-to-comment
================

## Requirements

- [npm](https://npmjs.org/)
- [grunt-cli](http://gruntjs.com/getting-started)
- [Bower](http://bower.io/)

## Workflow

1. Clone the repo and `cd` into its root.
2. `npm install` - Pulls in npm dependencies.
3. `bower install` – Pulls in Bower components.
4. `grunt server` – launches the demo, including sample backend service.


## API

We've included a sample backend service for recieving feedback, which includes no persistence-- submissions are merely printed to the console.

The handler at /save accepts POST's of JSON data in a form that looks like:

```json
[
    {
        "x": 1,
        "y": 2,
        "text": "this language is confusing"
    },
      {
        "x": 3,
        "y": 4,
        "text": "Poor contrast!"
    }
  
]
```

The only validation that(currently) occurs is that the submission is an array
