// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'empTracker_db'
    },
    console.log(`Connected to the employeetracker_db database.`)
  );