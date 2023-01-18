const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
      // find all categories
      const categories = await Category.findAll({
          include: [{
              model: Product,
              as: 'products'
          }]
      });
      res.status(200).json(categories);
  } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve categories' });
  }
});


router.get('/:id', async (req, res) => {
  try {
      // find one category by its primary key
      const category = await Category.findByPk(req.params.id, {
          include: [{
              model: Product,
              as: 'products'
          }]
      });
      if (!category) {
          res.status(404).json({ message: 'Category not found' });
      } else {
          res.json(category);
      }
  } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve category' });
  }
});


router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
