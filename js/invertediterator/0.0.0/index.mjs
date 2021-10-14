// import InvertedPromise from "../invertedpromise/0.0.0/index.mjs";
// const END = Symbol('END');
// export default () => {
//   let done;
//   let promise;
//   const out = {};
//   const getNext = () => {
//     return promise = InvertedPromise();
//   };
//   out.iterator = (async function * (){
//       try {
//         while(true){
//           if(done){
//             throw END;
//           }
//           yield await getNext().promise;
//           if(done){
//             throw END;
//           }
//         }
//       }catch(e){
//         if(e !== END){
//           throw e;
//         }
//       }
//   })();
//   out.resolve = (value) => promise?.resolve(value);
//   out.reject = (value) => promise?.reject(value);
//   out.end = () => {
//     done = true;
//     promise?.reject(END);
//   };
//   return out;
// };
// With Cache
import InvertedPromise from "../invertedpromise/0.0.0/index.mjs";
import pause from "../pause/0.0.0/index.mjs";

const END = Symbol("END");
export default () => {
  let done;
  let promise;
  const out = {};
  const cache = [];
  const getNext = () => {
    if (cache.length) {
      return { promise: cache.shift() };
    }
    return (promise = InvertedPromise());
  };
  out.iterator = (async function* () {
    try {
      while (true) {
        if (done) {
          throw END;
        }
        await pause();
        yield await getNext().promise;
        await pause();
        if (done) {
          throw END;
        }
      }
    } catch (e) {
      if (e !== END) {
        throw e;
      }
    }
  })();
  out.resolve = async (value) => {
    await pause();
    if (promise) {
      promise.resolve(value);
    } else {
      cache.push(value);
    }
    await pause();
  };
  out.reject = (value) => {
    if (promise) {
      promise.reject(value);
    }
  };
  out.end = () => {
    done = true;
    if (promise) {
      promise.reject(END);
    }
  };
  return out;
};
