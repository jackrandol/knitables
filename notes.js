// make sauce, grate cheese, knead dough, a beer

function makeSauce() {
    return new Promise ((resolve, reject) =>{

        setTimeout(() => {

            console.log('sauce done!');
            resolve();
        }, 2000);

    });
}

function grateCheese() {
    return new Promise ((resolve, reject) =>{

        setTimeout(() => {

            console.log('cheese done!');
            resolve();
        }, 1000);

    });
}

function kneadDough() {
    return new Promise ((resolve, reject) =>{

        setTimeout(() => {

            console.log('dough done!');
            resolve();
        }, 1500);

    });
}

// function makePizza() {
//     makeSauce().then(() => {
//         grateCheese().then(()=>{
//             kneadDough().then(() => {
//                 //once i'm here my pizza is done!
//             });
//         });
//     });
// }

async function makePizza() {
    const sauceProm = makeSauce();
    const cheeseProm = grateCheese();
    const doughProm = kneadDough();

    await Promise.all([ sauceProm, cheeseProm, doughProm ]);
    //once i'm here my pizza's done!
    return 'pizza';
}

//concurrency

makePizza();


///// rules of HOOKS /////

1. can only be used in function components

2. they must start with the word 'use'

3. they must be called at the top level of the component (ie can't be called in loops )
