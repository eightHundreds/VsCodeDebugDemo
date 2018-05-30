import { sum,sumAsync } from "./index";
it("test sum", () => {
    expect(sum(1,2)).toBe(3)
});
it('test async sum',async (done)=>{
    expect(await sumAsync(2,3)).toBe(5)
    done()
})