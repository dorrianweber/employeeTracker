const router = require('express').Router();
const books = require('./employeeRoutes');

router.use('/employees', employees);

module.exports = router;