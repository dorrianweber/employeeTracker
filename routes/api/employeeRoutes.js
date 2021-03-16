const router = require('express').Router();

// Change the anonymous callback function to become Asynchronous
router.get('/', async (req, res) => {
    // Store the employeeData in a variable once the promise is resolved.
    const employeeData = await Employee.findAll();
  
    // Return the employeeData promise inside of the JSON response
    return res.json(employeeData);
});

router.post('/', async (req, res) => {
    const employeeData = await Employee.create(req.body);
  
    return res.json(employeeData);
});

router.get('/:id', async (req, res) => {
    const employeeData = await Employee.findByPk(req.params.id);
  
    return res.json(employeeData);
});

router.post('/', async (req, res) => {
    const employeeData = await Employee.create(req.body);
  
    return res.json(employeeData);
});

router.delete('/:id', async (req, res) => {
    const employeeData = await Employee.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    return res.json(employeeData);
});

module.exports = router;