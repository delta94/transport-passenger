import { City, District } from '../models';


const findAll = (req, res, next) => {
  let { offset, limit } = req.query;
  offset = parseInt(offset, 10) || 0;
  limit = parseInt(limit, 10) || 100;
  City.findAll({
    offset, limit,
    include: [{ model: District, as: 'center_district' }]
  })
    .then(data => res.status(200).send({ data }))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const findOneById = (req, res, next) => {
  const { id } = req.params;
  City.findById(id, { include: [{ model: District, as: 'center_district' }] })
    .then((data) => {
      if (!data)
        return res.status(404).send({ message: 'Data not found' });
      return res.status(201).send({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const updateOneById = async (req, res, next) => {
  const { id } = req.params;
  const new_data = req.body;
  try {
    let data = await City.findById(id);
    if (!data) {
      if (!data)
        return res.status(404).send({ message: 'Data not found' });
    }
    data = await data.update(new_data);
    return res.status(200).send({ data, message: 'Data is updated' });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const insert = (req, res, next) => {
  const data = req.body;
  City.create(data)
    .then(data => res.status(201).send({ data, message: 'Data is inserted' }))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const deleteOneById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await City.findById(id);
    if (!data) {
      return res.status(404).send({ message: 'Data not found' });
    }
    await data.destroy();
    return res.status(200).send({ message: 'Data is deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};


export default {
  findAll,
  findOneById,
  insert,
  updateOneById,
  deleteOneById
};
