const router = require('express').Router();
let Ex = require('../models/ex.model');

// router.route('/').get((req, res) => {
//   Ex.find()
//     .then((exs) => res.json(exs))
//     .catch((err) => res.status(400).json('Error: ' + err));
// });

router.get('/', async (req, res) => {
  try {
    const sendEx = await Ex.find({});
    res.send(sendEx);
  } catch {
    res.status(500).send();
  }
});
/// ===> Add a new user

// With async
router.post('/add', async (req, res) => {
  const username = req.body.username;
  const cash = Number(req.body.cash);
  const credit = Number(req.body.credit);

  const newEx = new Ex({ username, cash, credit });
  try {
    await newEx.save();
    res.status(201).send(newEx);
  } catch (e) {
    res.status(400).send(e);
  }
});

/// ===> Get one user

router.route('/:id').get((req, res) => {
  Ex.findById(req.params.id)
    .then((ex) => res.json(ex))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//with await
// router.get('/:id', async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const idEx = await ex.findById(_id);
//     if (!idEx) {
//       return res.status(404).send();
//     }
//     res.send(idEx);
//   } catch {
//     res.status(500).send();
//   }
// });

/// ===> Delete one user

router.delete('/:id', async (req, res) => {
  try {
    const delUser = await Ex.findByIdAndDelete(req.params.id);

    if (!delUser) {
      res.status(404).send();
    }

    res.send(delUser);
  } catch (e) {
    res.status(500).send();
  }
});

/// ===> Update one user

router.patch('/update/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['username', 'cash', 'credit'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await Ex.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
