TypeScript application created adhering to the rules of Domain-Driven Design.

# What does this application do?
It’s variation of bin packing problem solution. The truck with unlimited number and load of packs arrives daily in the morning. The warehouseman has to repack all packs to courier’s cars. The maximum load of single courier car is 200 kg. Application optimize the number of needed courier’s cars to minimum. All actions connected with packs and warehouseman are kept in memory during the object lifecycle and we have access to them.

# What is it for?
 - to show that it’s possible to write code in TypeScript adhering to the rules of DDD.
 - simple to understand (there are no repositories, no unnecessary lines of code).
 - to show that it’s possible to implement IoC without using Dependency Injection (just implement public interface and use your own strategy to repack the truck).
 - I always wondered if it’s possible: [my question in stackoverflow](http://stackoverflow.com/questions/34027990/domain-driven-design-in-node-js-application).
 
# How to test it?
Unit tests:
```
npm test
```

Intergration tests:
```
npm run-script integration-test
```

# Usage
[Usage example](https://github.com/dawiddominiak/ddd-typescript-bin-packing-problem-solution/blob/master/integration-test/workday.ts#L37)
