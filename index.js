const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [              // handling request
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' }
];
app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message);
    return;
  }
  
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// Handling HTTP GET Requests
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with given ID was not found');
  res.send(course);
});

// //Route Parameters
// app.get('/api/courses/:id', (req, res) => {
//   res.send(req.params.id);
// });

// // Multiple Parameters
// app.get('/api/posts/:years/:month/:date/:time', (req, res) => {
//   res.send(req.params);
// });

// app.get('/api/posts/:years/:month/:date/:time', (req, res) => {
//   res.send(req.query);
// });

// PORT Environtment Variables
const port = process.env.PORT || 3200;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
