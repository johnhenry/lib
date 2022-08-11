const __PROCESS__ = async function (iterator) {
  const stack = [];
  for await (const item of iterator) {
    if (typeof item === "function") {
      if (item.APPLY) {
        const parity = item.PARITY ?? stack.length - 1;
        const subStack = [];
        const fn = stack.pop();
        for (let i = 0; i < parity; i++) {
          subStack.unshift(stack.pop());
        }
        for (const i of await fn(subStack)) {
          stack.push(i);
        }
      } else {
        stack.push(item);
      }
    } else {
      stack.push(item);
    }
  }
  return stack;
};
const __APPLY__ = function (parity = null) {
  const a = async function (args) {
    const stack = [];
    const fn = args.pop();

    for (const arg of args) {
      stack.push(await fn(arg));
    }
    return stack;
  };
  a.APPLY = true;
  a.PARITY = parity;
  return a;
};
const __EXPAND__ = function (stack) {
  const newStack = [];
  for (const item of stack) {
    for (const i of item) {
      newStack.push(i);
    }
  }
  return newStack;
};
const __COMPOSE__ = function (funcs) {
  return [
    (stack) => {
      let newStack = stack;
      for (const fn of funcs) {
        newStack = fn(newStack);
      }
      return newStack;
    },
  ];
};
const __PEEK__ = function (stack) {
  console.log(...stack);
  return stack;
};
let x, r, square$, double$, doublesquare$, carol, dave, eva, fiona, start, end, list, l, sum, product, mean, a, b, c;
import { reverse$, dupe$, mapAsync$, drop$, first$, collect$, if$, and$, or$, filter$, map$, to$, fromTo$, toInc$, fromToInc$ } from "../src/index.mjs";
import { sum$, product$, mean$, count$, modes$, mode$, sort$ , sortD$, randmoize$, populationStandardDeviation$, sampleStandardDeviation$, fiveNumberSummary$} from "../lib/stat.mjs";
x = await __PROCESS__([1,2,3,4,5,6,(stack=>stack.map(x=>x**x)),__APPLY__(),(stack=>stack.map(x=>x+1)),__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__([1,2,3,4,5,fiveNumberSummary$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__(['hello world',__PEEK__,__APPLY__(1)]);
await __PROCESS__([/*,prints,"hello world",*/
Math.random(),__PEEK__,__APPLY__(1)]);
await __PROCESS__(["",__PEEK__,__APPLY__(1)]);
r = await __PROCESS__([1,2,3,4,5,6,randmoize$]);
await __PROCESS__([r,__EXPAND__,__APPLY__(1),__APPLY__(3),__PEEK__,__APPLY__()]);
await __PROCESS__(["",__PEEK__,__APPLY__(1)]);
await __PROCESS__([1,2,3,sum$,__APPLY__(2),__PEEK__,__APPLY__()]);
await __PROCESS__([1,2,3,dupe$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__(["",__PEEK__,__APPLY__(1)]);
[square$] = await __PROCESS__([dupe$,product$,__COMPOSE__,__APPLY__()]);
await __PROCESS__([2,3,await __PROCESS__([dupe$,product$,__COMPOSE__,__APPLY__()]),__EXPAND__,__APPLY__(1),__APPLY__(1),__PEEK__,__APPLY__()]);
await __PROCESS__([2,3,dupe$,product$,__COMPOSE__,__APPLY__(2),__APPLY__(1),__PEEK__,__APPLY__()]);
await __PROCESS__([2,3,square$,__APPLY__(1),__PEEK__,__APPLY__()]);
[double$] = await __PROCESS__([dupe$,sum$,__COMPOSE__,__APPLY__()]);
[doublesquare$] = await __PROCESS__([double$,square$,__COMPOSE__,__APPLY__()]);
await __PROCESS__([4,3,doublesquare$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__(["",__PEEK__,__APPLY__(1)]);
carol = await __PROCESS__([3,4,5,(async(x)=>x**4),mapAsync$,__APPLY__(),__PEEK__,__APPLY__()]);
dave = await __PROCESS__([1,2,3,dupe$,__APPLY__(),__PEEK__,__APPLY__()]);
eva = await __PROCESS__([await __PROCESS__([1,2,3]),__EXPAND__,__APPLY__(1),__PEEK__,__APPLY__()]);
[fiona] = await __PROCESS__([3,square$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__(["",__PEEK__,__APPLY__(1)]);
start = await __PROCESS__([1,2,3]);
end = await __PROCESS__([7,8,9]);
await __PROCESS__([start,__EXPAND__,__APPLY__(1),4,5,6,end,__EXPAND__,__APPLY__(1),__PEEK__,__APPLY__()]);
await __PROCESS__(["",__PEEK__,__APPLY__(1)]);
list = await __PROCESS__([1,2,3,4,5]);
await __PROCESS__([list,__PEEK__,__APPLY__(1)]);
[l] = await __PROCESS__([list,__EXPAND__,__APPLY__(1),count$,__APPLY__()]);
[sum] = await __PROCESS__([list,__EXPAND__,__APPLY__(1),sum$,__APPLY__()]);
[product] = await __PROCESS__([list,__EXPAND__,__APPLY__(1),product$,__APPLY__()]);
[mean] = await __PROCESS__([list,__EXPAND__,__APPLY__(1),mean$,__APPLY__()]);
await __PROCESS__(["sum",sum,"product",product,"mean",mean,__PEEK__,__APPLY__()]);
await __PROCESS__(["sum",list,__EXPAND__,__APPLY__(1),sum$,__APPLY__(l),"product",list,__EXPAND__,__APPLY__(1),product$,__APPLY__(l),"mean",list,__EXPAND__,__APPLY__(1),mean$,__APPLY__(l),__PEEK__,__APPLY__()]);
await __PROCESS__(["sum",list,__EXPAND__,__APPLY__(1),sum$,__APPLY__(l),"product",list,__EXPAND__,__APPLY__(1),product$,__APPLY__(l),"mean",list,__EXPAND__,__APPLY__(1),mean$,__APPLY__(l),__PEEK__,__APPLY__()]);
await __PROCESS__(["",__PEEK__,__APPLY__(1)]);
await __PROCESS__(["",__PEEK__,__APPLY__(1)]);
await __PROCESS__([1,await __PROCESS__([2,3,4,5,6,product$,__APPLY__()]),__EXPAND__,__APPLY__(1),sum$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__([1,await __PROCESS__([2,3,4,5,6,product$,__APPLY__()]),sum$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__([await __PROCESS__([2,3,product$,__APPLY__()]),__EXPAND__,__APPLY__(1),await __PROCESS__([4,5,product$,__APPLY__()]),__EXPAND__,__APPLY__(1),sum$,__APPLY__(),__PEEK__,__APPLY__()]);
[a,b,c] = await __PROCESS__([1,2,3]);
await __PROCESS__([c,b,a,__PEEK__,__APPLY__()]);
await __PROCESS__([3,4,5,6,7,4,false,if$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__([0,0,0,6,7,0,false,or$,__APPLY__(),12,3,__PEEK__,__APPLY__()]);
await __PROCESS__([3,4,5,6,7,4,(x=>x>5),mapAsync$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__([0,1,2,3,4,5,8,to$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__([0,1,2,3,4,5,8,fromTo$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__([0,1,2,3,4,5,8,toInc$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__([0,1,2,3,4,5,8,fromToInc$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__([5,-5,to$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__([5,-5,fromTo$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__([5,-5,toInc$,__APPLY__(),__PEEK__,__APPLY__()]);
await __PROCESS__([5,-5,fromToInc$,__APPLY__(),__PEEK__,__APPLY__()]);