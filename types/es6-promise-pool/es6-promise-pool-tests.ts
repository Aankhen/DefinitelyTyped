/// <reference types="node"/>
import PromisePool = require("es6-promise-pool");

const promiseProducer = () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 5000);
    });
};

// The number of promises to process simultaneously.
const concurrency = 3;

// Create a pool.
const pool = new PromisePool(promiseProducer, concurrency);

// Start the pool.
const poolPromise = pool.start();

// Wait for the pool to settle.
poolPromise.then(() => {
    console.log("All promises fulfilled");
}, (error) => {
    console.log("Some promise rejected: " + error.message);
});

import Bluebird = require("bluebird");
import { PromiseClass, Options } from "es6-promise-pool";

class FakePromise<T> implements PromiseLike<T> {
    constructor(callback: (resolve: (value?: T | FakePromise<T>) => void, reject: (reason?: any) => void) => void) {
    }

    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseLike<TResult1 | TResult2> {
        throw new Error("stub");
    }
};

const promiseProducer2 = () => {
    return Bluebird.resolve(3);
};

const options: Options<number, Bluebird<number>> = {
    promise: Bluebird,
};

const options2 = {
    promise: Bluebird,
};

const options3 = {
    promise: FakePromise,
};

const pool2 = new PromisePool(promiseProducer2, concurrency, options);
const pool3 = new PromisePool(promiseProducer2, concurrency, options2);
const pool4 = new PromisePool(promiseProducer2, concurrency, { promise: Bluebird });
const pool5 = new PromisePool(promiseProducer2, concurrency);
const pool6: PromisePool<number, Bluebird<number>, PromiseClass<number, Bluebird<number>>> =
    new PromisePool(promiseProducer2, concurrency, { promise: Bluebird });
const pool7 = new PromisePool(5, concurrency, { promise: FakePromise });
const pool8 = new PromisePool(promiseProducer2, concurrency, { promise: FakePromise });

// make sure the types aren't flattened
const foo2: Bluebird<number> = pool2.start();
const foo3: Bluebird<number> = pool3.start();
const foo4: Bluebird<number> = pool4.start();
const foo5: FakePromise<number> = pool5.start();
const foo6: FakePromise<number> = pool6.start();
const foo7: FakePromise<number> = pool7.start();
const foo8: FakePromise<number> = pool8.start();