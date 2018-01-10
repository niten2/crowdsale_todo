- есть 2 числа. минимум скажем 10 тысяч, и максмум 20 тысяч.
- срок 1 неделя.
- ico считает успешным если достигнут минимум, если он не достигнут деньги возвращаются.
- ico закрывается, если достигнут максимум или если прошла 1 неделя.
- в первый день ico бонусы + 10%
- должен быть запрет на пересылку токенов если ico не законченно.


truffle test

npm run build
npm run test

# React Truffle Box

This box comes with everything you need to start using smart contracts from a react app. This is as barebones as it gets, so nothing stands in your way.

## Installation

1. Install Truffle globally.
    ```javascript
    npm install -g truffle
    ```

2. Download the box. This also takes care of installing the necessary dependencies.
    ```javascript
    truffle unbox react
    ```

3. Run the development console.
    ```javascript
    truffle develop
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

5. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm run start
    ```

6. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // If inside the development console.
    test

    // If outside the development console..
    truffle test
    ```

> 7. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
>     ```javascript
>     // Run Jest outside of the development console for front-end component tests.
>     ```

>     ```

