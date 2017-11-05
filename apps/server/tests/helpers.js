exports.shouldHaveAndEqual = function(res, prop, equal){
  res.body.should.have.property(prop).eql(equal);
}
