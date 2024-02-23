const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'Amudha7!',
  database: 'signup',
})

app.post('/createemployee', (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const department = req.body.department
  const dob = req.body.dob
  const gender = req.body.gender
  const designation = req.body.designation
  const salary = req.body.salary

  db.query(
    'INSERT INTO employee (id,name,department,dob,gender,designation,salary) VALUES(?,?,?,?,?,?,?)',
    [id, name, department, dob, gender, designation, salary],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('values are inserted')
      }
    }
  )
})

app.get('/getemployee', (req, res) => {
  db.query('SELECT * FROM employee', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})



app.delete('/deletestudent/:id', (req, res) => {
  const id = req.params.id

  db.query(
    'DELETE FROM employee WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting employee')
      } else {
        console.log('Employee deleted successfully')
        res.status(200).send('Employee deleted successfully')
      }
    }
  )
})

app.listen(5000, () => {
  console.log('backend working')
})
