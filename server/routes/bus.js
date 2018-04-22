import express from 'express';

const router = express.Router();

import BusCtrl from '../controllers/bus';

router.get('/', (req, res, next) => {
  let { offset, limit } = req.query;
  offset = offset || 0;
  limit = limit || 100;
  BusCtrl.findAll(offset, limit, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send({
      data: rows
    });
  });
});

router.post('/', (req, res, next) => {
  const data = req.body;
  BusCtrl.insert(data, (err, ret) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (ret.rowsAffected) {
      return res.status(201).send({
        message: 'Data is inserted successfully'
      });
    }
    console.log(ret);
    return res.status(400).send({
      message: 'Data requested to insert is not valid or conflict'
    });
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  BusCtrl.findOneById(id, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (data) {
      return res.status(201).send({
        data
      });
    }
    return res.status(404).send({
      message: 'Data not found'
    });
  });
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  BusCtrl.updateOneById(id, data, (err, success) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (success) {
      return res.status(200).send({
        message: 'Data is updated'
      });
    }
    return res.status(400).send({
      message: 'Data requested to update is not valid or conflict'
    });
  });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  BusCtrl.deleteOneById(id, (err, success) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (success) {
      return res.status(200).send({
        message: 'Data is deleted'
      });
    }
    return res.status(404).send({
      message: 'Data requested to delete is not found'
    });
  });
});

export default router;
