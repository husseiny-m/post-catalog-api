const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(postController.getPosts));
router.post('/', catchErrors(postController.cratePost));
router.delete('/:id', catchErrors(postController.deletePost));
router.put('/:id', catchErrors(postController.updatePost));
router.get('/:id', catchErrors(postController.getPost));

module.exports = router;
