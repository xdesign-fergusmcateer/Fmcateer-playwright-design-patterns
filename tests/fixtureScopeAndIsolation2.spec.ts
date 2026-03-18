import {test as base} from '@playwright/test'

//once again, note the below lines 4-6 were suggested by Gemini, as well as adding <MyFixtures> to line 10.
type MyFixtures = {
    counterFixture: number;
};

let counter = 0

const test = base.extend<MyFixtures>({
    counterFixture: [async({}, use) => {
        counter++;
        await use(counter);
    },
    {scope: 'test'}]
});

test.skip()

test("Test 1", async({ counterFixture }) => {
    console.log(`Test 1 Counter: ${counterFixture}`);
});

test("Test 2", async({ counterFixture }) => {
    console.log(`Test 2 Counter: ${counterFixture}`);
});

test("Test 3", async({ counterFixture }) => {
    console.log(`Test 3 Counter: ${counterFixture}`);
});