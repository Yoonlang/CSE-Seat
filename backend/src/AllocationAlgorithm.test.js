const Allocation = require("./AllocationAlgorithm.js");
const Testcases = require("./AllocationAlgorithmTestcases.js");

describe("Allocation 함수 입출력 테스트", () => {
  for (let i = 0; i < Testcases.length; i++) {
    test(`${i + 1}번 테스트`, () => {
      expect(Allocation(Testcases[i].input)).toEqual(Testcases[i].output);
    });
  }
});
