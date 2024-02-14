const Data = require('./products.json');
const Model = require('./model');
let Allquery = {};
const all = async (req, res) => {
  let {
    username,
    age,
    followers,
    location,
    gender,
    select,
    sort,
    page,
    limit,
  } = req.query;
  let userApi;

  var pages = Number(page) || 1;
  var limited = Number(limit) || 4;
  var skips = (pages - 1) * limited;

  if (username) {
    Allquery.username = { $regex: new RegExp(username, 'i') };
    // const n = await Model.find({
    //   username: { $regex: new RegExp(Allquery.username, 'i') },
    // });
    // res.status(202).send(n);
  }
  if (age) {
    Allquery.age = age;
  }
  if (followers) {
    Allquery.followers = followers;
  }
  if (location) {
    // Allquery.location = location;
    Allquery.location = { $regex: new RegExp(location, 'i') };
  }
  if (gender) {
    Allquery.gender = gender;
    // Allquery.gender = { $regex: new RegExp(gender, 'i') };
  }
  userApi = await Model.find(Allquery);
  if (select) {
    let selected = select.split(',').join(' ');
    userApi = await Model.find(Allquery).select(selected);
  }
  if (sort) {
    let sorted = sort.replace(',', ' ');
    userApi = await Model.find(Allquery).sort(sorted);
  }
  if (page || limit) {
    userApi = await Model.find(Allquery).skip(skips).limit(limited);
  }

  const finds = await userApi;

  res.status(200).send({ finds });
  Allquery = {};
};

module.exports = all;
