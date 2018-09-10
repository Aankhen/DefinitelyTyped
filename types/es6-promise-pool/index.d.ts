// Type definitions for es6-promise-pool 2.5
// Project: https://github.com/timdp/es6-promise-pool#readme
// Definitions by: Aankhen <https://github.com/Aankhen>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

/*~ Note that ES6 modules cannot directly export class objects.
 *~ This file should be imported using the CommonJS-style:
 *~   import x = require('someLibrary');
 *~
 *~ Refer to the documentation to understand common
 *~ workarounds for this limitation of ES6 modules.
 */

export = PromisePool;

declare class PromisePool<
    A,                        // the type of value returned by the source
    P extends PromiseLike<A>, // the type of Promise
    C extends PromisePool.PromiseClass<A, P> // a helper class
    > {
    constructor(
        source:
            A |
            P |
            IterableIterator<P> |
            (() => (P | undefined)),
        concurrency: number,
        options?: PromisePool.Options<A, P>
    );

    concurrency(concurrency: number): number;
    size(): number;
    active(): boolean;
    promise(): P;
    start(): P;
}

declare namespace PromisePool {
    interface PromiseClass<A, P extends PromiseLike<A>> {
        new(callback: (resolve: (value?: A | P) => void, reject: (reason?: any) => void) => void): P;
    }

    interface Options<A, P extends PromiseLike<A>> {
        promise?: PromiseClass<A, P>;
    }
}
