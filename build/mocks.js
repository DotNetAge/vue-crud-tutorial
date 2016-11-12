var express = require('express');
var router = express.Router();
var mockData = require('../src/fixtures/items.json');
var _ = require('lodash');

router.get('/books', function (req, res) {
  var page = req.query.page || 0,
    size = req.query.size || 10,
    filter = req.query.filter,
    skipStart = (page > 0 ? page - 1 : page) * size,

    // 筛选合符条件的数据
    filteredData = filter ? _.filter(mockData, function (d) {
      return d.name.indexOf(filter) > -1
    }) : mockData;

  // 对数据进行分页
  pageData = _.take(_.slice(filteredData, skipStart), size);

  res.json({
    total_records: filteredData.length,
    total_pages: Math.ceil(filteredData.length / size),
    page: page,
    size: size,
    data: pageData
  });

})
  .post('/books', function (req, res) {
    debugger
    mockData.push(req.body)
    res.json(req.body)
  })
  .put('/books/:isbn', function (req, res) {
    mockData = _.reject(mockData, function (d) {
      return d.isbn === req.body.isbn
    })
    mockData.push(req.body)
    res.json({msg: 'success'})
  })
  .delete('/books', function (req, res) {
    mockData = _.reject(mockData, function (d) {
      return _.indexOf(req.body, d.isbn) > -1
    })
    res.json({msg: 'success'});
  });

module.exports = router;
