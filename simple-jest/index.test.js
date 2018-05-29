const sum = require('./index').sum

it('test sum',()=>{
    expect(sum(1,2)).toBe(3)
})