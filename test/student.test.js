const pg = require('../src/db');
const Student = require('../src/models/student.model');

jest.mock('../src/db');

test('should fetch students', () => {
  const students = {
    rows: [
      {idstudent: '1', emailstudent: 'foobar@etu.umontpellier.fr'},
      {idstudent: '2', emailstudent: 'johndoe@etu.umontpellier.fr'},
    ]
  };
  const res = [
    {id: '1', email: 'foobar@etu.umontpellier.fr'},
    {id: '2', email: 'johndoe@etu.umontpellier.fr'},
  ];
  pg.query.mockImplementation(() => Promise.resolve(students))
  return Student.getAll().then(data => expect(data).toEqual(res));
});
