import async from 'async';
import unique from 'unique-random';

import fakeEmployee from './employee';
import { Employee, Assistant, Driver, Manager, Seller } from '../../../server/models';

const fake = require('fakerator')();

const fakeDriver = (id) => {
  const license_number = fake.misc.uuid();
  return { id, license_number };
};

const fakeSeller = (id) => {
  const exp_transaction = fake.random.number(0, 10);
  return { id, exp_transaction };
};

const TYPE = ['Ticket Collector', 'Roustabout', 'Tour Guide'];
const fakeAssistant = (id) => {
  const random_number = fake.random.number(0, TYPE.length - 1);
  const type = TYPE[random_number];
  return { id, type };
};

const roles = ['assistant', 'driver', 'seller'];
export default () => new Promise((resolve, reject) => {
  Manager.findAll().then((managers) => {
    async.eachSeries(managers, (manager, cb) => {
      const employees = [];
      const amountEmployee = fake.random.number(1, 15);
      const role = roles[fake.random.number(0, 2)];
      for (let i = 0; i < amountEmployee; i++) employees.push(fakeEmployee(role, manager.id));
      async.eachSeries(employees, (employee, cb2) => {
        Employee.create(employee).then((employee) => {
          if (employee.role == 'assistant') {
            Assistant.create(fakeAssistant(employee.id)).then((dt) => {
              console.log(`Assistant ${dt.id} created`);
              return cb2();
            }).catch(err => cb2(err));
          } else if (employee.role == 'driver') {
            Driver.create(fakeDriver(employee.id)).then((dt) => {
              console.log(`Driver ${dt.id} created`);
              return cb2();
            }).catch(err => cb2(err));
          } else if (employee.role == 'seller') {
            Seller.create(fakeSeller(employee.id)).then((dt) => {
              console.log(`Seller ${dt.id} created`);
              return cb2();
            }).catch(err => cb2(err));
          }
        }).catch(err => cb2(err));
      }, ((err) => {
          if (err) return cb(err);
          return cb();
        }));
    }, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  })
    .catch(err => reject(err));
});
