click-to-comment
================



## API

We've included a sample backend service for recieving feedback, which includes no persistence-- submissions are merely printed to the console.

The handler at /save accepts POST's of JSON data in a form that looks like:

```json
[
    {
        "x": 1,
        "y": 2,
        "text": "thisismyfeedback"
    },
      {
        "x": 3,
        "y": 4,
        "text": "thisismyfeedback"
    }
  
]
```

The only validation that(currently) occurs is that the submission is an array
